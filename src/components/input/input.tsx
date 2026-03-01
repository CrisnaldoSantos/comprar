import { TextInput, TextInputProps } from "react-native";
import { inputStyles } from "./input.styles";

export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={inputStyles.container} {...rest} />;
}
