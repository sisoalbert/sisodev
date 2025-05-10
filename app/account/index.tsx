import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../lib/auth-provider";
import { supabase } from "../../lib/supabase";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { storage } from "../../lib/storage";

function Account() {
  const { width } = useWindowDimensions();
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const appVersion = "1.0.0 (6)";
  useEffect(() => {
    if (session?.user) {
      getProfile();
    } else {
      // Reset state when not authenticated
      setLoading(false);
      setUsername("");
      setAvatarUrl("");
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      // Double check session exists to prevent unnecessary API calls
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session.user.id)
        .single();

      if (error) {
        if (status === 406) {
          // Profile doesn't exist yet, create a new one
          await createInitialProfile();
          return;
        }
        throw error;
      }

      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
      // We'll handle this silently without an alert to improve UX
    } finally {
      setLoading(false);
    }
  }

  async function createInitialProfile() {
    try {
      if (!session?.user) return;

      // Create a new profile with default values
      const updates = {
        id: session.user.id,
        username: session.user.email?.split("@")[0] || "",
        website: "",
        avatar_url: "",
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      // Set the initial values
      setUsername(updates.username);
      setAvatarUrl("");
    } catch (error: any) {
      console.error("Error creating profile:", error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      // Force clear the session from storage first
      await storage.removeItem("supabase.auth.token");

      // Then attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", JSON.stringify(error));
        // Even if there's an error, we'll redirect to login
      }

      // Force clear the session from context
      if (session) {
        router.replace("/");
      }
    } catch (error: any) {
      console.error("Error signing out:", JSON.stringify(error));
      // Even if there's an error, we'll redirect to login
      router.replace("/");
    }
  };

  // Calculate responsive container width based on screen size
  const getContainerWidth = () => {
    if (width >= 1024) return Math.min(800, width * 0.6); // Desktop
    if (width >= 768) return Math.min(600, width * 0.8); // Tablet
    return width * 0.95; // Mobile with small margin
  };

  const containerWidth = getContainerWidth();

  if (!session?.user) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { width: containerWidth, alignSelf: "center" },
        ]}
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
  }

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          { width: containerWidth, alignSelf: "center" },
        ]}
      >
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#4630EB" />
          </View>
        ) : (
          <>
            <View style={styles.avatarContainer}>
              <Pressable
                onPress={() => {
                  router.push("/account/edit-account");
                }}
              >
                <Avatar size="xl">
                  <AvatarFallbackText>{username}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: avatarUrl,
                    }}
                  />
                </Avatar>
              </Pressable>
              <Pressable
                style={styles.editButton}
                onPress={() => {
                  router.push("/account/edit-account");
                }}
              >
                <Text>Edit</Text>
              </Pressable>
            </View>

            <View style={styles.formContainer}>
              <View style={[styles.formGroup, styles.mt20]}>
                <Text style={styles.label}>My Content</Text>
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => router.push("/codelabs/mine")}
                >
                  <Text style={styles.linkText}>My Codelabs</Text>
                  <Ionicons name="chevron-forward" size={16} color="#3b82f6" />
                </TouchableOpacity>
              </View>

              <View style={[styles.formGroup, styles.mt20]}>
                <TouchableOpacity
                  style={[styles.button, styles.outlineButton]}
                  onPress={handleSignOut}
                >
                  <Text style={styles.outlineButtonText}>Sign Out</Text>
                </TouchableOpacity>
                <Text style={[styles.versionText, { textAlign: "center" }]}>
                  {appVersion}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  link: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  linkText: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "500",
  },
  container: {
    marginTop: 40,
    padding: 20,
    paddingBottom: 60,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  editButton: {
    marginTop: 16,
  },
  formContainer: {
    width: "100%",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  versionText: {
    fontSize: 12,
    color: "#999",
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
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
  outlineButton: {
    borderWidth: 1,
    borderColor: "#FF3B30",
    backgroundColor: "transparent",
  },
  outlineButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
  mt20: {
    marginTop: 20,
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
  versionContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
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
});

export default Account;
