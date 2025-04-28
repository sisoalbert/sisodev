import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../lib/auth-provider";
import { supabase } from "../../lib/supabase";
import Avatar from "../../components/Avatar";

function EditAccount() {
  const { width } = useWindowDimensions();
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
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
        setWebsite(data.website || "");
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
      setWebsite("");
      setAvatarUrl("");
    } catch (error: any) {
      console.error("Error creating profile:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    // Validate form
    const errors: Record<string, string> = {};
    if (!username.trim()) errors.username = "Username is required";
    if (website && !website.startsWith("http"))
      errors.website = "Website must start with http:// or https://";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Profile updated successfully!");
      setValidationErrors({});
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  // Calculate responsive container width based on screen size
  const getContainerWidth = () => {
    if (width >= 1024) return Math.min(800, width * 0.6); // Desktop
    if (width >= 768) return Math.min(600, width * 0.8); // Tablet
    return width * 0.95; // Mobile with small margin
  };

  const containerWidth = getContainerWidth();

  if (!session) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Not signed in. Please sign in to access your account.</Text>
      </View>
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
              <Avatar
                size={150}
                url={avatarUrl}
                onUpload={(url: string) => {
                  setAvatarUrl(url);
                  updateProfile({ username, website, avatar_url: url });
                }}
              />
            </View>

            <View style={styles.formContainer}>
              <View style={[styles.formGroup, styles.mt20]}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.disabledInput}>
                  <Text>{session?.user?.email}</Text>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Username</Text>
                <View
                  style={[
                    styles.input,
                    validationErrors.username ? styles.inputError : null,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    value={username}
                    onChangeText={(text: string) => {
                      setUsername(text);
                      if (validationErrors.username) {
                        const newErrors = { ...validationErrors };
                        delete newErrors.username;
                        setValidationErrors(newErrors);
                      }
                    }}
                    placeholder="Enter your username"
                  />
                </View>
                {validationErrors.username ? (
                  <Text style={styles.errorText}>
                    {validationErrors.username}
                  </Text>
                ) : null}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Website</Text>
                <View
                  style={[
                    styles.input,
                    validationErrors.website ? styles.inputError : null,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    value={website}
                    onChangeText={(text: string) => {
                      setWebsite(text);
                      if (validationErrors.website) {
                        const newErrors = { ...validationErrors };
                        delete newErrors.website;
                        setValidationErrors(newErrors);
                      }
                    }}
                    placeholder="https://example.com"
                  />
                </View>
                {validationErrors.website ? (
                  <Text style={styles.errorText}>
                    {validationErrors.website}
                  </Text>
                ) : null}
              </View>

              <View style={[styles.formGroup, styles.mt20]}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.primaryButton,
                    loading || uploading ? styles.buttonDisabled : null,
                  ]}
                  onPress={() =>
                    updateProfile({ username, website, avatar_url: avatarUrl })
                  }
                  disabled={loading || uploading}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "Updating..." : "Update Profile"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default EditAccount;

const styles = StyleSheet.create({
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
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  textInput: {
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 400,
    marginHorizontal: "auto",
    alignSelf: "stretch",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: "#4630EB",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  mt20: {
    marginTop: 20,
  },
});
