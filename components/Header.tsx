import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <View className="border-b">
      <View className="container mx-auto px-4 py-4 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-4">
          <TouchableOpacity>
            <Text className="font-bold text-xl">≡</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold">React Native Hub</Text>
        </View>
        <View className="flex flex-row items-center gap-4">
          <View className="relative w-64">
            <Input placeholder="🔍 Search tutorials..." />
          </View>
        </View>
      </View>
    </View>
  );
};
