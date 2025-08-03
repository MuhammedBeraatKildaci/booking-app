import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SavedScreen from "../screens/SavedScreen";
import { AntDesign, Entypo } from "expo-vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchScreen from "../screens/SearchScreen";
import PlacesScreen from "../screens/PlacesScreen";
import PaymentScreen from "../screens/PaymentScreen";
import InvoiceScreen from "../screens/InvoiceScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#003580" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="heart" size={24} color="#003580" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarLabel: "Booking",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="bag" size={24} color="#003580" />
            ) : (
              <Ionicons name="bag-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#003580" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Booking.com"
          component={TabNavigator}
          options={{
            header: () => {
              return (
                <View
                  style={{
                    height: Dimensions.get("window").height * 0.12,
                    backgroundColor: "#003580",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: Dimensions.get("window").width * 0.05,
                    paddingTop: Dimensions.get("window").height * 0.03,
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingLeft: Dimensions.get("window").width * 0.15,
                    }}
                  >
                    Booking.com
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View style={{ position: "relative" }}>
                      <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color="white"
                      />
                      {/* Chat bildirim sayısını göstermek için bir View */}
                      <View
                        style={{
                          position: "absolute",
                          right: -6,
                          top: -6,
                          backgroundColor: "#ffc72c",
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#003580",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          1
                        </Text>
                      </View>
                    </View>
                    <View style={{ position: "relative" }}>
                      <Ionicons
                        name="notifications-outline"
                        size={22}
                        color="white"
                      />
                      {/* Bildirim sayısını göstermek için bir View */}
                      <View
                        style={{
                          position: "absolute",
                          right: -6,
                          top: -6,
                          backgroundColor: "red",
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          3
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
                        <Stack.Screen
                  name="Places"
                  component={PlacesScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Payment"
                  component={PaymentScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Invoice"
                  component={InvoiceScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
