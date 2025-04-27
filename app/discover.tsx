import { View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Header } from "@/components/Header";
import { FeaturedCourse } from "@/components/FeaturedCourse";
import { CourseCard } from "@/components/CourseCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Discover = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="min-h-screen bg-background">
      {/* Header */}
      {/* <Header /> */}

      {/* Main Content with centered layout */}
      <ScrollView>
        {/* Container with left and right space */}
        <View className="flex-1 mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-16">
          <View className="gap-4 md:gap-6 py-4">
            {/* Featured Course - Full Width */}
            {/* <FeaturedCourse
              title="Advanced Firebase React Native 2025"
              description="Master Firebase integration with React Native. Learn real-time databases, authentication, and cloud functions."
              imageUrl="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg"
              imageAlt="Firebase Development"
            /> */}

            {/* Course Cards - Centered Grid */}
            <View className="flex-row flex-wrap justify-center gap-4">
              <TouchableOpacity 
                className="w-[48%] md:w-[31%] lg:w-[23%]"
                onPress={() => router.push("/react-native-basics")}
              >
                <CourseCard
                  title="React Native Basics"
                  description="Essential concepts for building your first React Native app."
                  imageUrl="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
                  imageAlt="React Native Basics"
                  buttonText="View Course"
                  isLocked={true}
                  onButtonPress={() => router.push("/react-native-basics")}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                className="w-[48%] md:w-[31%] lg:w-[23%]"
                onPress={() => router.push("/clean-code")}
              >
                <CourseCard
                  title="How to Build Clean Code"
                  description="Best practices for writing maintainable React Native applications."
                  imageUrl="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg"
                  imageAlt="Clean Code"
                  buttonText="View Tutorial"
                  onButtonPress={() => router.push("/clean-code")}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                className="w-[48%] md:w-[31%] lg:w-[23%]"
                onPress={() => router.push("/router-setup")}
              >
                <CourseCard
                  title="React Native Router Setup"
                  description="Implement navigation in your React Native applications."
                  imageUrl="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg"
                  imageAlt="Router Setup"
                  buttonText="View Guide"
                  isLocked={true}
                  onButtonPress={() => router.push("/router-setup")}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                className="w-[48%] md:w-[31%] lg:w-[23%]"
                onPress={() => router.push("/menus")}
              >
                <CourseCard
                  title="Menus with React Native"
                  description="Create custom menus and navigation drawers."
                  imageUrl="https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg"
                  imageAlt="React Native Menus"
                  buttonText="Learn More"
                  onButtonPress={() => router.push("/menus")}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                className="w-[48%] md:w-[31%] lg:w-[23%]"
                onPress={() => router.push("/how-to-guides")}
              >
                <CourseCard
                  title="How To Guides"
                  description="Step-by-step tutorials for common React Native scenarios."
                  imageUrl="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
                  imageAlt="How To Guides"
                  buttonText="Browse Guides"
                  onButtonPress={() => router.push("/how-to-guides")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discover;
