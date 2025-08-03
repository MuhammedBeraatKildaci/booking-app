import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Hotel } from '../../data/mockData';

interface HotelListItemProps {
  hotel: Hotel;
  onBookPress: (hotelName: string) => void;
  style?: any;
}

const HotelListItem: React.FC<HotelListItemProps> = ({
  hotel,
  onBookPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: hotel.image }} style={styles.image} />
      
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{hotel.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {hotel.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.location}>{hotel.location}</Text>
        
        <View style={styles.amenities}>
          <Text style={styles.amenity}>WiFi</Text>
          <Text style={styles.amenity}>Parking</Text>
          <Text style={styles.amenity}>Breakfast</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.originalPrice}>₺{hotel.originalPrice}</Text>
            <Text style={styles.discountedPrice}>₺{hotel.discountedPrice}</Text>
            <Text style={styles.perNight}>per night</Text>
          </View>
          
          <Pressable 
            style={styles.bookButton}
            onPress={() => onBookPress(hotel.name)}
          >
            <Text style={styles.bookButtonText}>Book</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
  },
  image: {
    width: 100,
    height: '100%',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: '#003580',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amenities: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  amenity: {
    fontSize: 10,
    color: '#003580',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003580',
  },
  perNight: {
    fontSize: 10,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#003580',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HotelListItem; 