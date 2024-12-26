// src/hooks/useReceipts.ts
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  Timestamp,
  Query,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Receipt } from '../types/receipt';

interface ReceiptFilters {
  startDate: Date | null;
  endDate: Date | null;
  category: string;
  store: string;
  minAmount: string;
  maxAmount: string;
}

export const useReceipts = (filters: ReceiptFilters, searchQuery: string) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let q: Query<DocumentData> = collection(db, 'receipts');

        // Build query based on filters
        const constraints = [];

        if (filters.startDate) {
          constraints.push(where('date', '>=', Timestamp.fromDate(filters.startDate)));
        }

        if (filters.endDate) {
          constraints.push(where('date', '<=', Timestamp.fromDate(filters.endDate)));
        }

        if (filters.category) {
          constraints.push(where('category', '==', filters.category));
        }

        if (filters.store) {
          constraints.push(where('store', '==', filters.store));
        }

        if (filters.minAmount) {
          constraints.push(where('total', '>=', Number(filters.minAmount)));
        }

        if (filters.maxAmount) {
          constraints.push(where('total', '<=', Number(filters.maxAmount)));
        }

        // Add search query if present
        if (searchQuery) {
          // Note: This is a simple implementation. For better search,
          // consider using Algolia or similar search service
          constraints.push(where('searchableText', '>=', searchQuery.toLowerCase()));
          constraints.push(where('searchableText', '<=', searchQuery.toLowerCase() + '\uf8ff'));
        }

        // Apply all constraints to query
        q = query(q, ...constraints, orderBy('date', 'desc'), limit(100));

        const querySnapshot = await getDocs(q);
        const fetchedReceipts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Receipt[];

        setReceipts(fetchedReceipts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceipts();
  }, [filters, searchQuery]);

  return { receipts, isLoading, error };
};