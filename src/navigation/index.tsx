import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";
import { Button, HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import Explore from "./screens/Explore";
import { Home } from "./screens/Home";
import { NotFound } from "./screens/NotFound";
import ProfileDetails from "./screens/ProfileDetails";
import SearchExplore from "./screens/SearchExplore";
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
        component={SearchExplore}
        options={{
          tabBarIcon: () => ({ sfSymbol: "globe" }),
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

export function Profile() {
  return (
    <View style={styles.container}>
      <Text>ProfileDetails</Text>
      <Button screen="ProfileStack">Go to ProfileDetails</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

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

const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={({ navigation }) => ({
          ...headerOptions,
          headerTitle: "ProfileDetails",
          headerBackVisible: false,
          headerLeft: (props) => (
            <HeaderButton onPress={navigation.goBack}>
              <Text style={{ color: props.tintColor }}>Back</Text>
            </HeaderButton>
          ),
        })}
        component={ProfileDetails}
        name="ProfileDetails"
      />
    </ProfileStack.Navigator>
  );
};

const ExploreStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
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
    ProfileStack: {
      screen: ProfileStackScreens,
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
