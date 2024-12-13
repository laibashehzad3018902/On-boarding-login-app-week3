import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false); // Form validation state
  const router = useRouter();

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email.trim());
  };

  // Check form validity
  useEffect(() => {
    const isValid =
      fullName.trim() &&
      validateEmail(email) &&
      password.trim() &&
      confirmPassword.trim() &&
      password === confirmPassword;

    setIsFormValid(isValid); // Enable or disable the button based on the validity of the form
  }, [fullName, email, password, confirmPassword]);

  // Handle Sign Up submission
  const handleSignUp = async () => {
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Store data to AsyncStorage
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);

      Alert.alert('Sign up successful');
      router.replace('/login'); // Navigate to login screen
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image at the top */}
      <Image source={require("@/assets/images/sign.png")} style={styles.logo} />

      <Text style={styles.heading}>Sign Up</Text>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.signupText}>Already have an account? Go to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF', // Soft light background for freshness
  },
  logo: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 15, // Rounded corners for image
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E6EB2', // Dark blue heading for contrast
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Elevation effect for inputs
  },
  input: {
    borderWidth: 1,
    borderColor: '#B8D8E1', // Light blue border
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F7FBFF', // Soft light blue background for inputs
  },
  errorText: {
    color: '#FF4D4D', // Red for errors
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Green button for positive action
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#B0C4DE', // Disabled button color
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupText: {
    color: '#007BFF', // Blue color for the link
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
});

export default SignUp;