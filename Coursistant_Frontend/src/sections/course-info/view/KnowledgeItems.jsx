import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import { Card, Grid, Button, Dialog, TextField, Typography, CardContent, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';


const KnowledgeItems = ({ courseID }) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [startKey, setStartKey] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [updateContent, setUpdateContent] = useState('');

    const fetchData = useCallback(async (hasStartKey) => {
        try {
            const response = await axios.post('/readDB', {
                hasStartKey,
                startKey,
                courseID,
                readLimit: "10"
            });
            if (response.data.result.status === 200) {
                setItems(response.data.result.items);
                setStartKey(response.data.result.startKey);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [courseID, startKey]); // add dependencies here

    useEffect(() => {
        fetchData(false);
    }, [fetchData]); // add fetchData as a dependency

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        fetchData(true);
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            fetchData(false);
        }
    };

    const openEditDialog = (item) => {
        setCurrentItem(item);
        setUpdateContent(item.OriginalText);
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
                primary_key: { ID: currentItem.ID, CreatedTime: currentItem.CreatedTime },
                updateContent
            });
            alert('Item updated successfully');
            fetchData(false);  
        } catch (error) {
            console.error('Failed to update item:', error);
            alert('Failed to update item');
        }
        setEditDialogOpen(false);
    };

    const handleDelete = async () => {
        try {
            await axios.post('http://lax.nonev.win:5000/itemDelete', {
                courseID,
                primary_key: { ID: currentItem.ID, CreatedTime: currentItem.CreatedTime }
            });
            alert('Item deleted successfully');
            fetchData(false);  
        } catch (error) {
            console.error('Failed to delete item:', error);
            alert('Failed to delete item');
        }
        setDeleteDialogOpen(false);
    };

    return (
        <Grid container spacing={2}>
            {items.map((item, index) => (
                <Grid item xs={12} key={index}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" color="text.secondary">
                                Uploaded: {new Date(item.CreatedTime).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                            <Typography variant="body1">
                                {item.OriginalText}
                            </Typography>
                            <Button onClick={() => openEditDialog(item)} >Edit</Button>
                            <Button onClick={() => openDeleteDialog(item)} >Delete</Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {/* Pagination Controls */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Button onClick={handlePrevious} disabled={currentPage === 0}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </Grid>
            {/* Edit Dialog */}
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
            {/* Delete Dialog */}
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


export default KnowledgeItems;

KnowledgeItems.propTypes = {
    courseID: PropTypes.string.isRequired
  };