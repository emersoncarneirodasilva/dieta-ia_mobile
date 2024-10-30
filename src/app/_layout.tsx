import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="step/index" options={{ headerShown: false }} />
        <Stack.Screen name="create/index" options={{ headerShown: false }} />
        <Stack.Screen name="nutrition/index" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}