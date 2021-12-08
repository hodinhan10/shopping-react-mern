import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';
import fs from 'fs';
import { promisify } from 'util';
import expressAsyncHandler from 'express-async-handler';

const unlinkAsync = promisify(fs.unlink)

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

let filesArray = [];
uploadRouter.post('/images', isAuth, upload.array('images', 12), (req, res) => {
  if (req.files) {
    req.files.forEach(element => {      
      filesArray.push( `/${element.path}`);
    });
  }
  res.send(filesArray);
});

uploadRouter.post('/remove', isAuth, upload.single('images'), (req, res) => {
  const newArray =  filesArray.filter(e => e !==Object.values(req.body)[0])
  filesArray = newArray
  res.send(filesArray);
});

uploadRouter.post('/removeImage',isAuth, upload.single('images'),expressAsyncHandler( async (req, res) =>{
  // console.log('req',req)
  const a = await uploadToRemoteBucket(req.body.image)
  // console.log('a',a)
  const b =await unlinkAsync(req.body.image)
  // console.log('b',b)
  res.end("UPLOAD COMPLETED!")
}))

export default uploadRouter;