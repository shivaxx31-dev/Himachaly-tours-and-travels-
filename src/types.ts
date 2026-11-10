export interface BusRoute {
  id: string;
  sourceCity: string;
  destinationCity: string;
  duration: string;
  distance: string;
  startingFare: number;
  dailyFrequency: string;
  category: string;
  amenities: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface BusSchedule {
  id: string;
  routeId: string;
  busName: string;
  busType: 'Volvo AC 2+2' | 'BharatBenz AC Seater' | 'Luxury Sleeper 2+1' | 'Deluxe Non-AC';
  departureTime: string;
  arrivalTime: string;
  departurePlace: string;
  arrivalPlace: string;
  duration: string;
  fare: number;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  rating: number;
  reviewsCount: number;
}

export interface SeatInfo {
  number: string;
  type: 'seater' | 'sleeper';
  deck: 'lower' | 'upper';
  status: 'available' | 'booked' | 'selected' | 'ladies';
  price: number;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  destination: string;
  duration: string;
  days: number;
  nights: number;
  startingPrice: number;
  featured: boolean;
  imageUrl: string;
  gallery?: string[];
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  accommodationType: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  imageUrl: string;
  bestTimeToVisit: string;
  altitude: string;
  temperature: string;
  thingsToDo: string[];
  nearbyAttractions: string[];
  suggestedPackageId?: string;
  busRouteId?: string;
}

export interface Enquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  destination: string;
  travelDate: string;
  passengers: number;
  serviceRequired: string;
  message?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

export interface Booking {
  id: string;
  bookingType: 'bus' | 'package';
  busId?: string;
  routeTitle?: string;
  packageId?: string;
  packageTitle?: string;
  travelDate: string;
  selectedSeats: string;
  seatCount: number;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  boardingPoint: string;
  droppingPoint: string;
  totalFare: number;
  paymentStatus: 'pending_operator' | 'paid' | 'cash_on_board';
  bookingStatus: 'requested' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  city: string;
  route: string;
  rating: number;
  quote: string;
  date: string;
  avatar?: string;
}

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  bookingNotice: string;
}

export type PageType = 'home' | 'buses' | 'packages' | 'destinations' | 'about' | 'contact' | 'admin';
