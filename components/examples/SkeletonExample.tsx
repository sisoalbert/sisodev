import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SkeletonContent, SkeletonCircle, SkeletonRect } from "../ui/skeleton";
import { LearningResourceCardSkeleton } from "../LearningResourceCardSkeleton";
import { ThemedText } from "../ThemedText";

/**
 * Example component that showcases different skeleton loading states
 */
export const SkeletonExample = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.heading}>Basic Skeleton Components</ThemedText>
        
        <View style={styles.row}>
          <View style={styles.exampleItem}>
            <ThemedText style={styles.label}>Rectangle</ThemedText>
            <SkeletonRect width={150} height={30} />
          </View>
          
          <View style={styles.exampleItem}>
            <ThemedText style={styles.label}>Circle</ThemedText>
            <SkeletonCircle width={50} height={50} />
          </View>
        </View>
        
        <View style={styles.exampleItem}>
          <ThemedText style={styles.label}>Text Lines</ThemedText>
          <View>
            <SkeletonContent width="100%" height={20} style={styles.textLine} />
            <SkeletonContent width="80%" height={20} style={styles.textLine} />
            <SkeletonContent width="90%" height={20} style={styles.textLine} />
          </View>
        </View>

        <View style={styles.exampleItem}>
          <ThemedText style={styles.label}>Custom Colors</ThemedText>
          <SkeletonContent 
            width={200} 
            height={40} 
            backgroundColor="#D1D5DB" 
            highlightColor="#F3F4F6" 
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.heading}>Card Skeleton</ThemedText>
        <View style={styles.cardGrid}>
          <LearningResourceCardSkeleton />
          <LearningResourceCardSkeleton />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  exampleItem: {
    marginRight: 24,
    marginBottom: 16,
  },
  textLine: {
    marginBottom: 8,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
