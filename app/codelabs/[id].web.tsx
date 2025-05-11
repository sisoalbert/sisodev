// app/codelabs/[id].web.tsx
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CodelabContent from "@/components/CodelabContent";
import { supabase } from "@/lib/supabase";
import { CodelabData } from "@/types";
import Head from "expo-router/head";

export default function CodelabDetails() {
  const router = useRouter();
  const { id, ref, returnTo } = useLocalSearchParams<{
    id: string;
    ref?: string;
    returnTo?: string;
  }>();

  const [codelab, setCodelab] = useState<CodelabData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);

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

        // Get the current user session
        const { data: sessionResult, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
        } else {
          setSessionData(sessionResult);
        }

        // Fetch the codelab with the matching ID
        const { data, error: fetchError } = await supabase
          .from("codelabs")
          .select("*")
          .eq("slug", id)
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
          creator_id: data.creator_id, // Store the creator's ID
        };

        // Parse the content (which contains the sections)
        try {
          const content = JSON.parse(data.content);
          if (content.sections && Array.isArray(content.sections)) {
            formattedCodelab.sections = content.sections;
          }
        } catch (parseError) {
          console.log("Error parsing codelab content:", parseError);
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
        console.log("Error fetching codelab:", err);
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
    // 1️⃣ normalise to a single string
    const raw = Array.isArray(returnTo) ? returnTo[0] : returnTo;
    console.log("Raw returnTo:", raw);
    // 2️⃣ decide where to go
    const target = raw ? decodeURIComponent(raw) : "/codelabs";

    console.log("Navigating to:", target);
    // 3️⃣ navigate
    if (target === "/codelabs") {
      router.replace("/codelabs");
    } else if (target === "/codelabs/mine") {
      router.replace("/codelabs/mine");
    } else if (target.startsWith("/codelabs/") && target !== "/codelabs") {
      const pathId = target.split("/").pop() || "";
      router.replace({ pathname: "/codelabs/[id]", params: { id: pathId } });
    } else {
      // Default fallback
      router.replace("/");
    }
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
      <Head>
        <title>{codelab.title}</title>
        <meta name="description" content={codelab.title} />
      </Head>
      <CodelabContent
        data={codelab}
        codelabId={id}
        creator_id={codelab.creator_id}
        sessionData={sessionData}
      />
    </View>
  );
}
