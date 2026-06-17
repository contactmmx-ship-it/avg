import { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { MachineRecord, OwnershipRecord, ServiceRecord, RefurbRecord, InspectionRecord, DocumentVaultFile, HealthSnapshot, PassportSummary } from '../types/passport.types';

export const usePassportData = (machineId: string) => {
  const [machine, setMachine] = useState<MachineRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const docRef = doc(db, 'machines', machineId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMachine(docSnap.data() as MachineRecord);
        } else {
          setError('Machine not found');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (machineId) fetchMachine();
  }, [machineId]);

  return { machine, loading, error };
};

export const useOwnershipHistory = (machineId: string) => {
  const [data, setData] = useState<OwnershipRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(
          collection(db, `machines/${machineId}/passport/ownership_history`),
          where('machineId', '==', machineId)
        );
        const snapshot = await getDocs(q);
        setData(snapshot.docs.map(doc => doc.data() as OwnershipRecord));
      } catch (err) {
        console.error('Error fetching ownership history:', err);
      } finally {
        setLoading(false);
      }
    };
    if (machineId) fetch();
  }, [machineId]);

  return { data, loading };
};

export const useServiceHistory = (machineId: string, limit = 25) => {
  const [data, setData] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(
          collection(db, `machines/${machineId}/passport/service_history`),
          where('machineId', '==', machineId)
        );
        const snapshot = await getDocs(q);
        const records = snapshot.docs
          .map(doc => doc.data() as ServiceRecord)
          .sort((a, b) => b.serviceDate.seconds - a.serviceDate.seconds)
          .slice(0, limit);
        setData(records);
        setHasMore(records.length >= limit);
      } catch (err) {
        console.error('Error fetching service history:', err);
      } finally {
        setLoading(false);
      }
    };
    if (machineId) fetch();
  }, [machineId, limit]);

  return { data, loading, hasMore };
};

export const useRefurbHistory = (machineId: string) => {
  const [data, setData] = useState<RefurbRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(
          collection(db, `machines/${machineId}/passport/refurbishment_history`),
          where('machineId', '==', machineId)
        );
        const snapshot = await getDocs(q);
        setData(snapshot.docs.map(doc => doc.data() as RefurbRecord));
      } catch (err) {
        console.error('Error fetching refurb history:', err);
      } finally {
        setLoading(false);
      }
    };
    if (machineId) fetch();
  }, [machineId]);

  return { data, loading };
};

export const useInspectionHistory = (machineId: string, limit = 15) => {
  const [data, setData] = useState<InspectionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(
          collection(db, `machines/${machineId}/passport/inspection_history`),
          where('machineId', '==', machineId)
        );
        const snapshot = await getDocs(q);
        const records = snapshot.docs
          .map(doc => doc.data() as InspectionRecord)
          .sort((a, b) => b.inspectionDate.seconds - a.inspectionDate.seconds)
          .slice(0, limit);
        setData(records);
      } catch (err) {
        console.error('Error fetching inspection history:', err);
      } finally {
        setLoading(false);
      }
    };
    if (machineId) fetch();
  }, [machineId, limit]);

  return { data, loading };
};

export const useDocuments = (machineId: string, limit = 10) => {
  const [data, setData] = useState<DocumentVaultFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(
          collection(db, `machines/${machineId}/passport/documents`),
          where('machineId', '==', machineId)
        );
        const snapshot = await getDocs(q);
        setData(snapshot.docs.map(doc => doc.data() as DocumentVaultFile).slice(0, limit));
      } catch (err) {
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };
    if (machineId) fetch();
  }, [machineId, limit]);

  return { data, loading };
};

export const useHealthIntegration = (machineId: string) => {
  const [health, setHealth] = useState<HealthSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const docRef = doc(db, `machines/${machineId}/passport/current_health`, 'latest');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHealth(docSnap.data() as HealthSnapshot);
        }
      } catch (err) {
        console.error('Error fetching health:', err);
      } finally {
        setLoading(false);
      }
    };
    if (machineId) fetch();
  }, [machineId]);

  return { health, loading };
};
