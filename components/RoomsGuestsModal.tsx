import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from 'expo-vector-icons';

interface RoomsGuestsModalProps {
    isVisible: boolean;
    onClose: () => void;
    rooms: number;
    adults: number;
    children: number;
    onRoomsChange: (rooms: number) => void;
    onAdultsChange: (adults: number) => void;
    onChildrenChange: (children: number) => void;
}

const RoomsGuestsModal: React.FC<RoomsGuestsModalProps> = ({
    isVisible,
    onClose,
    rooms,
    adults,
    children,
    onRoomsChange,
    onAdultsChange,
    onChildrenChange,
}) => {
    const handleIncrement = (type: 'rooms' | 'adults' | 'children') => {
        switch (type) {
            case 'rooms':
                if (rooms < 5) onRoomsChange(rooms + 1);
                break;
            case 'adults':
                if (adults < 10) onAdultsChange(adults + 1);
                break;
            case 'children':
                if (children < 8) onChildrenChange(children + 1);
                break;
        }
    };

    const handleDecrement = (type: 'rooms' | 'adults' | 'children') => {
        switch (type) {
            case 'rooms':
                if (rooms > 1) onRoomsChange(rooms - 1);
                break;
            case 'adults':
                if (adults > 1) onAdultsChange(adults - 1);
                break;
            case 'children':
                if (children > 0) onChildrenChange(children - 1);
                break;
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Rooms & Guests</Text>
                    <Pressable onPress={onClose}>
                        <Feather name="x" size={24} color="black" />
                    </Pressable>
                </View>

                <View style={styles.content}>
                    {/* Rooms */}
                    <View style={styles.row}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Rooms</Text>
                            <Text style={styles.subLabel}>How many rooms?</Text>
                        </View>
                        <View style={styles.counterContainer}>
                            <Pressable
                                style={[styles.counterButton, rooms <= 1 && styles.disabledButton]}
                                onPress={() => handleDecrement('rooms')}
                                disabled={rooms <= 1}
                            >
                                <Feather name="minus" size={20} color={rooms <= 1 ? "#ccc" : "#007AFF"} />
                            </Pressable>
                            <Text style={styles.counterText}>{rooms}</Text>
                            <Pressable
                                style={[styles.counterButton, rooms >= 5 && styles.disabledButton]}
                                onPress={() => handleIncrement('rooms')}
                                disabled={rooms >= 5}
                            >
                                <Feather name="plus" size={20} color={rooms >= 5 ? "#ccc" : "#007AFF"} />
                            </Pressable>
                        </View>
                    </View>

                    {/* Adults */}
                    <View style={styles.row}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Adults</Text>
                            <Text style={styles.subLabel}>Ages 13 or above</Text>
                        </View>
                        <View style={styles.counterContainer}>
                            <Pressable
                                style={[styles.counterButton, adults <= 1 && styles.disabledButton]}
                                onPress={() => handleDecrement('adults')}
                                disabled={adults <= 1}
                            >
                                <Feather name="minus" size={20} color={adults <= 1 ? "#ccc" : "#007AFF"} />
                            </Pressable>
                            <Text style={styles.counterText}>{adults}</Text>
                            <Pressable
                                style={[styles.counterButton, adults >= 10 && styles.disabledButton]}
                                onPress={() => handleIncrement('adults')}
                                disabled={adults >= 10}
                            >
                                <Feather name="plus" size={20} color={adults >= 10 ? "#ccc" : "#007AFF"} />
                            </Pressable>
                        </View>
                    </View>

                    {/* Children */}
                    <View style={styles.row}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Children</Text>
                            <Text style={styles.subLabel}>Ages 0 to 12</Text>
                        </View>
                        <View style={styles.counterContainer}>
                            <Pressable
                                style={[styles.counterButton, children <= 0 && styles.disabledButton]}
                                onPress={() => handleDecrement('children')}
                                disabled={children <= 0}
                            >
                                <Feather name="minus" size={20} color={children <= 0 ? "#ccc" : "#007AFF"} />
                            </Pressable>
                            <Text style={styles.counterText}>{children}</Text>
                            <Pressable
                                style={[styles.counterButton, children >= 8 && styles.disabledButton]}
                                onPress={() => handleIncrement('children')}
                                disabled={children >= 8}
                            >
                                <Feather name="plus" size={20} color={children >= 8 ? "#ccc" : "#007AFF"} />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <Pressable style={styles.confirmButton} onPress={onClose}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </Pressable>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    content: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    labelContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        marginBottom: 4,
    },
    subLabel: {
        fontSize: 14,
        color: '#666',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    counterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    disabledButton: {
        borderColor: '#ccc',
        backgroundColor: '#f8f8f8',
    },
    counterText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        minWidth: 30,
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: '#2a52be',
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
});

export default RoomsGuestsModal; 