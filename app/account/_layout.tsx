// app/account/_layout.tsx
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../lib/auth-provider";
import { ActivityIndicator, View } from "react-native";

export default function AccountLayout() {
  const { session, loading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!loading && !session) {
  //     // Redirect to login if not authenticated
  //     router.replace("/auth/login?returnTo=/account" as any);
  //   }
  // }, [session, loading, router]);

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // // Only render the account layout if authenticated
  // if (!session) return null;

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
