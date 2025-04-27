import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeaturedCourseProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export const FeaturedCourse = ({
  title,
  description,
  imageUrl,
  imageAlt,
}: FeaturedCourseProps) => {
  return (
    <Card className="col-span-2 md:col-span-3 lg:col-span-4 bg-primary/5 overflow-hidden">
      <View className="relative h-48 w-full">
        <Image 
          source={{ uri: imageUrl }}
          accessibilityLabel={imageAlt}
          className="object-cover w-full h-full"
        />
        <View className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <CardTitle className="absolute bottom-4 left-4 text-white text-2xl">
          {title}
        </CardTitle>
      </View>
      <CardContent className="pt-6">
        <Text className="text-muted-foreground mb-4">
          {description}
        </Text>
        <Button>Start Learning</Button>
      </CardContent>
    </Card>
  );
};
