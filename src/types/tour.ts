export type TourLocation = {
  id: string;
  name: string;
};

export type Tour = {
  id: string;
  title: string;
  price: number;
  origin: TourLocation;
  destination: TourLocation;
  startDate: string;
  endDate: string;
  fleetVehicle?: string;
  availableSeats?: number;
  capacity?: number;
  insurance?: boolean;
  options?: string[];
  image?: string;
};

export type TourFilters = {
  originId?: string;
  destinationId?: string;
  startDate?: string;
  endDate?: string;
};
