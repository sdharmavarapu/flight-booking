export interface Flight {
  id: number;
  airline: string;
  number: string;
  price: number;
  duration: number;
  departure: string;
}

export type TimeSlot = | 'morning' | 'afternoon' | 'evening' | 'night';