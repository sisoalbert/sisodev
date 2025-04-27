import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";

// Sample course data - in a real app, this would come from an API
type CourseData = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  imageAlt: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar: string;
  duration: string;
  modules: number;
  level: string;
  isLocked: boolean;
};

type CoursesData = {
  [key: string]: CourseData;
};

const coursesData: CoursesData = {
  "react-native-basics": {
    id: "react-native-basics",
    title: "React Native Basics",
    description: "Essential concepts for building your first React Native app.",
    fullDescription: "This comprehensive course covers all the essential concepts you need to know to build your first React Native application. From setting up your development environment to deploying your app to the app stores, we'll cover everything step by step.",
    imageUrl: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    imageAlt: "React Native Basics",
    instructor: "Sarah Johnson",
    instructorRole: "Senior Mobile Developer",
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    duration: "4 hours",
    modules: 8,
    level: "Beginner",
    isLocked: true,
  },
  "clean-code": {
    id: "clean-code",
    title: "How to Build Clean Code",
    description: "Best practices for writing maintainable React Native applications.",
    fullDescription: "Learn the best practices for writing clean, maintainable code in your React Native applications. This course will teach you how to structure your code, write effective components, and follow industry standards to ensure your codebase remains scalable and easy to maintain.",
    imageUrl: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    imageAlt: "Clean Code",
    instructor: "Michael Chen",
    instructorRole: "Software Architect",
    instructorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    duration: "5 hours",
    modules: 10,
    level: "Intermediate",
    isLocked: false,
  },
  "router-setup": {
    id: "router-setup",
    title: "React Native Router Setup",
    description: "Implement navigation in your React Native applications.",
    fullDescription: "Navigation is a crucial aspect of any mobile application. This course will guide you through setting up various navigation patterns in React Native using popular libraries like React Navigation and Expo Router. You'll learn to implement stack navigation, tab navigation, drawer navigation and handle deep linking.",
    imageUrl: "https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg",
    imageAlt: "Router Setup",
    instructor: "Alex Rodriguez",
    instructorRole: "Frontend Developer",
    instructorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    duration: "3 hours",
    modules: 6,
    level: "Intermediate",
    isLocked: true,
  },
  "menus": {
    id: "menus",
    title: "Menus with React Native",
    description: "Create custom menus and navigation drawers.",
    fullDescription: "Enhance the user experience of your React Native apps with custom menus and navigation drawers. This course covers different menu types, animations, gestures, and accessibility considerations to create intuitive navigation experiences for your users.",
    imageUrl: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg",
    imageAlt: "React Native Menus",
    instructor: "Emily Wilson",
    instructorRole: "UX Designer & Developer",
    instructorAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
    duration: "2.5 hours",
    modules: 5,
    level: "Advanced",
    isLocked: false,
  },
  "how-to-guides": {
    id: "how-to-guides",
    title: "How To Guides",
    description: "Step-by-step tutorials for common React Native scenarios.",
    fullDescription: "This collection of how-to guides covers a wide range of common scenarios you'll encounter when developing React Native applications. From integrating third-party libraries to optimizing performance and handling device-specific features, these practical guides provide solutions to real-world problems.",
    imageUrl: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    imageAlt: "How To Guides",
    instructor: "David Park",
    instructorRole: "Developer Advocate",
    instructorAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
    duration: "6 hours",
    modules: 12,
    level: "All Levels",
    isLocked: false,
  }
};

const Details = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState<CourseData | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the course details from an API
    // For this example, we're using the sample data
    if (id && typeof id === 'string') {
      setCourse(coursesData[id]);
    }
  }, [id]);

  if (!course) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-foreground text-lg">Loading course details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        {/* Header with back button */}
        <View className="px-4 py-2">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="flex-row items-center"
          >
            <Ionicons name="chevron-back" size={20} color="#000" />
            <Text className="ml-1 text-foreground">Back</Text>
          </TouchableOpacity>
        </View>

        {/* Course Image */}
        <View className="relative h-56 w-full">
          <Image
            source={{ uri: course.imageUrl }}
            accessibilityLabel={course.imageAlt}
            className="h-full w-full object-cover"
          />
          {course.isLocked && (
            <View className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
              <Text className="text-white text-sm">🔒 Premium</Text>
            </View>
          )}
        </View>

        {/* Course Content */}
        <View className="flex-1 px-4 sm:px-6 md:px-8 mx-auto w-full max-w-screen-xl">
          {/* Title and Meta */}
          <View className="py-6 border-b border-gray-200">
            <Text className="text-2xl font-bold text-foreground mb-2">{course.title}</Text>
            
            <View className="flex-row flex-wrap gap-3 mb-4">
              <View className="bg-muted px-3 py-1 rounded-full">
                <Text className="text-xs text-muted-foreground">{course.level}</Text>
              </View>
              <View className="bg-muted px-3 py-1 rounded-full">
                <Text className="text-xs text-muted-foreground">{course.duration}</Text>
              </View>
              <View className="bg-muted px-3 py-1 rounded-full">
                <Text className="text-xs text-muted-foreground">{course.modules} Modules</Text>
              </View>
            </View>

            {/* Instructor */}
            <View className="flex-row items-center mt-4">
              <Image 
                source={{ uri: course.instructorAvatar }}
                className="w-12 h-12 rounded-full"
              />
              <View className="ml-3">
                <Text className="font-medium text-foreground">{course.instructor}</Text>
                <Text className="text-sm text-muted-foreground">{course.instructorRole}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="py-6">
            <Text className="text-lg font-medium text-foreground mb-3">About This Course</Text>
            <Text className="text-base text-muted-foreground mb-6">{course.fullDescription}</Text>
          </View>

          {/* Enroll Button */}
          <View className="py-6 mb-8">
            <Button 
              variant={course.isLocked ? "secondary" : "default"} 
              className="w-full py-4"
            >
              {course.isLocked ? "Unlock Premium Access" : "Enroll in Course"}
            </Button>
            {course.isLocked && (
              <Text className="text-center text-sm text-muted-foreground mt-2">
                This course requires a premium subscription
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
