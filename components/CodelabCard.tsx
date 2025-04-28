import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CodelabCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  isLocked?: boolean;
  onPress: () => void;
}

export const CodelabCard = ({
  title,
  description,
  imageUrl,
  imageAlt,
  isLocked = false,
  onPress,
}: CodelabCardProps) => {
  return (
    <Card className="overflow-hidden w-full max-w-[400px] min-h-[280px]">
      <Pressable onPress={onPress}>
        <View className="relative h-40 ">
          <Image
            source={{ uri: imageUrl }}
            accessibilityLabel={imageAlt}
            className="object-cover w-full h-full"
          />
        </View>
        <CardHeader className="min-h-[72px] py-4">
          <CardTitle className="flex flex-row items-center gap-2">
            {isLocked && <Text className="text-sm">🔒</Text>}
            <Text numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[88px] pt-0">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-muted-foreground mb-4"
          >
            {description}
          </Text>
        </CardContent>
      </Pressable>
    </Card>
  );
};
