import { queryOptions } from "@tanstack/react-query";
import { Course } from "../types/courseTypes";

// Mock API service for course data
export const fetchCourses = async (): Promise<{ [key: string]: Course[] }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock course data
  return {
    featured: [
      {
        id: "1",
        title: "Complete Mindfulness Journey",
        description: "Master Meditation with this comprehensive 30-day program",
        sessions: 30,
        duration: "10 min avg",
        image: require("../../assets/meditation/mountain_sunset.png"),
      },
      {
        id: "2",
        title: "Sleep Meditation",
        description: "Improve your sleep quality",
        sessions: 21,
        duration: "15 min avg",
        image: require("../../assets/meditation/beach_sunset.png"),
      },
    ],
    sleep: [
      {
        id: "3",
        title: "Night Sky Meditation",
        description: "Drift into sleep under a blanket of stars",
        sessions: 8,
        duration: "12 min avg",
        image: require("../../assets/meditation/night_sky_stars.png"),
      },
      {
        id: "4",
        title: "Ocean Waves",
        description: "Let gentle ocean sounds guide you to deep rest",
        sessions: 12,
        duration: "20 min avg",
        image: require("../../assets/meditation/ocean_waves.png"),
      },
    ],
    stress: [
      {
        id: "5",
        title: "Morning Ritual",
        description: "Start your day with intention and clarity",
        sessions: 7,
        duration: "8 min avg",
        image: require("../../assets/meditation/morning_mountain.png"),
      },
      {
        id: "6",
        title: "Midday Reset",
        description: "Recharge and refocus during your day",
        sessions: 5,
        duration: "10 min avg",
        image: require("../../assets/meditation/midday_beach.png"),
      },
    ],
    focus: [
      {
        id: "7",
        title: "First Steps",
        description: "Learn the basics of meditation technique",
        sessions: 5,
        duration: "7 min avg",
        image: require("../../assets/meditation/meditation_silhouette.png"),
      },
      {
        id: "8",
        title: "Breathing Basics",
        description: "Master fundamental breathing techniques",
        sessions: 7,
        duration: "8 min avg",
        image: require("../../assets/meditation/morning_mountain.png"),
      },
    ],
  };
};

// Query options for courses
export const courseQueryOptions = queryOptions({
  queryKey: ["courses"],
  queryFn: fetchCourses,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Search courses by query
export const searchCourses = async (query: string): Promise<Course[]> => {
  const allCourses = await fetchCourses();

  // Flatten all courses and filter by search query
  const allCoursesArray = Object.values(allCourses).flat();

  if (!query.trim()) {
    return allCoursesArray;
  }

  const lowerQuery = query.toLowerCase();
  return allCoursesArray.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery)
  );
};
