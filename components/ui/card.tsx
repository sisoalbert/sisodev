import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <View className={`bg-card rounded-lg border border-border shadow-sm ${className || ''}`}>
      {children}
    </View>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <View className={`p-6 pb-2 ${className || ''}`}>
      {children}
    </View>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <Text className={`text-xl font-semibold text-card-foreground ${className || ''}`}>
      {children}
    </Text>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <View className={`p-6 pt-0 ${className || ''}`}>
      {children}
    </View>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <View className={`flex flex-row items-center p-6 pt-0 ${className || ''}`}>
      {children}
    </View>
  );
};
