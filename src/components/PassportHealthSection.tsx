import React, { useEffect, useState } from 'react';
import { HealthSnapshot } from '../types/passport.types';
import { Activity, Zap, AlertCircle } from 'lucide-react';

interface PassportHealthSectionProps {
  machineId: string;
  health: HealthSnapshot | null;
}

const PassportHealthSection: React.FC<PassportHealthSectionProps> = ({ machineId, health }) => {
  const [scoreGrades, setScoreGrades] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (health) {
      const getGrade = (score: number) => {
        if (score >= 85) return 'A';
        if (score >= 70) return 'B';
        if (score >= 55) return 'C';
        if (score >= 40) return 'D';
        return 'F';
      };

      setScoreGrades({
        mechanical: getGrade(health.mechanicalHealth),
        electrical: getGrade(health.electricalHealth),
        cylinder: getGrade(health.cylinderHealth),
        registration: getGrade(health.printRegistration),
        safety: getGrade(health.safetyHealth),
        documentation: getGrade(health.documentationHealth),
      });
    }
  }, [health]);

  const getHealthColor = (score: number) => {
    if (score >= 85) return 'from-green-50 to-green-100';
    if (score >= 70) return 'from-blue-50 to-blue-100';
    if (score >= 55) return 'from-yellow-50 to-yellow-100';
    if (score >= 40) return 'from-orange-50 to-orange-100';
    return 'from-red-50 to-red-100';
  };

  const getTextColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 55) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  if (!health) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-40">
          <p className="text-slate-600">No health data available</p>
        </div>
      </div>
    );
  }

  const healthMetrics = [
    { name: 'Mechanical Health', value: health.mechanicalHealth, icon: '⚙️' },
    { name: 'Electrical Health', value: health.electricalHealth, icon: '⚡' },
    { name: 'Cylinder Health', value: health.cylinderHealth, icon: '🔄' },
    { name: 'Print Registration', value: health.printRegistration, icon: '📐' },
    { name: 'Safety Systems', value: health.safetyHealth, icon: '🛡️' },
    { name: 'Documentation', value: health.documentationHealth, icon: '📋' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6 text-slate-900">Current Machine Health</h2>

      {/* Health Update Info */}
      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 p-3 rounded mb-6 text-sm">
        <Activity className="w-4 h-4" />
        <span>Last updated: {new Date(health.lastUpdated.toDate()).toLocaleString()}</span>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthMetrics.map((metric, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${getHealthColor(metric.value)} rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 font-medium">{metric.name}</p>
                <p className={`text-3xl font-bold ${getTextColor(metric.value)} mt-1`}>
                  {metric.value}
                </p>
              </div>
              <span className="text-3xl">{metric.icon}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
              <div
                className={`${getTextColor(metric.value).replace('text-', 'bg-')} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${metric.value}%` }}
              />
            </div>

            {/* Grade Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Grade</span>
              <span className={`text-lg font-bold ${getTextColor(metric.value)}`}>
                {scoreGrades[metric.name.toLowerCase().replace(/\s+/g, '')] || 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Health Alert */}
      {health.mechanicalHealth < 60 || health.electricalHealth < 60 ? (
        <div className="mt-6 flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-900">Maintenance Alert</p>
            <p className="text-sm text-orange-800 mt-1">
              This machine requires attention. Some health metrics are below recommended levels. Consider scheduling preventive maintenance.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PassportHealthSection;
