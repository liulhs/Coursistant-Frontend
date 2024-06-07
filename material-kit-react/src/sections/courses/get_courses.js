import axios from 'axios';

// Function to get courses from the API
export const getCourses = async (userId) => {
  try {
    const response = await axios.get('https://api.e-ta.net/api/get_course', {
      params: {
        user_id: userId,
      },
    });

    if (response.data && response.data.courses) {
      return response.data.courses.map(course => ({
        course_id: course.class_id,
        name: course.class_name,
        instructor: course.instructor,
        school: course.school_name,
        semester: course.semester,
        status: 'Activated', // Assuming status is 'Activated' for all courses in real data
      }));
    }

    console.error('Invalid response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};