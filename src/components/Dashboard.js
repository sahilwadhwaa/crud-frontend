import React from 'react';
import { StudentTable } from './StudentTable';
import { ClassroomTable } from './ClassroomTable';

export const Dashboard = () => {
  return (
    <div>
      <StudentTable />
      <ClassroomTable />
    </div>
  );
};
