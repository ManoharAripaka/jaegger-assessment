import React from 'react';
import { Button, FormControl, MenuItem, Select, Snackbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setItemQuantity, setSnackBar, updateCart, updateQuantity } from '../../redux/reducer';
import { Add } from '@mui/icons-material';

function AddToCart(props) {
    const { data, itemQuantity, snackBarOpen, snackBarMessage } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (data.cart.itemList && data.cart.itemList.map(each => each.id).includes(data.article?.id)) {
            if (data.cart.itemList.find(each => each.id === data.article.id).quantity !== itemQuantity) {
                dispatch(setSnackBar({ open: true, message: 'Item updated in the cart' }));
                dispatch(updateQuantity());
            } else {
                dispatch(setSnackBar({ open: true, message: 'Item already in the cart' }));
            }
        } else {
            dispatch(updateCart())
        }
    }

    const handleChange = (event) => {
        dispatch(setItemQuantity(event.target.value));
    };

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setSnackBar({ open: false, message: '' }));
    };

    return (
        <div className={'add-to-cart-wrapper ' + props.classes}>
            {data.article &&<FormControl sx={{ width: 'max-content' }} size="small">
                <Select value={itemQuantity} onChange={handleChange}>
                    <MenuItem value={data.article?.minimum_order_quantity}>{data.article?.minimum_order_quantity}</MenuItem>
                    <MenuItem value={data.article?.minimum_order_quantity * 2}>{data.article?.minimum_order_quantity * 2}</MenuItem>
                    <MenuItem value={data.article?.minimum_order_quantity * 3}>{data.article?.minimum_order_quantity * 3}</MenuItem>
                    <MenuItem value={data.article?.minimum_order_quantity * 4}>{data.article?.minimum_order_quantity * 4}</MenuItem>
                </Select>
            </FormControl>}
            <Typography variant='p' component='p' className='font-weight-400 font-size-18'>{data.article?.unit}</Typography>
            <Button variant="contained" color="error" startIcon={<Add />} sx={{ textTransform: 'none' }} onClick={handleAddToCart}>Add to cart</Button>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                message={snackBarMessage}
                slotProps={{
                    content: {
                        style: {
                            backgroundColor: (snackBarMessage === 'Item already in the cart' ? '#d32f2f' : 'green'),
                            color: 'white',
                        },
                    }
                }}
            />
        </div>
    );
}
export default AddToCart;