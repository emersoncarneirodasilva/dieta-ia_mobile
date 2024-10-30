import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDataStore } from "@/src/store/data";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/services/api";
import { colors } from "@/src/constants/colors";
import { Data } from "@/src/types/data";
import { Link, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore((store) => store.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw Error("Failed load nutrition");
        }

        // const response = await api.get<ResponseData>("/teste");

        const response = await api.post<ResponseData>("/create", {
          name: user.name,
          age: user.age,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          objective: user.objective,
          level: user.level,
        });

        return response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleShare = async () => {
    try {
      if (data && Object.keys(data).length === 0) return;

      const supplements = `${data?.suplementos.map(
        (suplemento) => `${suplemento}`
      )}`;

      const foods = `${data?.refeicoes.map(
        (refeicao) =>
          `\n- Nome: ${refeicao.nome}\n- Horário: ${
            refeicao.horario
          }\n- Alimentos: ${refeicao.alimentos.map(
            (alimento) => ` ${alimento}`
          )}`
      )}`;

      const message = `Dieate: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n\ Dica Suplementos: ${supplements}`;

      await Share.share({
        message: message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isFetching) {
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Text style={styles.loadingAndErrortext}>
          Estamos gerando sua dieta!
        </Text>
        <Text style={styles.loadingAndErrortext}>Consultando IA...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Text style={styles.loadingAndErrortext}>Falha ao gerar dieta!</Text>
        <Link href="/">
          <Text style={styles.loadingAndErrortext}>Tente novamente!</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha dieta</Text>

          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.nome}</Text>
            <Text style={styles.objective}>Foco: {data.objetivo}</Text>

            <Text style={styles.label}>Refeições:</Text>
            <ScrollView>
              <View style={styles.foods}>
                {data.refeicoes.map((refeicao) => (
                  <View key={refeicao.nome} style={styles.food}>
                    <View style={styles.foodHeader}>
                      <Text style={styles.foodName}>{refeicao.nome}</Text>
                      <Ionicons name="restaurant" size={16} color="#000" />
                    </View>

                    <View style={styles.foodContent}>
                      <Feather name="clock" size={14} color="#000" />
                      <Text>Horário: {refeicao.horario}</Text>
                    </View>

                    <Text style={styles.foodText}>Alimentos</Text>
                    {refeicao.alimentos.map((alimento) => (
                      <Text key={alimento}>{alimento}</Text>
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.supplements}>
                <Text style={styles.supplementName}>Dica de suplementos</Text>
                {data.suplementos.map((suplemento) => (
                  <Text key={suplemento}>{suplemento}</Text>
                ))}
              </View>

              <Pressable
                style={styles.newDietButton}
                onPress={() => router.replace("/")}
              >
                <Text style={styles.newDietButtonText}>Gerar nova dieta</Text>
              </Pressable>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  containerHeader: {
    marginBottom: 16,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    backgroundColor: colors.white,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.background,
  },

  buttonShare: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.blue,
  },

  buttonShareText: {
    fontWeight: "500",
    color: colors.white,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },

  objective: {
    fontSize: 16,
    marginBottom: 24,
    color: colors.white,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },

  foods: {
    gap: 8,
    marginTop: 8,
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.white,
  },

  food: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "rgba(208,208,208,0.4)",
  },

  foodHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  foodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  foodText: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 4,
  },

  supplements: {
    marginVertical: 14,
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.white,
  },

  supplementName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  newDietButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: colors.blue,
  },

  newDietButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },

  loadingAndErrorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  loadingAndErrortext: {
    fontSize: 18,
    marginBottom: 4,
    color: colors.white,
  },
});
