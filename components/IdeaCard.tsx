import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

interface Idea {
    id: number;
    name: string;
    country: string;
    image: string;
    rating: number;
    price: string;
    description: string;
}

interface IdeaCardProps {
    idea: Idea;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
    return (
        <View style={styles.ideaCard}>
            <Image source={{ uri: idea.image }} style={styles.ideaImage} />
            
            <View style={styles.ideaOverlay}>
                <Text style={styles.ideaName}>{idea.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ideaCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginRight: Dimensions.get("window").width * 0.04,
        width: Dimensions.get("window").width * 0.75,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    ideaImage: {
        width: '100%',
        height: Dimensions.get("window").height * 0.25,
        borderRadius: 15,
    },
    ideaOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    ideaName: {
        fontSize: Dimensions.get("window").width * 0.035,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default IdeaCard; 