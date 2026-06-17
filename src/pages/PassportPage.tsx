import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MachinePassport from '../components/MachinePassport';

/**
 * Wrapper page for Machine Passport
 * Provides back navigation and additional UI context
 */
const PassportPage: React.FC = () => {
  const { machineId } = useParams<{ machineId: string }>();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="h-6 w-0.5 bg-slate-200" />
          <span className="text-sm text-slate-600">Machine Passport: {machineId}</span>
        </div>
      </div>

      {/* Passport Component */}
      <MachinePassport />
    </div>
  );
};

export default PassportPage;
