import { useMemo } from 'react';
import { Hotel } from '../data/mockData';

interface UseHotelFiltersProps {
  hotels: Hotel[];
  searchQuery: string;
  selectedFilter: string;
  minPrice: number;
  maxPrice: number;
  selectedRating: number;
  selectedAmenities: string[];
}

export const useHotelFilters = ({
  hotels,
  searchQuery,
  selectedFilter,
  minPrice,
  maxPrice,
  selectedRating,
  selectedAmenities,
}: UseHotelFiltersProps) => {
  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        // Search filter
        const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            hotel.location.toLowerCase().includes(searchQuery.toLowerCase());

        // Price range filter
        const matchesPrice = hotel.discountedPrice >= minPrice && hotel.discountedPrice <= maxPrice;

        // Rating filter
        const matchesRating = selectedRating === 0 || Math.floor(hotel.rating) <= selectedRating;

        // Amenities filter (temporarily disabled as hotel data doesn't have amenities)
        const matchesAmenities = selectedAmenities.length === 0;

        return matchesSearch && matchesPrice && matchesRating && matchesAmenities;
      })
      .sort((a, b) => {
        switch (selectedFilter) {
          case 'lowToHigh':
            return a.discountedPrice - b.discountedPrice;
          case 'highToLow':
            return b.discountedPrice - a.discountedPrice;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [hotels, searchQuery, selectedFilter, minPrice, maxPrice, selectedRating, selectedAmenities]);

  return {
    filteredHotels,
    totalCount: filteredHotels.length,
  };
}; 