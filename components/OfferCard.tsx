import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';

interface Offer {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface OfferCardProps {
    offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
    return (
        <View style={styles.offerCard}>
            <View style={styles.offerContent}>
                <View style={styles.offerBadge}>
                    <Text style={styles.offerBadgeText}>SPECIAL OFFER</Text>
                </View>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
                <Pressable style={styles.offerButton}>
                    <Text style={styles.offerButtonText}>Learn More</Text>
                </Pressable>
            </View>
            <Image 
                source={{ uri: offer.image }} 
                style={styles.offerImage}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    offerCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        marginRight: Dimensions.get("window").width * 0.04,
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get("window").height * 0.22,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    offerImage: {
        width: Dimensions.get("window").width * 0.3,
        height: '100%',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    offerContent: {
        padding: Dimensions.get("window").width * 0.04,
        flex: 1,
        justifyContent: 'center',
    },
    offerBadge: {
        backgroundColor: '#ffc72c',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    offerBadgeText: {
        color: '#003580',
        fontSize: 11,
        fontWeight: 'bold',
    },
    offerTitle: {
        fontSize: Dimensions.get("window").width * 0.045,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: Dimensions.get("window").height * 0.012,
    },
    offerDescription: {
        fontSize: Dimensions.get("window").width * 0.035,
        color: '#666',
        marginBottom: Dimensions.get("window").height * 0.018,
        lineHeight: Dimensions.get("window").width * 0.045,
    },
    offerButton: {
        backgroundColor: '#ffc72c',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    offerButtonText: {
        color: '#003580',
        fontSize: 13,
        fontWeight: 'bold',
    },
});

export default OfferCard; 