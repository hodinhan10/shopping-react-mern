import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { listEssays, deleteSoftEssay, deleteEssay, browseEssay, hideEssay } from '../../actions/essayActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { ESSAY_DELETE_RESET, ESSAY_DELETE_SOFT_RESET } from '../../constants/essayConstants';
import './index.css';
import { Button, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addressUS } from '../../utils.js';
import Essay from '../../components/Essay';
import TextField from '@mui/material/TextField';

import ModelCoin from './ModelCoin';
import ModelCoinEssay from './ModelCoinEssay';



function EssayList(props) {
  const {
    category = 'all',
    address = 'all',
    pageNumber = 1,
  } = useParams();

  const dispatch = useDispatch();
  const essayList = useSelector((state) => state.essayList);
  const {
    loading,
    error,
    essays,
    page,
    pages
  } = essayList;
  // console.log('essays', essays)
  const essayDeleteSoft = useSelector((state) => state.essayDeleteSoft);
  const {
    loading: loadingDeleteSoft,
    error: errorDeleteSoft,
    success: successDeleteSoft,
  } = essayDeleteSoft;

  const essayDelete = useSelector((state) => state.essayDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = essayDelete;

  const { success: successBrowse } = useSelector((state) => (state.essayBrowse));
  const { success: successHide } = useSelector((state) => (state.essayHide));

  const { coins } = useSelector((state) => state.userCoinCreate);

  // console.log('successBrowse',successBrowse)
  useEffect(() => {
    if (successDeleteSoft) {
      dispatch({ type: ESSAY_DELETE_SOFT_RESET });
    }
    if (successDelete) {
      dispatch({ type: ESSAY_DELETE_RESET });
    }
    dispatch(listEssays({
      pageNumber,
      category: category !== '' ? category : '',
      address: address !== '' ? address : '',
    }));
  }, [
    dispatch,
    successDeleteSoft,
    successDelete,
    pageNumber,
    category,
    address,
    successBrowse,
    successHide
  ]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const deleteSoftHandler = (essay) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteSoftEssay(essay._id));
    }
  };

  const deleteHandler = (essay) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteEssay(essay._id));
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filteraddress = filter.address || address;
    // return `/essayList/category/${filterCategory}/pageNumber/${filterPage}`;
    return `/essayList/category/${filterCategory}/address/${filteraddress}/pageNumber/${filterPage}`;
  };



  return (
    <div className="container">
      <h1 className="h1">Nail</h1>
      <div className="accordion">
        <Button
          color='success'
          sx={{ fontSize: 16 }}
          variant="contained"
          onClick={() => props.history.push(`/essay/create`)}
        >
          Tạo mới
        </Button>

        <Button color='primary' sx={{ fontSize: 16, ml: 2 }}>
          <Link to='/EssayListTrash'>
            THùng rác
          </Link>
        </Button>

        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Địa chỉ</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={address}
            onChange={(e) =>
              // setAddress(e.target.value)
              props.history.push(getFilterUrl({ address: e.target.value }))
            }
            autoWidth
            label="Age"
          >
            <MenuItem value='all'>Tất cả</MenuItem>
            {addressUS.map((address) => (
              <MenuItem value={address.name} key={address.abbreviation}>{address.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Thể loại</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={category}
            onChange={(e) => {
              props.history.push(getFilterUrl({ category: e.target.value }));
            }}

            // onChange={(e) => setCategory(e.target.value)}
            autoWidth
            label="Age"
          >
            <MenuItem value='all'>Tất cả</MenuItem>
            <MenuItem value='Tuyển thợ nail'>Tuyển thợ nail</MenuItem>
            <MenuItem value='Sang tiệm nail'>Sang tiệm nail</MenuItem>
            <MenuItem value='Nail Supply'> Nail Supply</MenuItem>
            <MenuItem value='Others...'> Others...</MenuItem>
          </Select>
        </FormControl>

        {/* Model */}
        <ModelCoin></ModelCoin>
        {loadingDeleteSoft && <LoadingBox></LoadingBox>}
        {errorDeleteSoft && <MessageBox variant="danger">{errorDeleteSoft}</MessageBox>}

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {essays.length === 0 && <MessageBox>No essay Found</MessageBox>}
            <div className="accordion">
              {essays.map((essay) => (
                <div key={essay._id}>
                  <Essay essay={essay} handleChange={handleChange} expanded={expanded}></Essay>
                  <Grid sx={{ mt: 1 }}>
                    <Button
                      variant="contained"
                      color='success'
                      sx={{ fontSize: 13 }}
                      onClick={() => props.history.push(`/essay/${essay._id}/edit`)}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ fontSize: 13, ml: 1 }}
                      onClick={() => deleteSoftHandler(essay)}
                    >
                      Xóa mềm
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ fontSize: 13, ml: 1 }}
                      onClick={() => deleteHandler(essay)}
                    >
                      Xóa vĩnh viễn
                    </Button>
                    {userInfo && userInfo.isAdmin && (

                      <>
                        <Button
                          variant="contained"
                          color='success'
                          disabled={essay.isStatus ? true : false}
                          sx={{ fontSize: 13, ml: 1 }}
                          onClick={() => dispatch(browseEssay(essay))}
                        >
                          Duyệt bài
                        </Button>
                        <Button
                          variant="contained"
                          color='success'
                          disabled={essay.isStatus ? false : true}
                          sx={{ fontSize: 13, ml: 1 }}
                          onClick={() => dispatch(hideEssay(essay))}

                        >
                          Ẩn bài
                        </Button>
                      </>
                    )}
                    <ModelCoinEssay id={essay._id}></ModelCoinEssay>
                  </Grid>
                </div>

              ))}
            </div>
            <div className="row center pagination">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={x + 1 === page ? 'active' : ''}
                  key={x + 1}
                  // to={`/essayList/pageNumber/${x + 1}`}
                  to={getFilterUrl({ page: x + 1 })}

                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EssayList
