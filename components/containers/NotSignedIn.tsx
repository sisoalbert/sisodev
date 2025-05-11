import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const NotSignedIn = () => {
  const { width } = useWindowDimensions();
  // Calculate responsive container width based on screen size
  const getContainerWidth = () => {
    if (width >= 1024) return Math.min(800, width * 0.6); // Desktop
    if (width >= 768) return Math.min(600, width * 0.8); // Tablet
    return width * 0.95; // Mobile with small margin
  };

  const containerWidth = getContainerWidth();

  return (
    <SafeAreaView
      style={[styles.container, { width: containerWidth, alignSelf: "center" }]}
    >
      <View style={styles.notSignedInContainer}>
        <FontAwesome name="user-circle" size={80} color="#CCCCCC" />
        <Text style={styles.notSignedInText}>You are not signed in</Text>

        <View style={styles.formContainer}>
          <TouchableOpacity
            style={[styles.button]}
            disabled={false}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonOutline]}
            disabled={false}
            onPress={() => router.push("/auth/signup")}
          >
            <Text style={styles.buttonOutlineText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>{}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    paddingBottom: 60,
  },
  notSignedInContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notSignedInText: {
    fontSize: 18,
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4630EB",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonOutline: {
    marginTop: 16,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#4CAF50",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  buttonOutlineText: {
    fontSize: 16,
    color: "#4CAF50",
  },
  versionContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  versionText: {
    fontSize: 12,
    color: "#999",
  },
});

export default NotSignedIn;
