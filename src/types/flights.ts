export type TripType = 'one-way' | 'round-trip';

export interface FlightSearchData {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  travelClass: 'Economy' | 'Business' | 'First';
}
