import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlock from "@tiptap/extension-code-block";
import { supabase } from "@/lib/supabase";
import { CodelabData, Section } from "@/types";
import { router } from "expo-router";
import { PostgrestResponse } from "@supabase/supabase-js";
import { useAuth } from "@/lib/auth-provider";

export default function CodelabEditor() {
  const { session } = useAuth();

  const [codelabData, setCodelabData] = useState<CodelabData>({
    title: "",
    lastUpdated: new Date().toISOString(),
    authors: [""],
    sections: [
      {
        id: "section-" + Date.now(),
        order: 1,
        title: "Overview",
        content: "<p>Enter your content here...</p>",
      },
    ],
  });

  const [activeSection, setActiveSection] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create an editor for each section
  const editor = useEditor({
    extensions: [StarterKit, CodeBlock],
    content: codelabData.sections[activeSection]?.content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      updateSectionContent(activeSection, html);
    },
  });

  // Update title
  const updateTitle = (title: string) => {
    setCodelabData((prev) => ({
      ...prev,
      title,
    }));
  };

  // Update authors
  const updateAuthor = (index: number, name: string) => {
    const newAuthors = [...codelabData.authors];
    newAuthors[index] = name;
    setCodelabData((prev) => ({
      ...prev,
      authors: newAuthors,
    }));
  };

  // Add another author field
  const addAuthor = () => {
    setCodelabData((prev) => ({
      ...prev,
      authors: [...prev.authors, ""],
    }));
  };

  // Remove an author
  const removeAuthor = (index: number) => {
    if (codelabData.authors.length <= 1) return;

    const newAuthors = [...codelabData.authors];
    newAuthors.splice(index, 1);
    setCodelabData((prev) => ({
      ...prev,
      authors: newAuthors,
    }));
  };

  // Add a new section
  const addSection = () => {
    const newOrder = codelabData.sections.length + 1;
    const newSection: Section = {
      id: "section-" + Date.now(),
      order: newOrder,
      title: `Section ${newOrder}`,
      content: "<p>Enter your content here...</p>",
    };

    setCodelabData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  // Update section title
  const updateSectionTitle = (index: number, title: string) => {
    const newSections = [...codelabData.sections];
    newSections[index] = {
      ...newSections[index],
      title,
    };

    setCodelabData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  // Update section content
  const updateSectionContent = (index: number, content: string) => {
    const newSections = [...codelabData.sections];
    newSections[index] = {
      ...newSections[index],
      content,
    };

    setCodelabData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  // Remove a section
  const removeSection = (index: number) => {
    if (codelabData.sections.length <= 1) return;

    const newSections = [...codelabData.sections];
    newSections.splice(index, 1);

    // Reorder the remaining sections
    newSections.forEach((section, idx) => {
      section.order = idx + 1;
    });

    setCodelabData((prev) => ({
      ...prev,
      sections: newSections,
    }));

    if (activeSection >= newSections.length) {
      setActiveSection(newSections.length - 1);
    }
  };

  // Check if the form is valid
  const validateForm = (): boolean => {
    if (!codelabData.title.trim()) {
      setError("Title is required");
      return false;
    }

    if (codelabData.authors.some((author) => !author.trim())) {
      setError("All author fields must be filled");
      return false;
    }

    if (codelabData.sections.some((section) => !section.title.trim())) {
      setError("All section titles must be filled");
      return false;
    }

    setError(null);
    return true;
  };

  // Add effect to check Supabase connection on component mount
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        // Simple query to verify connection
        const { data, error } = await supabase
          .from("codelabs")
          .select("count", { count: "exact", head: true });

        console.log(
          "Supabase connection test:",
          error ? "Failed" : "Successful"
        );
        if (error) {
          console.error("Supabase connection error:", error);
        } else {
          console.log("Supabase connection OK, count query result:", data);
        }
      } catch (err) {
        console.error("Error testing Supabase connection:", err);
      }
    };

    checkSupabaseConnection();
  }, []);

  // Save the codelab
  const saveCodelab = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Format data to match the Supabase table schema
      // Based on the schema: id, title, content, last_updated, authors
      const dataToSave = {
        title: codelabData.title,
        content: JSON.stringify({
          sections: codelabData.sections,
        }), // Storing sections in the content field as JSON
        last_updated: new Date().toISOString(), // Using the correct column name with underscore
        authors: codelabData.authors, // This is already an array as expected by the schema
      };

      console.log(
        "Attempting to save codelab to Supabase with corrected schema:",
        JSON.stringify(dataToSave, null, 2)
      );

      // Insert with proper column names matching the schema
      const response: PostgrestResponse<any> = await supabase
        .from("codelabs")
        .insert(dataToSave)
        .select();

      const { data, error } = response;

      console.log("Supabase insert response:", response);
      console.log("Supabase response data:", data);

      if (error) {
        console.error("Supabase error details:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error details:", error.details);
        throw error;
      }

      console.log("Codelab saved successfully:", data);

      // Safely log any data that might be returned
      if (data && Array.isArray(data) && data.length > 0) {
        console.log("First item:", data[0]);
        if (data[0] && typeof data[0] === "object") {
          console.log("Properties:", Object.keys(data[0]));
        }
      } else {
        console.log("Data is not an array or is empty");
      }

      // Check for local storage saving as fallback
      console.log("Attempting to save to local storage as fallback");
      try {
        localStorage.setItem("codelab_draft", JSON.stringify(dataToSave));
        console.log("Saved to local storage successfully");
      } catch (localErr) {
        console.error("Could not save to local storage:", localErr);
      }

      setSuccess(true);
      setIsLoading(false);
      console.log("Save operation completed, redirecting to home in 2 seconds");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("Error saving codelab:", err);
      if (err instanceof Error) {
        console.error("Error name:", err.name);
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      }
      setIsLoading(false);

      // Attempt fallback to local storage
      try {
        const dataToSave = {
          ...codelabData,
          lastUpdated: new Date().toISOString(),
        };
        localStorage.setItem("codelab_draft", JSON.stringify(dataToSave));
        console.log("Saved to local storage as fallback due to error");
        setError(
          "Could not save to Supabase, but saved draft locally. Please check console logs."
        );
      } catch (localErr) {
        console.error("Failed fallback save to local storage:", localErr);
        setError(
          "Failed to save codelab. Please try again and check console logs for details."
        );
      }
    }
  };

  // Switch between sections in the editor
  const switchSection = (index: number) => {
    // Save current content first
    if (editor) {
      const html = editor.getHTML();
      updateSectionContent(activeSection, html);
    }

    // Switch to new section
    setActiveSection(index);
    if (editor) {
      editor.commands.setContent(codelabData.sections[index].content);
    }
  };
  const { width } = useWindowDimensions();

  // Calculate responsive container width based on screen size
  const getContainerWidth = () => {
    if (width >= 1024) return Math.min(800, width * 0.6); // Desktop
    if (width >= 768) return Math.min(600, width * 0.8); // Tablet
    return width * 0.95; // Mobile with small margin
  };

  const containerWidth = getContainerWidth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={[
          styles.container,
          { maxWidth: 800 },
          { width: containerWidth, alignSelf: "center" },
        ]}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create New Codelab</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? (
            <Text style={styles.success}>Codelab saved successfully!</Text>
          ) : null}
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={codelabData.title}
            onChangeText={updateTitle}
            placeholder="Enter codelab title"
          />

          <Text style={styles.label}>Authors</Text>
          {codelabData.authors.map((author, index) => (
            <View key={`author-${index}`} style={styles.authorRow}>
              <TextInput
                style={[styles.input, styles.authorInput]}
                value={author}
                onChangeText={(text) => updateAuthor(index, text)}
                placeholder="Author name"
              />
              <Button
                title="-"
                onPress={() => removeAuthor(index)}
                disabled={codelabData.authors.length <= 1}
              />
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <Button title="Add Author" onPress={addAuthor} />
          </View>
        </View>

        {/* Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sections</Text>

          <View style={styles.sectionTabs}>
            {codelabData.sections.map((section, index) => (
              <View
                key={section.id}
                style={[
                  styles.sectionTab,
                  activeSection === index && styles.activeSectionTab,
                ]}
              >
                <Button
                  title={section.title}
                  onPress={() => switchSection(index)}
                  color={activeSection === index ? "#3b82f6" : "#6b7280"}
                />
              </View>
            ))}
            <Button title="+ Add Section" onPress={addSection} />
          </View>

          {/* Current Section Editor */}
          <View style={styles.sectionEditor}>
            <Text style={styles.label}>Section Title</Text>
            <TextInput
              style={styles.input}
              value={codelabData.sections[activeSection]?.title || ""}
              onChangeText={(text) => updateSectionTitle(activeSection, text)}
              placeholder="Section title"
            />

            <Text style={styles.label}>Content</Text>
            <View style={styles.editorContainer}>
              <EditorContent editor={editor} style={styles.editor} />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Remove Section"
                onPress={() => removeSection(activeSection)}
                disabled={codelabData.sections.length <= 1}
                color="#ef4444"
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <Pressable 
            style={({pressed}) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed
            ]}
            onPress={saveCodelab}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>Save Codelab</Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  error: {
    color: "#ef4444",
    marginVertical: 10,
  },
  success: {
    color: "#10b981",
    marginVertical: 10,
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  authorInput: {
    flex: 1,
    marginRight: 8,
    marginBottom: 0,
  },
  buttonContainer: {
    marginVertical: 8,
  },
  sectionTabs: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 8,
  },
  sectionTab: {
    borderRadius: 4,
    overflow: "hidden",
  },
  activeSectionTab: {
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  sectionEditor: {
    marginTop: 16,
  },
  editorContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    backgroundColor: "#fff",
    minHeight: 300,
    marginBottom: 16,
  },
  editor: {
    height: "100%",
    padding: 8,
  },
  saveButtonContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 160,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 400,
  },
  saveButtonPressed: {
    backgroundColor: "#2563eb",
    transform: [{ scale: 0.98 }],
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
