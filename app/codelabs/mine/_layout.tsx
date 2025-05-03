// app/codelabs/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CodelabsLayout() {
  return (
    <SafeAreaView className="min-h-screen bg-background">
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </SafeAreaView>
  );
}
