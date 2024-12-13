import { useRouter } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Screen3 = () => {
  const router = useRouter();

  // Navigate to login screen when Get Started button is pressed
  const onGetStarted = () => {
    router.navigate("/login");
  };

  // Navigate to login screen when Skip button is pressed
  const onSkip = () => {
    router.navigate("/login");
  };

  // Navigate back to Screen2 when Back button is pressed
  const onBack = () => {
    router.navigate("/screen2");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        style={{
          position: "absolute",
          top: 30,
          left: 20,
          padding: 12,
          zIndex: 1,
        }}
      >
        <Text style={{ color: "#007bff", fontSize: 16, fontWeight: "700" }}>Back</Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity
        onPress={onSkip}
        style={{
          position: "absolute",
          top: 30,
          right: 20,
          padding: 12,
          zIndex: 1,
        }}
      >
        <Text style={{ color: "#007bff", fontSize: 16, fontWeight: "700" }}>Skip</Text>
      </TouchableOpacity>

      {/* Content Section */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#333",
            marginBottom: 20,
            textAlign: "center",
            paddingHorizontal: 10,
          }}
        >
          Enjoy your meal!
        </Text>

        {/* Image */}
        <Image
          source={require("@/assets/images/foood3.jpg")}
          style={{
            width: 320,
            height: 280,
            borderRadius: 20,
            marginBottom: 20,
            borderWidth: 5,
            borderColor: "#f8f9fa", // Light border for a clean look
          }}
          resizeMode="cover"
        />

        {/* Description */}
        <Text
          style={{
            fontSize: 18,
            color: "#666",
            textAlign: "center",
            marginBottom: 40,
            paddingHorizontal: 20,
          }}
        >
          Join us and start your journey into a world full of delightful flavors.
          Your food adventure awaits!
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={onGetStarted}
          style={{
            backgroundColor: "#28a745",
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 25,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 6,  // Elevation for Android shadow
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Screen3;
