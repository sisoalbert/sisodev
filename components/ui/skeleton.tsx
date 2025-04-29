import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Animated, Easing, DimensionValue } from 'react-native';

interface SkeletonContentProps {
  /**
   * Width of the skeleton content
   */
  width?: DimensionValue;
  /**
   * Height of the skeleton content
   */
  height?: DimensionValue;
  /**
   * Border radius of the skeleton content
   */
  borderRadius?: number;
  /**
   * Whether the skeleton animation is active
   * @default true
   */
  isLoading?: boolean;
  /**
   * Layout style for positioning the skeleton
   */
  style?: ViewStyle;
  /**
   * Background color of the skeleton before animation
   * @default "#E1E9EE"
   */
  backgroundColor?: string;
  /**
   * Highlight color during animation
   * @default "#F2F8FC"
   */
  highlightColor?: string;
  /**
   * Speed of the animation in milliseconds
   * @default 800
   */
  speed?: number;
  /**
   * Direction of the animation
   * @default "right"
   */
  direction?: 'left' | 'right';
}

export const SkeletonContent: React.FC<SkeletonContentProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  isLoading = true,
  style = {},
  backgroundColor = '#E1E9EE',
  highlightColor = '#F2F8FC',
  speed = 800,
  direction = 'right',
}) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    if (isLoading) {
      startAnimation();
    } else {
      animatedValue.setValue(0);
    }
  }, [isLoading]);

  const startAnimation = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: speed,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      // Restart animation
      if (isLoading) {
        startAnimation();
      }
    });
  };

  const getAnimationStyle = () => {
    // Calculate numerical width value for animation if width is provided as percentage
    const widthValue = typeof width === 'string' && width.includes('%') ? 100 : width || 0;
    
    const outputRange = direction === 'right' 
      ? [-1 * Number(widthValue), Number(widthValue)] 
      : [Number(widthValue), -1 * Number(widthValue)];
    
    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: outputRange as number[],
    });

    return {
      transform: [{ translateX }],
      backgroundColor: highlightColor,
    };
  };

  if (!isLoading) {
    return null;
  }

  return (
    <View
      style={[
        {
          width: width as DimensionValue,
          height: height as DimensionValue,
          borderRadius,
          backgroundColor,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.absoluteFill,
          {
            width: '100%',
            height: '100%',
          },
          getAnimationStyle(),
        ]}
      />
    </View>
  );
};

// Layout helpers for common skeleton patterns
export const SkeletonCircle: React.FC<Omit<SkeletonContentProps, 'borderRadius'>> = (props) => {
  const circleWidth = props.width || props.height || 50;
  const circleHeight = props.height || props.width || 50;
  return (
    <SkeletonContent 
      {...props} 
      borderRadius={1000} 
      width={circleWidth} 
      height={circleHeight} 
    />
  );
};

export const SkeletonRect: React.FC<SkeletonContentProps> = (props) => (
  <SkeletonContent {...props} />
);

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
