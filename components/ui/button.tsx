import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  children,
  variant = 'default',
  className,
  onPress,
  style,
  textStyle,
}: ButtonProps) => {
  const getButtonClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'outline':
        return 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
      case 'destructive':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        style,
      ]}
      className={`${getButtonClasses()} ${className || ''}`}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
  },
});
