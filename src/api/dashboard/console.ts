import { Alova } from '@/utils/http/alova/index';

export interface TypeVisits {
  dayVisits: number;
  rise: number;
  decline: number;
  amount: number;
}
export interface TypeSaleroom {
  weekSaleroom: number;
  amount: number;
  degree: number;
}

export interface TypeOrderLarge {
  weekLarge: number;
  rise: number;
  decline: number;
  amount: number;
}

export interface TypeConsole {
  visits: TypeVisits;
  // Sales volume
  saleroom: TypeSaleroom;
  // Order quantity
  orderLarge: TypeOrderLarge;
  // Transaction volume
  volume: TypeOrderLarge;
}

// Get console information
export function getConsoleInfo() {
  return Alova.Get<TypeConsole>('/dashboard/console');
}
