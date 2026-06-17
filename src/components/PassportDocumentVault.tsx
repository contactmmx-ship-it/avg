import React, { useState } from 'react';
import { DocumentVaultFile } from '../types/passport.types';
import { FileText, Download, Eye, Grid, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PassportDocumentVaultProps {
  machineId: string;
  documents: DocumentVaultFile[];
}

const PassportDocumentVault: React.FC<PassportDocumentVaultProps> = ({ machineId, documents }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('All');

  const documentTypes = ['All', ...new Set(documents.map(d => d.documentType))];
  const filteredDocs = filterType === 'All' ? documents : documents.filter(d => d.documentType === filterType);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = (doc: DocumentVaultFile) => {
    if (doc.signedUrl) {
      window.open(doc.signedUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Document Vault</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {documentTypes.map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              filterType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Documents Display */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No documents found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <Badge variant="secondary" className="text-xs">{doc.documentType}</Badge>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">{doc.fileName}</h3>
              <p className="text-sm text-slate-600 mb-3">{formatFileSize(doc.fileSize)}</p>
              <p className="text-xs text-slate-500 mb-4">Uploaded {new Date(doc.uploadedAt.toDate()).toLocaleDateString()}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(doc)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-50 text-gray-600 px-3 py-2 rounded hover:bg-gray-100">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4 flex-1">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{doc.fileName}</p>
                  <p className="text-sm text-slate-600">{formatFileSize(doc.fileSize)}</p>
                </div>
              </div>
              <Badge variant="secondary" className="mx-4">{doc.documentType}</Badge>
              <button
                onClick={() => handleDownload(doc)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PassportDocumentVault;
