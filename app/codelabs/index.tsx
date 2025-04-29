// app/codelabs/index.tsx
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ListRenderItem,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { CodelabCard } from "@/components/CodelabCard";
import { supabase } from "@/lib/supabase";

interface Codelab {
  id: string;
  title: string;
  content: string;
  last_updated: string;
  authors: string[];
  // For UI display
  description?: string;
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
                // Extract text content from HTML (simplified approach)
                const firstSection = content.sections[0];
                description = firstSection.title;
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
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  const renderErrorState = () => (
    <View className="py-8">
      <Text className="text-lg text-red-600 text-center">{error}</Text>
    </View>
  );

  // Calculate number of columns based on window width (responsive grid from memory)
  const { width } = useWindowDimensions();
  const getNumberOfColumns = () => {
    if (width < 600) return 2; // Mobile: 2 columns
    if (width < 1024) return 3; // Tablet: 3 columns
    return 4; // Desktop: 4 columns
  };
  
  const numColumns = getNumberOfColumns();

  // Render item for FlatList
  const renderItem: ListRenderItem<Codelab> = ({ item }) => (
    <View style={{ flex: 1/numColumns, padding: 4, maxWidth: 400 }}>
      <CodelabCard
        title={item.title}
        description={item.description || "Click to view this codelab"}
        imageUrl="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
        imageAlt="Codelab Preview"
        onPress={() => router.push(`/codelabs/${item.id}`)}
      />
    </View>
  );

  if (loading) return renderLoadingState();
  if (error) return renderErrorState();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        key={`flatlist-${numColumns}-columns`}
        data={codelabs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={renderEmptyList}
        columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between' } : undefined}
      />
    </View>
  );
}
