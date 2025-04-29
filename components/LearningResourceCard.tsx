import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

interface LearningResourceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  onPress: () => void;
}

export const LearningResourceCard = ({
  title,
  description,
  imageUrl,
  imageAlt,
  onPress,
}: LearningResourceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  // Determine if the card is in an active state
  const isActive = isHovered || isPressed;

  // Setup screen dimension listener for responsive design
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get("window").width);
    };

    // Add event listener for screen dimension changes
    const dimensionsSubscription = Dimensions.addEventListener(
      "change",
      updateScreenWidth
    );

    // Clean up subscription on component unmount
    return () => {
      dimensionsSubscription.remove();
    };
  }, []);

  // Determine if we're on a small mobile device (less than 400px)
  const isSmallMobile = screenWidth < 600;

  return (
    <View style={styles.cardContainer}>
      <Pressable
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUrl }}
            accessibilityLabel={imageAlt}
            style={[
              styles.image,
              { transform: [{ scale: isActive ? 1.05 : 1 }] },
            ]}
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentWrapper}>
          {/* Title (reserve space for two lines) */}
          <View style={styles.titleContainer}>
            <Text
              style={[styles.title, isSmallMobile && styles.titleSmall]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>

          {/* Description (reserve space for three lines) */}
          <View style={styles.descriptionContainer}>
            <Text
              style={[
                styles.description,
                isSmallMobile && styles.descriptionSmall,
                { textAlign: "justify" },
              ]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    overflow: "hidden",
    width: "100%",
    maxWidth: 400,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB", // gray-200
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageWrapper: {
    height: 192, // 48 * 4
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleContainer: {
    minHeight: 48, // enough for two lines of text-lg (~24px lineHeight)
    marginBottom: 8,
  },
  title: {
    fontSize: 18, // text-lg
    fontWeight: "bold",
    color: "#000",
    lineHeight: 24,
  },
  titleSmall: {
    fontSize: 16,
    lineHeight: 22,
  },
  descriptionContainer: {
    minHeight: 60, // enough for three lines of text-sm (~20px lineHeight)
  },
  description: {
    fontSize: 14, // text-sm
    color: "#4B5563", // gray-600
    lineHeight: 20,
  },
  descriptionSmall: {
    fontSize: 12,
    lineHeight: 18,
  },
});
