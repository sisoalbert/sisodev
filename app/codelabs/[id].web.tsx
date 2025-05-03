// app/codelabs/[id].web.tsx
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CodelabContent from "@/components/CodelabContent";
import { supabase } from "@/lib/supabase";
import { CodelabData } from "@/types";

export default function CodelabDetails() {
  const router = useRouter();
  const { id, ref } = useLocalSearchParams<{ id: string; ref?: string }>();

  const [codelab, setCodelab] = useState<CodelabData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodelab = async () => {
      if (!id) {
        setError("No codelab ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch the codelab with the matching ID
        const { data, error: fetchError } = await supabase
          .from("codelabs")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          throw new Error("Codelab not found");
        }

        // Format data to match the CodelabData type
        const formattedCodelab: CodelabData = {
          title: data.title,
          lastUpdated: data.last_updated,
          authors: data.authors || [],
          sections: [],
        };

        // Parse the content (which contains the sections)
        try {
          const content = JSON.parse(data.content);
          if (content.sections && Array.isArray(content.sections)) {
            formattedCodelab.sections = content.sections;
          }
        } catch (parseError) {
          console.error("Error parsing codelab content:", parseError);
          // If we can't parse the JSON, create a generic section
          formattedCodelab.sections = [
            {
              id: "content",
              order: 1,
              title: "Content",
              content:
                typeof data.content === "string"
                  ? data.content
                  : "<p>Unable to display content</p>",
            },
          ];
        }

        setCodelab(formattedCodelab);
      } catch (err) {
        console.error("Error fetching codelab:", err);
        setError(
          "Could not load the codelab. It may not exist or you may not have permission to view it."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCodelab();
  }, [id]);

  const handleBackToList = () => {
    router.push("/codelabs");
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white p-6 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-gray-600">Loading codelab...</Text>
      </View>
    );
  }

  if (error || !codelab) {
    return (
      <View className="flex-1 bg-white p-6">
        <Text className="text-2xl font-bold mb-4 text-red-600">Error</Text>
        <Text className="text-lg mb-6">
          {error || "Could not load codelab"}
        </Text>
        <View className="border-t border-gray-200 pt-6">
          <Text
            className="text-blue-600 font-medium"
            onPress={handleBackToList}
          >
            ← Back to codelabs
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white h-screen w-full">
      <CodelabContent data={codelab} />
    </View>
  );
}
