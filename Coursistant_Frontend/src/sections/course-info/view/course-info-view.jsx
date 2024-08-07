import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

import KnowledgeItems from './KnowledgeItems';
import LearnSelector from './learn-select-bar';
import { getCourseDetail } from '../get_ccourse_detail';
import VideoKnowledgeDialog from './VideoKnowledgeDialog';
import PiazzaKnowledgeDialog from './PiazzaKnowledgeDialog'; // Import the PiazzaKnowledgeDialog component
import PiazzaStatus from './PiazzaStatus';

const icon = (name) => (
  <SvgColor src={`/assets/icons/learn-select/${name}.svg`} sx={{ width: 24, height: 24, ml: 1 }} />
);

export default function CourseInfoView({ courseName, course_id }) {
  const [courseDetails, setCourseDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Learn Piazza'); // Default selected option
  const [dialogOpen, setDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const details = await getCourseDetail(course_id);
      setCourseDetails(details);
    };

    fetchCourseDetails();
  }, [course_id]);

  const handleAddKnowledge = () => {
    if (selectedOption === 'Learn Piazza') {
      // Handle add Piazza knowledge
      setDialogOpen(true);
    } else if (selectedOption === 'Learn Video') {
      // Handle add Video knowledge
      setVideoDialogOpen(true);
    } else if (selectedOption === 'Learn PDF') {
      // Handle add PDF knowledge
      console.log('Add PDF Knowledge');
    }
  };

  const handleDialogSuccess = () => {
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 5000); // Close the alert after 5 seconds
  };

  const getButtonText = () => {
    if (selectedOption === 'Learn Piazza') {
      return 'Add Piazza Knowledge';
    } if (selectedOption === 'Learn Video') {
      return 'Add Video Knowledge';
    } if (selectedOption === 'Learn PDF') {
      return 'Add PDF Knowledge';
    }
    return 'Add Knowledge';
  };

  const getEndIcon = () => {
    if (selectedOption === 'Learn Piazza') {
      return icon('ic_piazza');
    } if (selectedOption === 'Learn Video') {
      return icon('ic_video');
    } if (selectedOption === 'Learn PDF') {
      return icon('ic_pdf');
    }
    return null;
  };

  return (
    <Container maxWidth="xl">
      {alertOpen && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Course Posts Successfully Learned!
        </Alert>
      )}
      <Typography variant="h2" sx={{ mb: 3 }}>
        {courseDetails ? courseDetails.name : courseName}
      </Typography>
      <Grid container alignItems="center" justifyContent="space-between" mb={2}>
        <Grid xs={12} md={9}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              This is {courseDetails ? courseDetails.name : courseName} course page. 
              Here you will find all the knowledge relevant to the course.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                endIcon={getEndIcon()}
                sx={{ ml: 1, width: '250px' }} // Set a fixed width
                onClick={handleAddKnowledge}
              >
                {getButtonText()}
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} md={9}>
          <KnowledgeItems courseID="20233-EE542" selectedOption={selectedOption} />
        </Grid>
        <Grid xs={12} md={1.8}> {/* Adjusting the grid size */}
          <PiazzaStatus courseID={course_id} />
          <LearnSelector
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </Grid>
      </Grid>
      <PiazzaKnowledgeDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onSuccess={handleDialogSuccess} 
        course_id={course_id} // Pass course_id as prop
      />
      <VideoKnowledgeDialog 
        open={videoDialogOpen} 
        onClose={() => setVideoDialogOpen(false)} 
        onSuccess={handleDialogSuccess} 
      />
    </Container>
  );
}

CourseInfoView.propTypes = {
  courseName: PropTypes.string.isRequired,
  course_id: PropTypes.any.isRequired,
};
