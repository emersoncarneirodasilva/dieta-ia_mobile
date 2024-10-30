import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { router } from "expo-router";

const logoImg = "@/src/assets/images/logo.png";

export default function Home() {
  const goToStep = () => {
    router.push("/step");
  };

  return (
    <View style={styles.container}>
      <Image source={require(logoImg)} />

      <Text style={styles.title}>
        Dieta<Text style={styles.span}>.IA</Text>
      </Text>

      <Text style={styles.text}>
        Sua dieta personalizada com inteligência artificial
      </Text>

      <Pressable style={styles.button} onPress={goToStep}>
        <Text style={styles.textButton}>Gerar Dieta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.green,
  },

  span: {
    color: colors.white,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    width: 240,
    marginVertical: 8,
    color: colors.white,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    marginTop: 34,
    borderRadius: 4,
    backgroundColor: colors.blue,
  },

  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
});
