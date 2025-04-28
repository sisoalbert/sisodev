import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { returnTo } = useLocalSearchParams();

  const isDisabled = !email || !password || isLoading;

  const handleLogin = async () => {
    if (isDisabled) return;

    setError("");
    setIsLoading(true);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      console.log("Login successful for:", email);

      // If returnTo parameter exists, navigate back to that page, otherwise go to home
      if (returnTo && typeof returnTo === "string") {
        router.replace(returnTo as any);
      } else {
        router.replace("/" as any);
      }
    } catch (error: any) {
      console.error("Login error:", error);

      let errorMessage =
        "Login failed. Please check your credentials and try again.";

      if (error.message === "Invalid login credentials") {
        errorMessage = "Incorrect email or password.";
      } else if (error.message.includes("Invalid email")) {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message.includes("rate limit")) {
        errorMessage = "Too many attempts. Please try again later.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.formContainer}>
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
                "https://www.jupiterpod.com/compliance/terms-of-service"
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
                "https://www.jupiterpod.com/compliance/privacy-policy"
              )
            }
          >
            Privacy Policy
          </Text>
        </Text>

        <TouchableOpacity
          style={[styles.button, isDisabled && styles.disabledButton]}
          disabled={isDisabled}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Signing in..." : "Sign in with email"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.links}>
        <Link href="/auth/reset-password" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Link>

        <Link
          href={{
            pathname: "/auth/signup",
            params: returnTo ? { returnTo } : undefined,
          }}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.linkText}>Create Account</Text>
          </TouchableOpacity>
        </Link>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  dividerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
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
