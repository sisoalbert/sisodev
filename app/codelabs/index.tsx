// app/codelabs/index.tsx
import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { CodelabCard } from "@/components/CodelabCard";

// Sample data for codelabs
const codelabs = [
  {
    id: 1,
    title: "Intro to React",
    description: "Learn the basics of React and how to build components.",
  },
  {
    id: 2,
    title: "Advanced Tailwind",
    description: "Master Tailwind CSS for rapid UI development.",
  },
  {
    id: 3,
    title: "State Management",
    description: "Understand state management with Context API and Redux.",
  },
];

export default function CodelabsIndex() {
  const router = useRouter();

  return (
    <ScrollView
      className="p-4 bg-gray-100"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View className="space-y-4">
        {codelabs.map((lab) => (
          <CodelabCard
            key={lab.id}
            title={lab.title}
            description={lab.description}
            imageUrl="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
            imageAlt="React Native Basics"
            onPress={() => router.push(`/codelabs/${lab.id}`)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
