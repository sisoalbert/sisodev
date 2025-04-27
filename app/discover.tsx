import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Discover = () => {
  return (
    <View>
      <Text>Discover</Text>
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          Hello NativeWind!
        </Text>
        <TouchableOpacity className="mt-4 rounded-md bg-blue-500 px-4 py-2">
          <Text className="text-white">Tap me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({});
