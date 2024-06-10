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
      <KnowledgeItems courseID="20231-EE457LX" />
      <Box sx={{ mb: 5 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          {courseName}
        </Typography>

        <Typography variant="h5" sx={{ mb: 5 }}>
          Welcome to the {courseName} course page. Here you will find all the relevant information about the course.
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
                This course provides an in-depth understanding of {courseName}. You will learn the fundamentals as well as advanced concepts. Topics covered include:
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
                    <li>Introduction to {courseName}</li>
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
                <strong>Instructor Name:</strong> John Doe
                <br />
                <strong>Email:</strong> johndoe@example.com
                <br />
                John Doe is an experienced instructor in the field of {courseName} with over 10 years of teaching experience.
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
};
