// StoreKnowledge.jsx
import axios from 'axios';

const StorePiazza = async (Piazza_course_id, course_id, email) => {
  try {
    // Step 1: Fetch Piazza posts from the Piazza API
    const piazzaResponse = await axios.get(`http://localhost:5501/users/${email}/courses/${Piazza_course_id}/posts/all`);
    const posts = piazzaResponse.data;

    // Step 2: Send the fetched posts to your Flask backend for storage
    const storeResponse = await axios.post('http://localhost:5501/store-piazza', {
      Piazza_course_id,
      course_id,
      email,
      posts // Include the fetched posts
    });

    if (storeResponse.status === 200) {
      console.log('Piazza posts have been stored successfully.');
    } else {
      console.error('Failed to store Piazza posts.');
    }
  } catch (error) {
    console.error('Failed to store Piazza posts:', error.message);
  }
};

export default StorePiazza;
