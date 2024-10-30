import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface HeaderProps {
  step: string;
  title: string;
}

export function Header({ step, title }: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#000" />
          </Pressable>

          <Text style={styles.text}>
            {step} <Feather name="loader" size={16} color="#000" />
          </Text>
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    backgroundColor: colors.white,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 34,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },

  row: { flexDirection: "row", alignItems: "center", columnGap: 8 },

  text: { fontSize: 18 },

  title: { fontSize: 30, fontWeight: "bold", color: colors.background },
});
