import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, Alert} from '@mui/material';

// Constants for API endpoints and credentials
const CID = 'llqyd5tpdcq34o';
const GET_COURSE_DETAILS_URL = `http://api.e-ta.net/api/get_course_detail`;
const START_BOT_URL = `http://lax.nonev.win:5505/start/${CID}`;
const STOP_BOT_URL = `http://lax.nonev.win:5505/stop/${CID}`;
const API_EMAIL = 'liuruiya@usc.edu';
const API_PASSWORD = 'drtest123';

const PiazzaStatus = ({ courseID }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const response = await axios.get(`${GET_COURSE_DETAILS_URL}?course_id=${courseID}`);
                if (response.data['course detail'][0].piazza_status === 1) {
                    setIsActive(true);
                } else {
                    setIsActive(false);
                }
            } catch (error) {
                console.error('Failed to fetch course details:', error);
            }
        };

        fetchCourseDetail();
    }, [courseID]);

    const handleStartBot = async () => {
        try {
            await axios.post(START_BOT_URL, {
                email: API_EMAIL,
                password: API_PASSWORD,
                embedding: false,
                user_type: 'i'
            });
            setIsActive(true);
        } catch (error) {
            console.error('Failed to start Piazza bot:', error);
        }
    };

    const handleStopBot = async () => {
        try {
            await axios.post(STOP_BOT_URL, {
                email: API_EMAIL
            });
            setIsActive(false);
        } catch (error) {
            console.error('Failed to stop Piazza bot:', error);
        }
    };

    return (
        <Grid item xs={12} md={9}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontSize: 14, color: 'text.secondary', marginBottom: 2 }}>
                        Piazza Status
                    </Typography>
                    <Alert severity={isActive ? 'success' : 'error'} sx={{ mb: 2 }}>
                     {isActive ? 'Active' : 'Inactive'}
                    </Alert>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={isActive ? handleStopBot : handleStartBot}
                    >
                        {isActive ? 'Stop Bot' : 'Start Bot'}
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

PiazzaStatus.propTypes = {
    courseID: PropTypes.string.isRequired,
};

export default PiazzaStatus;