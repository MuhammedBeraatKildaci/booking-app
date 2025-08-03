import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { Feather, Ionicons } from 'expo-vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppSelector } from '../store/hooks';
import { weekendHotels } from '../data/mockData';
import { COLORS, DIMENSIONS } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedHotel, destination, startDate, endDate, rooms, adults, children } = useAppSelector(state => state.booking);
  
  // Get the selected hotel from Redux state
  const selectedHotelData = weekendHotels.find(hotel => hotel.name === selectedHotel);
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePayment = () => {
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all payment details');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Payment Successful!',
        'Your booking has been confirmed. Invoice will be generated.',
        [
          {
            text: 'View Invoice',
            onPress: () => navigation.navigate('Invoice' as never),
          },
          {
            text: 'OK',
            onPress: () => (navigation as any).navigate('Booking.com', { screen: 'Booking' }),
          }
        ]
      );
    }, 2000);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  if (!selectedHotelData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={COLORS.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.emptyState}>
          <Ionicons name="card-outline" size={64} color={COLORS.text.light} />
          <Text style={styles.emptyTitle}>No booking to pay for</Text>
          <Text style={styles.emptySubtitle}>
            Please select a hotel and make a booking first
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
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Booking Summary */}
        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>{selectedHotelData.name}</Text>
            <Text style={styles.hotelLocation}>{selectedHotelData.location}</Text>
          </View>

          <View style={styles.bookingDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-in:</Text>
              <Text style={styles.detailValue}>{startDate || 'Not selected'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-out:</Text>
              <Text style={styles.detailValue}>{endDate || 'Not selected'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Guests:</Text>
              <Text style={styles.detailValue}>{rooms} Room, {adults} Adults, {children} Children</Text>
            </View>
          </View>
        </Card>

        {/* Payment Summary */}
        <Card style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          
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

        {/* Payment Form */}
        <Card style={styles.paymentFormCard}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <View style={styles.inputWrapper}>
              <Feather name="credit-card" size={20} color={COLORS.text.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Card Holder Name</Text>
            <View style={styles.inputWrapper}>
              <Feather name="user" size={20} color={COLORS.text.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="John Doe"
                value={cardHolder}
                onChangeText={setCardHolder}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <View style={[styles.inputWrapper, {flex: 1,width: DIMENSIONS.width * 0.4}]}>
                <Feather name="calendar" size={20} color={COLORS.text.secondary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CVV</Text>
              <View style={[styles.inputWrapper, {flex: 1,width: DIMENSIONS.width * 0.4}]}>
                <Feather name="lock" size={20} color={COLORS.text.secondary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="123"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        </Card>

        {/* Payment Button */}
        <View style={styles.paymentButtonContainer}>
          <Button
            title={isProcessing ? "Processing..." : "Pay Now"}
            onPress={handlePayment}
            disabled={isProcessing}
            style={styles.paymentButton}
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
  summaryCard: {
    margin: DIMENSIONS.padding.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  hotelInfo: {
    marginBottom: 16,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  hotelLocation: {
    fontSize: 14,
    color: COLORS.text.secondary,
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
  paymentCard: {
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
  paymentFormCard: {
    margin: DIMENSIONS.padding.medium,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DIMENSIONS.width * 0.5,
    gap: 12,
  },
  paymentButtonContainer: {
    padding: DIMENSIONS.padding.medium,
    paddingBottom: DIMENSIONS.padding.large,
  },
  paymentButton: {
    marginBottom: 0,
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

export default PaymentScreen; 