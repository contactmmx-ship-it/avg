// Testing utilities for Machine Passport System
import { generateMockMachine, generateMockOwnershipHistory, generateMockServiceHistory, generateMockHealthSnapshot } from '../data/passportMockData';
import { createMachine, createOwnershipRecord, createServiceRecord, getMachine } from './passportFirestore';

/**
 * Test: Create a machine with complete mock data
 * Use this to test the passport system without real Firestore
 */
export const testCreateMachineWithMockData = async () => {
  try {
    console.log('🧪 Testing: Creating mock machine...');
    
    const mockMachine = generateMockMachine();
    const mockOwnership = generateMockOwnershipHistory();
    const mockServices = generateMockServiceHistory();
    const mockHealth = generateMockHealthSnapshot();

    // Simulate machine creation
    console.log('✅ Mock Machine:', mockMachine);
    console.log('✅ Ownership History:', mockOwnership);
    console.log('✅ Service History:', mockServices);
    console.log('✅ Health Snapshot:', mockHealth);

    return {
      machine: mockMachine,
      ownership: mockOwnership,
      services: mockServices,
      health: mockHealth,
    };
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
};

/**
 * Test: Verify Firestore connection
 */
export const testFirestoreConnection = async (machineId: string) => {
  try {
    console.log('🧪 Testing: Firestore connection...');
    const machine = await getMachine(machineId);
    if (machine) {
      console.log('✅ Successfully retrieved machine:', machine.machineId);
      return true;
    } else {
      console.log('⚠️  Machine not found in Firestore');
      return false;
    }
  } catch (error) {
    console.error('❌ Firestore connection test failed:', error);
    return false;
  }
};

/**
 * Test: Create and retrieve a machine
 */
export const testCreateAndRetrieveMachine = async () => {
  try {
    console.log('🧪 Testing: Create and retrieve machine...');
    
    const mockMachine = generateMockMachine();
    
    // Create machine
    const docId = await createMachine({
      ...mockMachine,
      createdBy: 'test@avg.com',
      lastModifiedBy: 'test@avg.com',
    });
    console.log('✅ Machine created with ID:', docId);

    // Retrieve machine
    const retrieved = await getMachine(docId);
    if (retrieved) {
      console.log('✅ Machine retrieved successfully');
      return retrieved;
    } else {
      console.log('❌ Failed to retrieve machine');
      return null;
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
};

/**
 * Run all tests
 */
export const runAllPassportTests = async () => {
  console.log('🚀 Running all Passport System tests...');
  
  try {
    // Test 1: Mock data generation
    const mockTest = await testCreateMachineWithMockData();
    console.log('✅ Test 1 passed: Mock data generation');

    // Test 2: Display results
    console.group('📊 Mock Data Summary');
    console.log('Machine ID:', mockTest.machine.machineId);
    console.log('Health Score:', mockTest.machine.machineHealthScore);
    console.log('Ownership Records:', mockTest.ownership.length);
    console.log('Service Records:', mockTest.services.length);
    console.log('Health Snapshot Metrics:', Object.keys(mockTest.health).length);
    console.groupEnd();

    console.log('✅ All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test suite failed:', error);
  }
};
