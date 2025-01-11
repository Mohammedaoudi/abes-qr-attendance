import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        { backgroundColor: "#secondary", borderRadius: 12, minHeight: 62 },
        containerStyles,
        isLoading ? { opacity: 0.5 } : null,
      ]}
      disabled={isLoading}
    >
      <Text style={{ color: "#primary", fontWeight: "bold", fontSize: 16, ...textStyles }}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={{ marginLeft: 6 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
