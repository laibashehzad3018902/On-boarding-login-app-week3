import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="index" /> 

       <Stack.Screen name="screen2" />

       <Stack.Screen name="screen3" />

      <Stack.Screen name="login" />

      <Stack.Screen name="signup" />

      <Stack.Screen name="profilescreen" />


  
    </Stack>
  );
};

export default RootLayout;
