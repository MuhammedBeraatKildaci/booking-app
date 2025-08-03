import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { Feather} from 'expo-vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/slices/bookingSlice';
import { COLORS, DIMENSIONS } from '../utils/constants';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  // Form state
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (isLogin) {
      // Login logic
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      
      // Simulate login
      dispatch(login({
        id: '1',
        name: 'John Doe',
        email: email,
        phone: '+90 555 123 4567',
        avatar: undefined // No avatar for now
      }));
      
      Alert.alert('Success', 'Login successful!', [
        {
          text: 'OK',
          onPress: () => (navigation as any).navigate('Booking.com', { screen: 'Profile' })
        }
      ]);
    } else {
      // Register logic
      if (!name || !email || !password || !phone) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      
      // Simulate registration
      dispatch(login({
        id: '1',
        name: name,
        email: email,
        phone: phone,
        avatar: undefined
      }));
      
      Alert.alert('Success', 'Registration successful!', [
        {
          text: 'OK',
          onPress: () => (navigation as any).navigate('Booking.com', { screen: 'Profile' })
        }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>{isLogin ? 'Login' : 'Register'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Ionicons name="person-outline" size={80} color={COLORS.primary} />
          <Text style={styles.welcomeTitle}>
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Join us to start booking hotels'
            }
          </Text>
        </View>

        {/* Form */}
        <Card style={styles.formCard}>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={20} color={COLORS.text.secondary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <Feather name="mail" size={20} color={COLORS.text.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Feather name="phone" size={20} color={COLORS.text.secondary} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Feather name="lock" size={20} color={COLORS.text.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Feather 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={COLORS.text.secondary} 
                />
              </Pressable>
            </View>
          </View>

          <Button
            title={isLogin ? "Sign In" : "Create Account"}
            onPress={handleSubmit}
            style={styles.submitButton}
            size="large"
          />
        </Card>

        {/* Toggle Login/Register */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <Pressable onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleButton}>
              {isLogin ? "Sign Up" : "Sign In"}
            </Text>
          </Pressable>
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <Text style={styles.socialTitle}>Or continue with</Text>
          
          <View style={styles.socialButtons}>
            <Pressable style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color={COLORS.text.primary} />
              <Text style={styles.socialButtonText}>Google</Text>
            </Pressable>
            
            <Pressable style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color={COLORS.text.primary} />
              <Text style={styles.socialButtonText}>Apple</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DIMENSIONS.padding.medium,
    paddingTop: DIMENSIONS.padding.large,
    paddingBottom: DIMENSIONS.padding.medium,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: DIMENSIONS.fontSize.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: DIMENSIONS.padding.large,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: DIMENSIONS.padding.large,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingHorizontal: DIMENSIONS.padding.medium,
  },
  formCard: {
    margin: DIMENSIONS.padding.medium,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  submitButton: {
    marginTop: 8,
    marginBottom: 0,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: DIMENSIONS.padding.medium,
  },
  toggleText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  toggleButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  socialContainer: {
    margin: DIMENSIONS.padding.medium,
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
});

export default LoginScreen; 