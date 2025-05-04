// components/Header.tsx
import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Header() {
  return (
    <View className="flex-row items-center justify-between bg-white px-4 py-2 shadow">
      {/* Logo + App Name */}
      <Pressable
        className="flex-row items-center"
        onPress={() => {
          router.replace("/");
        }}
      >
        <Image
          className="mr-2"
          source={require("../assets/images/icon.png")}
          style={{ height: 30, width: 30 }}
          resizeMode="contain"
        />
        <Text className="text-xl font-bold text-gray-800">Siso Dev</Text>
      </Pressable>

      {/* create + Notifications + Avatar */}
      <View className="flex-row items-center">
        <Pressable
          className="mr-4"
          onPress={() => {
            router.replace("/codelabs/add");
          }}
        >
          <MaterialIcons name="add" size={24} color="gray" />
        </Pressable>

        <Pressable
          className="mr-4"
          onPress={() => {
            router.replace("/notifications");
          }}
        >
          <MaterialIcons name="notifications" size={24} color="gray" />
        </Pressable>
        <Pressable
          onPress={() => {
            router.replace("/account");
          }}
        >
          <View className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden items-center justify-center">
            <FontAwesome name="user" size={20} color="gray" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
