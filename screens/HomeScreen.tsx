import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { Feather } from "expo-vector-icons";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import RoomsGuestsModal from "../components/RoomsGuestsModal";
import LoyaltyCard from "../components/LoyaltyCard";
import HotelCard from "../components/HotelCard";
import OfferCard from "../components/OfferCard";
import IdeaCard from "../components/IdeaCard";
import { loyaltyProgram, weekendHotels, offers, ideas } from "../data/mockData";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setSelectedHotel, setDestination, setStartDate, setEndDate, setDateText, setRooms, setAdults, setChildren, setShowDateModal, setShowRoomsModal } from "../store/slices/bookingSlice";

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useAppDispatch();
    
    // Redux state
    const { 
        destination, 
        startDate, 
        endDate, 
        dateText, 
        rooms, 
        adults, 
        children, 
        showDateModal, 
        showRoomsModal,
        activeBookings
    } = useAppSelector(state => state.booking);

    const [selectedService, setSelectedService] = useState<string | null>("Stays");
    
    const today = dayjs().format("YYYY-MM-DD");

    // Check for navigation params and Redux state
    React.useEffect(() => {
        console.log('Route params:', route.params);
        if (route.params && (route.params as any).selectedHotel) {
            console.log('Setting destination from params:', (route.params as any).selectedHotel);
            dispatch(setSelectedHotel((route.params as any).selectedHotel));
        }
        
        // Check global state
        if ((global as any).selectedHotel) {
            console.log('Setting destination from global:', (global as any).selectedHotel);
            dispatch(setSelectedHotel((global as any).selectedHotel));
            (global as any).selectedHotel = null; // Clear after use
        }
    }, [route.params, dispatch]);

    // Load booking data into form when coming from Modify Booking
    React.useEffect(() => {
        // If we have a selectedHotel and it's in activeBookings, populate the form
        if (destination && activeBookings.includes(destination)) {
            // Form is already populated with booking data
            console.log('Form populated with booking data for:', destination);
        }
    }, [destination, activeBookings]);

    const onDayPress = (day: { dateString: string }) => {
        const isRangeComplete = startDate && endDate;
        const isFirstSelection = !startDate || isRangeComplete;
        const isSecondDateValid = day.dateString >= startDate;

        if (isFirstSelection) {
            dispatch(setStartDate(day.dateString));
            dispatch(setEndDate(""));
            dispatch(setDateText(dayjs(day.dateString).format("DD/MM/YYYY")));
            return;
        }

        if (isSecondDateValid) {
            dispatch(setEndDate(day.dateString));
            dispatch(setDateText(
                `${dayjs(startDate).format("DD/MM/YYYY")} - ${dayjs(
                    day.dateString
                ).format("DD/MM/YYYY")}`
            ));
            return;
        }

        dispatch(setStartDate(day.dateString));
        dispatch(setEndDate(""));
        dispatch(setDateText(dayjs(day.dateString).format("DD/MM/YYYY")));
    };

    const handleConfirm = () => {
        if (startDate && endDate) {
            dispatch(setShowDateModal(false));
        }
    };

    const handleUpdateBooking = () => {
        if (destination && startDate && endDate) {
            // Update the booking with new form data
            console.log('Updating booking for:', destination);
            // Navigate to Booking screen to show updated booking
            (navigation as any).navigate('Booking.com', { screen: 'Booking' });
        }
    };

    const getMarkedDates = () => {
        const marked: Record<string, any> = {};

        if (startDate) {
            marked[startDate] = {
                selected: true,
                startingDay: true,
                color: "#007AFF",
            };
        }

        if (endDate) {
            marked[endDate] = {
                selected: true,
                endingDay: true,
                color: "#007AFF",
            };
        }

        if (startDate && endDate) {
            const startDateObj = dayjs(startDate);
            const endDateObj = dayjs(endDate);
            let currentDate = startDateObj.add(1, "day");

            while (currentDate.isBefore(endDateObj)) {
                const dateString = currentDate.format("YYYY-MM-DD");
                marked[dateString] = {
                    selected: true,
                    color: "#007AFF",
                };
                currentDate = currentDate.add(1, "day");
            }
        }

        return marked;
    };

    return (
        <View>
            <Header selectedService={selectedService} setSelectedService={setSelectedService} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View id="otherTabs">
                    <View style={styles.formContainer}>
                        <Pressable style={styles.formTextInput}
                        onPress={() => navigation.navigate("Search" as never)}
                        >
                            <Feather name="search" size={24} color="black" />
                            <TextInput
                                placeholderTextColor={"#000"}
                                placeholder="Enter your Destination"
                                style={styles.textInput}
                                editable={false}
                                value={destination}
                            />
                        </Pressable>

                        <Pressable
                            style={[styles.formTextInput, { paddingVertical: 15 }]}
                            onPress={() => dispatch(setShowDateModal(true))}
                        >
                            <Feather name="calendar" size={24} color="black" />
                            <Text style={styles.dateText}>{dateText}</Text>
                        </Pressable>

                        <Modal
                            isVisible={showDateModal}
                            onBackdropPress={() => dispatch(setShowDateModal(false))}
                            style={{
                                margin: 0,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Select Dates</Text>
                                    <Pressable onPress={() => dispatch(setShowDateModal(false))}>
                                        <Feather name="x" size={24} color="black" />
                                    </Pressable>
                                </View>

                                <Calendar
                                    onDayPress={onDayPress}
                                    markedDates={getMarkedDates()}
                                    markingType={"period"}
                                    minDate={dayjs().format("YYYY-MM-DD")}
                                    theme={{
                                        selectedDayBackgroundColor: "#007AFF",
                                        selectedDayTextColor: "#ffffff",
                                        todayTextColor: "#007AFF",
                                        dayTextColor: "#2d4150",
                                        textDisabledColor: "#d9e1e8",
                                        arrowColor: "#007AFF",
                                        monthTextColor: "#2d4150",
                                        indicatorColor: "#007AFF",
                                        textDayFontWeight: "300",
                                        textMonthFontWeight: "bold",
                                        textDayHeaderFontWeight: "300",
                                        textDayFontSize: 16,
                                        textMonthFontSize: 16,
                                        textDayHeaderFontSize: 13,
                                    }}
                                />

                                <Pressable
                                    style={[
                                        styles.confirmButton,
                                        !startDate || !endDate ? styles.disabledButton : null,
                                    ]}
                                    onPress={handleConfirm}
                                    disabled={!startDate || !endDate}
                                >
                                    <Text style={styles.confirmButtonText}>
                                        {startDate && endDate ? "Confirm" : "Select Both Dates"}
                                    </Text>
                                </Pressable>
                            </View>
                        </Modal>

                        <Pressable
                            style={styles.formTextInput}
                            onPress={() => dispatch(setShowRoomsModal(true))}
                        >
                            <Ionicons name="person-outline" size={24} color="black" />
                            <Text style={styles.textInput}>
                                {rooms} Room{rooms > 1 ? "s" : ""} • {adults} Adult
                                {adults > 1 ? "s" : ""} • {children} Child
                                {children > 1 ? "ren" : children === 1 ? "" : "ren"}
                            </Text>
                        </Pressable>

                        <Pressable 
                            style={styles.searchButton}
                            onPress={activeBookings.includes(destination) ? handleUpdateBooking : () => navigation.navigate("Places" as never)}
                        >
                            <Text style={styles.searchButtonText}>
                                {activeBookings.includes(destination) ? "Update Booking" : "Search"}
                            </Text>
                        </Pressable>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: Dimensions.get("window").width * 0.06,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            Travel More Spend Less
                        </Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 10, paddingLeft: 20 }}
                    >
                        {loyaltyProgram.map((program, index) => (
                            <LoyaltyCard key={program.id} program={program} index={index} />
                        ))}
                    </ScrollView>
                </View>

                {selectedService === "Stays" && (
                    <View id="staysTab">
                        <View style={styles.campaignContainer}>
                            <Text style={styles.campaignText}>Deals for the weekend</Text>
                            <Text style={styles.campaignSubText}>
                                Save on stays for 8 August - 10 August
                            </Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingLeft: 20, paddingBottom: 20 }}
                        >
                            {weekendHotels.map((hotel) => (
                                <HotelCard key={hotel.id} hotel={hotel} />
                            ))}
                        </ScrollView>
                        <View style={styles.offers}>
                            <Text style={styles.offersText}>Offers</Text>
                            <Text style={styles.offersSubText}>
                                Promotions,deals and special offers for you
                            </Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingLeft: 20, paddingBottom: 20 }}
                        >
                            {offers.map((offer) => (
                                <OfferCard key={offer.id} offer={offer} />
                            ))}
                        </ScrollView>

                        <View style={styles.ideasContainer}>
                            <Text style={styles.ideasText}>Need ideas?</Text>
                            <Text style={styles.ideasSubText}>
                                Travellers from Turkey often book
                            </Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20, paddingBottom: 20 }}>
                            {ideas.map((idea) => (
                                <IdeaCard key={idea.id} idea={idea} />
                            ))}
                        </ScrollView>
                    </View>
                )}

                {selectedService === "Flights" && (
                    <View style={styles.campaignContainer}>
                        <Text style={styles.campaignText}>Flight Deals</Text>
                        <Text style={styles.campaignSubText}>
                            Best prices for your next trip
                        </Text>
                    </View>
                )}

                {selectedService === "Car Rental" && (
                    <View style={styles.campaignContainer}>
                        <Text style={styles.campaignText}>Car Rental</Text>
                        <Text style={styles.campaignSubText}>
                            Rent a car for your journey
                        </Text>
                    </View>
                )}

                {selectedService === "Attractions" && (
                    <View style={styles.campaignContainer}>
                        <Text style={styles.campaignText}>Attractions</Text>
                        <Text style={styles.campaignSubText}>
                            Discover amazing places to visit
                        </Text>
                    </View>
                )}
            </ScrollView>

            <RoomsGuestsModal
                isVisible={showRoomsModal}
                onClose={() => dispatch(setShowRoomsModal(false))}
                rooms={rooms}
                adults={adults}
                children={children}
                onRoomsChange={(value) => dispatch(setRooms(value))}
                onAdultsChange={(value) => dispatch(setAdults(value))}
                onChildrenChange={(value) => dispatch(setChildren(value))}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    formContainer: {
        margin: Dimensions.get("window").width * 0.05,
        borderColor: "#ffc72c",
        borderWidth: 3,
        borderRadius: 6,
    },
    formTextInput: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: Dimensions.get("window").height * 0.01,
        paddingHorizontal: Dimensions.get("window").width * 0.02,
        backgroundColor: "#fff",
        gap: Dimensions.get("window").width * 0.02,
        borderColor: "#ffc72c",
        borderWidth: 2,
    },
    textInput: {
        fontSize: 16,
        color: "black",
        flex: 1,
        marginLeft: 10,
    },
    dateText: {
        fontSize: 16,
        color: "black",
        flex: 1,
        marginLeft: 15,
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "90%",
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    confirmButton: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    confirmButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    searchButton: {
        backgroundColor: "#2a52be",
        padding: Dimensions.get("window").height * 0.01,
        alignItems: "center",
        borderColor: "#ffc72c",
        borderWidth: 2,
    },
    searchButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    campaignContainer: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: Dimensions.get("window").width * 0.06,
        borderRadius: 10,
        paddingVertical: Dimensions.get("window").height * 0.02,
    },
    campaignText: {
        fontSize: Dimensions.get("window").width * 0.05,
        fontWeight: "bold",
    },
    campaignSubText: {
        fontSize: Dimensions.get("window").width * 0.035,
        color: "#666",
        marginBottom: Dimensions.get("window").height * 0.012,
    },
    offers: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: Dimensions.get("window").width * 0.06,
        borderRadius: 10,
        paddingVertical: Dimensions.get("window").height * 0.02,
    },
    offersText: {
        fontSize: Dimensions.get("window").width * 0.05,
        fontWeight: "bold",
    },
    offersSubText: {
        fontSize: Dimensions.get("window").width * 0.035,
        color: "#666",
        marginBottom: Dimensions.get("window").height * 0.012,
    },
    ideasContainer: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: Dimensions.get("window").width * 0.06,
        borderRadius: 10,
        paddingVertical: Dimensions.get("window").height * 0.02,
    },
    ideasText: {
        fontSize: Dimensions.get("window").width * 0.05,
        fontWeight: "bold",
    },
    ideasSubText: {
        fontSize: Dimensions.get("window").width * 0.035,
        color: "#666",
        marginBottom: Dimensions.get("window").height * 0.012,
    },
}); 