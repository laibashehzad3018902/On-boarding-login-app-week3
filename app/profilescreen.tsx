import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ fullName: '', email: '' });
  const router = useRouter();

  // Fetch user info from AsyncStorage on component mount
  useEffect(() => {
    const getUserInfo = async () => {
      const fullName = await AsyncStorage.getItem('fullName');
      const email = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('userPassword');

      // Check if the user is logged in by verifying email and password
      if (email && password) {
        setUserInfo({ fullName, email });
      } else {
        router.push('/login'); // If not logged in, redirect to login screen
      }
    };

    getUserInfo();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('fullName');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userPassword');
    router.push('/login'); // Redirect to login after logout
  };

  // Navigate to settings screen
  const navigateToSettings = () => {
    router.push('/settings');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Profile Image (you can update the source later) */}
      <Image
        source={require("@/assets/images/profile.jpg")} // Update with your actual image location
        style={styles.profileImage}
      />

      {/* Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeText}>Welcome, {userInfo.fullName}!</Text>
      </View>

      

      {userInfo.email ? (
        <>
          {/* User Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Full Name: {userInfo.fullName}</Text>
            <Text style={styles.label}>Email: {userInfo.email}</Text>
          </View>

          {/* Navigation Options (Settings & Logout) */}
          <View style={styles.navigationContainer}>
            {/* Settings Button */}
            <TouchableOpacity style={styles.button} onPress={navigateToSettings}>
              <Text style={styles.buttonText}>Go to Settings</Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8FF', // Light background color
  },
  welcomeBanner: {
    backgroundColor: '#2E6EB2', // Blue banner for welcome message
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Shadow for floating effect
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop:40,
    marginBottom: 30,
    borderWidth: 5,
    borderColor: '#007BFF', // Border color for profile image
  },
  infoContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Shadow for floating effect
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  navigationContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Shadow for floating effect
  },
  button: {
    backgroundColor: '#4CAF50', // Green button for navigation actions
    padding: 15,
    borderRadius: 10,
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
});

export default ProfileScreen;
