import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const departments = ['CS', 'EE', 'ME', 'CE', 'BIO', 'CHE', 'PHY', 'MAT', 'STA', 'HIS', 'PSY', 'SOC', 'ENG', 'MUS', 'ART'];
const seasons = ['Fall', 'Spring', 'Summer', 'Winter'];
const generateCourseCode = () => {
  const department = faker.helpers.arrayElement(departments);
  const courseNumber = faker.datatype.number({ min: 100, max: 599 });
  return `${department} ${courseNumber}`;
};

const schoolNames = [
  'Harvard University',
  'Stanford University',
  'Massachusetts Institute of Technology',
  'University of California, Berkeley',
  'University of Oxford',
  'California Institute of Technology',
  'University of Cambridge',
  'Princeton University',
  'Yale University',
  'Columbia University',
  'University of Chicago',
  'University of Pennsylvania',
  'Imperial College London',
  'University of Toronto',
  'University of Melbourne',
  'Johns Hopkins University',
  'ETH Zurich',
  'University of Tokyo',
  'Peking University',
  'National University of Singapore'
];

const generateSemester = () => {
  const season = faker.helpers.arrayElement(seasons);
  const year = faker.datatype.number({ min: 2020, max: 2024 });
  return `${season} ${year}`;
};

export const course = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: generateCourseCode(),
  company: faker.helpers.arrayElement(schoolNames),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: generateSemester(),
}));
