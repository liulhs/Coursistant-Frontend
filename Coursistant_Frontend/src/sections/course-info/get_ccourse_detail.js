import axios from 'axios';

// Function to get course details from the API
export const getCourseDetail = async (courseId) => {
  try {
    const response = await axios.get('https://api.e-ta.net/api/get_course_detail', {
      params: {
        course_id: courseId,
      },
    });

    if (response.data && response.data['course detail']) {
      const course = response.data['course detail'][0]; // Assuming the response contains an array with one course object

      return {
        course_id: course.class_id,
        name: course.class_name,
        instructor: course.instructor,
        school: course.school_name,
        semester: course.semester,
        piazza_status: course.piazza_status === 1 ? 'Active' : 'Inactive', // Assuming piazza_status is 1 for active, 0 for inactive
      };
    }

    console.error('Invalid response format:', response.data);
    return null;
  } catch (error) {
    console.error('Error fetching course details:', error);
    return null;
  }
};
