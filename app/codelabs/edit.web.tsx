import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { CodelabData } from "@/types";
import CodeLabEditor from "@/components/editor/CodeLabEditor";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-provider";
import Head from "expo-router/head";

const EditCodelab: React.FC = () => {
  const { session } = useAuth();
  const {
    id: slug,
    returnTo,
    id_for_return,
  } = useLocalSearchParams<{
    id: string;
    returnTo?: string;
    id_for_return?: string;
  }>();

  const [codelab, setCodelab] = useState<CodelabData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodelab = async () => {
      if (!slug) {
        setError("No codelab ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch the codelab with the matching slug
        const { data, error: fetchError } = await supabase
          .from("codelabs")
          .select("*")
          .eq("slug", slug)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          throw new Error("Codelab not found");
        }

        // Check if the user is the creator of this codelab
        if (session?.user.id !== data.creator_id) {
          throw new Error("You don't have permission to edit this codelab");
        }

        // Format data to match the CodelabData type
        const formattedCodelab: CodelabData = {
          title: data.title,
          lastUpdated: data.last_updated,
          authors: data.authors || [],
          sections: [],
          creator_id: data.creator_id,
          imageUrl: data.image_url,
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
          err instanceof Error
            ? err.message
            : "Could not load the codelab. It may not exist or you may not have permission to edit it."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCodelab();
  }, [slug, session]);

  const handleSave = async (updatedData: CodelabData) => {
    try {
      if (!slug || !codelab?.creator_id) {
        throw new Error("No codelab slug or creator ID provided for update");
      }

      // First verify the codelab exists with this slug
      const { data: existingCodelab, error: checkError } = await supabase
        .from("codelabs")
        .select("slug")
        .eq("slug", slug)
        .eq("slug", slug)
        .single();

      if (checkError || !existingCodelab) {
        throw new Error(
          "Codelab not found or you don't have permission to update it"
        );
      }

      // Format data to match the Supabase table schema
      // Format date to yyyy-MM-dd as required by the database
      const date = new Date();
      const formattedDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");

      const dataToSave = {
        title: updatedData.title,
        content: JSON.stringify({
          sections: updatedData.sections,
        }),
        last_updated: formattedDate,
        authors: updatedData.authors,
        image_url: updatedData.imageUrl,
        status: updatedData.status || "draft",
        visibility: updatedData.visibility || "private",
      };

      console.log("Updating codelab with ID:", slug);

      // Update the existing codelab
      const { error, count } = await supabase
        .from("codelabs")
        .update(dataToSave)
        .eq("slug", slug)
        .select();

      if (error) {
        throw error;
      }

      console.log("Update successful");

      // Navigate back to the codelab detail page
      // Navigate back using the returnTo parameter if available
      if (returnTo && typeof returnTo === "string") {
        const decodedReturnTo = decodeURIComponent(returnTo);

        // Handle different return paths
        if (decodedReturnTo === "/codelabs/[id]" && id_for_return) {
          router.push({
            pathname: "/codelabs/[id]",
            params: { id: id_for_return },
          });
        } else if (decodedReturnTo === "/codelabs/mine") {
          router.push("/codelabs/mine");
        } else if (decodedReturnTo === "/codelabs") {
          router.push("/codelabs");
        } else {
          // Default fallback - go to the updated codelab
          router.push(`/codelabs/${slug}`);
        }
      } else {
        // No returnTo parameter - go to the updated codelab
        router.push(`/codelabs/${slug}`);
      }
    } catch (err) {
      console.error("Error updating codelab:", err);
      alert(err instanceof Error ? err.message : "Failed to update codelab");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="ml-3 text-gray-600">Loading codelab...</Text>
      </div>
    );
  }

  if (error || !codelab) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <Text className="text-2xl font-bold mb-4 text-red-600">Error</Text>
          <Text className="text-lg mb-6">
            {error || "Could not load codelab"}
          </Text>
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => {
                // Handle returning when canceling with returnTo parameter
                if (returnTo && typeof returnTo === "string") {
                  const decodedReturnTo = decodeURIComponent(returnTo);

                  // Handle different return paths
                  if (decodedReturnTo === "/codelabs/[id]" && id_for_return) {
                    router.push({
                      pathname: "/codelabs/[id]",
                      params: { id: id_for_return },
                    });
                  } else if (decodedReturnTo === "/codelabs/mine") {
                    router.push("/codelabs/mine");
                  } else if (decodedReturnTo === "/codelabs") {
                    router.push("/codelabs");
                  } else {
                    // Default fallback
                    router.push("/codelabs");
                  }
                } else {
                  // No returnTo parameter - go to codelabs listing
                  router.push("/codelabs");
                }
              }}
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              ← Back to codelabs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <Head>
        <title>Edit Codelab</title>
        <meta name="description" content="Edit Codelab" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Codelab</h1>
        <CodeLabEditor
          initialData={codelab}
          onSave={handleSave}
          isEditMode={true}
        />
      </div>
    </div>
  );
};

export default EditCodelab;
