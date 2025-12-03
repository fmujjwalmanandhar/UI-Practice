import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Navigation } from "./navigation";
Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

export function App() {
  const colorScheme = useColorScheme();
  const [queryClient] = React.useState(() => new QueryClient());

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView>
        <KeyboardProvider preserveEdgeToEdge>
          <QueryClientProvider client={queryClient}>
            <Navigation
              theme={theme}
              linking={{
                enabled: "auto",
                prefixes: [prefix],
              }}
              onReady={() => {
                SplashScreen.hideAsync();
              }}
            />
          </QueryClientProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
