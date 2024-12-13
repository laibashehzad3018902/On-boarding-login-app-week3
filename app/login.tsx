import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Form Validation Schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const Login = () => {
  const router = useRouter();

  // Check if the user is already logged in
  useEffect(() => {
    const checkLogin = async () => {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userPassword = await AsyncStorage.getItem('userPassword');
      
      if (userEmail && userPassword) {
        // If the user is already logged in, navigate to the profile screen
        router.push('/profilescreen');
      }
    };
    checkLogin();
  }, []);

  // Handle login submission
  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      // Fetch data from AsyncStorage
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');
  
      console.log('Stored Email from AsyncStorage:', storedEmail);
      console.log('Stored Password from AsyncStorage:', storedPassword);
  
      // Validate login credentials
      if (storedEmail === email && storedPassword === password) {
        Alert.alert('Login successful', '', [
          {
            text: 'OK',
            onPress: () => router.replace('/profilescreen'), // Redirect to profile
          },
        ]);
      } else {
        Alert.alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
      Alert.alert('An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image at the top */}
      <Image source={require('@/assets/images/loginn.png')} style={styles.logo} />
      
      <Text style={styles.heading}>Login</Text>

      {/* Formik Form */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Enter your password"
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      {/* Sign-Up Link */}
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E6F7FF', // Light background for a fresh look
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 15, // Soft rounded corners for the image
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E6EB2', // A deep blue for the heading
    marginBottom: 20,
    fontFamily: 'Roboto',
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
    elevation: 5, // Elevated input fields with shadow
  },
  input: {
    borderWidth: 1,
    borderColor: '#B8D8E1', // Light blue border for inputs
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#F7FBFF', // Slightly lighter background for inputs
  },
  errorText: {
    color: '#FF4D4D', // Red color for error message
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Fresh green button for the login
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
  signupText: {
    color: '#191970', // Matching the button color for consistency
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});

export default Login;