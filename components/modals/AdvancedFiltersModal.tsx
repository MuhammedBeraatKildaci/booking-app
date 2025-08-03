import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from 'expo-vector-icons';
import Input from '../common/Input';
import Button from '../common/Button';

interface AdvancedFiltersModalProps {
  isVisible: boolean;
  onClose: () => void;
  minPrice: number;
  maxPrice: number;
  selectedRating: number;
  selectedAmenities: string[];
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onRatingChange: (rating: number) => void;
  onAmenityToggle: (amenityId: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const AdvancedFiltersModal: React.FC<AdvancedFiltersModalProps> = ({
  isVisible,
  onClose,
  minPrice,
  maxPrice,
  selectedRating,
  selectedAmenities,
  onMinPriceChange,
  onMaxPriceChange,
  onRatingChange,
  onAmenityToggle,
  onClearFilters,
  onApplyFilters,
}) => {
  const amenitiesList = [
    { id: 'wifi', name: 'WiFi' },
    { id: 'parking', name: 'Parking' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'pool', name: 'Pool' },
    { id: 'gym', name: 'Gym' },
    { id: 'spa', name: 'Spa' },
    { id: 'bar', name: 'Bar' },
    { id: 'shuttle', name: 'Airport Shuttle' },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Advanced Filters</Text>
          <Pressable onPress={onClose}>
            <Feather name="x" size={24} color="black" />
          </Pressable>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceInputRow}>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.priceInputLabel}>Min</Text>
                  <Input
                    value={minPrice.toString()}
                    onChangeText={(text) => onMinPriceChange(Number(text) || 0)}
                    placeholder="0"
                    keyboardType="numeric"
                    containerStyle={styles.priceInput}
                  />
                </View>
                <Text style={styles.priceSeparator}>-</Text>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.priceInputLabel}>Max</Text>
                  <Input
                    value={maxPrice.toString()}
                    onChangeText={(text) => onMaxPriceChange(Number(text) || 5000)}
                    placeholder="5000"
                    keyboardType="numeric"
                    containerStyle={styles.priceInput}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rating</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingStarsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable 
                    key={star}
                    style={styles.ratingStarButton}
                    onPress={() => onRatingChange(star)}
                  >
                    <Text 
                      style={[
                        styles.ratingStar, 
                        star <= selectedRating && styles.ratingStarFilled
                      ]}
                    >
                      ★
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.ratingText}>
                {selectedRating > 0 ? `${selectedRating}+ Stars` : 'Select rating'}
              </Text>
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesList}>
              {amenitiesList.map((amenity) => (
                <Pressable 
                  key={amenity.id}
                  style={[styles.amenityItem, selectedAmenities.includes(amenity.id) && styles.amenityItemActive]}
                  onPress={() => onAmenityToggle(amenity.id)}
                >
                  <View style={styles.amenityItemContent}>
                    <Text style={[styles.amenityItemText, selectedAmenities.includes(amenity.id) && styles.amenityItemTextActive]}>
                      {amenity.name}
                    </Text>
                  </View>
                  <View style={[styles.checkbox, selectedAmenities.includes(amenity.id) && styles.checkboxActive]}>
                    {selectedAmenities.includes(amenity.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <Button
            title="Clear All"
            onPress={onClearFilters}
            variant="secondary"
            style={styles.clearButton}
          />
          <Button
            title="Apply Filters"
            onPress={onApplyFilters}
            style={styles.applyButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  priceContainer: {
    marginBottom: 15,
  },
  priceInputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  priceInputContainer: {
    flex: 1,
  },
  priceInputLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 3,
  },
  priceInput: {
    marginBottom: 0,
  },
  priceSeparator: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  ratingContainer: {
    marginBottom: 10,
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  ratingStarButton: {
    padding: 8,
    marginHorizontal: 2,
  },
  ratingStar: {
    fontSize: 32,
    color: '#e0e0e0',
  },
  ratingStarFilled: {
    color: '#FFD700',
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  amenitiesList: {
    marginTop: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  amenityItemActive: {
    backgroundColor: '#003580',
    borderColor: '#003580',
  },
  amenityItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  amenityItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 12,
  },
  amenityItemTextActive: {
    color: '#fff',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#003580',
    borderColor: '#003580',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  clearButton: {
    flex: 1,
  },
  applyButton: {
    flex: 1,
  },
});

export default AdvancedFiltersModal; 