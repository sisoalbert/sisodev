// app/codelabs/index.tsx
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItem,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { LearningResourceCard } from "@/components/LearningResourceCard";
import { LearningResourceCardSkeleton } from "@/components/LearningResourceCardSkeleton";

interface Codelab {
  id: string;
  title: string;
  content: string;
  last_updated: string;
  authors: string[];
  // For UI display
  description?: string;
  imageUrl?: string;
}

export default function CodelabsIndex() {
  const router = useRouter();
  const [codelabs, setCodelabs] = useState<Codelab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodelabs = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("codelabs")
          .select("*")
          .order("last_updated", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          // Process data to extract description from content if needed
          const processedData = data.map((codelab) => {
            let description = "Click to view this codelab";

            // Try to extract first section content as description
            try {
              const content = JSON.parse(codelab.content);
              if (content.sections && content.sections.length > 0) {
                // Extract text content from the first section's content
                const firstSection = content.sections[0];
                // Use content text instead of title
                if (firstSection.content) {
                  // Strip HTML tags to get clean text
                  description = firstSection.content
                    .replace(/<[^>]*>/g, "")
                    .trim();
                  // Limit description length if needed
                  if (description.length > 120) {
                    description = description.substring(0, 120) + "...";
                  }
                }
              }
            } catch (e) {
              console.error("Error parsing codelab content:", e);
            }

            return {
              ...codelab,
              description: description,
            };
          });

          setCodelabs(processedData);
        }
      } catch (err) {
        console.error("Error fetching codelabs:", err);
        setError("Failed to load codelabs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCodelabs();
  }, []);

  // Render functions for FlatList
  const renderEmptyList = () => (
    <View className="py-8">
      <Text className="text-lg text-center p-4">
        No codelabs found. Create one to get started!
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View className="py-8 items-center">
      <LearningResourceCardSkeleton numCards={4} />
    </View>
  );

  const renderErrorState = () => (
    <View className="py-8">
      <Text className="text-lg text-red-600 text-center">{error}</Text>
    </View>
  );

  // Calculate number of columns based on window width
  const { width } = useWindowDimensions();
  const getNumberOfColumns = () => {
    // Determine if we're on a small mobile device (less than 400px)
    const isSmallMobile = width < 500;
    if (isSmallMobile) return 1; // Small mobile: 1 column
    if (width < 768) return 2; // Mobile: 2 columns
    if (width < 1024) return 3; // Tablet: 3 columns
    return 4; // Desktop: 4 columns
  };

  const numColumns = getNumberOfColumns();

  // Render item for FlatList
  const renderItem: ListRenderItem<Codelab> = ({ item }) => (
    <TouchableOpacity
      className={`px-2 ${
        numColumns === 1
          ? "w-full"
          : numColumns === 2
          ? "w-1/2"
          : numColumns === 3
          ? "w-1/3"
          : "w-1/4"
      }`}
      style={{ marginBottom: 16 }}
      onPress={() => router.push(`/codelabs/${item.id}`)}
    >
      <LearningResourceCard
        title={item.title}
        description={item.description || "Click to view this codelab"}
        imageUrl="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
        imageAlt="Codelab Preview"
        onPress={() => router.push(`/codelabs/${item.id}`)}
      />
    </TouchableOpacity>
  );

  if (loading) return renderLoadingState();
  if (error) return renderErrorState();

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-16">
        <FlatList
          key={`flatlist-${numColumns}-columns`}
          data={codelabs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={{ paddingVertical: 16 }}
          ListEmptyComponent={renderEmptyList}
          columnWrapperStyle={numColumns > 1 ? { flexWrap: "wrap" } : undefined}
        />
      </View>
    </View>
  );
}
