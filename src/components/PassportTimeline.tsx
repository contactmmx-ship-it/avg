import React from 'react';
import { OwnershipRecord, ServiceRecord, InspectionRecord, RefurbRecord } from '../types/passport.types';
import { ChevronDown, User, Wrench, CheckCircle, RefreshCw } from 'lucide-react';

interface PassportTimelineProps {
  type: 'ownership' | 'service' | 'inspection' | 'refurbishment' | 'combined';
  events: any[];
  title: string;
}

const PassportTimeline: React.FC<PassportTimelineProps> = ({ type, events, title }) => {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = a.datePurchased || a.serviceDate || a.inspectionDate || a.refurbStartDate || 0;
    const dateB = b.datePurchased || b.serviceDate || b.inspectionDate || b.refurbStartDate || 0;
    return dateB - dateA;
  });

  const getIcon = (eventType: string) => {
    switch (eventType) {
      case 'ownership':
        return <User className="w-5 h-5" />;
      case 'service':
        return <Wrench className="w-5 h-5" />;
      case 'inspection':
        return <CheckCircle className="w-5 h-5" />;
      case 'refurbishment':
        return <RefreshCw className="w-5 h-5" />;
      default:
        return <ChevronDown className="w-5 h-5" />;
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'ownership':
        return 'bg-blue-100 text-blue-700';
      case 'service':
        return 'bg-orange-100 text-orange-700';
      case 'inspection':
        return 'bg-green-100 text-green-700';
      case 'refurbishment':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6 text-slate-900">{title}</h2>
      
      {sortedEvents.length === 0 ? (
        <p className="text-slate-600 text-center py-8">No records found</p>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-purple-300" />

          {/* Timeline events */}
          <div className="space-y-6">
            {sortedEvents.map((event, idx) => (
              <div key={idx} className="relative flex gap-6 items-start pl-20">
                {/* Icon Circle */}
                <div className={`absolute left-0 top-1 w-14 h-14 rounded-full flex items-center justify-center ${getEventColor(type)} -translate-x-1/3`}>
                  {getIcon(type)}
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">
                      {type === 'ownership' && `${event.ownerName || 'Owner'} - Purchased`}
                      {type === 'service' && `${event.serviceType || 'Service'} by ${event.engineer || 'Unknown'}`}
                      {type === 'inspection' && `Inspection - ${event.certificationLevel || ''} Level`}
                      {type === 'refurbishment' && `${event.refurbPhase || 'Refurbishment'}`}
                    </h3>
                    <span className="text-sm text-slate-600">
                      {type === 'ownership' && formatDate(event.datePurchased)}
                      {type === 'service' && formatDate(event.serviceDate)}
                      {type === 'inspection' && formatDate(event.inspectionDate)}
                      {type === 'refurbishment' && formatDate(event.refurbStartDate)}
                    </span>
                  </div>

                  {/* Event details */}
                  {type === 'ownership' && (
                    <div className="text-sm text-slate-700">
                      <p>📧 {event.ownerEmail}</p>
                      <p>📍 {event.location?.city}, {event.location?.state}</p>
                    </div>
                  )}

                  {type === 'service' && (
                    <div className="text-sm text-slate-700">
                      <p>Duration: {event.durationHours} hours</p>
                      <p>Cost: ₹{event.totalCost?.toLocaleString()}</p>
                      <p className="text-xs text-slate-600 mt-1">{event.description}</p>
                    </div>
                  )}

                  {type === 'inspection' && (
                    <div className="text-sm text-slate-700">
                      <p>Inspector: {event.inspectorName}</p>
                      <p>Health Score: {event.healthScore}/100</p>
                      <p>Status: {event.passedInspection ? '✅ Passed' : '❌ Failed'}</p>
                    </div>
                  )}

                  {type === 'refurbishment' && (
                    <div className="text-sm text-slate-700">
                      <p>Duration: {Math.floor((event.refurbEndDate?.seconds - event.refurbStartDate?.seconds) / 86400)} days</p>
                      <p>Investment: ₹{event.totalInvestment?.toLocaleString()}</p>
                      <p>Before: {event.beforeHealthScore}/100 → After: {event.afterHealthScore}/100</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PassportTimeline;
