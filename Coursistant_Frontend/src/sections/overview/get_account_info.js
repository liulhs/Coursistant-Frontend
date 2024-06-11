import axios from 'axios';

// Function to get the number of courses from the API
export const getCoursesNum = async (userId) => {
  try {
    const response = await axios.get('https://api.e-ta.net/api/get_course_num', {
      params: {
        user_id: userId,
      },
    });

    if (response.data && response.data['number of courses'] !== undefined) {
      return response.data['number of courses'];
    }

    console.error('Invalid response format:', response.data);
    return 0;
  } catch (error) {
    console.error('Error fetching the number of courses:', error);
    return 0;
  }
};
