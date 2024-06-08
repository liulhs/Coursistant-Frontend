import { Helmet } from 'react-helmet-async';

import { CourseView } from 'src/sections/courses/view';

// ----------------------------------------------------------------------

export default function CoursePage() {
  return (
    <>
      <Helmet>
        <title> My Course | Coursistant </title>
      </Helmet>

      <CourseView />
    </>
  );
}
