import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Settings = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Pre-fill form fields with user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const storedFullName = await AsyncStorage.getItem('fullName');
      const storedEmail = await AsyncStorage.getItem('userEmail');
      setFullName(storedFullName || '');
      setEmail(storedEmail || '');
    };

    fetchUserData();
  }, []);

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email.trim());
  };

  // Handle Update
  const handleUpdate = async () => {
    setErrorMessage('');

    // Validation
    if (fullName.trim().length < 3) {
      setErrorMessage('Full name must be at least 3 characters long');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      // Save updated details back to AsyncStorage
      await AsyncStorage.setItem('fullName', fullName.trim());
      await AsyncStorage.setItem('userEmail', email.trim());

      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => router.push('/profilescreen'), // Navigate back to Profile Screen
        },
      ]);
    } catch (error) {
      console.error('Error saving updated details:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image */}
      <Image source={require("@/assets/images/settings.jpg")} style={styles.profileImage} />

      <Text style={styles.heading}>Settings</Text>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Update Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      {/* Return to Home Button */}
      <TouchableOpacity style={styles.returnButton} onPress={() => router.push('/profilescreen')}>
        <Text style={styles.returnButtonText}>Return to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF', // Light background
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 30,
    borderWidth: 5,
    borderColor: '#007BFF', // Border color for profile image
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E6EB2', // Blue heading color
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B8D8E1', // Light blue border
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#F7FBFF', // Input background
  },
  errorText: {
    color: '#FF4D4D', // Red error message
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Green for update button
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  returnButton: {
    backgroundColor: '#2E6EB2', // Blue for return button
    padding: 12,
    borderRadius: 12,
    shadowColor: '#2E6EB2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  returnButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Settings;
