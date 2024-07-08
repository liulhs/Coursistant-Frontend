// PiazzaKnowledgeDialog.jsx
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Dialog, Button, Select, MenuItem, TextField, InputLabel, DialogTitle, FormControl, DialogContent, DialogActions, DialogContentText } from '@mui/material';

const PiazzaKnowledgeDialog = ({ open, onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5500/users/login', {
                email,
                password
            });
            if (response.status === 200) {
                fetchCourses();
            } else {
                setLoading(false);
                alert('Invalid credentials');
            }
        } catch (error) {
            setLoading(false);
            alert('Failed to login');
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:5500/users/${email}/courses/all`);
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert('Failed to fetch courses');
        }
    };

    const handleSelectCourse = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onSuccess();
            onClose();
        }, 5000);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Piazza Knowledge</DialogTitle>
            <DialogContent>
                {!courses.length ? (
                    <>
                        <DialogContentText>
                            Please enter your Piazza email and password.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Piazza Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <DialogContentText>
                            Select a course from the dropdown menu.
                        </DialogContentText>
                        <FormControl fullWidth>
                            <InputLabel>Course</InputLabel>
                            <Select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                {courses.map((course) => (
                                    <MenuItem key={course.id} value={course.id}>
                                        {course.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {courses.length ? (
                    <Button onClick={handleSelectCourse} disabled={loading}>
                        {loading ? 'Loading...' : 'Select Course'}
                    </Button>
                ) : (
                    <Button onClick={handleLogin} disabled={loading}>
                        {loading ? 'Loading...' : 'Find Courses'}
                    </Button>
                )}
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

PiazzaKnowledgeDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired, // Add the onSuccess prop
};

export default PiazzaKnowledgeDialog;
