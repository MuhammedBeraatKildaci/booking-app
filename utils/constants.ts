import { Dimensions } from "react-native";

// Colors
export const COLORS = {
  primary: '#003580',
  secondary: '#f8f9fa',
  text: {
    primary: '#333',
    secondary: '#666',
    light: '#999',
    white: '#fff',
  },
  border: '#e0e0e0',
  error: '#ff4444',
  success: '#4CAF50',
  warning: '#FF9800',
  rating: '#FFD700',
} as const;

// Dimensions
export const DIMENSIONS = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  padding: {
    small: 8,
    medium: 16,
    large: 20,
  },
  borderRadius: {
    small: 6,
    medium: 8,
    large: 12,
  },
  fontSize: {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18,
  },
} as const;

// API
export const API = {
  baseUrl: 'https://api.booking.com',
  timeout: 10000,
} as const;

// Navigation
export const ROUTES = {
  HOME: 'Booking.com',
  SEARCH: 'Search',
  SAVED: 'Saved',
  PROFILE: 'Profile',
} as const;

// Filters
export const FILTERS = {
  ALL: 'all',
  LOW_TO_HIGH: 'lowToHigh',
  HIGH_TO_LOW: 'highToLow',
  RATING: 'rating',
  DISTANCE: 'distance',
  CANCELLATION: 'cancellation',
} as const;

// Amenities
export const AMENITIES = [
  { id: 'wifi', name: 'WiFi' },
  { id: 'parking', name: 'Parking' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'pool', name: 'Pool' },
  { id: 'gym', name: 'Gym' },
  { id: 'spa', name: 'Spa' },
  { id: 'bar', name: 'Bar' },
  { id: 'shuttle', name: 'Airport Shuttle' },
] as const; 