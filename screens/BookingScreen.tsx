import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Feather, Ionicons } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromActiveBookings } from '../store/slices/bookingSlice';
import { weekendHotels } from '../data/mockData';
import { COLORS, DIMENSIONS } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const BookingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { selectedHotel, destination, startDate, endDate, rooms, adults, children } = useAppSelector(state => state.booking);
  
  // Get the selected hotel from Redux state
  const selectedHotelData = weekendHotels.find(hotel => hotel.name === selectedHotel);
  
  // If no hotel is selected, show empty state
  if (!selectedHotelData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <Text style={styles.headerSubtitle}>No active bookings</Text>
        </View>
        
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={64} color={COLORS.text.light} />
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptySubtitle}>
            Start exploring hotels and make your first booking
          </Text>
          <Button
            title="Explore Hotels"
            onPress={() => (navigation as any).navigate('Booking.com', { screen: 'Home' })}
            style={styles.exploreButton}
          />
        </View>
      </View>
    );
  }

  const handleCancelBooking = () => {
    // Cancel booking logic
    console.log('Cancel booking for:', selectedHotelData.name);
    dispatch(removeFromActiveBookings(selectedHotelData.name));
    // Navigate back to Home after cancellation
    (navigation as any).navigate('Booking.com', { screen: 'Home' });
  };

  const handleModifyBooking = () => {
    // Modify booking logic - navigate to Home with booking data
    console.log('Modify booking for:', selectedHotelData.name);
    // Navigate to Home tab where form will be populated with current booking data
    (navigation as any).navigate('Booking.com', { screen: 'Home' });
  };

  // Calculate number of nights
  const calculateNights = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 2; // Default fallback
  };

  const nights = calculateNights();
  const roomRate = selectedHotelData.discountedPrice;
  const serviceFee = 50;
  const totalPrice = roomRate * nights + serviceFee;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>Active booking</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hotel Card */}
        <Card style={styles.hotelCard}>
          <View style={styles.hotelHeader}>
            <Text style={styles.hotelName}>{selectedHotelData.name}</Text>
            <View style={styles.bookingStatus}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          </View>
          
          <Text style={styles.hotelLocation}>{selectedHotelData.location}</Text>
          
          <View style={styles.hotelInfo}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {selectedHotelData.rating}</Text>
            </View>
            <Text style={styles.priceText}>{formatPrice(selectedHotelData.discountedPrice)}</Text>
          </View>

          {/* Hotel Image */}
          <Image source={{ uri: selectedHotelData.image }} style={styles.hotelImage} />
        </Card>

        {/* Booking Details */}
        <Card style={styles.bookingDetailsCard}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          
          <View style={styles.detailRow}>
            <Feather name="calendar" size={20} color={COLORS.primary} />
            <Text style={styles.detailLabel}>Check-in:</Text>
            <Text style={styles.detailValue}>{startDate || 'Not selected'}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Feather name="calendar" size={20} color={COLORS.primary} />
            <Text style={styles.detailLabel}>Check-out:</Text>
            <Text style={styles.detailValue}>{endDate || 'Not selected'}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={20} color={COLORS.primary} />
            <Text style={styles.detailLabel}>Guests:</Text>
            <Text style={styles.detailValue}>{rooms} Room, {adults} Adults, {children} Children</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Feather name="map-pin" size={20} color={COLORS.primary} />
            <Text style={styles.detailLabel}>Destination:</Text>
            <Text style={styles.detailValue}>{destination || selectedHotelData.location}</Text>
          </View>
        </Card>

        {/* Pricing Summary */}
        <Card style={styles.pricingCard}>
          <Text style={styles.sectionTitle}>Pricing Summary</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Room Rate (per night)</Text>
            <Text style={styles.priceValue}>{formatPrice(roomRate)}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Number of Nights</Text>
            <Text style={styles.priceValue}>{nights} {nights === 1 ? 'night' : 'nights'}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>{formatPrice(serviceFee)}</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Pay Now"
            onPress={() => navigation.navigate('Payment' as never)}
            style={styles.payButton}
            size="large"
          />
          <Button
            title="Modify Booking"
            onPress={handleModifyBooking}
            variant="outline"
            style={styles.modifyButton}
          />
          <Button
            title="Cancel Booking"
            onPress={handleCancelBooking}
            variant="outline"
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: DIMENSIONS.padding.medium,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  hotelCard: {
    margin: DIMENSIONS.padding.medium,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  bookingStatus: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hotelLocation: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
  },
  hotelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  hotelImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  bookingDetailsCard: {
    margin: DIMENSIONS.padding.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 8,
    marginRight: 8,
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
    flex: 1,
  },
  pricingCard: {
    margin: DIMENSIONS.padding.medium,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  priceValue: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 12,
    margin: DIMENSIONS.padding.medium,
  },
  payButton: {
    marginBottom: 0,
  },
  modifyButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.padding.large,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  exploreButton: {
    minWidth: 200,
  },
});

export default BookingScreen;