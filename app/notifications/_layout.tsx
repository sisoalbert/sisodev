// app/account/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsLayout() {
  return (
    <SafeAreaView className="min-h-screen bg-background">
      <Header />
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
