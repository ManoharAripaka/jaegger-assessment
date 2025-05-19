import React from 'react';
import { Card, Chip, Link, List, ListItem, ListItemIcon, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import AttachmentIcon from '../../icons/attachment.svg';

function Details() {
    const { data } = useSelector((state) => state.data);

    const handleAttachmentClick = async (event, file) => {
        event.preventDefault();
        fetch('https://cors-anywhere.herokuapp.com/' + file.file_link)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = file.file_name;
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
    }

    return (
        <div className='details-wrapper'>
            <Typography variant='p' component='p' className='font-weight-400 font-red' sx={{ pb: 2 }}>DESCRIPTION</Typography>
            {data.article?.description_long.split('\n\n').map((paragraph, key) => (<Typography key={key} variant='p' component='p' sx={{ pb: 2 }}>{paragraph}</Typography>))}
            <div className='details-card-wrapper'>
                <Card className='details-card'>
                    <Typography variant='p' component='p' className='details-card-title font-red font-weight-400'>DETAILS</Typography>
                    <Typography variant='p' component='p' className='font-color-grey padding-8' sx={{ mt: '8px' }}>Features</Typography>
                    {data?.article && <List sx={{ listStyleType: 'disc', pl: 2, pt: 0, pb: 0 }}>
                        {Object.keys(data.article.features)?.map((eachFeature, key) => 
                            <ListItem key={key} sx={{ display: 'list-item', pl: '4px', pt: '2px', pb: '2px' }}>
                                <Typography variant='span' component='span' className='font-color-grey'>{eachFeature + ': '}</Typography>
                                <Typography variant='span' component='span'>{data.article?.features[eachFeature]}</Typography>
                            </ListItem>
                        )}
                    </List>}
                    <Typography variant='p' component='p' className='font-color-grey padding-8' sx={{ mt: '8px' }}>Attachments</Typography>
                    {data?.article && <List sx={{ pl: 0, pt: 0, pb: 0 }}>
                        {data.article.attachments?.map((eachAttachment, key) => 
                            <ListItem key={key} sx={{ pl: 0, pt: '2px', pb: '2px' }}>
                                <ListItemIcon sx={{ minWidth: 0, mr: '8px', ml: '0px' }}>
                                    <img src={AttachmentIcon} alt='attachment' style={{ width: 14, height: 14 }} />
                                </ListItemIcon>
                                <Link href='#' underline="hover" component="button" onClick={(e) => handleAttachmentClick(e, eachAttachment)}>{eachAttachment.file_label}</Link>
                            </ListItem>
                        )}
                    </List>}
                    <Typography variant='p' component='p' className='font-color-grey padding-8' sx={{ mt: '8px' }}>Keywords</Typography>
                    <Stack direction="row" spacing={1}>
                        {data.article?.keywords?.map((eachKeyword, key) =>
                            <Chip key={key} label={eachKeyword} className='chip-keyword' />
                        )}
                    </Stack>
                </Card>
                <Card className='details-card'>
                    <Typography variant='p' component='p' className='details-card-title font-red font-weight-400'>PRICING & SHIPPING</Typography>
                    {data?.article && <List sx={{ listStyleType: 'disc', pl: 2}}>
                        <ListItem sx={{ display: 'list-item', pl: '4px', pt: '2px', pb: '2px', mt: '8px' }}>
                            <Typography variant='span' component='span' className='font-color-grey'>Minimum order: </Typography>
                            <Typography variant='span' component='span'>{data.article?.minimum_order_quantity + ' ' + data.article?.unit}</Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', pl: '4px', pt: '2px', pb: '2px' }}>
                            <span className='font-color-grey'>Shipping:</span>
                            &nbsp;
                            <span className='foont-color-grey'> {data.article?.transport_costs}&nbsp;{data.article?.currency}</span>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', pl: '4px', pt: '2px', pb: '2px' }}>
                            <span className='font-color-grey'>Delivery time:</span>
                            &nbsp;
                            <span className='foont-color-grey'> {data.article?.delivery_time}&nbsp;days</span>
                        </ListItem>
                    </List>}
                    {data?.article && <TableContainer sx={{ pb: '24px', position: 'absolute', bottom: 0 }}>
                        <Table sx={{ width: 'auto' }} aria-label="simple table">
                            <TableBody>
                                <TableRow > 
                                    <TableCell className='table-cell font-color-grey'>Price breaks</TableCell>
                                    <TableCell className='table-cell' align="right"></TableCell>
                                </TableRow>
                                {Object.keys(data.article?.price_breaks)?.map((eachBreak, key) => (
                                    <TableRow key={key}>
                                        <TableCell className='table-cell' align="right">ex {eachBreak} {data.article.unit}</TableCell>
                                        <TableCell className='table-cell'>{data.article.price_breaks[eachBreak]}&#9;{data.article.currency}/{data.article.unit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </Card>
            </div>
        </div>
    );
}
export default Details;