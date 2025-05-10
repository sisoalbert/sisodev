//components/CodelabContent.tsx
import React, { useEffect, useState } from "react";
import { CodelabData } from "../types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";
import SectionNavigation from "./SectionNavigation";
import CodelabHeader from "./CodelabHeader";
import CodelabSection from "./CodelabSection";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface CodelabContentProps {
  data: CodelabData;
  creator_id?: string;
  codelabId?: string; // Adding ID for edit/delete operations
  sessionData?: { session: Session };
}

const CodelabContent: React.FC<CodelabContentProps> = ({
  data,
  creator_id,
  codelabId,
  sessionData,
}) => {
  const {
    s,
    "#": hash,
    returnTo,
  } = useLocalSearchParams<{ s?: string; "#"?: string; returnTo?: string }>();
  const router = useRouter();

  const [currentSectionId, setCurrentSectionId] = useState<string>(
    s || hash || data.sections[0]?.id || ""
  );

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

  useEffect(() => {
    setCurrentSectionId(s || hash || data.sections[0]?.id || "");
  }, [s, hash]);
  // Get the current user session
  const userId = sessionData?.session?.user?.id;

  // State to control the drawer visibility on mobile
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentSection = data.sections.find(
    (section) => section.id === currentSectionId
  );

  // Function to toggle drawer
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Function to close drawer (for when a section is selected)
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleDelete = async () => {
    if (codelabId && userId === creator_id) {
      try {
        // Generate the folder name using the same logic as in the image upload function
        const folderName = data.title
          ? data.title
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "-")
              .replace(/-+/g, "-")
              .replace(/^-|-$/g, "")
          : `user-${creator_id}`;

        // First, list all files in the folder
        const { data: storageFiles, error: listError } = await supabase.storage
          .from("codelabs")
          .list(folderName);

        if (listError) {
          console.error("Error listing files:", listError.message);
          // Continue with deletion even if listing files fails
        } else if (storageFiles && storageFiles.length > 0) {
          // Create an array of file paths to delete
          const filesToDelete = storageFiles.map(
            (file) => `${folderName}/${file.name}`
          );

          // Delete all files in the folder
          const { error: deleteFilesError } = await supabase.storage
            .from("codelabs")
            .remove(filesToDelete);

          if (deleteFilesError) {
            console.error("Error deleting files:", deleteFilesError.message);
            // Continue with codelab deletion even if file deletion fails
          } else {
            console.log(`Deleted ${filesToDelete.length} files from storage`);
          }
        }

        // Delete the codelab record from the database
        const { error } = await supabase
          .from("codelabs")
          .delete()
          .eq("slug", codelabId);

        if (error) {
          console.error("Delete failed:", error.message);
          Alert.alert("Delete Failed", error.message);
        } else {
          console.log("Codelab and associated files deleted successfully");
          Alert.alert(
            "Success",
            "Codelab and all associated files deleted successfully"
          );
          router.push("/codelabs");
        }
      } catch (error) {
        console.error("Delete operation error:", error);
        Alert.alert(
          "Error",
          "An unexpected error occurred while deleting the codelab"
        );
      }
    } else {
      console.warn("Unauthorized: You can only delete your own codelab.");
      Alert.alert("Unauthorized", "You can only delete your own codelab.");
    }
  };

  // Modified section selection handler to close drawer on mobile after selection
  const handleSectionSelect = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    closeDrawer();
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile drawer toggle button - only visible on mobile */}
        <div className="md:hidden bg-white p-4 border-b border-gray-200">
          <button
            onClick={toggleDrawer}
            className="flex items-center space-x-1 text-blue-600 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>Sections</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 h-full relative">
          {/* Mobile drawer overlay - only visible when drawer is open on mobile */}
          {isDrawerOpen && (
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-10"
              onClick={closeDrawer}
            />
          )}

          {/* Side navigation - hidden on mobile by default, shown as drawer when isDrawerOpen is true */}
          <div
            className={`${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} 
              md:translate-x-0 fixed md:relative z-20 bg-gray-50 h-full overflow-y-auto 
              transition-transform duration-300 ease-in-out w-64 md:w-64`}
          >
            <div className="pb-8">
              {/* Close button for drawer - only visible on mobile */}
              <div className="md:hidden p-4 flex justify-end">
                <button onClick={closeDrawer} className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <SectionNavigation
                sections={data.sections}
                currentSectionId={currentSectionId}
                onSelectSection={handleSectionSelect}
              />
            </div>
          </div>

          {/* Main content - full width on mobile */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto pb-12 px-4 md:px-6">
              <div className="mb-4 pt-4">
                <div className="mb-4">
                  <p
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer transition-colors"
                    onClick={handleBackToList}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to codelabs
                  </p>
                </div>
                {codelabId && userId === creator_id && (
                  <div className="flex items-center space-x-3 ">
                    <div
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md cursor-pointer transition-colors flex items-center"
                      onClick={() =>
                        router.navigate({
                          pathname: "/codelabs/edit",
                          params: { id: codelabId },
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <p className="font-medium text-sm">Edit</p>
                    </div>
                    <div
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md cursor-pointer transition-colors flex items-center"
                      onClick={() => {
                        // Show confirmation dialog
                        if (typeof window !== "undefined") {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this codelab?"
                          );
                          if (confirmDelete) {
                            // Navigate to delete page or perform delete operation
                            handleDelete();
                          }
                        } else {
                          // React Native Alert for mobile
                          Alert.alert(
                            "Confirm Delete",
                            "Are you sure you want to delete this codelab?",
                            [
                              { text: "Cancel", style: "cancel" },
                              {
                                text: "Delete",
                                style: "destructive",
                                onPress: () =>
                                  router.push(`/codelabs/delete/${codelabId}`),
                              },
                            ]
                          );
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <p className="font-medium text-sm">Delete</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-6 ">
                {currentSectionId === data.sections[0]?.id && (
                  <CodelabHeader data={data} />
                )}
              </div>
              {currentSection && <CodelabSection section={currentSection} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodelabContent;
