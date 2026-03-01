import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { buttonStyles } from "./button.styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={buttonStyles.container}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={buttonStyles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
