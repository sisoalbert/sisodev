// app/codelabs/index.tsx
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
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

  return (
    <ScrollView
      className="p-4 bg-gray-100"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {loading ? (
        <View className="py-8 items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View className="py-8">
          <Text className="text-lg text-red-600 text-center">{error}</Text>
        </View>
      ) : (
        <View className="space-y-4">
          {codelabs.length === 0 ? (
            <View className="py-8">
              <Text className="text-lg text-center p-4">
                No codelabs found. Create one to get started!
              </Text>
            </View>
          ) : (
            codelabs.map((lab) => (
              <CodelabCard
                key={lab.id}
                title={lab.title}
                description={lab.description || "Click to view this codelab"}
                imageUrl="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
                imageAlt="Codelab Preview"
                onPress={() => router.push(`/codelabs/${lab.id}`)}
              />
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}
