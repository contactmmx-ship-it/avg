import React from 'react';
import { MachineRecord, HealthSnapshot, PassportStatus } from '../types/passport.types';
import { Badge } from '@/components/ui/badge';
import { Award, MapPin, Calendar, Zap } from 'lucide-react';

interface PassportCardProps {
  machine: MachineRecord;
  health: HealthSnapshot | null;
}

const PassportCard: React.FC<PassportCardProps> = ({ machine, health }) => {
  const getStatusColor = (status: PassportStatus) => {
    switch (status) {
      case PassportStatus.VERIFIED:
        return 'bg-green-100 text-green-800';
      case PassportStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthGrade = (score: number) => {
    if (score >= 85) return { grade: 'A+', color: 'text-green-600' };
    if (score >= 70) return { grade: 'A', color: 'text-green-500' };
    if (score >= 55) return { grade: 'B', color: 'text-yellow-500' };
    if (score >= 40) return { grade: 'C', color: 'text-orange-500' };
    return { grade: 'D', color: 'text-red-600' };
  };

  const healthGrade = getHealthGrade(machine.machineHealthScore);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Section */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg aspect-square flex items-center justify-center">
            <img
              src={machine.machinePhotoUrl}
              alt={machine.model}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300';
              }}
            />
          </div>
        </div>

        {/* Identity Section */}
        <div className="md:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{machine.machineId}</h2>
              <p className="text-lg text-slate-600 mt-1">{machine.manufacturer} {machine.model}</p>
            </div>
            <Badge className={getStatusColor(machine.passportStatus)}>
              {machine.passportStatus}
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Health Score */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Health Score</p>
                  <p className="text-2xl font-bold text-blue-600">{machine.machineHealthScore}</p>
                </div>
                <Zap className={`w-8 h-8 ${healthGrade.color}`} />
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${machine.machineHealthScore}%` }}
                />
              </div>
            </div>

            {/* Grade */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Grade</p>
              <p className={`text-3xl font-bold ${healthGrade.color}`}>{healthGrade.grade}</p>
            </div>

            {/* Impressions */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Impressions</p>
              <p className="text-xl font-bold text-amber-600">{machine.totalImpressionsCount}M</p>
            </div>

            {/* Year */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Year</p>
              <p className="text-2xl font-bold text-green-600">{machine.yearOfManufacture}</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{machine.currentLocation.city}, {machine.currentLocation.state}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Last active: {new Date(machine.lastOperationalDate.toDate()).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportCard;
