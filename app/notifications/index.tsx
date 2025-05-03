import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions, ScrollView, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Notifications = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          minHeight: width > 768 ? "70%" : "85%"
        }
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-off-outline" size={width > 768 ? 120 : 80} color="#d1d5db" />
        </View>
        
        <Text style={styles.title}>You have no notifications</Text>
        
        <Text style={styles.description}>
          When you receive notifications about new content, recommendations or updates, they'll appear here.
        </Text>
        
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={onRefresh}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh-outline" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    maxWidth: 400,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  refreshButton: {
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 8,
  }
});
