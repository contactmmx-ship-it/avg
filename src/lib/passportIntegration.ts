// Integration guide for Machine Passport System
// This file helps connect MachinePassport component to your existing app

import MachinePassport from '../components/MachinePassport';
import { Route } from 'react-router-dom';

// STEP 1: Import in your main App.tsx file:
// import MachinePassport from './components/MachinePassport';
// import { Bookmark } from 'lucide-react';

// STEP 2: Add navigation entry
export const PASSPORT_NAV = {
  path: '/passport/:machineId',
  label: 'Machine Passport',
  icon: 'Bookmark',
};

// STEP 3: Add React Router route
export const PASSPORT_ROUTE = (
  <Route path="/passport/:machineId" element={<MachinePassport />} />
);

// STEP 4: Create a navigation link
export const getPassportLink = (machineId: string): string => {
  return `/passport/${machineId}`;
};

// STEP 5: Use in your components
// import { getPassportLink } from '../lib/passportIntegration';
// 
// <Link to={getPassportLink('AVG-000001')}>View Passport</Link>

export default MachinePassport;
