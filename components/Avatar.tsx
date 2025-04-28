import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  Button,
  Platform,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      // Get the public URL - simpler approach
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      console.log("Downloaded image:", data);

      if (data?.publicUrl) {
        setAvatarUrl(data.publicUrl);
        console.log("Set avatar URL:", data.publicUrl);
        return;
      }

      console.log("Failed to get public URL for:", path);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      // Note: We assume the 'avatars' bucket has already been created by an admin
      // in the Supabase dashboard. We don't need to check if it exists or create it.

      // 2. Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8, // Reduced quality to handle large images better
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri found");
      }

      try {
        // Using a simpler approach that works for both web and native
        console.log("Preparing to upload image...");

        // Generate a unique file name
        const timestamp = Date.now();
        const userId = url?.split("/").pop()?.split(".")[0] || "user";
        const fileExt =
          Platform.OS === "web" && image.fileName
            ? image.fileName.split(".").pop()?.toLowerCase()
            : image.uri?.split(".").pop()?.toLowerCase() || "jpg";

        // Use a simpler path with a timestamp for uniqueness
        const filePath = `${timestamp}.${fileExt}`;

        console.log("Generated file path:", filePath);

        // Convert to blob for upload
        const response = await fetch(image.uri);
        const blob = await response.blob();

        // Upload to Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, blob, {
            contentType: image.mimeType || "image/jpeg",
            upsert: true,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        if (data) {
          // Get the public URL after successful upload
          const { data: publicUrlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(data.path);

          if (publicUrlData && publicUrlData.publicUrl) {
            // We send the public URL back as it's easier to use directly
            onUpload(publicUrlData.publicUrl);
          } else {
            // Fall back to using just the path if we can't get the URL
            onUpload(data.path);
          }
        }
      } catch (uploadError) {
        console.error("Error in file upload:", uploadError);
        throw uploadError;
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      if (error instanceof Error) {
        Alert.alert(
          "Upload Failed",
          error.message || "There was a problem uploading your image."
        );
      } else {
        Alert.alert(
          "Upload Failed",
          "There was a problem uploading your image."
        );
      }
    } finally {
      setUploading(false);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        ) : (
          <View style={[avatarSize, styles.avatar, styles.noImage]}>
            <Text style={styles.placeholderText}>?</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={uploading ? "Uploading ..." : "Upload Photo"}
          onPress={uploadAvatar}
          disabled={uploading}
          color="#4630EB"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 200,
    marginTop: 5,
  },
  avatar: {
    borderRadius: 75,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#EEEEEE",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#DDDDDD",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#888888",
  },
});
