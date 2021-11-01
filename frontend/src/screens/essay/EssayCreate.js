import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createEssay } from '../../actions/essayActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { addressUS } from '../../utils.js';
import { ESSAY_CREATE_RESET } from '../../constants/essayConstants';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';


export default function EssayCreate(props) {
  console.log('props', props)

  const [title, setTitle] = useState('');
  const [famous, setFamous] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('Tuyển thợ nail');
  const [content, setContent] = useState('');
  const [address, setAddress] = useState(addressUS[0].name);
  const [phone, setPhone] = useState('');
  const essayCreate = useSelector((state) => state.essayCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = essayCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: ESSAY_CREATE_RESET });
      props.history.push('/essaylist');
    }
    if (Object.values(props.match)[0] !== '/essay/create') {
      console.log('heloo')
      setImages([])
    }

  }, [dispatch, successCreate, props.history, props.match, setImages]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEssay({ title, famous, image, images, category, content, address, phone, isStatus: false }));
  }

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const bodyFormData = new FormData();
  //   bodyFormData.append('image', file);
  //   setLoadingUpload(true);
  //   try {
  //     const { data } = await axios.post('/api/uploads', bodyFormData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     });
  //     setImage(data);
  //     setLoadingUpload(false);
  //   } catch (error) {
  //     setErrorUpload(error.message);
  //     setLoadingUpload(false);
  //   }
  // };

  const fileUploadAndResize = async (e) => {
    const file = e.target.files;
    const bodyFormData = new FormData();

    for (let i = 0; i < file.length; i++) {
      bodyFormData.append('images', file[i]);
    }
    setLoadingUpload(true);
    try {
      const { data } = await axios.post('/api/uploads/images', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImages(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  
  const handleImageRemove = async (item) => {
    const bodyFormData = new FormData();
    bodyFormData.append('image', item);
    try {
      const { data } = await axios.post('/api/uploads/remove', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImages(data);
      // setLoadingUpload(false);
    } catch (error) {
      // setErrorUpload(error.message);
      // setLoadingUpload(false);
    }
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Tạo mới bài đăng</h1>
        </div>
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        <>
          <div className="row">
            { images[0] ?
              (<ImageList
                sx={{ width: 500, height: 220 }}
                cols={3}
                rowHeight={164}
                className="Center"
              >
                {(images).map((item) => (

                  <ImageListItem key={item}>
                    <DeleteIcon
                      onClick={() => handleImageRemove(item)}
                    />
                    <img
                      src={item}
                      alt={item}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>) : ''
            }
            {loadingUpload && <LoadingBox></LoadingBox>}
            {errorUpload && (
              <MessageBox variant="danger">{errorUpload}</MessageBox>
            )}
            <label htmlFor="imageFile">Choose File</label>
            <input
              type="file"
              id="imageFile"
              label="Choose Image"
              multiple
              hidden
              onChange={fileUploadAndResize}
            ></input>
          </div>
          <div>
            <label htmlFor="title">Tiêu đề</label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="famous">Nổi bật</label>
            <input
              id="famous"
              type="text"
              placeholder="Enter famous"
              value={famous}
              onChange={(e) => setFamous(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="category">Thể loại</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='Tuyển thợ nail'>Tuyển thợ nail</option>
              <option value='Sang tiệm nail'>Sang tiệm nail</option>
              <option value='Nail Supply'> Nail Supply</option>
              <option value='Others...'> Others...</option>

            </select>

          </div>
          <div>
            <label htmlFor="content">Nội dung</label>
            <textarea
              id="content"
              type="text"
              rows="7"

              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="address">địa chỉ</label>
            <select
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              {addressUS.map((address) => (
                <option value={address.name} key={address.abbreviation}>{address.name}</option>
              ))}

            </select>
          </div>
          <div>
            <label htmlFor="phone">Số Điện thoại</label>
            <input
              id="phone"
              type="text"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div>
            <label></label>
            <button className="primary" type="submit">
              Create
            </button>
          </div>
        </>
      </form>
    </div>
  )
}
