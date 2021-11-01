import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import Essay from '../models/essayModel.js';
import User from '../models/userModel.js';

const essayRouter = express.Router();

essayRouter.get( // lấy danh sách các bài đăng
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 7;

    const page = Number(req.query.pageNumber) || 1;
    const category = req.query.category || '';
    const categoryOne = (category === 'all') ? '' : category

    const address = req.query.address || '';
    const addressOne = (address === 'all') ? '' : address

    const categoryFilter = categoryOne ? { category } : {};
    const addressFilter = addressOne ? { address } : {};
    // address
    const count = await Essay.count({
      ...categoryFilter,
      ...addressFilter,
    })
    const essays = await Essay.find({
      ...categoryFilter,
      ...addressFilter,
    })
      // .sort({ _id: -1 })
      .populate('seller', 'seller.name seller.logo')
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    // => skip là loại bỏ số phần tử đầu tiên, 0 trả về chính nó
    // => limit là giới hạn số phầne tử chỉ định, 0 trả về chính nó
    res.json({ essays, page, pages: Math.ceil(count / pageSize) });
  })
);

essayRouter.get( // lấy danh sách các bài đăng đã bị xóa
  '/trash',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 7;
    const page = Number(req.query.pageNumber) || 1;
    const count = (await Essay.findDeleted()).length;
    console.log('count', count)
    const trashEssays = await Essay.findDeleted({})
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.json({ trashEssays, page, pages: Math.ceil(count / pageSize) });
  })
);

// create essay
essayRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const idUser = { idUser: req.user._id }
    const essay = new Essay({ ...req.body.essay, ...idUser });
    // console.log('essay BE', essay)
    const createdEssay = await essay.save();
    // console.log('createdEssay', createdEssay)
    if (createdEssay) {
      res.send({ message: 'Essay Created', essay: createdEssay });
    } else {
      res.status(404).send({ message: 'Essay Not Found restore' });
    }
  })
);

// khôi phục từ thùng rác sang 
essayRouter.patch(
  '/:id/restore',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const essay = await Essay.restore({ _id: req.params.id });
    if (essay) {
      res.send({ message: 'Essay restore', essay: essay });
    } else {
      res.status(404).send({ message: 'Essay Not Found restore' });
    }
  })
);

// khôi phục false sang true, bài đăng đc duyệt
essayRouter.patch(
  '/:id/browse',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const essayId = req.params.id;
    const essay = await Essay.findById(essayId);

    console.log('essay', essay)
    if (essay) {
      essay.isStatus = true;
      const updateEssay = await essay.save();
      res.send({ message: 'Essay update', essay: updateEssay });
    } else {
      res.status(404).send({ message: 'Essay Not Found update' });
    }
  })
);

// khôi phục true sang false, bài đăng đã bị ẩn
essayRouter.patch(
  '/:id/hide',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const essayId = req.params.id;
    const essay = await Essay.findById(essayId);

    console.log('essay', essay)
    if (essay) {
      essay.isStatus = false;
      const updateEssay = await essay.save();
      res.send({ message: 'Essay update', essay: updateEssay });
    } else {
      res.status(404).send({ message: 'Essay Not Found update' });
    }
  })
);

// Xóa mềm (ẩn đi những cái đã xóa)
essayRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const essay = await Essay.findById(req.params.id);
    if (essay) {
      const deleteEssay = await essay.delete();
      res.send({ message: 'Essay Deleted', essay: deleteEssay });
    } else {
      res.status(404).send({ message: 'Essay Not Found' });
    }
  })
);

// Xóa vĩnh viễn bên thùng rác
essayRouter.delete(
  '/:id/force',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const deleteEssay = await Essay.deleteOne({ _id: req.params.id });
    if (deleteEssay) {
      res.send({ message: 'Essay Deleted', essay: deleteEssay });
    } else {
      res.status(404).send({ message: 'Essay Not Found delete' });
    }
  })
);

// Xóa vĩnh viễn bên danh sách
essayRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const essay = await Essay.findById(req.params.id);
    if (essay) {
      const deleteEssay = await essay.remove();
      res.send({ message: 'Essay Deleted', essay: deleteEssay });
    } else {
      res.status(404).send({ message: 'Essay Not Found' });
    }
  })
);

// Lấy chi tiết 1 bài đăng
essayRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const essay = await Essay.findById(req.params.id);
    if (essay) {
      res.send(essay);
    } else {
      res.status(404).send({ message: 'Essay Not Found' });
    }
  })
);

// sửa bài đăng
essayRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {

    const essayId = req.params.id;
    const essay = await Essay.findById(essayId);
    if (essay) {
      essay.title = req.body.title;
      essay.famous = req.body.famous;
      essay.image = req.body.image;
      essay.category = req.body.category;
      essay.content = req.body.content;
      essay.address = req.body.address;
      essay.phone = req.body.phone;

      const updateEssay = await essay.save();
      res.send({ message: 'essay Updated', essay: updateEssay });
    } else {
      res.status(404).send({ message: 'essay Not Found' });
    }
  })
);

// Nạp tiền vào bài đăng và trừ tiền trong tài khoản
essayRouter.post(
  '/coin/:id',
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const essay = await Essay.findById(req.body.essayId);
    const user = await User.findById(req.params.id);
    
    if (essay && user && (user.coins - Number(req.body.coins) >= 0)) {
      const coinsEy = { coins: Number(req.body.coins) }
      //  coinSum
      essay.coinSum = essay.coinSum + Number(req.body.coins)
      essay.coinsEssay.push(coinsEy);
      const updateEssay = await essay.save();
      user.coins = user.coins - Number(req.body.coins)
      await user.save()

      res.send({ message: 'essay Updated', essay: updateEssay });
    } else {
      res.status(404).send({ message: 'Essay Not Found' })
    }
  })
);

export default essayRouter;