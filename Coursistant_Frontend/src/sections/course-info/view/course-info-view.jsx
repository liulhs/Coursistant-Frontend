import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import KnowledgeItems from './KnowledgeItems';
import LearnSelector from './learn-select-bar';
import { getCourseDetail } from '../get_ccourse_detail';

export default function CourseInfoView({ courseName, course_id }) {
  const [courseDetails, setCourseDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Learn Piazza'); // Default selected option

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
      </Box>
      <Grid container spacing={2}>
        <Grid xs={12} md={9}>
          <KnowledgeItems courseID="20231-EE457LX" selectedOption={selectedOption} />
        </Grid>
        <Grid xs={12} md={1.8}> {/* Adjusting the grid size */}
          <LearnSelector
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

CourseInfoView.propTypes = {
  courseName: PropTypes.string.isRequired,
  course_id: PropTypes.any.isRequired,
};