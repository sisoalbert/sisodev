// app/codelabs/mine/index.tsx
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ListRenderItem,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { LearningResourceCard } from "@/components/LearningResourceCard";
import { LearningResourceCardSkeleton } from "@/components/LearningResourceCardSkeleton";
import { Ionicons } from "@expo/vector-icons";

interface Codelab {
  id: string;
  title: string;
  content: string;
  last_updated: string;
  authors: string[];
  // For UI display
  description?: string;
  image_url?: string;
}

export default function CodelabsIndex() {
  const router = useRouter();
  const [codelabs, setCodelabs] = useState<Codelab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCodelabs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the current user session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!sessionData?.session?.user) {
          // Not authenticated
          router.replace("/account");
          return;
        }

        const userId = sessionData.session.user.id;

        const { data, error } = await supabase
          .from("codelabs")
          .select("*")
          .eq("creator_id", userId)
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
                  // Remove h1 title first
                  const contentWithoutH1 = firstSection.content
                    .replace(/<h1>.*?<\/h1>/g, "")
                    .trim();

                  // Strip remaining HTML tags to get clean text
                  description = contentWithoutH1.replace(/<[^>]*>/g, "").trim();

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

    fetchUserCodelabs();
  }, []);

  // Render functions for FlatList
  const renderEmptyList = () => (
    <View className="py-12 px-4 items-center justify-center">
      <View className="items-center max-w-md">
        <View className="rounded-full bg-blue-50 p-4 mb-4">
          <Ionicons name="document-text-outline" size={36} color="#3b82f6" />
        </View>
        <Text className="text-xl font-bold text-center mb-2">
          No codelabs yet
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          You haven't created any codelabs yet. Create your first codelab to
          share your knowledge with others.
        </Text>
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg flex-row items-center"
          onPress={() => router.push("/codelabs/create")}
        >
          <Ionicons
            name="add"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-semibold">Create Codelab</Text>
        </TouchableOpacity>
      </View>
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
        imageUrl={
          item.image_url
            ? item.image_url
            : "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
        }
        imageAlt="Codelab Preview"
        onPress={() => router.push(`/codelabs/${item.id}`)}
      />
    </TouchableOpacity>
  );

  if (loading) return renderLoadingState();
  if (error) return renderErrorState();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-1 mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-16">
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-2xl font-bold text-gray-800">My Codelabs</Text>
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-lg flex-row items-center"
            onPress={() => router.push("/codelabs/create")}
          >
            <Ionicons
              name="add"
              size={16}
              color="#fff"
              style={{ marginRight: 4 }}
            />
            <Text className="text-white font-semibold">Create New</Text>
          </TouchableOpacity>
        </View>
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
