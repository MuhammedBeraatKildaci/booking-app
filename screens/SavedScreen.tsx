import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Feather } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedHotel, removeFromSavedHotels } from '../store/slices/bookingSlice';
import { weekendHotels } from '../data/mockData';
import { COLORS, DIMENSIONS } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const SavedScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { destination, selectedHotel, savedHotels } = useAppSelector(state => state.booking);
  
  // Get saved hotels from Redux state or use mock data
  const savedHotelsData = weekendHotels.filter(hotel => savedHotels.includes(hotel.name));
  const displayHotels = savedHotelsData.length > 0 ? savedHotelsData : weekendHotels.slice(0, 3);

  const handleHotelPress = (hotelName: string) => {
    // Navigate to hotel details (PlacesScreen)
    console.log('Navigate to hotel:', hotelName);
    dispatch(setSelectedHotel(hotelName));
    navigation.navigate('Places' as never);
  };

  const handleBookHotel = (hotelName: string) => {
    dispatch(setSelectedHotel(hotelName));
    (navigation as any).navigate('Booking.com', { screen: 'Booking' });
  };

  const handleRemoveFromFavorites = (hotelName: string) => {
    // Remove from favorites logic
    console.log('Remove from favorites:', hotelName);
    dispatch(removeFromSavedHotels(hotelName));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Hotels</Text>
        <Text style={styles.headerSubtitle}>
          {displayHotels.length} hotels saved
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {displayHotels.map((hotel) => (
          <Card key={hotel.id} style={styles.hotelCard}>
            <View style={styles.hotelHeader}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <Pressable 
                style={styles.removeButton}
                onPress={() => handleRemoveFromFavorites(hotel.name)}
              >
                <Feather name="x" size={20} color={COLORS.error} />
              </Pressable>
            </View>
            
            <Text style={styles.hotelLocation}>{hotel.location}</Text>
            
            <View style={styles.hotelInfo}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>★ {hotel.rating}</Text>
              </View>
              <Text style={styles.priceText}>{formatPrice(hotel.discountedPrice)}</Text>
            </View>
            
            <View style={styles.actionButtons}>
              <Button
                title="View Details"
                onPress={() => handleHotelPress(hotel.name)}
                variant="outline"
                size="small"
                style={styles.viewButton}
              />
              <Button
                title="Book Now"
                onPress={() => handleBookHotel(hotel.name)}
                size="small"
                style={styles.bookButton}
              />
            </View>
          </Card>
        ))}
        
        {displayHotels.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="heart" size={64} color={COLORS.text.light} />
            <Text style={styles.emptyTitle}>No saved hotels yet</Text>
            <Text style={styles.emptySubtitle}>
              Start exploring hotels and save your favorites
            </Text>
            <Button
              title="Explore Hotels"
              onPress={() => navigation.navigate('Home' as never)}
              style={styles.exploreButton}
            />
          </View>
        )}
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
  removeButton: {
    padding: 8,
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
  },
  bookButton: {
    flex: 1,
    marginBottom: 0,
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

export default SavedScreen;