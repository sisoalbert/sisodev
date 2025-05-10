import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CodelabData, Section } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-provider";
import * as ImagePicker from "expo-image-picker";
import { Image, Platform, Alert } from "react-native";
import "./quill-no-scroll.css";

interface CodeLabEditorProps {
  initialData: CodelabData;
  onSave: (data: CodelabData) => void;
  isEditMode?: boolean;
}

// Create a custom image handler for ReactQuill
// We'll need to pass the codelab data to this handler
let editorCodelabData: CodelabData | null = null;

const setEditorCodelabData = (codelabData: CodelabData) => {
  editorCodelabData = codelabData;
};

const imageHandler = async () => {
  try {
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      exif: false,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      console.log("User cancelled image picker.");
      return;
    }

    const image = result.assets[0];

    if (!image.uri) {
      throw new Error("No image uri found");
    }

    // Generate a unique file name
    const timestamp = Date.now();
    const fileExt =
      Platform.OS === "web" && image.fileName
        ? image.fileName.split(".").pop()?.toLowerCase()
        : image.uri?.split(".").pop()?.toLowerCase() || "jpg";

    // Use a folder-based path with a unique identifier for better organization
    // Use similar approach as uploadImage function
    const folderName = editorCodelabData?.title
      ? editorCodelabData.title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "")
      : `content-${timestamp}`;
    const filePath = `${folderName}/content-${timestamp}.${fileExt}`;

    // Convert to blob for upload
    const response = await fetch(image.uri);
    const blob = await response.blob();

    // Show uploading indicator
    const quill = (window as any).quillRef?.getEditor();
    if (quill) {
      // Save the cursor position
      const range = quill.getSelection();
      if (range) {
        // Insert a placeholder
        quill.insertText(range.index, "Uploading image...");
      }
    }

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("codelabs")
      .upload(filePath, blob, {
        contentType: image.mimeType || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    if (uploadData) {
      // Get the public URL after successful upload
      const { data: publicUrlData } = supabase.storage
        .from("codelabs")
        .getPublicUrl(uploadData.path);

      if (publicUrlData && publicUrlData.publicUrl) {
        // Insert the image into the editor
        const quill = (window as any).quillRef?.getEditor();
        if (quill) {
          // Remove the placeholder if any
          // Get current selection
          const range = quill.getSelection();
          if (range) {
            // Insert the image at the cursor position
            quill.deleteText(
              range.index - "Uploading image...".length,
              "Uploading image...".length
            );
            quill.insertEmbed(range.index, "image", publicUrlData.publicUrl);
            // Move cursor to the next position
            quill.setSelection(range.index + 1);
          }
        }
      }
    }
  } catch (error) {
    console.error("Content image upload error:", error);
    if (error instanceof Error) {
      Alert.alert(
        "Upload Failed",
        error.message || "There was a problem uploading your image."
      );
    } else {
      Alert.alert("Upload Failed", "There was a problem uploading your image.");
    }
  }
};

// Define ReactQuill modules with image upload capability
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "link",
  "image", // Add image format
];

