import { collection, addDoc, updateDoc, doc, getDoc, Timestamp, DocumentReference } from 'firebase/firestore';
import { db } from '../firebase';
import { MachineRecord, OwnershipRecord, ServiceRecord, RefurbRecord, InspectionRecord, DocumentVaultFile } from '../types/passport.types';
import { v4 as uuidv4 } from 'uuid';

// Create new machine
export const createMachine = async (data: Omit<MachineRecord, 'createdAt' | 'updatedAt' | 'dataVersion'>): Promise<string> => {
  try {
    const machineRef = await addDoc(collection(db, 'machines'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      dataVersion: 1,
    });
    return machineRef.id;
  } catch (error) {
    console.error('Error creating machine:', error);
    throw error;
  }
};

// Get machine by ID
export const getMachine = async (machineId: string): Promise<MachineRecord | null> => {
  try {
    const docRef = doc(db, 'machines', machineId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as MachineRecord) : null;
  } catch (error) {
    console.error('Error getting machine:', error);
    throw error;
  }
};

// Update machine
export const updateMachine = async (machineId: string, data: Partial<MachineRecord>): Promise<void> => {
  try {
    const docRef = doc(db, 'machines', machineId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating machine:', error);
    throw error;
  }
};

// Create ownership record
export const createOwnershipRecord = async (
  machineId: string,
  data: Omit<OwnershipRecord, 'id' | 'machineId' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
  try {
    await addDoc(collection(db, `machines/${machineId}/passport/ownership_history`), {
      ...data,
      machineId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error creating ownership record:', error);
    throw error;
  }
};

// Create service record
export const createServiceRecord = async (
  machineId: string,
  data: Omit<ServiceRecord, 'id' | 'machineId' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
  try {
    await addDoc(collection(db, `machines/${machineId}/passport/service_history`), {
      ...data,
      machineId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error creating service record:', error);
    throw error;
  }
};

// Create refurbishment record
export const createRefurbRecord = async (
  machineId: string,
  data: Omit<RefurbRecord, 'id' | 'machineId' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
  try {
    await addDoc(collection(db, `machines/${machineId}/passport/refurbishment_history`), {
      ...data,
      machineId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error creating refurb record:', error);
    throw error;
  }
};

// Create inspection record
export const createInspectionRecord = async (
  machineId: string,
  data: Omit<InspectionRecord, 'id' | 'machineId' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
  try {
    await addDoc(collection(db, `machines/${machineId}/passport/inspection_history`), {
      ...data,
      machineId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error creating inspection record:', error);
    throw error;
  }
};

// Add document to vault
export const addDocumentToVault = async (
  machineId: string,
  data: Omit<DocumentVaultFile, 'id' | 'machineId' | 'uploadedAt'>
): Promise<void> => {
  try {
    await addDoc(collection(db, `machines/${machineId}/passport/documents`), {
      ...data,
      machineId,
      uploadedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Update machine health score
export const updateMachineHealthScore = async (machineId: string, healthScore: number): Promise<void> => {
  try {
    const docRef = doc(db, 'machines', machineId);
    await updateDoc(docRef, {
      machineHealthScore: healthScore,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating health score:', error);
    throw error;
  }
};
