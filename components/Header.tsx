import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

interface HeaderProps {
    selectedService: string | null;
    setSelectedService: (service: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedService, setSelectedService }) => {
    type Service = {
        name: string;
        icon: keyof typeof Ionicons.glyphMap; // Ionicons için geçerli ikon isimlerini belirtir
    };
    const servies: Service[] = [
        { name: 'Stays', icon: 'bed-outline' },
        { name: 'Flights', icon: 'airplane-outline' },
        { name: 'Car Rental', icon: 'car-outline' },
        { name: 'Attractions', icon: 'location' },
    ];
    return (
        <View style={{
            height: Dimensions.get('window').height * 0.06,
            backgroundColor: '#003580',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd'
        }}>
            {servies.map((service, index) => (
                <Pressable key={index} onPress={() => setSelectedService(service.name)} // Tıklanan öğeyi state'e kaydet
                    style={[
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 5,
                        },
                        selectedService === service.name && { // Seçilen öğeye özel stil
                            borderColor: '#fff',
                            borderWidth: 2,
                            borderRadius: 20,
                        },
                    ]}>
                    <Ionicons name={service.icon} size={24} color="white" />
                    <Text style={{ color: 'white', fontSize: 12 }}>{service.name}</Text>
                </Pressable>
            ))}
        </View>
    )
}
export default Header

const styles = StyleSheet.create({})