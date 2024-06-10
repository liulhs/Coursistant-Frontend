import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import KnowledgeItems from './KnowledgeItems';

export default function CourseInfoView({ courseName }) {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          {courseName}
        </Typography>

        <Typography variant="h5" sx={{ mb: 5 }}>
          Welcome to the {courseName} course page. Here you will find all the knowledge relevant to the course.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <KnowledgeItems courseID="20231-EE457LX"/>
      </Grid>
    </Container>
  );
}

CourseInfoView.propTypes = {
  courseName: PropTypes.string.isRequired,
};
