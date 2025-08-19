export type TripType = 'one-way' | 'round-trip';

export interface FlightSearchData {
  departure_city: string;
  arrival_city: string;
  flight_type: string;
  price_range: string;
  departure_date: string;
  return_date?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabin_class: 'Economy' | 'Business' | 'First';
}


export interface FlightData {
  Airline: string;
  DepartureCity: string;
  ArrivalCity: string;
  DepartureTime: string;
  ArrivalTime: string;
  Duration: number;
  Stops: number;
  Stopover: string | null;
  CabinClass: 'Economy' | 'Business';
  Price: number;
  FlightType: string;
  Date: string;
  StopoverInfo: string;
}