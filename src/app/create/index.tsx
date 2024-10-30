import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/constants/colors";
import { Header } from "@/src/components/header";
import { Select } from "@/src/components/input/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useDataStore } from "@/src/store/data";
import { router } from "expo-router";

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório!" }),
  level: z.string().min(1, { message: "Selecione o seu nível" }),
  objective: z.string().min(1, { message: "O objetivo é obrigatório!" }),
});

const genderOptions = [
  { label: "Masculino", value: "masculino" },
  { label: "Feminino", value: "feminino" },
];

const levelOptions = [
  {
    label: "Sedentário (pouco ou nenhuma atividade física)",
    value: "Sedentário",
  },
  {
    label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
    value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
  },
  {
    label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
    value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
  },
  {
    label: "Altamente ativo (exercícios 5 a 7 dia por semana)",
    value: "Altamente ativo (exercícios 5 a 7 dia por semana)",
  },
];

const objectiveOptions = [
  { label: "Emagrecer", value: "emagrecer" },
  { label: "Hipertrofia", value: "Hipertrofia" },
  { label: "Hipertrofia + Definição", value: "Hipertrofia e Definição" },
  { label: "Definição", value: "Definição" },
];

type FormData = z.infer<typeof schema>;

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageTwo = useDataStore((store) => store.setPageTwo);

  const handleCreate = (data: FormData) => {
    setPageTwo({
      gender: data.gender,
      level: data.level,
      objective: data.objective,
    });

    router.push("/nutrition");
  };

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo..."
          error={errors.gender?.message}
          options={genderOptions}
        />

        <Text style={styles.label}>Selecione nível de atividade física:</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione o nível de atividade física..."
          error={errors.level?.message}
          options={levelOptions}
        />

        <Text style={styles.label}>Selecione seu objetivo:</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione um objetivo..."
          error={errors.objective?.message}
          options={objectiveOptions}
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

  label: {
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
