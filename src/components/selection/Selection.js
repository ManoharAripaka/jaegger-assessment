import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PackageIcon from '../../icons/package.svg';
import DiscountIcon from '../../icons/discount.svg';
import { setViewImage } from '../../redux/reducer';
import { Link, Rating, Typography } from '@mui/material';
import AddToCart from '../addToCart/AddToCart';

function ImageWithFallback({ src, fallbackSrc, alt, onClick, imageClass, imageInvalidClass }) {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        setImgSrc(fallbackSrc);
    };

    return <img src={imgSrc} alt={alt} onError={handleError} onClick={onClick} className={imgSrc === src ? imageClass: imageInvalidClass}/>;
}

function Selection() {
    const { data, viewImage } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    return (
        <div className='selection-wrapper'>
            <div className='article-images'>
                {data.article && data.article?.images?.map((index, eachImage) =>
                    <div className={viewImage == index ? ' selectedImage' : 'unSelectedImage'} key={index}>
                        <ImageWithFallback
                            src={eachImage}
                            alt={PackageIcon}
                            fallbackSrc={PackageIcon}
                            onClick={() => dispatch(setViewImage(index))}
                            imageClass='article-image'
                            imageInvalidClass='article-image-invalid'
                        />
                    </div>
                )}
            </div>
            <div>
                <ImageWithFallback
                    src={data.article?.images[viewImage]}
                    alt={PackageIcon}
                    fallbackSrc={PackageIcon}
                    imageClass='article-image-active'
                    imageInvalidClass='article-image-active-invalid'
                />
            </div>
            <div className='article-details'>
                <Typography variant='p' component='p' className='font-weight-400 font-size-18'>{data.article?.title}</Typography>
                <Typography variant='p' component='p' className='padding-6'>
                    <Typography variant='span' component='span' className='font-color-grey'>by </Typography>
                    <Link href={data.article?.supplier_link} underline="hover">{data.article?.supplier_name}</Link>
                </Typography>
                <Rating name="read-only" value={data.article?.stars} readOnly size='small' className='padding-8'/>
                <Typography variant='p' component='p' className='padding-12' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='span' component='span'>
                        {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.article?.price) + ' ' + data.article?.currency}
                    </Typography>
                    <Typography variant='span' component='span' className='font-color-grey' sx={{ fontSize: '14px' }}>
                        {' + ' + new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.article?.transport_costs) + ' ' + data.article?.currency + ' shipping '}
                    </Typography>
                    <img src={DiscountIcon} alt={DiscountIcon} style={{ width: 18, height: 18, paddingLeft: '8px' }}/>
                </Typography>
                <Typography variant='span' component='span' className='font-color-grey' sx={{ fontSize: '14px' }}>
                    {'all prices incl. ' + data.article?.vat_percent + ' % taxes'}
                </Typography>
                <AddToCart classes='cart-selection-main'/>
            </div>
        </div>
    );
}
export default Selection;