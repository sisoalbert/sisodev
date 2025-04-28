import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignupComplete, setIsSignupComplete] = useState(false);
  const router = useRouter();
  const { returnTo } = useLocalSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const isDisabled = !email || !password || isLoading;

  const handleSignup = async () => {
    if (isDisabled) return;

    setError("");
    setIsLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            created_at: new Date().toISOString(),
            preferences: {
              notifications: true,
              darkMode: false,
            },
          },
        },
      });

      if (signUpError) throw signUpError;

      console.log("Signup successful for:", email);

      // Show confirmation message instead of redirecting
      setIsSignupComplete(true);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Signup error:", error);

      let errorMessage = "Failed to create account. Please try again.";

      if (error.message.includes("already registered")) {
        errorMessage = "Email address is already in use.";
      } else if (error.message.includes("Invalid email")) {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message.includes("weak password")) {
        errorMessage = "Password is too weak. Please use a stronger password.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSignupComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.confirmationText}>
            We've sent a confirmation email to your inbox. Please click the link
            in the email to verify your account.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/auth/login" as any)}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { flex: 1, marginBottom: 0, borderWidth: 0 }]}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: 10, marginRight: 5 }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#666"
            />
          </Pressable>
        </View>

        <Text style={styles.disclaimerText}>
          By continuing, you acknowledge that you understand and agree to the{" "}
          <Text
            style={styles.linkTextInline}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://www.sisodev.com/compliance/terms-of-service"
              )
            }
          >
            Terms & Conditions
          </Text>{" "}
          and{" "}
          <Text
            style={styles.linkTextInline}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://www.sisodev.com/compliance/privacy-policy"
              )
            }
          >
            Privacy Policy
          </Text>
          .
        </Text>

        <TouchableOpacity
          style={[styles.button, isDisabled && styles.disabledButton]}
          onPress={handleSignup}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <Link href="/auth/login" style={styles.linkText}>
            Already have an account? Sign in
          </Link>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.dividerLine} />
        <TouchableOpacity
          style={[styles.button]}
          disabled={false}
          onPress={() =>
            router.replace({
              pathname: "/",
              params: returnTo ? { returnTo } : undefined,
            })
          }
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  confirmationText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dividerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
    maxWidth: 400,
  },
  loginText: {
    fontSize: 16,
    color: "#666",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  linkTextInline: {
    color: "#007AFF",
    fontSize: 12,
  },
});
