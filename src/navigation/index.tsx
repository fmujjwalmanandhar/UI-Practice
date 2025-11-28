import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Explore from "./screens/Explore";
import { Home } from "./screens/Home";
import { NotFound } from "./screens/NotFound";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";

const Tab = createNativeBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator hapticFeedbackEnabled={true}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => ({ sfSymbol: "book" }),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => ({ sfSymbol: "globe" }),
          // preventsDefault: true, // Prevents automatic tab switching
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => ({ sfSymbol: "gear" }),
          // preventsDefault: true, // Prevents automatic tab switching
        }}
      />
    </Tab.Navigator>
  );
}

const Search = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("ExploreStack" as never);
        }}
        hitSlop={20}
        pressRetentionOffset={20}
      >
        <Text>Go to Explore Screen</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const headerOptions = {
  headerShown: true,
  headerLargeTitle: true,
};
const ExploreStackScreens = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        options={({ navigation }) => ({
          ...headerOptions,
          headerTitle: "Explore",
          headerBackVisible: false,
          headerLeft: (props) => (
            <HeaderButton onPress={navigation.goBack}>
              <Text style={{ color: props.tintColor }}>Back</Text>
            </HeaderButton>
          ),
        })}
        component={Explore}
        name="Explore"
      />
    </ExploreStack.Navigator>
  );
};

const ExploreStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "formSheet",
        sheetExpandsWhenScrolledToEdge: true,
        sheetInitialDetentIndex: 1,
        sheetAllowedDetents: [0.3, 0.6, 1],
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    ExploreStack: {
      screen: ExploreStackScreens,
      options: ({ navigation }) => ({
        headerShown: false,
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
