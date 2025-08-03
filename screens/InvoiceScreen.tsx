import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Share } from 'react-native';
import { Feather, Ionicons } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../store/hooks';
import { weekendHotels } from '../data/mockData';
import { COLORS, DIMENSIONS } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const InvoiceScreen = () => {
  const navigation = useNavigation();
  const { selectedHotel, destination, startDate, endDate, rooms, adults, children } = useAppSelector(state => state.booking);
  
  // Get the selected hotel from Redux state
  const selectedHotelData = weekendHotels.find(hotel => hotel.name === selectedHotel);
  
  // Generate invoice number
  const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
  const invoiceDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate total price
  const calculateNights = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 2;
  };

  const nights = calculateNights();
  const roomRate = selectedHotelData?.discountedPrice || 0;
  const serviceFee = 50;
  const totalPrice = roomRate * nights + serviceFee;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Invoice ${invoiceNumber} - ${selectedHotelData?.name}`,
        title: 'Hotel Booking Invoice'
      });
    } catch (error) {
      console.log('Error sharing invoice:', error);
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading PDF invoice...');
    // For now, just show an alert
    alert('PDF download would be implemented here');
  };

  if (!selectedHotelData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={COLORS.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Invoice</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.emptyState}>
          <Ionicons name="document-outline" size={64} color={COLORS.text.light} />
          <Text style={styles.emptyTitle}>No invoice available</Text>
          <Text style={styles.emptySubtitle}>
            Please complete a booking to view invoice
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Invoice</Text>
        <Pressable style={styles.shareButton} onPress={handleShare}>
          <Feather name="share-2" size={24} color={COLORS.primary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Invoice Header */}
        <Card style={styles.invoiceHeaderCard}>
          <View style={styles.invoiceHeader}>
            <View>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.invoiceNumber}>#{invoiceNumber}</Text>
              <Text style={styles.invoiceDate}>{invoiceDate}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>PAID</Text>
            </View>
          </View>
        </Card>

        {/* Hotel Information */}
        <Card style={styles.hotelCard}>
          <Text style={styles.sectionTitle}>Hotel Information</Text>
          
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>{selectedHotelData.name}</Text>
            <Text style={styles.hotelLocation}>{selectedHotelData.location}</Text>
            <Text style={styles.hotelRating}>★ {selectedHotelData.rating} Rating</Text>
          </View>
        </Card>

        {/* Booking Details */}
        <Card style={styles.bookingCard}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          
          <View style={styles.bookingDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-in Date:</Text>
              <Text style={styles.detailValue}>{startDate || 'Not selected'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-out Date:</Text>
              <Text style={styles.detailValue}>{endDate || 'Not selected'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Number of Nights:</Text>
              <Text style={styles.detailValue}>{nights} {nights === 1 ? 'night' : 'nights'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Rooms:</Text>
              <Text style={styles.detailValue}>{rooms} {rooms === 1 ? 'room' : 'rooms'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Adults:</Text>
              <Text style={styles.detailValue}>{adults} {adults === 1 ? 'adult' : 'adults'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Children:</Text>
              <Text style={styles.detailValue}>{children} {children === 1 ? 'child' : 'children'}</Text>
            </View>
          </View>
        </Card>

        {/* Invoice Items */}
        <Card style={styles.itemsCard}>
          <Text style={styles.sectionTitle}>Invoice Items</Text>
          
          <View style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>Room Rate (per night)</Text>
              <Text style={styles.itemDescription}>{nights} {nights === 1 ? 'night' : 'nights'} × {formatPrice(roomRate)}</Text>
            </View>
            <Text style={styles.itemPrice}>{formatPrice(roomRate * nights)}</Text>
          </View>
          
          <View style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>Service Fee</Text>
              <Text style={styles.itemDescription}>Booking service charge</Text>
            </View>
            <Text style={styles.itemPrice}>{formatPrice(serviceFee)}</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
          </View>
        </Card>

        {/* Payment Information */}
        <Card style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.paymentDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method:</Text>
              <Text style={styles.detailValue}>Credit Card</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Status:</Text>
              <Text style={styles.detailValue}>Paid</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Date:</Text>
              <Text style={styles.detailValue}>{invoiceDate}</Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Download PDF"
            onPress={handleDownload}
            variant="outline"
            style={styles.downloadButton}
            size="large"
          />
          <Button
            title="Back to Booking"
            onPress={() => (navigation as any).navigate('Booking.com', { screen: 'Booking' })}
            style={styles.backButton}
            size="large"
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DIMENSIONS.padding.medium,
    paddingTop: DIMENSIONS.padding.large,
    paddingBottom: DIMENSIONS.padding.medium,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: DIMENSIONS.fontSize.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  shareButton: {
    padding: 8,
  },
  invoiceHeaderCard: {
    margin: DIMENSIONS.padding.medium,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  statusContainer: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hotelCard: {
    margin: DIMENSIONS.padding.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  hotelInfo: {
    gap: 8,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  hotelLocation: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  hotelRating: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  bookingCard: {
    margin: DIMENSIONS.padding.medium,
  },
  bookingDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  itemsCard: {
    margin: DIMENSIONS.padding.medium,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
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
  paymentCard: {
    margin: DIMENSIONS.padding.medium,
  },
  paymentDetails: {
    gap: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    margin: DIMENSIONS.padding.medium,
    marginBottom: DIMENSIONS.padding.large,
  },
  downloadButton: {
    flex: 1,
  },
  backButton: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.padding.large,
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
  },
});

export default InvoiceScreen; 