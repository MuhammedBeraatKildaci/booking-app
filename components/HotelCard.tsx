import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';

interface Hotel {
    id: number;
    name: string;
    rating: number;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    discount: number;
    validity: string;
    conditions: string;
    location: string;
}

interface HotelCardProps {
    hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
    return (
        <View style={styles.hotelCard}>
            <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
            
            <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{hotel.discount}%</Text>
            </View>
            
            <View style={styles.hotelInfo}>
                <View style={styles.hotelHeader}>
                    <Text style={styles.hotelName}>{hotel.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>★ {hotel.rating}</Text>
                    </View>
                </View>
                
                <Text style={styles.hotelLocation}>{hotel.location}</Text>
                
                <View style={styles.validityContainer}>
                    <Text style={styles.validityText}>Valid: {hotel.validity}</Text>
                </View>
                
                <Text style={styles.conditionsText}>{hotel.conditions}</Text>
                
                <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>₺{hotel.originalPrice}</Text>
                    <Text style={styles.discountedPrice}>₺{hotel.discountedPrice}</Text>
                    <Text style={styles.perNightText}>per night</Text>
                </View>
                
                <Pressable style={styles.bookNowButton}>
                    <Text style={styles.bookNowText}>Book Now</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    hotelCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginRight: Dimensions.get("window").width * 0.04,
        width: Dimensions.get("window").width * 0.8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    hotelImage: {
        width: '100%',
        height: Dimensions.get("window").height * 0.2,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    discountBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ff4757',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    discountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    hotelInfo: {
        padding: Dimensions.get("window").width * 0.04,
    },
    hotelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    hotelName: {
        fontSize: Dimensions.get("window").width * 0.04,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    ratingContainer: {
        backgroundColor: '#003580',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    hotelLocation: {
        fontSize: Dimensions.get("window").width * 0.035,
        color: '#666',
        marginBottom: Dimensions.get("window").height * 0.01,
    },
    validityContainer: {
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    validityText: {
        fontSize: 12,
        color: '#003580',
        fontWeight: '600',
    },
    conditionsText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 12,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    originalPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    discountedPrice: {
        fontSize: Dimensions.get("window").width * 0.045,
        fontWeight: 'bold',
        color: '#003580',
    },
    perNightText: {
        fontSize: 12,
        color: '#666',
    },
    bookNowButton: {
        backgroundColor: '#003580',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    bookNowText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default HotelCard; 