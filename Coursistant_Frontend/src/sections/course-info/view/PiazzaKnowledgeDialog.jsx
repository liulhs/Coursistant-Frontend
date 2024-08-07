import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
    Dialog, Button, Select, MenuItem, TextField, InputLabel, DialogTitle,
    FormControl, DialogContent, DialogActions, CircularProgress, DialogContentText
} from '@mui/material';

const PiazzaKnowledgeDialog = ({ open, onClose, onSuccess, course_id }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({ Piazza_course_id: '', name: '' });

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in both fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://piazza.e-ta.net/users/login', { email, password });
            if (response.status === 200) {
                fetchCourses();
            } else {
                setLoading(false);
                alert('Invalid credentials');
            }
        } catch (error) {
            setLoading(false);
            alert(`Failed to login: ${error.response?.data?.message || error.message}`);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`https://piazza.e-ta.net/users/${email}/courses/all`);
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert(`Failed to fetch courses: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleSelectCourse = async () => {
        setLoading(true);
        console.log("handleSelectCourse initiated");
        try {
            console.log(`Fetching posts for email: ${email}, course ID: ${selectedCourse.Piazza_course_id}`);
            
            // Get posts from the local server
            const postsResponse = await axios.get(`https://piazza.e-ta.net/users/${email}/courses/${selectedCourse.Piazza_course_id}/posts/all`);
            const postsData = postsResponse.data;
            console.log("Fetched posts data:", postsData);

            // Upload posts to the external API
            console.log("Uploading posts to external API with course ID:", course_id);
            await axios.post('https://api.e-ta.net/api/upload_json', {
                class_id: course_id,
                data: postsData,
            });
            console.log("Posts successfully uploaded to external API");

            setLoading(false);
            onSuccess();
            onClose();
        } catch (error) {
            setLoading(false);
            console.error("Error in handleSelectCourse:", error);
            alert(`Failed to store Piazza knowledge: ${error.response?.data?.message || error.message}`);
        }
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
                                value={selectedCourse.Piazza_course_id}
                                onChange={(e) => {
                                    const selected = courses.find(course => course.id === e.target.value);
                                    setSelectedCourse({
                                        Piazza_course_id: selected.id,
                                        name: selected.name,
                                    });
                                }}
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
                {loading && <CircularProgress size={18} />}
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
    onSuccess: PropTypes.func.isRequired,
    course_id: PropTypes.any.isRequired, // Add PropTypes for course_id
};

export default PiazzaKnowledgeDialog;
