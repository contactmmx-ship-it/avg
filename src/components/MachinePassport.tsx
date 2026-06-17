import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePassportData, useOwnershipHistory, useServiceHistory, useInspectionHistory, useDocuments, useHealthIntegration } from '../hooks/usePassportData';
import PassportCard from './PassportCard';
import PassportTimeline from './PassportTimeline';
import PassportDocumentVault from './PassportDocumentVault';
import PassportHealthSection from './PassportHealthSection';
import { AlertCircle, Loader } from 'lucide-react';

const MachinePassport: React.FC = () => {
  const { machineId } = useParams<{ machineId: string }>();
  const { machine, loading: machineLoading, error: machineError } = usePassportData(machineId!);
  const { data: ownership } = useOwnershipHistory(machineId!);
  const { data: services } = useServiceHistory(machineId!);
  const { data: inspections } = useInspectionHistory(machineId!);
  const { data: documents } = useDocuments(machineId!);
  const { health } = useHealthIntegration(machineId!);
  const [activeTab, setActiveTab] = useState('overview');

  if (machineLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (machineError || !machine) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{machineError || 'Machine not found'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Machine Passport: {machine.machineId}
          </h1>
          <p className="text-slate-600">{machine.manufacturer} {machine.model}</p>
        </div>

        {/* Overview Card */}
        <PassportCard machine={machine} health={health} />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-7 bg-white rounded-lg shadow">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="ownership">Ownership</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
            <TabsTrigger value="inspection">Inspection</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Machine Overview</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600">Manufacturer</p>
                  <p className="font-semibold">{machine.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Model</p>
                  <p className="font-semibold">{machine.model}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Serial Number</p>
                  <p className="font-semibold">{machine.serialNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Year of Manufacture</p>
                  <p className="font-semibold">{machine.yearOfManufacture}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Impressions</p>
                  <p className="font-semibold">{machine.totalImpressionsCount}M</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Operational Status</p>
                  <p className="font-semibold">{machine.operationalStatus}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="health" className="mt-6">
            <PassportHealthSection machineId={machineId!} health={health} />
          </TabsContent>

          <TabsContent value="ownership" className="mt-6">
            <PassportTimeline type="ownership" events={ownership} title="Ownership History" />
          </TabsContent>

          <TabsContent value="service" className="mt-6">
            <PassportTimeline type="service" events={services} title="Service History" />
          </TabsContent>

          <TabsContent value="inspection" className="mt-6">
            <PassportTimeline type="inspection" events={inspections} title="Inspection History" />
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <PassportTimeline type="combined" events={[...ownership, ...services, ...inspections]} title="Complete Machine Timeline" />
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <PassportDocumentVault machineId={machineId!} documents={documents} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MachinePassport;
