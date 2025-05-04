import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CodelabData, Section } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-provider";
import * as ImagePicker from "expo-image-picker";
import { Image, Platform, Alert } from "react-native";

interface CodeLabEditorProps {
  initialData: CodelabData;
  onSave: (data: CodelabData) => void;
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
}) => {
  const { session } = useAuth();
  const [data, setData] = useState<CodelabData>(initialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(data.imageUrl || "");

  // Set the codelab data for the image handler
  useEffect(() => {
    setEditorCodelabData(initialData);
  }, [initialData]);
  
  // Update the editor codelab data when it changes
  useEffect(() => {
    setEditorCodelabData(data);
  }, [data]);

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "authors") {
      setData({
        ...data,
        authors: value.split(",").map((author) => author.trim()),
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
    const newSections = [...data.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setData({ ...data, sections: newSections });
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

  const saveToSupabase = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      // Format data to match the Supabase table schema
      const dataToSave = {
        title: data.title,
        content: JSON.stringify({
          sections: data.sections,
        }),
        last_updated: new Date().toISOString(),
        authors: data.authors,
        image_url: imageUrl, // Add the image URL to the data saved to Supabase
        creator_id: session?.user?.id, // Add the creator's UUID
        status: "draft", // Default status is draft
        visibility: "private", // Default visibility is private
      };

      // Insert with proper column names matching the schema
      const { data: savedData, error } = await supabase
        .from("codelabs")
        .insert(dataToSave)
        .select();

      if (error) {
        console.error("Error saving to Supabase:", error);
        throw error;
      }

      console.log("Codelab saved successfully:", savedData);

      // Fallback to local storage
      try {
        localStorage.setItem("codelab_draft", JSON.stringify(dataToSave));
      } catch (localErr) {
        console.error("Could not save to local storage:", localErr);
      }

      // Call the onSave callback provided by the parent component
      onSave(data);

      console.log("Codelab saved successfully!");
    } catch (err) {
      console.error("Error saving codelab:", err);
      setSaveError(
        err instanceof Error ? err.message : "Failed to save codelab"
      );
      console.error("Failed to save codelab. Please try again.");

      // Attempt fallback to local storage
      try {
        localStorage.setItem("codelab_draft", JSON.stringify(data));
        console.log("Saved to local storage as fallback due to error");
      } catch (localErr) {
        console.error("Failed fallback save to local storage:", localErr);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = () => {
    saveToSupabase();
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Create New Codelab
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleMetadataChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Authors (comma-separated)
            </label>
            <input
              type="text"
              name="authors"
              value={data.authors.join(", ")}
              onChange={handleMetadataChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

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

              <button
                type="button"
                onClick={uploadImage}
                disabled={uploading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Upload a cover image for your codelab (recommended 400x300 pixels)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Updated
            </label>
            <input
              type="date"
              name="lastUpdated"
              value={data.lastUpdated}
              onChange={handleMetadataChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <AntDesign name={isEditMode ? "edit" : "eye"} size={20} />
            {isEditMode ? "Edit Mode" : "Preview Mode"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {data.sections.map((section, index) => (
          <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Section {section.order}</h3>
              <button
                onClick={() => removeSection(index)}
                className="text-red-600 hover:text-red-800"
              >
                <AntDesign name="delete" size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={section.content}
                  onChange={(value) =>
                    handleSectionChange(index, "content", value)
                  }
                  modules={modules}
                  formats={formats}
                  className="h-64 mb-4"
                  ref={(el) => {
                    // Store reference to quill editor globally for image handler
                    if (el) {
                      (window as any).quillRef = el;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={addSection}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <AntDesign name="plus" size={20} />
          Add Section
        </button>
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
            <>
              <AntDesign name="save" size={20} />
              Save Codelab
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Export both the component and the utility functions
export { setEditorCodelabData, imageHandler };
export default CodeLabEditor;
