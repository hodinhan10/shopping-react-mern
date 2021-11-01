import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsEssay, updateEssay } from '../../actions/essayActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { addressUS } from '../../utils.js';
import { ESSAY_UPDATE_RESET } from '../../constants/essayConstants';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EssayEdit(props) {
  const essayId = props.match.params.id;
  const [title, setTitle] = useState('');
  const [famous, setFamous] = useState('');
  const [images, setImages] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const essayDetails = useSelector((state) => state.essayDetails);
  const { loading, error, essay } = essayDetails;

  const essayUpdate = useSelector((state) => state.essayUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = essayUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/essaylist');
    }

    if (!essay || essay._id !== essayId || successUpdate) {
      dispatch({ type: ESSAY_UPDATE_RESET });
      dispatch(detailsEssay(essayId));
    } else {
      setTitle(essay.title)
      setFamous(essay.famous)
      setImages(essay.images)
      setCategory(essay.category)
      setContent(essay.content)
      setAddress(essay.address)
      setPhone(essay.phone)
    }
  }, [essay, dispatch, essayId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateEssay({ _id: essayId, title, famous, images, category, content, address, phone, })
    );
  }

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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
      const { data } = await axios.post('/api/uploads/removeImage', bodyFormData, {
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
          <h1>Chỉnh sửa bài đăng</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <div className="row">
                {images[0] ?
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
              <label htmlFor="title">title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="famous">famous</label>
              <input
                id="famous"
                type="text"
                placeholder="Enter famous"
                value={famous}
                onChange={(e) => setFamous(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
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
              <label htmlFor="content">content</label>
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
              <label htmlFor="address">address</label>
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
              <label htmlFor="phone">phone</label>
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
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
