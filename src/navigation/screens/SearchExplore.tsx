import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Pressable, RefreshControl } from "react-native-gesture-handler";
import { courseQueryOptions } from "../../services/courseService";
import { Course } from "../../types/courseTypes";
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7; // Cards take 70% of screen width for slider

// Category mapping to course sections
const categoryMapping: { [key: string]: string } = {
  All: "featured",
  Sleep: "sleep",
  Stress: "stress",
  Focus: "focus",
  Anxiety: "stress", // Reusing stress for anxiety
};

const categories = ["All", "Sleep", "Stress", "Focus", "Anxiety"];

const CourseCard = ({
  course,
  onPress,
}: {
  course: Course;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <Image source={course.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{course.title}</Text>
        <Text style={styles.cardDescription}>{course.description}</Text>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>📚</Text>
            <Text style={styles.metaText}>{course.sessions} sessions</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>⏱️</Text>
            <Text style={styles.metaText}>{course.duration}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const SearchExplore = ({ navigation }: { navigation: any }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: courses,
    isLoading,
    error,
    refetch,
  } = useQuery(courseQueryOptions);

  // Refs for each section
  const scrollViewRef = useRef<ScrollView>(null);
  const categoryScrollRef = useRef<ScrollView>(null);
  const categoryRefs = useRef<{ [key: string]: View | null }>({});
  const featuredRef = useRef<View>(null);
  const sleepRef = useRef<View>(null);
  const stressRef = useRef<View>(null);
  const focusRef = useRef<View>(null);

  const sectionRefs: {
    [key: string]: React.RefObject<View> | React.RefObject<null>;
  } = {
    featured: featuredRef,
    sleep: sleepRef,
    stress: stressRef,
    focus: focusRef,
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);

    // Scroll the category filter horizontally to show selected chip
    const categoryChip = categoryRefs.current[category];
    if (categoryChip && categoryScrollRef.current) {
      categoryChip.measureLayout(
        categoryScrollRef.current as any,
        (x) => {
          categoryScrollRef.current?.scrollTo({
            x: x - 60, // Offset to show chip nicely
            animated: true,
          });
        },
        () => {}
      );
    }

    // Scroll to the corresponding section
    const sectionKey = categoryMapping[category];
    const sectionRef = sectionRefs[sectionKey];

    if (sectionRef?.current && scrollViewRef.current) {
      sectionRef.current.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({
            y: y - 20, // Offset for better visibility
            animated: true,
          });
        },
        () => {}
      );
    }
  };
  // Handle refresh function using react-query refetch
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (refreshError) {
      console.error("Error refreshing courses:", refreshError);
    } finally {
      setIsRefreshing(false);
    }
  };
  const _onPress = () => {
    navigation.navigate("ExploreStack");
  };

  return (
    <View style={styles.container}>
      {/* Header - Fixed */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover your path to mindfulness</Text>
      </View>

      {/* Search Bar - Fixed */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search meditations..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filters - Sticky */}
      <View style={styles.stickyFilterContainer}>
        <ScrollView
          ref={categoryScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              ref={(ref) => {
                categoryRefs.current[category] = ref;
              }}
              style={({ pressed }) => [
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
                pressed && styles.categoryChipPressed,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading courses...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error loading courses</Text>
          </View>
        ) : (
          <>
            {/* Featured Courses */}
            <View ref={featuredRef} style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Courses</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.courseSlider}
              >
                {courses?.featured.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onPress={_onPress}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Sleep */}
            <View ref={sleepRef} style={styles.section}>
              <Text style={styles.sectionTitle}>Sleep</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.courseSlider}
              >
                {courses?.sleep.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onPress={_onPress}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Stress */}
            <View ref={stressRef} style={styles.section}>
              <Text style={styles.sectionTitle}>Stress Relief</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.courseSlider}
              >
                {courses?.stress.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onPress={_onPress}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Focus */}
            <View ref={focusRef} style={styles.section}>
              <Text style={styles.sectionTitle}>Focus & Meditation</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.courseSlider}
              >
                {courses?.focus.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onPress={_onPress}
                  />
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 62,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  stickyFilterContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: "#2DD4BF",
  },
  categoryChipPressed: {
    opacity: 0.7,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  courseGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
  },
  courseSlider: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
    lineHeight: 16,
  },
  cardMeta: {
    flexDirection: "column",
    gap: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 11,
    color: "#888",
  },
  bottomPadding: {
    height: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
  },
});

export default SearchExplore;
