// app/codelabs/[id].tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CodelabDetails() {
  // Read "id" from the path and optional "ref" query parameter
  const { id, ref } = useLocalSearchParams<{ id: string; ref?: string }>();

  // You can now safely use `id` and `ref`
  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-2">Lab ID: {id}</Text>
      {ref && <Text className="text-gray-500 mb-4">Referred from: {ref}</Text>}
      <Pressable
        className="px-5 py-3 bg-blue-500 rounded-lg"
        onPress={() => {
          /* start the lab */
        }}
      >
        <Text className="text-white text-center font-medium">Start Lab</Text>
      </Pressable>
    </View>
  );
}
