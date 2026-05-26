import { colors, fontFamily } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ICON_SIZE = 24;
const CIRCLE_SIZE = 52;
const LABEL_AREA_HEIGHT = 16;
const TAB_CONTENT_HEIGHT = CIRCLE_SIZE + LABEL_AREA_HEIGHT;
const INDICATOR_ANIMATION_MS = 280;

type TabIconName = keyof typeof Ionicons.glyphMap;

type TabConfig = {
  label: string;
  icon: TabIconName;
  iconActive: TabIconName;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { label: "Home", icon: "home-outline", iconActive: "home" },
  learn: { label: "Learn", icon: "book-outline", iconActive: "book" },
  "ai-teacher": {
    label: "AI Teacher",
    icon: "star-outline",
    iconActive: "star",
  },
  chat: {
    label: "Chat",
    icon: "chatbubble-outline",
    iconActive: "chatbubble",
  },
  profile: {
    label: "Profile",
    icon: "person-outline",
    iconActive: "person",
  },
};

const smoothTiming = {
  duration: INDICATOR_ANIMATION_MS,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const tabCenters = useRef<number[]>([]);
  const indicatorX = useSharedValue(0);
  const hasInitialized = useRef(false);

  const animateToTab = (index: number, animated: boolean) => {
    const center = tabCenters.current[index];
    if (center === undefined) {
      return;
    }
    const targetX = center - CIRCLE_SIZE / 2;
    if (animated) {
      indicatorX.value = withTiming(targetX, smoothTiming);
    } else {
      indicatorX.value = targetX;
    }
  };

  useEffect(() => {
    const center = tabCenters.current[state.index];
    if (center !== undefined) {
      indicatorX.value = withTiming(center - CIRCLE_SIZE / 2, smoothTiming);
    }
  }, [state.index, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const handleTabLayout = (index: number, x: number, width: number) => {
    const center = x + width / 2;
    tabCenters.current[index] = center;

    if (index === state.index) {
      animateToTab(index, hasInitialized.current);
      hasInitialized.current = true;
    }
  };

  return (
    <View
      className="border-t border-border bg-white"
      style={{
        paddingTop: 10,
        paddingBottom: Math.max(insets.bottom, 10),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...styles.tabBarShadow,
      }}
    >
      <View style={styles.tabRow}>
        <Animated.View
          pointerEvents="none"
          style={[styles.indicator, indicatorStyle]}
        />

        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[route.name];
          if (!config) {
            return null;
          }

          const isFocused = state.index === index;
          const color = isFocused ? "#FFFFFF" : colors.neutral.textSecondary;
          const iconName = isFocused ? config.iconActive : config.icon;
          const isLongLabel = route.name === "ai-teacher";

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={config.label}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              }}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                handleTabLayout(index, x, width);
              }}
              style={styles.tabButton}
            >
              <View style={styles.tabContent}>
                <View style={styles.iconArea}>
                  <Ionicons name={iconName} size={ICON_SIZE} color={color} />
                </View>

                <View style={styles.labelArea}>
                  {!isFocused ? (
                    <Text
                      style={[
                        styles.label,
                        isLongLabel && styles.labelCompact,
                      ]}
                      numberOfLines={1}
                    >
                      {config.label}
                    </Text>
                  ) : null}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  tabRow: {
    position: "relative",
    flexDirection: "row",
    height: TAB_CONTENT_HEIGHT,
    alignItems: "center",
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary.purple,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabContent: {
    width: "100%",
    height: TAB_CONTENT_HEIGHT,
    alignItems: "center",
  },
  iconArea: {
    width: "100%",
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  labelArea: {
    width: "100%",
    height: LABEL_AREA_HEIGHT,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 2,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 12,
    color: colors.neutral.textSecondary,
    textAlign: "center",
  },
  labelCompact: {
    fontSize: 10,
    lineHeight: 11,
  },
});
