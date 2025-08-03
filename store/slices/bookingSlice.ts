import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  selectedHotel: string;
  destination: string;
  startDate: string;
  endDate: string;
  dateText: string;
  rooms: number;
  adults: number;
  children: number;
  searchQuery: string;
  selectedFilter: string;
  minPrice: number;
  maxPrice: number;
  selectedRating: number;
  selectedAmenities: string[];
  showAdvancedFilters: boolean;
  showDateModal: boolean;
  showRoomsModal: boolean;
  savedHotels: string[]; // Array of hotel names that are saved
  activeBookings: string[]; // Array of hotel names that are booked
  // Authentication
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  } | null;
}

const initialState: BookingState = {
  selectedHotel: '',
  destination: '',
  startDate: '',
  endDate: '',
  dateText: '',
  rooms: 1,
  adults: 2,
  children: 0,
  searchQuery: '',
  selectedFilter: 'all',
  minPrice: 0,
  maxPrice: 5000,
  selectedRating: 0,
  selectedAmenities: [],
  showAdvancedFilters: false,
  showDateModal: false,
  showRoomsModal: false,
  savedHotels: [], // Empty array initially
  activeBookings: [], // Empty array initially
  // Authentication
  isAuthenticated: false,
  user: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedHotel: (state, action: PayloadAction<string>) => {
      state.selectedHotel = action.payload;
      state.destination = action.payload;
    },
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setDateText: (state, action: PayloadAction<string>) => {
      state.dateText = action.payload;
    },
    setRooms: (state, action: PayloadAction<number>) => {
      state.rooms = action.payload;
    },
    setAdults: (state, action: PayloadAction<number>) => {
      state.adults = action.payload;
    },
    setChildren: (state, action: PayloadAction<number>) => {
      state.children = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedFilter: (state, action: PayloadAction<string>) => {
      state.selectedFilter = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setSelectedRating: (state, action: PayloadAction<number>) => {
      state.selectedRating = action.payload;
    },
    setSelectedAmenities: (state, action: PayloadAction<string[]>) => {
      state.selectedAmenities = action.payload;
    },
    setShowAdvancedFilters: (state, action: PayloadAction<boolean>) => {
      state.showAdvancedFilters = action.payload;
    },
    setShowDateModal: (state, action: PayloadAction<boolean>) => {
      state.showDateModal = action.payload;
    },
    setShowRoomsModal: (state, action: PayloadAction<boolean>) => {
      state.showRoomsModal = action.payload;
    },
    addToSavedHotels: (state, action: PayloadAction<string>) => {
      if (!state.savedHotels.includes(action.payload)) {
        state.savedHotels.push(action.payload);
      }
    },
    removeFromSavedHotels: (state, action: PayloadAction<string>) => {
      state.savedHotels = state.savedHotels.filter(hotel => hotel !== action.payload);
    },
    addToActiveBookings: (state, action: PayloadAction<string>) => {
      if (!state.activeBookings.includes(action.payload)) {
        state.activeBookings.push(action.payload);
      }
    },
    removeFromActiveBookings: (state, action: PayloadAction<string>) => {
      state.activeBookings = state.activeBookings.filter(hotel => hotel !== action.payload);
    },
    login: (state, action: PayloadAction<{ id: string; name: string; email: string; phone: string; avatar?: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<{ name?: string; email?: string; phone?: string; avatar?: string }>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearFilters: (state) => {
      state.selectedFilter = 'all';
      state.minPrice = 0;
      state.maxPrice = 5000;
      state.selectedRating = 0;
      state.selectedAmenities = [];
    },
    clearAll: (state) => {
      state.selectedHotel = '';
      state.destination = '';
      state.startDate = '';
      state.endDate = '';
      state.dateText = '';
      state.rooms = 1;
      state.adults = 2;
      state.children = 0;
      state.searchQuery = '';
      state.selectedFilter = 'all';
      state.minPrice = 0;
      state.maxPrice = 5000;
      state.selectedRating = 0;
      state.selectedAmenities = [];
      state.showAdvancedFilters = false;
      state.showDateModal = false;
      state.showRoomsModal = false;
    },
  },
});

export const {
  setSelectedHotel,
  setDestination,
  setStartDate,
  setEndDate,
  setDateText,
  setRooms,
  setAdults,
  setChildren,
  setSearchQuery,
  setSelectedFilter,
  setMinPrice,
  setMaxPrice,
  setSelectedRating,
  setSelectedAmenities,
  setShowAdvancedFilters,
  setShowDateModal,
  setShowRoomsModal,
  addToSavedHotels,
  removeFromSavedHotels,
  addToActiveBookings,
  removeFromActiveBookings,
  login,
  logout,
  updateProfile,
  clearFilters,
  clearAll,
} = bookingSlice.actions;

export default bookingSlice.reducer; 