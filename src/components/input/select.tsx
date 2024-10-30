import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/src/constants/colors";
import { Controller } from "react-hook-form";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface OpitonsProps {
  label: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  control: any;
  placeholder?: string;
  error?: string;
  options: OpitonsProps[];
}

export function Select(props: SelectProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setVisible(true)}
            >
              <Text>
                {value
                  ? props.options.find((option) => option.value === value)
                      ?.label
                  : props.placeholder}
              </Text>
              <Feather name="arrow-down" size={16} color="#000" />
            </TouchableOpacity>

            <Modal
              visible={visible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                  <FlatList
                    contentContainerStyle={{ gap: 4 }}
                    data={props.options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onChange(item.value);
                          setVisible(false);
                        }}
                      >
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
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

  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: colors.white,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 8,
    backgroundColor: colors.white,
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "rgba(208,208,208,0.4)",
  },
});
