import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps, ViewStyle } from "react-native";

import { icons } from "../constants";

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles: ViewStyle; // Corrected the type to ViewStyle
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[{ marginBottom: 10 }, otherStyles]}> {/* Corrected style property */}
      <Text style={{ fontSize: 16, color: "#7B7B8B", fontWeight: "bold" }}>{title}</Text>

      <View style={{ width: "100%", height: 60, paddingHorizontal: 16, backgroundColor: "#000", borderRadius: 20, borderWidth: 2, borderColor: "#333", flexDirection: "row", alignItems: "center" }}>
      <TextInput
  style={{ flex: 1, color: "#fff", fontWeight: "bold", fontSize: 16 /* Added placeholder */ }}
  value={value}
  placeholder={placeholder}
  placeholderTextColor="#7B7B8B"
  onChangeText={handleChangeText}
  secureTextEntry={title === "Password" && !showPassword}
  {...props}
/>


        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
