// src/types/receipt.ts
export interface Receipt {
    id: string;
    date: Date;
    store: string;
    total: number;
    category: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    imageUrl?: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    paymentMethod: string;
    userId: string;
  }