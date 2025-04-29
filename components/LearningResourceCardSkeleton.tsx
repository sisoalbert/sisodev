import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { SkeletonContent } from "./ui/skeleton";

interface LearningResourceCardSkeletonProps {
  /**
   * Whether the skeleton is loading
   * @default true
   */
  isLoading?: boolean;
  /**
   * Number of skeleton cards to render
   * @default 1
   */
  numCards?: number;
}

export const LearningResourceCardSkeleton: React.FC<
  LearningResourceCardSkeletonProps
> = ({ isLoading = true, numCards = 1 }) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

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

  // Determine if we're on a small mobile device
  const isSmallMobile = screenWidth < 500;

  // Generate an array of the correct length for the number of cards
  const cards = Array.from({ length: numCards }, (_, index) => index);

  // Determine number of columns based on screen width - matching the breakpoints in codelabs index
  const getNumberOfColumns = () => {
    if (screenWidth < 500) return 1; // Small mobile: 1 column
    if (screenWidth < 768) return 2; // Mobile: 2 columns
    if (screenWidth < 1024) return 3; // Tablet: 3 columns
    return 4; // Desktop: 4 columns
  };

  const numColumns = getNumberOfColumns();

  // Function to render a single skeleton card
  const renderSkeletonCard = () => (
    <View style={styles.cardContainer}>
      {/* Image Skeleton */}
      <SkeletonContent
        width="100%"
        height={192}
        borderRadius={8}
        isLoading={isLoading}
        style={styles.imageWrapper}
        backgroundColor="#EDEDED"
      />

      {/* Content Section */}
      <View style={styles.contentWrapper}>
        {/* Title Skeleton (two lines) */}
        <View style={styles.titleContainer}>
          <SkeletonContent
            width="90%"
            height={isSmallMobile ? 22 : 24}
            isLoading={isLoading}
            style={{ marginBottom: 8 }}
          />
          <SkeletonContent
            width="60%"
            height={isSmallMobile ? 22 : 24}
            isLoading={isLoading}
          />
        </View>

        {/* Description Skeleton (three lines) */}
        <View style={styles.descriptionContainer}>
          <SkeletonContent
            width="100%"
            height={isSmallMobile ? 18 : 20}
            isLoading={isLoading}
            style={{ marginBottom: 6 }}
          />
          <SkeletonContent
            width="100%"
            height={isSmallMobile ? 18 : 20}
            isLoading={isLoading}
            style={{ marginBottom: 6 }}
          />
          <SkeletonContent
            width="75%"
            height={isSmallMobile ? 18 : 20}
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );

  // For multiple cards, use a grid layout
  if (numCards > 1) {
    return (
      <View style={styles.gridContainer}>
        {cards.map((index) => (
          <View
            key={`skeleton-${index}`}
            style={[
              styles.cardWrapper,
              {
                width:
                  numColumns === 1
                    ? "100%"
                    : numColumns === 2
                    ? "50%"
                    : numColumns === 3
                    ? "33.33%"
                    : "25%",
                paddingHorizontal: 8,
              },
            ]}
          >
            {renderSkeletonCard()}
          </View>
        ))}
      </View>
    );
  }

  // For a single card, just render it directly
  return renderSkeletonCard();
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleContainer: {
    minHeight: 48, // enough for two lines of text
    marginBottom: 8,
  },
  descriptionContainer: {
    minHeight: 60, // enough for three lines of text
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: 1600, // Max width for desktop to match max-w-screen-xl in the codelabs index
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  cardWrapper: {
    marginBottom: 16,
    alignItems: "center",
    maxWidth: 300,
  },
});
