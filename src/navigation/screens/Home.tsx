import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../../components/card";
import FeaturedCard from "../../components/FeaturedCard";
import Header from "../../components/header";
import QuickActions from "../../components/QuickActions";
import RecentActivities from "../../components/RecentActivities";

const HEADER_HEIGHT = 206;
export function Home() {
  const inset = useSafeAreaInsets();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const rstickyElementStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [
              HEADER_HEIGHT + inset.top / 2 - 1,
              HEADER_HEIGHT + inset.top / 2,
              HEADER_HEIGHT + inset.top / 2 + 1,
            ],
            [0, 0, 1]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View style={styles.mainContainer}>
      <Animated.ScrollView
        style={styles.container}
        ref={scrollRef}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}
      >
        <Header />
        <Card />
        <Animated.View style={[styles.header, rstickyElementStyle]}>
          <QuickActions scrollY={scrollOffset} />
        </Animated.View>
        <RecentActivities />
        <FeaturedCard />
      </Animated.ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "white" },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    overflow: "hidden",
    zIndex: 100,
  },
});
