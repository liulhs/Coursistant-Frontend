import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import { Box, Card, Grid, Button, Dialog, TextField, Typography, CardContent, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

const KnowledgeItems = ({ courseID }) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [updateContent, setUpdateContent] = useState('');
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://api.e-ta.net/api/get_json', {
                params: {
                    class_id: 5
                }
            });
            if (response.status === 200) {
                setItems(response.data);
                setTotalPages(Math.ceil(response.data.length / 10)); // Assume 10 items per page
                setError(false);
            }
        } catch (err) {
            console.error('Failed to fetch data:', err);
            setError(true);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const openEditDialog = (item) => {
        setCurrentItem(item);
        setUpdateContent(item.detail.content);
        setEditDialogOpen(true);
    };

    const openDeleteDialog = (item) => {
        setCurrentItem(item);
        setDeleteDialogOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post('http://lax.nonev.win:5000/itemUpdate', {
                courseID,
                primary_key: { ID: currentItem.id, CreatedTime: currentItem.time },
                updateContent
            });
            alert('Item updated successfully');
            fetchData();  
        } catch (err) {
            console.error('Failed to update item:', err);
            alert('Failed to update item');
        }
        setEditDialogOpen(false);
    };

    const handleDelete = async () => {
        try {
            await axios.post('http://lax.nonev.win:5000/itemDelete', {
                courseID,
                primary_key: { ID: currentItem.id, CreatedTime: currentItem.time }
            });
            alert('Item deleted successfully');
            fetchData();  
        } catch (err) {
            console.error('Failed to delete item:', err);
            alert('Failed to delete item');
        }
        setDeleteDialogOpen(false);
    };

    return (
        <Grid container spacing={2}>
            {error || items.length === 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h6" color="text.secondary">
                        There is no relative knowledge yet on Coursistant for this course. Try adding them.
                    </Typography>
                </Grid>
            ) : (
                items.slice(currentPage * 10, (currentPage + 1) * 10).map((item, index) => (
                    <Grid item xs={12} key={index}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">
                                    {item.type === 'question' ? 'Question' : 'Announcement'}
                                </Typography>
                                <Typography variant="h6">
                                    {item.detail.subject}
                                </Typography>
                                <Typography variant="body1">
                                    {item.detail.content}
                                </Typography>
                                {item.type === 'question' && item.answers.map((answer, idx) => (
                                    <Typography 
                                        key={idx} 
                                        variant="body2" 
                                        style={{ color: answer.type === 'i_answer' ? 'blue' : 'green' }}
                                    >
                                        {answer.type === 'i_answer' ? `Instructor's answer: ${answer.content}` : `Student's answer: ${answer.content}`}
                                    </Typography>
                                ))}
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(item.time).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </Typography>
                                <Button onClick={() => openEditDialog(item)}>Edit</Button>
                                <Button onClick={() => openDeleteDialog(item)}>Delete</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Button onClick={handlePrevious} disabled={currentPage === 0}>Previous</Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i}
                            onClick={() => handlePageClick(i)}
                            variant={i === currentPage ? 'contained' : 'outlined'}
                            sx={{ mx: 0.5 }}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </Box>
                <Button onClick={handleNext} disabled={currentPage === totalPages - 1}>Next</Button>
            </Grid>
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Knowledge Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the updated text for the knowledge item.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Updated Content"
                        type="text"
                        fullWidth
                        multiline  
                        rows={4}   
                        value={updateContent}
                        onChange={(e) => setUpdateContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

KnowledgeItems.propTypes = {
    courseID: PropTypes.string.isRequired
};

export default KnowledgeItems;
