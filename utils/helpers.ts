import dayjs from 'dayjs';

// Date helpers
export const formatDate = (date: string, format: string = 'DD/MM/YYYY'): string => {
  return dayjs(date).format(format);
};

export const isDateValid = (date: string): boolean => {
  return dayjs(date).isValid();
};

export const getDateRange = (startDate: string, endDate: string): string => {
  if (!startDate || !endDate) return '';
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

// Price helpers
export const formatPrice = (price: number | undefined, currency: string = '₺'): string => {
  if (price === undefined || price === null) return `${currency}0`;
  return `${currency}${price.toLocaleString()}`;
};

export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

// String helpers
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Array helpers
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const uniqueArray = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

// Storage helpers
export const storageKeys = {
  USER_TOKEN: 'user_token',
  USER_PREFERENCES: 'user_preferences',
  SEARCH_HISTORY: 'search_history',
  FAVORITE_HOTELS: 'favorite_hotels',
} as const;

// Error helpers
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
}; 