import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface LoyaltyProgram {
    id: number;
    name: string;
    description: string;
    benefits: string[];
}

interface LoyaltyCardProps {
    program: LoyaltyProgram;
    index: number;
}

const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ program, index }) => {
    const isFirstCard = index === 0;

    return (
        <View style={[
            styles.loyaltyCard,
            isFirstCard ? styles.firstCard : styles.otherCard
        ]}>
            <View style={styles.loyaltyHeader}>
                <Text style={[
                    styles.loyaltyTitle,
                    isFirstCard ? styles.firstCardText : styles.otherCardText
                ]}>
                    {program.name}
                </Text>
                {isFirstCard && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>POPULAR</Text>
                    </View>
                )}
            </View>
            <Text style={[
                styles.loyaltyDescription,
                isFirstCard ? styles.firstCardText : styles.otherCardText
            ]}>
                {program.description}
            </Text>
            <View style={styles.benefitsContainer}>
                {program.benefits.map((benefit, benefitIndex) => (
                    <View key={benefitIndex} style={styles.benefitItem}>
                        <View style={[
                            styles.benefitDot,
                            isFirstCard ? styles.firstCardDot : styles.otherCardDot
                        ]} />
                        <Text style={[
                            styles.benefitText,
                            isFirstCard ? styles.firstCardText : styles.otherCardText
                        ]}>
                            {benefit}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loyaltyCard: {
        marginRight: Dimensions.get("window").width * 0.05,
        padding: Dimensions.get("window").width * 0.04,
        borderRadius: 15,
        width: Dimensions.get("window").width * 0.75,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    firstCard: {
        backgroundColor: '#003580',
    },
    otherCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    loyaltyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    loyaltyTitle: {
        fontSize: Dimensions.get("window").width * 0.04,
        fontWeight: 'bold',
        flex: 1,
    },
    firstCardText: {
        color: '#fff',
    },
    otherCardText: {
        color: '#333',
    },
    badge: {
        backgroundColor: '#ffc72c',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    badgeText: {
        color: '#003580',
        fontSize: Dimensions.get("window").width * 0.025,
        fontWeight: 'bold',
    },
    loyaltyDescription: {
        fontSize: Dimensions.get("window").width * 0.035,
        marginBottom: Dimensions.get("window").height * 0.02,
        lineHeight: Dimensions.get("window").width * 0.05,
    },
    benefitsContainer: {
        gap: 8,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    benefitDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    firstCardDot: {
        backgroundColor: '#ffc72c',
    },
    otherCardDot: {
        backgroundColor: '#003580',
    },
    benefitText: {
        fontSize: Dimensions.get("window").width * 0.03,
        flex: 1,
    },
});

export default LoyaltyCard; 