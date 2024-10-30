import { Header } from "@/src/components/header";
import { Input } from "@/src/components/input";
import { colors } from "@/src/constants/colors";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useDataStore } from "@/src/store/data";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório!" }),
  weight: z.string().min(1, { message: "O peso é obrigatório!" }),
  age: z.string().min(1, { message: "A idade é obrigatória!" }),
  height: z.string().min(1, { message: "A altura é obrigatória!" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageOne = useDataStore((state) => state.setPageOne);

  const handleCreate = (data: FormData) => {
    setPageOne({
      name: data.name,
      weight: data.weight,
      age: data.age,
      height: data.height,
    });

    router.push("/create");
  };

  return (
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos Começar" />

      <ScrollView style={styles.content}>
        <Text style={styles.labe}>Nome:</Text>
        <Input
          name="name"
          control={control}
          placeholder="Digite o seu nome..."
          error={errors.name?.message}
          keyboardeType="default"
        />

        <Text style={styles.labe}>Seu peso atual:</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          keyboardeType="numeric"
        />

        <Text style={styles.labe}>Sua altura atual:</Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1.75"
          error={errors.height?.message}
          keyboardeType="numeric"
        />

        <Text style={styles.labe}>Sua idade atual:</Text>
        <Input
          name="age"
          control={control}
          placeholder="Ex: 25"
          error={errors.age?.message}
          keyboardeType="numeric"
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 16,
  },

  labe: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.white,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    borderRadius: 4,
    backgroundColor: colors.blue,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
});
