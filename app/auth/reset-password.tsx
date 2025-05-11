import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import Head from "expo-router/head";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isDisabled = !email || isLoading;

  const handleResetPassword = async () => {
    if (isDisabled) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "exp://localhost:19000/auth/update-password",
      });

      if (error) throw error;

      console.log("Reset password email sent to:", email);
      setIsSent(true);
    } catch (error: any) {
      console.error("Reset password error:", error);

      let errorMessage = "Failed to send reset email. Please try again.";

      if (error.message.includes("Invalid email")) {
        errorMessage = "Please enter a valid email address.";
        setError(errorMessage);
      } else if (error.message.includes("User not found")) {
        errorMessage = "No account found with this email address.";
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Reset Password" />
      </Head>
      <Text style={styles.title}>Reset Password</Text>

      <View style={styles.formContainer}>
        {isSent ? (
          <>
            <Text style={styles.message}>
              Check your email for reset instructions
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Return to Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.message}>
              Enter your email to receive a reset link
            </Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
              style={[styles.button, isDisabled && styles.disabledButton]}
              disabled={isDisabled}
              onPress={handleResetPassword}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.links}>
        <Link href="/auth/login" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Back to Login</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/auth/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Create Account</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  error: {
    color: "#ff0000",
    marginBottom: 16,
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
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
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
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    width: "100%",
    maxWidth: 400,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
