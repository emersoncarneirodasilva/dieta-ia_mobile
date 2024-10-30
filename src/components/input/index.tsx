import { colors } from "@/src/constants/colors";
import { Controller } from "react-hook-form";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface InputProps {
  name: string;
  control: any;
  placeholder?: string;
  rules?: object;
  error?: string;
  keyboardeType: KeyboardTypeOptions;
}

export function Input(props: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            keyboardType={props.keyboardeType}
          />
        )}
      />

      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  input: {
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: colors.white,
  },

  errorText: {
    marginTop: 4,
    color: "#f00",
  },
});
