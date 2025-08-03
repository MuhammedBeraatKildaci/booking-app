import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Feather } from "expo-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout, updateProfile } from "../store/slices/bookingSlice";
import { COLORS, DIMENSIONS } from "../utils/constants";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.booking);

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  const handleSaveProfile = () => {
    if (!editName || !editEmail || !editPhone) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    dispatch(
      updateProfile({
        name: editName,
        email: editEmail,
        phone: editPhone,
      })
    );

    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditName(user?.name || "");
    setEditEmail(user?.email || "");
    setEditPhone(user?.phone || "");
    setIsEditing(false);
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.emptyState}>
          <Ionicons name="person-outline" size={80} color={COLORS.text.light} />
          <Text style={styles.emptyTitle}>Please Login</Text>
          <Text style={styles.emptySubtitle}>
            Sign in to view and manage your profile
          </Text>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate("Login" as never)}
            style={styles.loginButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={24} color={COLORS.error} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card style={styles.profileHeaderCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {user?.avatar ? (
                <Image 
                  source={{ uri: user.avatar }} 
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={40} color={COLORS.text.light} />
                </View>
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Feather
                name={isEditing ? "x" : "edit-3"}
                size={20}
                color={COLORS.primary}
              />
            </Pressable>
          </View>
        </Card>

        {/* Profile Details */}
        <Card style={styles.profileDetailsCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            {isEditing ? (
              <View style={styles.inputWrapper}>
                <Feather name="user" size={20} color={COLORS.text.secondary} />
                <TextInput
                  style={styles.textInput}
                  value={editName}
                  onChangeText={setEditName}
                  autoCapitalize="words"
                />
              </View>
            ) : (
              <Text style={styles.detailValue}>{user?.name}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            {isEditing ? (
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={20} color={COLORS.text.secondary} />
                <TextInput
                  style={styles.textInput}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            ) : (
              <Text style={styles.detailValue}>{user?.email}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            {isEditing ? (
              <View style={styles.inputWrapper}>
                <Feather name="phone" size={20} color={COLORS.text.secondary} />
                <TextInput
                  style={styles.textInput}
                  value={editPhone}
                  onChangeText={setEditPhone}
                  keyboardType="phone-pad"
                />
              </View>
            ) : (
              <Text style={styles.detailValue}>{user?.phone}</Text>
            )}
          </View>

          {isEditing && (
            <View style={styles.editButtons}>
              <Button
                title="Cancel"
                onPress={handleCancelEdit}
                variant="outline"
                style={styles.cancelButton}
                size="small"
              />
              <Button
                title="Save"
                onPress={handleSaveProfile}
                style={styles.saveButton}
                size="small"
              />
            </View>
          )}
        </Card>

        {/* Account Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Account</Text>

          <Pressable style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <Feather name="shield" size={20} color={COLORS.primary} />
              <Text style={styles.actionText}>Privacy & Security</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.text.secondary}
            />
          </Pressable>

          <Pressable style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <Feather name="bell" size={20} color={COLORS.primary} />
              <Text style={styles.actionText}>Notifications</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.text.secondary}
            />
          </Pressable>

          <Pressable style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <Feather name="help-circle" size={20} color={COLORS.primary} />
              <Text style={styles.actionText}>Help & Support</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.text.secondary}
            />
          </Pressable>

          <Pressable style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <Feather name="file-text" size={20} color={COLORS.primary} />
              <Text style={styles.actionText}>Terms & Conditions</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.text.secondary}
            />
          </Pressable>
        </Card>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButtonStyle}
            size="large"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: DIMENSIONS.padding.medium,
    paddingTop: DIMENSIONS.padding.large,
    paddingBottom: DIMENSIONS.padding.medium,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: DIMENSIONS.fontSize.large,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  logoutButton: {
    padding: 8,
  },
  profileHeaderCard: {
    margin: DIMENSIONS.padding.medium,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  editButton: {
    padding: 8,
  },
  profileDetailsCard: {
    margin: DIMENSIONS.padding.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.text.primary,
    paddingVertical: 12,
  },
  editButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
  actionsCard: {
    margin: DIMENSIONS.padding.medium,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  logoutContainer: {
    margin: DIMENSIONS.padding.medium,
    marginBottom: DIMENSIONS.padding.large,
  },
  logoutButtonStyle: {
    marginBottom: 0,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: DIMENSIONS.padding.large,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: "center",
    marginBottom: 24,
  },
  loginButton: {
    minWidth: 200,
  },
});

export default ProfileScreen;
