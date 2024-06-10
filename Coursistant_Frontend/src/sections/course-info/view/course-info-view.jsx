import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { getCourseDetail } from '../get_ccourse_detail';

export default function CourseInfoView({ courseName, course_id }) {
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const details = await getCourseDetail(course_id);
      setCourseDetails(details);
    };

    fetchCourseDetails();
  }, [course_id]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          {courseDetails ? courseDetails.name : courseName}
        </Typography>

        <Typography variant="h5" sx={{ mb: 5 }}>
          Welcome to the {courseDetails ? courseDetails.name : courseName} course page. Here you will find all the relevant information about the course.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Course Description
              </Typography>
              <Typography variant="body1">
                This course provides an in-depth understanding of {courseDetails ? courseDetails.name : courseName}. You will learn the fundamentals as well as advanced concepts. Topics covered include:
                <ul>
                  <li>Topic 1</li>
                  <li>Topic 2</li>
                  <li>Topic 3</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ my: 5 }}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Syllabus
                </Typography>
                <Typography variant="body1">
                  The syllabus for this course is structured to provide a comprehensive learning experience. Key modules include:
                  <ol>
                    <li>Introduction to {courseDetails ? courseDetails.name : courseName}</li>
                    <li>Intermediate Concepts</li>
                    <li>Advanced Techniques</li>
                  </ol>
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Instructor Information
              </Typography>
              <Typography variant="body1">
                <strong>Instructor Name:</strong> {courseDetails ? courseDetails.instructor : 'Loading...'}
                <br />
                <strong>School:</strong> {courseDetails ? courseDetails.school : 'Loading...'}
                <br />
                <strong>Semester:</strong> {courseDetails ? courseDetails.semester : 'Loading...'}
                <br />
                {courseDetails ? `${courseDetails.instructor} is an experienced instructor in the field of ${courseDetails.name} with over 10 years of teaching experience.` : 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Course Features
              </Typography>
              <Typography variant="body1">
                This course offers:
                <ul>
                  <li>Comprehensive video lectures</li>
                  <li>Interactive quizzes and assignments</li>
                  <li>Access to a community forum</li>
                  <li>Certificate of completion</li>
                  <li>Piazza status: {courseDetails ? courseDetails.piazza_status : 'Loading...'}</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

CourseInfoView.propTypes = {
  courseName: PropTypes.string.isRequired,
  course_id: PropTypes.any.isRequired
};