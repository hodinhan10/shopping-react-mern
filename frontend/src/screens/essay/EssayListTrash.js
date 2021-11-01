import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import { deleteForceEssay, listTrarhEssays, restoreEssay } from '../../actions/essayActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './index.css';
import { ESSAY_DELETE_FORCE_RESET, ESSAY_DELETE_RESTORE_RESET } from '../../constants/essayConstants';
import { Button, Grid } from '@mui/material';
import Essay from '../../components/Essay';

export default function EssayListTrash() {
  const { pageNumber = 1 } = useParams();

  const essayListTrarh = useSelector((state) => state.essayListTrarh);
  const {
    loading,
    error,
    trashEssays,
    page,
    pages
  } = essayListTrarh;

  const essayRestore = useSelector((state) => state.essayRestore);
  const {
    loading: loadingRestore,
    success: successRestore,
    error: errorRestore,
  } = essayRestore;

  const essayDeleteForce = useSelector((state) => state.essayDeleteForce);
  const {
    loading: loadingDeleteForce,
    error: errorDeleteForce,
    success: successDeleteForce,
  } = essayDeleteForce;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successDeleteForce) {
      dispatch({ type: ESSAY_DELETE_FORCE_RESET });
    }
    if (successRestore) {
      dispatch({ type: ESSAY_DELETE_RESTORE_RESET });
    }

    dispatch(listTrarhEssays({ pageNumber }));
  }, [
    dispatch,
    successRestore,
    successDeleteForce,
    pageNumber
  ]);

  const restoreHandler = (essay) => {
    dispatch(restoreEssay(essay));
  }

  const deleteHandler = (essay) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteForceEssay(essay._id));
    }
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };
  return (
    <div className="container">
      <h1 className="h1">Nail</h1>
      <div className="accordion">

        <Button color='primary' sx={{ fontSize: 16, ml: 2 }}>
          <Link to='/EssayList'>Quay lai</Link>
        </Button>
        {loadingDeleteForce && <LoadingBox></LoadingBox>}
        {errorDeleteForce && <MessageBox variant="danger">{errorDeleteForce}</MessageBox>}
        {loadingRestore && <LoadingBox></LoadingBox>}
        {errorRestore && <MessageBox variant="danger">{errorRestore}</MessageBox>}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {trashEssays.length === 0 && <MessageBox>No essay Found</MessageBox>}
            <div className="accordion">
              {trashEssays.map((essay) => (
                <div key={essay._id} >
                  <Essay essay={essay} handleChange={handleChange} expanded={expanded}></Essay>

                  <Grid sx={{ mt: 1 }}>
                    <Button
                      variant="contained"
                      color='success'
                      sx={{ fontSize: 13 }}
                      onClick={() => restoreHandler(essay)}
                    >
                      Khôi phục
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ fontSize: 13, ml: 1 }}
                      onClick={() => deleteHandler(essay)}
                    >
                      xóa vĩnh viễn
                    </Button>
                  </Grid>
                </div>

              ))}
            </div>
            <div className="row center pagination">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={x + 1 === page ? 'active' : ''}
                  key={x + 1}
                  to={`/EssayListTrash/pageNumber/${x + 1}`}
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
