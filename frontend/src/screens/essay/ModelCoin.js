import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch, useSelector } from 'react-redux';
import { coinCreateUser } from '../../actions/userActions';
import { USER_COIN_CREATE_RESET } from '../../constants/userConstants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModelCoin(props) {
  const [coins, setCoins] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => (setOpen(true), setCoins(''));
  const handleClose = () => setOpen(false);


  // coins
  // success
  const { success: successCoin } = useSelector((state) => state.userCoinCreate);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      coinCreateUser({ coins })
    );
  }
  useEffect(() => {
    if (successCoin) {
      handleClose()
      dispatch({type:USER_COIN_CREATE_RESET})
    }
  }, [successCoin])

  return (
    <div>
      <Button
        variant="contained"
        color='success'
        onClick={handleOpen}
        sx={{ fontSize: 13 }}
      >
        Nạp tiền
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className="form" onSubmit={submitHandler}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Số tiền cần nạp
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={coins}
                onChange={(e) => setCoins(e.target.value)}
                type="number"
              />
            </FormControl>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                variant="contained"
                color='success'
                sx={{ fontSize: 13, ml: 1 }}
                type="submit"
              >
                Nạp tiền
              </Button>

              <Button
                variant="contained"
                color='success'
                sx={{ fontSize: 13, ml: 1 }}
                onClick={handleClose}
              >
                Thoát
              </Button>
            </Grid>
          </Box>
        </form>
      </Modal>
    </div>
  )
}
