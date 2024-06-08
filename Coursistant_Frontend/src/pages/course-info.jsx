import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useLocation } from 'react-router-dom';

import { CourseInfoView } from 'src/sections/course-info/view';

export default function CourseInfoPage() {
  const { dynamicName } = useParams();
  const location = useLocation();

  // Extract course_id from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const course_id = queryParams.get('course_id');

  // Convert the dynamic name back to a readable format if needed
  const courseName = dynamicName.split('_').join(' ');

  return (
    <>
      <Helmet>
        <title>{courseName} | Coursistant</title>
      </Helmet>

      <CourseInfoView courseName={courseName} courseId={course_id} />
    </>
  );
}
