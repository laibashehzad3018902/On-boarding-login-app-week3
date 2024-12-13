import Mybutton from "@/app-example/components/Mybutton";
import { useRouter } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Screen2 = () => {
  const router = useRouter();

  const onContinue = () => {
    router.navigate("/screen3"); // Navigate to the next screen (Screen3)
  };

  const onSkip = () => {
    router.navigate("/login"); // Skip to the login screen
  };

  const onBack = () => {
    router.navigate("/"); // Navigate back to the Index screen
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        style={{
          position: "absolute",
          top: 20,
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
          top: 20,
          right: 20,
          padding: 10,
        }}
      >
        <Text style={{ color: "blue", fontSize: 16, fontWeight: "600" }}>Skip</Text>
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

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Fulfill your cravings!
        </Text>

        {/* Image */}
        <Image
          source={require("@/assets/images/delfood-1.png")} 
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
            fontSize: 16,
            color: "#666",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Explore a wide variety of cuisines and flavors. Let your taste buds travel the world!
        </Text>

        {/* Next Button */}
        <TouchableOpacity
          onPress={onContinue}
          style={{
            backgroundColor: "#007bff",
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
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Screen2;