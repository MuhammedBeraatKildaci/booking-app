import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { Feather, Ionicons } from 'expo-vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedHotel, addToSavedHotels, addToActiveBookings } from '../store/slices/bookingSlice';
import { weekendHotels } from '../data/mockData';
import { COLORS, DIMENSIONS } from '../utils/constants';
import { formatPrice, calculateDiscount } from '../utils/helpers';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const PlacesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { destination, startDate, endDate, rooms, adults, children } = useAppSelector(state => state.booking);
  const savedHotels = useAppSelector(state => state.booking.savedHotels);
  
  // Get hotel data based on destination
  const hotel = weekendHotels.find(h => 
    h.name.toLowerCase().includes(destination.toLowerCase()) ||
    h.location.toLowerCase().includes(destination.toLowerCase())
  ) || weekendHotels[0]; // Fallback to first hotel

  const discount = calculateDiscount(hotel.originalPrice, hotel.discountedPrice);
  const isFavorite = savedHotels.includes(hotel.name);

  const handleBookNow = () => {
    dispatch(setSelectedHotel(hotel.name));
    dispatch(addToActiveBookings(hotel.name));
    (navigation as any).navigate('Booking.com', { screen: 'Booking' });
  };

  const handleSaveToFavorites = () => {
    if (!isFavorite) {
      dispatch(addToSavedHotels(hotel.name));
      (navigation as any).navigate('Booking.com', { screen: 'Saved' });
    }
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share hotel:', hotel.name);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Hotel Details</Text>
        <Pressable style={styles.shareButton} onPress={handleShare}>
          <Feather name="share-2" size={24} color={COLORS.primary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: hotel.image }} style={styles.heroImage} />
          <View style={styles.overlay}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {hotel.rating}</Text>
            </View>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          </View>
        </View>

        {/* Hotel Info */}
        <Card style={styles.infoCard}>
          <View style={styles.hotelHeader}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <Pressable style={styles.favoriteButton} onPress={handleSaveToFavorites} disabled={isFavorite}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? COLORS.error : COLORS.primary} />
            </Pressable>
          </View>
          
          <Text style={styles.location}>
            <Feather name="map-pin" size={16} color={COLORS.text.secondary} />
            {' '}{hotel.location}
          </Text>

          <View style={styles.amenitiesContainer}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              <View style={styles.amenityItem}>
                <Feather name="wifi" size={20} color={COLORS.primary} />
                <Text style={styles.amenityText}>Free WiFi</Text>
              </View>
              <View style={styles.amenityItem}>
                <Feather name="car" size={20} color={COLORS.primary} />
                <Text style={styles.amenityText}>Free Parking</Text>
              </View>
              <View style={styles.amenityItem}>
                <Feather name="coffee" size={20} color={COLORS.primary} />
                <Text style={styles.amenityText}>Breakfast</Text>
              </View>
              <View style={styles.amenityItem}>
                <Feather name="droplet" size={20} color={COLORS.primary} />
                <Text style={styles.amenityText}>Pool</Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Experience luxury and comfort at {hotel.name}. Located in the heart of {hotel.location}, 
              this hotel offers world-class amenities and exceptional service. Perfect for both 
              business and leisure travelers.
            </Text>
          </View>

          <View style={styles.conditionsContainer}>
            <Text style={styles.sectionTitle}>Conditions</Text>
            <Text style={styles.conditions}>{hotel.conditions}</Text>
          </View>
        </Card>

        {/* Pricing Card */}
        <Card style={styles.pricingCard}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.priceContainer}>
            <View style={styles.priceInfo}>
              <Text style={styles.originalPrice}>{formatPrice(hotel.originalPrice)}</Text>
              <Text style={styles.discountedPrice}>{formatPrice(hotel.discountedPrice)}</Text>
              <Text style={styles.perNight}>per night</Text>
            </View>
            <View style={styles.validityContainer}>
              <Text style={styles.validityLabel}>Valid for:</Text>
              <Text style={styles.validityText}>{hotel.validity}</Text>
            </View>
          </View>
        </Card>

        {/* Search Details */}
        <Card style={styles.searchDetailsCard}>
          <Text style={styles.sectionTitle}>Search Details</Text>
          <View style={styles.searchDetails}>
            <View style={styles.detailItem}>
              <Feather name="map-pin" size={16} color={COLORS.text.secondary} />
              <Text style={styles.detailText}>{destination || 'Destination'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Feather name="calendar" size={16} color={COLORS.text.secondary} />
              <Text style={styles.detailText}>
                {startDate && endDate ? `${startDate} - ${endDate}` : 'Select dates'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Feather name="users" size={16} color={COLORS.text.secondary} />
              <Text style={styles.detailText}>
                {rooms} room, {adults} adults, {children} children
              </Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Book Now"
            onPress={handleBookNow}
            style={styles.bookButton}
            size="large"
          />
          <Button
            title="Save to Favorites"
            onPress={handleSaveToFavorites}
            variant="outline"
            style={styles.saveButton}
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
  heroContainer: {
    position: 'relative',
    height: 250,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  ratingBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  discountBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoCard: {
    margin: DIMENSIONS.padding.medium,
    marginTop: -20,
    zIndex: 1,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
  },
  location: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  amenitiesContainer: {
    marginBottom: 20,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: '45%',
  },
  amenityText: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  conditionsContainer: {
    marginBottom: 0,
  },
  conditions: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  pricingCard: {
    margin: DIMENSIONS.padding.medium,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInfo: {
    flex: 1,
  },
  originalPrice: {
    fontSize: 16,
    color: COLORS.text.light,
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  perNight: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  validityContainer: {
    alignItems: 'flex-end',
  },
  validityLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  validityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  searchDetailsCard: {
    margin: DIMENSIONS.padding.medium,
  },
  searchDetails: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  actionButtons: {
    padding: DIMENSIONS.padding.medium,
    paddingVertical: DIMENSIONS.padding.large,
    gap: 12,
    marginBottom: 100, // Navigation tuşlarından uzak tutmak için
  },
  bookButton: {
    marginBottom: 0,
  },
  saveButton: {
    marginBottom: 0,
  },
});

export default PlacesScreen; 