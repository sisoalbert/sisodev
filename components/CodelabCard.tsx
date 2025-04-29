import React, { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Determine if the card is in an active state (hovered or pressed)
  const isActive = isHovered || isPressed;

  return (
    <Card className="overflow-hidden w-full max-w-[400px]">
      <Pressable
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <View
          className="relative h-40"
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            accessibilityLabel={imageAlt}
            className="object-cover w-full h-full"
            style={{
              transform: [{ scale: isActive ? 1.1 : 1 }],
            }}
          />
        </View>
        <CardHeader
          className={`min-h-[72px] py-4 ${
            isActive ? "bg-amber-600" : "bg-yellow-500"
          }`}
        >
          <CardTitle className="flex flex-row items-center gap-2 ">
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-muted-foreground"
            >
              {title}
            </Text>
          </CardTitle>
        </CardHeader>
        <CardContent
          className={`min-h-[88px] pt-0 ${
            isActive ? "bg-white-600" : "bg-white-500"
          }`}
        >
          <Text
            numberOfLines={3}
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
