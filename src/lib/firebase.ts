// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "receipt-manager-7c614.firebaseapp.com",
  databaseURL: "https://receipt-manager-7c614-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "receipt-manager-7c614",
  storageBucket: "receipt-manager-7c614.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-W71WSVYJVZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Types for Firestore
export interface User {
  id: string;
  email: string;
  displayName: string;
  preferences: {
    language: 'he' | 'en';
    currency: string;
    notifications: boolean;
  };
  metadata: {
    createdAt: Date;
    lastLogin: Date;
  };
}

export interface Receipt {
  id: string;
  userId: string;
  metadata: {
    uploadedAt: Date;
    processedAt: Date | null;
    status: 'pending' | 'processing' | 'completed' | 'error';
  };
  data: {
    store: string;
    date: Date;
    total: number;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    category: string;
    paymentMethod: string;
  };
  processing: {
    ocrConfidence: number;
    rawText: string;
    verificationStatus: boolean;
  };
}

export interface Category {
  id: string;
  name: {
    he: string;
    en: string;
  };
  type: 'system' | 'custom';
  userId?: string;
}