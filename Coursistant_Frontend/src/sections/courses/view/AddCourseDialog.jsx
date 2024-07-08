// AddCourseDialog.jsx
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';

const semesters = ['Spring', 'Summer', 'Fall', 'Winter'];

const AddCourseDialog = ({ open, onClose, onSuccess }) => {
  const [courseName, setCourseName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [semester, setSemester] = useState('');
  const [instructor, setInstructor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.e-ta.net/api/add_course', {
        user_id: 42, // Replace with actual user ID if needed
        course_name: courseName,
        school_name: schoolName,
        semester,
        instructor,
      });
      if (response.status === 200) {
        onSuccess();
        onClose();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Failed to add course:', error);
      alert('Failed to add course');
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Course Name"
          type="text"
          fullWidth
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="School Name"
          type="text"
          fullWidth
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Semester</InputLabel>
          <Select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {semesters.map((sem) => (
              <MenuItem key={sem} value={sem}>
                {sem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Instructor"
          type="text"
          fullWidth
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Add Course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddCourseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddCourseDialog;
