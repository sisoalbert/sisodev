import React from "react";
import { View, Text, Image } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  isLocked?: boolean;
  onButtonPress?: () => void;
}

export const CourseCard = ({
  title,
  description,
  imageUrl,
  imageAlt,
  buttonText,
  isLocked = false,
  onButtonPress,
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden w-full max-w-[400px] min-h-[280px]">
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
          <Text numberOfLines={1} ellipsizeMode="tail">{title}</Text>
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
        <Button 
          variant="secondary" 
          className="w-full" 
          onPress={onButtonPress}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
