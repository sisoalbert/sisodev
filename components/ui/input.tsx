import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  className?: string;
}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <TextInput
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${className || ''}`}
      placeholderTextColor="#9ca3af" // text-muted-foreground
      {...props}
    />
  );
};
