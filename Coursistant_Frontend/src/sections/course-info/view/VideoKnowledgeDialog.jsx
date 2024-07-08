// VideoKnowledgeDialog.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Dialog, Button, TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

const VideoKnowledgeDialog = ({ open, onClose, onSuccess }) => {
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
      onClose();
    }, 5000);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Video Knowledge</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the YouTube video link.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Video Link (YouTube)"
          type="url"
          fullWidth
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

VideoKnowledgeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired, // Add the onSuccess prop
};

export default VideoKnowledgeDialog;
