import { PassportStatus, TwinStatus, MarketplaceStatus, ValuationStatus, OperationalStatus, DocumentType } from '../types/passport.types';

export const PASSPORT_STATUSES = [
  { value: PassportStatus.VERIFIED, label: 'Verified', color: 'bg-green-100 text-green-800' },
  { value: PassportStatus.PENDING, label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: PassportStatus.UNVERIFIED, label: 'Unverified', color: 'bg-gray-100 text-gray-800' },
];

export const TWIN_STATUSES = [
  { value: TwinStatus.ACTIVE, label: 'Active', color: 'bg-blue-100 text-blue-800' },
  { value: TwinStatus.INACTIVE, label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
  { value: TwinStatus.ARCHIVED, label: 'Archived', color: 'bg-gray-200 text-gray-800' },
];

export const OPERATIONAL_STATUSES = [
  { value: OperationalStatus.RUNNING, label: 'Running', color: 'bg-green-100 text-green-800' },
  { value: OperationalStatus.IDLE, label: 'Idle', color: 'bg-gray-100 text-gray-800' },
  { value: OperationalStatus.MAINTENANCE, label: 'Maintenance', color: 'bg-orange-100 text-orange-800' },
  { value: OperationalStatus.REFURBISHMENT, label: 'Refurbishment', color: 'bg-purple-100 text-purple-800' },
];

export const DOCUMENT_TYPES = [
  DocumentType.INVOICE,
  DocumentType.CERTIFICATE,
  DocumentType.INSPECTION_REPORT,
  DocumentType.SERVICE_RECORD,
  DocumentType.MANUAL,
  DocumentType.WARRANTY,
  DocumentType.COMPLIANCE,
  DocumentType.OTHER,
];

export const CERTIFICATION_LEVELS = [
  { level: 'Gold', color: 'bg-yellow-100 text-yellow-800', minScore: 85 },
  { level: 'Silver', color: 'bg-gray-100 text-gray-800', minScore: 70 },
  { level: 'Bronze', color: 'bg-orange-100 text-orange-800', minScore: 50 },
];

export const MACHINE_CATEGORIES = [
  'Offset Press',
  'Digital Press',
  'Flexographic Press',
  'Screen Printing',
  'Letterpress',
  'Gravure Press',
  'Binding Machine',
  'Finishing Equipment',
  'Ink Printer',
  'Other',
];
