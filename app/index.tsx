import Mybutton from "@/app-example/components/Mybutton";
import { useRouter } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Index = () => {
  const router = useRouter();

  const onContinue = () => {
    router.navigate("/screen2"); // Navigate to screen2
  };

  const onSkip = () => {
    router.navigate("/login"); // Navigate to login screen
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
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
        {/* Title */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Welcome to FoodHub!
        </Text>

        {/* Image */}
        <Image
          source={require("@/assets/images/foood1.png")}
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
          Discover a variety of delicious meals and recipes. Start your food journey with us today!
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

export default Index;