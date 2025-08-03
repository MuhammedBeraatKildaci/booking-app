import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    Dimensions,
    Image,
} from 'react-native';
import { Feather, Ionicons } from 'expo-vector-icons';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';
import { weekendHotels } from '../data/mockData';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { 
    setSearchQuery, 
    setSelectedFilter, 
    setMinPrice, 
    setMaxPrice, 
    setSelectedRating, 
    setSelectedAmenities, 
    setShowAdvancedFilters, 
    setShowDateModal, 
    setStartDate, 
    setEndDate, 
    setDateText, 
    setRooms, 
    setAdults, 
    setChildren, 
    setShowRoomsModal,
    clearFilters,
    clearAll,
    setSelectedHotel
} from '../store/slices/bookingSlice';

const SearchScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    
    // Redux state
    const {
        searchQuery,
        selectedFilter,
        minPrice,
        maxPrice,
        selectedRating,
        selectedAmenities,
        showAdvancedFilters,
        showDateModal,
        startDate,
        endDate,
        dateText,
        rooms,
        adults,
        children,
        showRoomsModal
    } = useAppSelector(state => state.booking);

    const amenitiesList = [
        { id: 'wifi', name: 'WiFi', icon: 'wifi' },
        { id: 'parking', name: 'Parking', icon: 'car' },
        { id: 'breakfast', name: 'Breakfast', icon: 'restaurant' },
        { id: 'pool', name: 'Pool', icon: 'water' },
        { id: 'gym', name: 'Gym', icon: 'fitness' },
        { id: 'spa', name: 'Spa', icon: 'flower' },
        { id: 'bar', name: 'Bar', icon: 'wine' },
        { id: 'shuttle', name: 'Airport Shuttle', icon: 'airplane' },
    ];

    const toggleAmenity = (amenityId: string) => {
        if (selectedAmenities.includes(amenityId)) {
            dispatch(setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId)));
        } else {
            dispatch(setSelectedAmenities([...selectedAmenities, amenityId]));
        }
    };

    const handleDatePress = (day: { dateString: string }) => {
        if (!startDate || (startDate && endDate)) {
            dispatch(setStartDate(day.dateString));
            dispatch(setEndDate(''));
            dispatch(setDateText(dayjs(day.dateString).format('DD/MM/YYYY')));
        } else {
            const newEndDate = day.dateString;
            dispatch(setEndDate(newEndDate));
            dispatch(setDateText(`${dayjs(startDate).format('DD/MM/YYYY')} - ${dayjs(newEndDate).format('DD/MM/YYYY')}`));
        }
    };

    const getMarkedDates = () => {
        const marked: Record<string, any> = {};

        if (startDate) {
            marked[startDate] = {
                selected: true,
                startingDay: true,
                color: '#003580'
            };
        }

        if (endDate) {
            marked[endDate] = {
                selected: true,
                endingDay: true,
                color: '#003580'
            };
        }

        if (startDate && endDate) {
            const start = dayjs(startDate);
            const end = dayjs(endDate);
            let current = start.add(1, 'day');

            while (current.isBefore(end)) {
                const dateString = current.format('YYYY-MM-DD');
                marked[dateString] = {
                    selected: true,
                    color: '#003580'
                };
                current = current.add(1, 'day');
            }
        }

        return marked;
    };

    const filteredHotels = weekendHotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Price range filtering
        const matchesPrice = hotel.discountedPrice >= minPrice && hotel.discountedPrice <= maxPrice;
        
        // Rating filtering
        const matchesRating = selectedRating === 0 || Math.floor(hotel.rating) <= selectedRating;
        
        // Amenities filtering (temporarily disabled as hotel data doesn't have amenities)
        const matchesAmenities = selectedAmenities.length === 0;
        
        return matchesSearch && matchesPrice && matchesRating && matchesAmenities;
    }).sort((a, b) => {
        if (selectedFilter === 'lowToHigh') {
            return a.discountedPrice - b.discountedPrice;
        } else if (selectedFilter === 'highToLow') {
            return b.discountedPrice - a.discountedPrice;
        } else if (selectedFilter === 'rating') {
            return b.rating - a.rating;
        }
        return 0;
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#003580" />
                </Pressable>
                <Text style={styles.headerTitle}>Search Hotels</Text>
                <Pressable 
                    style={styles.filterButton}
                    onPress={() => dispatch(setShowAdvancedFilters(true))}
                >
                    <Feather name="filter" size={24} color="#003580" />
                </Pressable>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Feather name="search" size={20} color="#666" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search hotels, destinations..."
                        value={searchQuery}
                        onChangeText={(text) => dispatch(setSearchQuery(text))}
                        placeholderTextColor="#666"
                    />
                </View>
            </View>

            {/* Filters */}
            <View style={styles.filtersContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
                    <Pressable style={[styles.filterChip, styles.filterChipActive]}>
                        <Text style={[styles.filterChipText, styles.filterChipTextActive]}>All</Text>
                    </Pressable>
                    <Pressable style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Price: Low to High</Text>
                    </Pressable>
                    <Pressable style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Price: High to Low</Text>
                    </Pressable>
                    <Pressable style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Rating</Text>
                    </Pressable>
                    <Pressable style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Distance</Text>
                    </Pressable>
                    <Pressable style={styles.filterChip}>
                        <Text style={styles.filterChipText}>Free Cancellation</Text>
                    </Pressable>
                </ScrollView>
            </View>

            {/* Results */}
            <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.resultsCount}>{filteredHotels.length} hotels found</Text>
                
                {filteredHotels.map((hotel) => (
                    <View key={hotel.id} style={styles.hotelListItem}>
                        <Image source={{ uri: hotel.image }} style={styles.hotelListImage} />
                        
                        <View style={styles.hotelListInfo}>
                            <View style={styles.hotelListHeader}>
                                <Text style={styles.hotelListName}>{hotel.name}</Text>
                                <View style={styles.hotelRatingContainer}>
                                    <Text style={styles.hotelRatingText}>★ {hotel.rating}</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.hotelListLocation}>{hotel.location}</Text>
                            
                            <View style={styles.hotelListAmenities}>
                                <Text style={styles.hotelListAmenity}>WiFi</Text>
                                <Text style={styles.hotelListAmenity}>Parking</Text>
                                <Text style={styles.hotelListAmenity}>Breakfast</Text>
                            </View>
                            
                            <View style={styles.hotelListPriceContainer}>
                                <View>
                                    <Text style={styles.hotelListOriginalPrice}>₺{hotel.originalPrice}</Text>
                                    <Text style={styles.hotelListDiscountedPrice}>₺{hotel.discountedPrice}</Text>
                                    <Text style={styles.hotelListPerNight}>per night</Text>
                                </View>
                                
                                <Pressable 
                                    style={styles.hotelListBookButton}
                                    onPress={() => {
                                        dispatch(setSelectedHotel(hotel.name));
                                        navigation.navigate('Places' as never);
                                    }}
                                >
                                    <Text style={styles.hotelListBookButtonText}>Book</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Advanced Filters Modal */}
            <Modal
                isVisible={showAdvancedFilters}
                onBackdropPress={() => setShowAdvancedFilters(false)}
                style={styles.modal}
            >
                <View style={styles.advancedFiltersContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Advanced Filters</Text>
                        <Pressable onPress={() => setShowAdvancedFilters(false)}>
                            <Feather name="x" size={24} color="black" />
                        </Pressable>
                    </View>
                    
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Price Range */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Price Range</Text>
                            <View style={styles.priceRangeContainer}>
                                <View style={styles.priceInputRow}>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.priceInputLabel}>Min</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            value={minPrice.toString()}
                                            onChangeText={(text) => dispatch(setMinPrice(Number(text) || 0))}
                                            placeholder="0"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <Text style={styles.priceSeparator}>-</Text>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.priceInputLabel}>Max</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            value={maxPrice.toString()}
                                            onChangeText={(text) => dispatch(setMaxPrice(Number(text) || 5000))}
                                            placeholder="5000"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Rating */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Rating</Text>
                            <View style={styles.ratingContainer}>
                                <View style={styles.ratingStarsContainer}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Pressable 
                                            key={star}
                                            style={styles.ratingStarButton}
                                            onPress={() => dispatch(setSelectedRating(star))}
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
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Amenities</Text>
                            <View style={styles.amenitiesList}>
                                {amenitiesList.map((amenity) => (
                                    <Pressable 
                                        key={amenity.id}
                                        style={[styles.amenityItem, selectedAmenities.includes(amenity.id) && styles.amenityItemActive]}
                                        onPress={() => toggleAmenity(amenity.id)}
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

                    <View style={styles.filterActions}>
                        <Pressable 
                            style={styles.clearButton}
                            onPress={() => {
                                dispatch(clearFilters());
                                dispatch(setShowAdvancedFilters(false));
                            }}
                        >
                            <Text style={styles.clearButtonText}>Clear All</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.applyButton}
                            onPress={() => dispatch(setShowAdvancedFilters(false))}
                        >
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Date Selection Modal */}
            <Modal
                isVisible={showDateModal}
                onBackdropPress={() => setShowDateModal(false)}
                style={styles.modal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Dates</Text>
                        <Pressable onPress={() => setShowDateModal(false)}>
                            <Feather name="x" size={24} color="black" />
                        </Pressable>
                    </View>
                    
                    <Calendar
                        onDayPress={handleDatePress}
                        markedDates={getMarkedDates()}
                        markingType="period"
                        minDate={dayjs().format('YYYY-MM-DD')}
                        theme={{
                            selectedDayBackgroundColor: '#003580',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#003580',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            arrowColor: '#003580',
                            monthTextColor: '#2d4150',
                            indicatorColor: '#003580',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 13,
                        }}
                    />
                    
                    <Pressable 
                        style={styles.confirmButton}
                        onPress={() => setShowDateModal(false)}
                    >
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        paddingTop: Dimensions.get('window').height * 0.05,
        paddingBottom: Dimensions.get('window').height * 0.02,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: Dimensions.get('window').width * 0.05,
        fontWeight: 'bold',
        color: '#003580',
    },
    filterButton: {
        padding: 8,
    },
    searchContainer: {
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        paddingVertical: Dimensions.get('window').height * 0.02,
        backgroundColor: '#fff',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 25,
        paddingHorizontal: Dimensions.get('window').width * 0.04,
        paddingVertical: Dimensions.get('window').height * 0.008,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    searchInput: {
        flex: 1,
        marginLeft: Dimensions.get('window').width * 0.02,
        fontSize: Dimensions.get('window').width * 0.04,
        color: '#333',
    },
    filtersContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        height: Dimensions.get('window').height * 0.06,
    },
    filtersScrollContent: {
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        paddingVertical: 8,
    },
    filterChip: {
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').height * 0.04,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    filterChipText: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
    },
    filterChipActive: {
        backgroundColor: '#003580',
        borderColor: '#003580',
    },
    filterChipTextActive: {
        color: '#fff',
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: Dimensions.get('window').width * 0.05,
    },
    resultsCount: {
        fontSize: Dimensions.get('window').width * 0.04,
        color: '#666',
        marginVertical: Dimensions.get('window').height * 0.02,
        fontWeight: '500',
    },
    hotelListItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: Dimensions.get('window').height * 0.015,
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
        height: Dimensions.get('window').height * 0.16,
    },
    hotelListImage: {
        width: Dimensions.get('window').width * 0.25,
        height: '100%',
    },
    hotelListInfo: {
        flex: 1,
        padding: Dimensions.get('window').width * 0.03,
        justifyContent: 'space-between',
    },
    hotelListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    hotelListName: {
        fontSize: Dimensions.get('window').width * 0.04,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    hotelRatingContainer: {
        backgroundColor: '#003580',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    hotelRatingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
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
    hotelListLocation: {
        fontSize: Dimensions.get('window').width * 0.03,
        color: '#666',
        marginBottom: 4,
    },
    hotelListAmenities: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    hotelListAmenity: {
        fontSize: Dimensions.get('window').width * 0.025,
        color: '#003580',
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        marginRight: 6,
    },
    hotelListPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    hotelListOriginalPrice: {
        fontSize: Dimensions.get('window').width * 0.03,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    hotelListDiscountedPrice: {
        fontSize: Dimensions.get('window').width * 0.04,
        fontWeight: 'bold',
        color: '#003580',
    },
    hotelListPerNight: {
        fontSize: Dimensions.get('window').width * 0.025,
        color: '#666',
    },
    hotelListBookButton: {
        backgroundColor: '#003580',
        paddingHorizontal: Dimensions.get('window').width * 0.03,
        paddingVertical: Dimensions.get('window').height * 0.01,
        borderRadius: 6,
    },
    hotelListBookButtonText: {
        color: '#fff',
        fontSize: Dimensions.get('window').width * 0.03,
        fontWeight: 'bold',
    },
    hotelLocation: {
        fontSize: Dimensions.get('window').width * 0.035,
        color: '#666',
        marginBottom: Dimensions.get('window').height * 0.015,
    },
    amenitiesContainer: {
        flexDirection: 'row',
        marginBottom: Dimensions.get('window').height * 0.015,
    },
    amenity: {
        fontSize: Dimensions.get('window').width * 0.03,
        color: '#003580',
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    originalPrice: {
        fontSize: Dimensions.get('window').width * 0.035,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    discountedPrice: {
        fontSize: Dimensions.get('window').width * 0.05,
        fontWeight: 'bold',
        color: '#003580',
    },
    perNight: {
        fontSize: Dimensions.get('window').width * 0.03,
        color: '#666',
    },
    bookButton: {
        backgroundColor: '#003580',
        paddingHorizontal: Dimensions.get('window').width * 0.04,
        paddingVertical: Dimensions.get('window').height * 0.015,
        borderRadius: 8,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: Dimensions.get('window').width * 0.035,
        fontWeight: 'bold',
    },
    modal: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    confirmButton: {
        backgroundColor: '#003580',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    advancedFiltersContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    filterSection: {
        marginBottom: 20,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    priceRangeContainer: {
        marginBottom: 15,
    },
    priceInputRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    priceInputContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 6,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    priceInputLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        marginBottom: 3,
    },
    priceInput: {
        paddingVertical: 8,
        fontSize: 14,
        color: '#333',
    },
    priceSeparator: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginHorizontal: 8,
        alignSelf: 'center',
    },
    priceRangeTrack: {
        height: 3,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        marginVertical: 12,
        position: 'relative',
    },
    priceRangeProgress: {
        position: 'absolute',
        height: 3,
        backgroundColor: '#003580',
        borderRadius: 2,
        width: '50%',
    },
    priceRangeThumb: {
        position: 'absolute',
        width: 16,
        height: 16,
        backgroundColor: '#003580',
        borderRadius: 8,
        top: -6.5,
        transform: [{ translateX: -8 }],
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
    raitingText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
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
    filterActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 15,
    },
    clearButton: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    clearButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    applyButton: {
        flex: 1,
        backgroundColor: '#003580',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});