const CodeLabEditor: React.FC<CodeLabEditorProps> = ({
  initialData,
  onSave,
  isEditMode: isEditModeFromProps,
}) => {
  const { session } = useAuth();
  const [data, setData] = useState<CodelabData>(initialData);
  const [isEditMode, setIsEditMode] = useState(true || !!initialData.id);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(data.imageUrl || "");

  // Set the codelab data for the image handler and format date
  useEffect(() => {
    // Format date to yyyy-MM-dd if needed
    const formattedData = {
      ...initialData,
    };

    // Check if lastUpdated exists and is not already in yyyy-MM-dd format
    if (formattedData.lastUpdated) {
      // Handle timestamps with either 'T' separator (ISO) or space separator (Supabase)
      if (formattedData.lastUpdated.includes("T")) {
        // If it's an ISO timestamp with T separator
        formattedData.lastUpdated = formattedData.lastUpdated.split("T")[0];
      } else if (formattedData.lastUpdated.includes(" ")) {
        // If it's a timestamp with space separator (like from Supabase: 2025-05-04 02:28:25.963+00)
        formattedData.lastUpdated = formattedData.lastUpdated.split(" ")[0];
      }
    }

    setData(formattedData);
    setEditorCodelabData(formattedData);
  }, [initialData]);

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "authors") {
      setData({
        ...data,
        authors: value.split(",").map((author) => author.trim()),
      });
    } else if (name === "lastUpdated") {
      // Ensure the date is in yyyy-MM-dd format
      setData({
        ...data,
        [name]: value, // date input already enforces yyyy-MM-dd format
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // Download the image if URL is provided in data
  useEffect(() => {
    if (data.imageUrl) {
      setImageUrl(data.imageUrl);
    }
  }, [data.imageUrl]);

  // Handle image upload
  const uploadImage = async () => {
    try {
      setUploading(true);

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        throw new Error("No image uri found");
      }

      // Generate a unique file name
      const timestamp = Date.now();
      const fileExt =
        Platform.OS === "web" && image.fileName
          ? image.fileName.split(".").pop()?.toLowerCase()
          : image.uri?.split(".").pop()?.toLowerCase() || "jpg";

      // Use a folder-based path with a unique identifier for better organization
      // Use title if available (slugified) or creator_id + timestamp as fallback
      const folderName = data.title
        ? data.title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
        : `${data.creator_id || "user"}-${timestamp}`;
      const filePath = `${folderName}/image-${timestamp}.${fileExt}`;

      // Convert to blob for upload
      const response = await fetch(image.uri);
      const blob = await response.blob();

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("codelabs")
        .upload(filePath, blob, {
          contentType: image.mimeType || "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(`Error uploading image: ${uploadError.message}`);
      }

      if (uploadData) {
        // Get the public URL after successful upload
        const { data: publicUrlData } = supabase.storage
          .from("codelabs")
          .getPublicUrl(uploadData.path);

        if (publicUrlData && publicUrlData.publicUrl) {
          // Update state and data with the new image URL
          setImageUrl(publicUrlData.publicUrl);
          setData({
            ...data,
            imageUrl: publicUrlData.publicUrl,
          });
        }
      }
    } catch (error) {
      console.error("Image upload error:", error);
      if (error instanceof Error) {
        Alert.alert(
          "Upload Failed",
          error.message || "There was a problem uploading your image."
        );
      } else {
        Alert.alert(
          "Upload Failed",
          "There was a problem uploading your image."
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string | number
  ) => {
    // Only update if the value has actually changed
    if (data.sections[index][field] !== value) {
      const newSections = [...data.sections];
      newSections[index] = { ...newSections[index], [field]: value };
      setData({ ...data, sections: newSections });
    }
  };

  const addSection = () => {
    const newSection: Section = {
      id: `section-${data.sections.length + 1}`,
      order: data.sections.length + 1,
      title: "New Section",
      content: "<h1>New Section</h1>\n<p>Add your content here.</p>",
    };
    setData({ ...data, sections: [...data.sections, newSection] });
  };

  const removeSection = (index: number) => {
    const newSections = data.sections.filter((_, i) => i !== index);
    setData({ ...data, sections: newSections });
  };

  const validateForm = (): boolean => {
    if (!data.title.trim()) {
      setSaveError("Title is required");
      console.error("Title is required");
      return false;
    }

    if (data.authors.some((author) => !author.trim())) {
      console.error("All author fields must be filled");
      return false;
    }

    if (data.sections.some((section) => !section.title.trim())) {
      console.error("All section titles must be filled");
      return false;
    }

    return true;
  };

  // -------------------------------------------------------------------------
  // saveToSupabase now accepts an "options" arg so we can distinguish
  // between Save (draft/private) and Publish (published/public).
  // -------------------------------------------------------------------------
  const saveToSupabase = async (opts: { publish?: boolean } = {}) => {
    if (!validateForm()) return;

    const publishMode = !!opts.publish; // true → Publish, false → Save
    const targetStatus = publishMode ? "published" : "draft";
    const targetVisibility = publishMode ? "public" : "private";

    setIsSaving(true);
    setSaveError(null);

    console.log("Saving codelab to Supabase with status:", targetStatus);
    console.log(
      "Saving codelab to Supabase with visibility:",
      targetVisibility
    );

    try {
      const date = new Date();
      const formattedDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");

      // ---------- EDIT MODE -------------------------------------------------
      if (isEditMode && isEditModeFromProps) {
        const updatedData = {
          ...data,
          lastUpdated: formattedDate,
          status: targetStatus as "draft" | "published",
          visibility: targetVisibility as "private" | "public",
        };
        // Let parent handle DB update to avoid double‑writes
        onSave(updatedData);
        setIsSaving(false);
        return;
      }

      // ---------- CREATE MODE ----------------------------------------------
      const dataToSave: any = {
        title: data.title,
        content: JSON.stringify({ sections: data.sections }),
        last_updated: formattedDate,
        authors: data.authors,
        image_url: imageUrl,
        creator_id: session?.user?.id,
        status: targetStatus, // ← NEW
        visibility: targetVisibility, // ← NEW
      };

      const { data: savedData, error } = await supabase
        .from("codelabs")
        .insert(dataToSave)
        .select();

      if (error) throw error;

      // Update local copy with ID + new status/visibility
      if (savedData && savedData.length > 0 && savedData[0].id) {
        const newDataWithId: CodelabData = {
          ...data,
          id: savedData[0].id,
          status: targetStatus as "draft" | "published",
          visibility: targetVisibility as "private" | "public",
        };
        setData(newDataWithId);
        onSave(newDataWithId);
      } else {
        onSave({
          ...data,
          status: targetStatus as "draft" | "published",
          visibility: targetVisibility as "private" | "public",
        });
      }
    } catch (err) {
      console.error("Error saving codelab:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to save");
      // Fallback to local storage
      try {
        localStorage.setItem(
          "codelab_draft",
          JSON.stringify({
            ...data,
            status: targetStatus,
            visibility: targetVisibility,
          })
        );
      } catch {}
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = () => saveToSupabase({ publish: false });
  const handlePublish = () => saveToSupabase({ publish: true });

  return (
    <div className="max-w-4xl mx-auto px-4 mb-[calc(100vh/2)]">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Create New Codelab
        </h1>
        <div className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            {isEditMode ? (
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleMetadataChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            ) : (
              <h1 className="text-2xl font-bold">{data.title}</h1>
            )}
          </div>
          {/* AUTHORS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Authors (comma-separated)
            </label>
            {isEditMode ? (
              <input
                type="text"
                name="authors"
                value={data.authors.join(", ")}
                onChange={handleMetadataChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            ) : (
              <p className="text-sm text-gray-600">{data.authors.join(", ")}</p>
            )}
          </div>
          {/* COVER IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {imageUrl ? (
                <div className="relative w-32 h-32 overflow-hidden rounded-md border">
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 128, height: 128, objectFit: "cover" }}
                    accessibilityLabel="Codelab cover image"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 flex items-center justify-center rounded-md border bg-gray-100">
                  <AntDesign name="picture" size={24} color="#666" />
                </div>
              )}
              {isEditMode && (
                <button
                  type="button"
                  onClick={uploadImage}
                  disabled={uploading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Upload a cover image for your codelab (recommended 400x300 pixels)
            </p>
          </div>
          {/* DATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Updated
            </label>
            {isEditMode ? (
              <input
                type="date"
                name="lastUpdated"
                value={
                  data.lastUpdated
                    ? data.lastUpdated.includes("T")
                      ? data.lastUpdated.split("T")[0]
                      : data.lastUpdated.includes(" ")
                      ? data.lastUpdated.split(" ")[0]
                      : data.lastUpdated
                    : ""
                }
                onChange={handleMetadataChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            ) : (
              <p className="text-xs text-gray-500">
                Last updated {data.lastUpdated}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Format: yyyy-MM-dd (required by database)
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <AntDesign name={isEditMode ? "eye" : "edit"} size={20} />
            {isEditMode ? "Preview Mode" : "Edit Mode"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {data.sections.map((section, index) => (
          <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Section {section.order}</h3>
              {isEditMode && (
                <button
                  onClick={() => removeSection(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <AntDesign name="delete" size={20} />
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      handleSectionChange(index, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                ) : (
                  <h2 className="text-xl font-semibold mb-2">
                    {section.title}
                  </h2>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                {isEditMode ? (
                  <ReactQuill
                    theme="snow"
                    value={section.content}
                    onChange={(value) =>
                      handleSectionChange(index, "content", value)
                    }
                    modules={modules}
                    formats={formats}
                    className="mb-4"
                    readOnly={false}
                    ref={(el) => {
                      if (el) {
                        (window as any).quillRef = el;
                      }
                    }}
                  />
                ) : (
                  <div
                    className="prose max-w-none mb-4"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p> Error: {saveError}</p>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={addSection}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <AntDesign name="plus" size={20} />
          Add Section
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
              isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isSaving ? (
              <>
                <AntDesign name="loading1" size={20} />
                Saving...
              </>
            ) : (
              <>Save</>
            )}
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving}
            className={`flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg transition-colors ${
              isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {isSaving ? (
              <>
                <AntDesign name="loading1" size={20} />
                Publishing...
              </>
            ) : (
              <>Publish</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Export both the component and the utility functions
export { setEditorCodelabData, imageHandler };
export default CodeLabEditor;
