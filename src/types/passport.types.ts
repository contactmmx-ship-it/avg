// Machine Passport Type Definitions
import { Timestamp } from 'firebase/firestore';

// Enums
export enum PassportStatus {
  VERIFIED = 'Verified',
  PENDING = 'Pending',
  UNVERIFIED = 'Unverified',
}

export enum TwinStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  ARCHIVED = 'Archived',
}

export enum MarketplaceStatus {
  UNLISTED = 'Unlisted',
  PUBLISHED = 'Published',
  SOLD = 'Sold',
  ARCHIVED = 'Archived',
}

export enum ValuationStatus {
  NOT_CALCULATED = 'NotCalculated',
  CALCULATING = 'Calculating',
  READY = 'Ready',
  STALE = 'Stale',
}

export enum OperationalStatus {
  RUNNING = 'Running',
  IDLE = 'Idle',
  MAINTENANCE = 'Maintenance',
  REFURBISHMENT = 'Refurbishment',
}

export enum DocumentType {
  INVOICE = 'Invoice',
  CERTIFICATE = 'Certificate',
  INSPECTION_REPORT = 'Inspection Report',
  SERVICE_RECORD = 'Service Record',
  MANUAL = 'Manual',
  WARRANTY = 'Warranty',
  COMPLIANCE = 'Compliance',
  OTHER = 'Other',
}

// Master Machine Record
export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface MachineRecord {
  // Basic Identity
  machineId: string; // AVG-000001
  passportId: string; // PASS-AVG-000001
  manufacturer: string;
  model: string;
  serialNumber: string;
  yearOfManufacture: number;
  countryOfOrigin: string;
  machineCategory: string;

  // Key Scores (Denormalized)
  machineHealthScore: number; // 0-100
  valuationScore: number | null; // Phase 3
  marketplaceScore: number | null; // Phase 3

  // Status Flags
  passportStatus: PassportStatus;
  twinStatus: TwinStatus;
  marketplaceStatus: MarketplaceStatus;
  valuationStatus: ValuationStatus;

  // Identifiers
  qrIdentifier: string | null; // QR-AVG-000001, Phase 2.5
  twinId: string;
  marketplaceListingId: string | null;
  valuationRecordId: string | null;

  // Media
  machinePhotoUrl: string;
  photoStoragePath: string;

  // Metadata
  ownerEmail: string;
  ownerPhoneNumber: string;
  currentLocation: Location;
  operationalStatus: OperationalStatus;
  totalImpressionsCount: number;
  lastOperationalDate: Timestamp;

  // Timestamps & Audit
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  lastModifiedBy: string;
  dataVersion: number;
}

// Ownership History
export interface OwnershipRecord {
  id: string;
  machineId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  datePurchased: Timestamp;
  dateSold: Timestamp | null;
  purchasePrice: number | null;
  location: Location;
  reasonForTransfer: string | null;
  sequenceNumber: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Service History
export interface ServiceRecord {
  id: string;
  machineId: string;
  serviceDate: Timestamp;
  engineer: string;
  engineerEmail: string;
  serviceType: string; // "Preventive", "Corrective", "Emergency"
  description: string;
  partsReplaced: string[];
  laborCost: number;
  partsCost: number;
  totalCost: number;
  durationHours: number;
  nextServiceDate: Timestamp | null;
  certificateUrl: string | null;
  sequenceNumber: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Refurbishment History
export interface RefurbRecord {
  id: string;
  machineId: string;
  refurbStartDate: Timestamp;
  refurbEndDate: Timestamp;
  refurbPhase: string; // "Phase 1", "Phase 2", etc.
  description: string;
  majorComponentsReplaced: string[];
  beforeHealthScore: number;
  afterHealthScore: number;
  totalInvestment: number;
  vendorName: string;
  vendorEmail: string;
  completionCertificate: string | null;
  sequenceNumber: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Inspection History
export interface InspectionRecord {
  id: string;
  machineId: string;
  inspectionDate: Timestamp;
  inspectorName: string;
  inspectorEmail: string;
  certificationLevel: 'Gold' | 'Silver' | 'Bronze';
  healthScore: number;
  observations: string;
  passedInspection: boolean;
  reportUrl: string | null;
  photosUrls: string[];
  linkToTwinId: string;
  sequenceNumber: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Document Vault
export interface DocumentVaultFile {
  id: string;
  machineId: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: Timestamp;
  uploadedBy: string;
  signedUrl?: string; // Generated on-demand, 24h TTL
  description: string;
}

// Current Health (Denormalized from Twin)
export interface HealthSnapshot {
  mechanicalHealth: number;
  electricalHealth: number;
  cylinderHealth: number;
  printRegistration: number;
  safetyHealth: number;
  documentationHealth: number;
  lastUpdated: Timestamp;
  twinId: string;
}

// Timeline Event (unified view)
export interface TimelineEvent {
  id: string;
  type: 'ownership' | 'service' | 'refurbishment' | 'inspection';
  date: Timestamp;
  title: string;
  description: string;
  metadata: any;
  sortDate: number; // Timestamp in ms for sorting
}

// Passport Summary
export interface PassportSummary {
  machine: MachineRecord;
  currentHealth: HealthSnapshot;
  totalOwners: number;
  totalServiceRecords: number;
  totalRefurbishments: number;
  totalInspections: number;
  totalDocuments: number;
  certificationLevel: string;
  passportCompleteness: number; // 0-100%
}
