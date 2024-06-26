import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Iconify from 'src/components/iconify';

import KnowledgeItems from './KnowledgeItems';
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

          Welcome to the {courseDetails ? courseDetails.name : courseName} course page. Here you will find all the knowledge relevant to the course.

        </Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Course
        </Button>
      </Box>

      <Grid container spacing={3}>
        
        <Grid xs={12} md={8}>
          <KnowledgeItems courseID="20231-EE457LX"/>
        </Grid>

        <Grid xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Course Features
              </Typography>
              <Typography variant="body1">
                This course offers: Place holder
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