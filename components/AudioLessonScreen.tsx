import {
  getAudioLessonBackgroundSource,
  getUserLessonAvatarSource,
  images,
} from "@/constants/images";
import { getLanguageById } from "@/data/lessons";
import { useStreamAudioCall } from "@/hooks/useStreamAudioCall";
import {
  DEFAULT_FEEDBACK_SCORES,
  formatSubtitlesText,
  getTeacherResponseMessage,
  type SessionStatus,
} from "@/lib/audio-lesson";
import { useProgressStore } from "@/store/progress-store";
import type { Lesson } from "@/types/learning";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AudioLessonScreenProps = {
  lesson: Lesson;
};

type ControlKey = "camera" | "mic" | "subtitles" | "end";

const CONTROL_ITEMS: {
  key: ControlKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  destructive?: boolean;
}[] = [
  { key: "camera", label: "Camera", icon: "videocam-outline" },
  { key: "mic", label: "Mic", icon: "mic-outline" },
  { key: "subtitles", label: "Subtitles", icon: "text-outline" },
  { key: "end", label: "End Call", icon: "call", destructive: true },
];

export function AudioLessonScreen({ lesson }: AudioLessonScreenProps) {
  const router = useRouter();
  const { user } = useUser();
  const progress = useProgressStore((state) =>
    state.getProgressForLanguage(lesson.languageId)
  );

  const language = getLanguageById(lesson.languageId);
  const userAvatarUrl = user?.imageUrl;

  const {
    status: streamStatus,
    micMuted,
    errorMessage,
    participantCount,
    localUserName,
    callId,
    toggleMic,
    endCall,
    retry,
  } = useStreamAudioCall({ lesson });

  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [cameraPreviewVisible, setCameraPreviewVisible] = useState(true);
  const [teacherMessage, setTeacherMessage] = useState(lesson.aiTeacher.kickoff);
  const [hasResponded, setHasResponded] = useState(false);

  const sessionStatus: SessionStatus =
    streamStatus === "joined"
      ? "joined"
      : streamStatus === "error"
        ? "error"
        : streamStatus === "ended"
          ? "ended"
          : "connecting";

  const subtitlesText = useMemo(
    () => formatSubtitlesText(lesson.title, lesson.goals, lesson.phrases),
    [lesson]
  );

  const handleControlPress = async (key: ControlKey) => {
    if (key === "end") {
      await endCall();
      router.back();
      return;
    }

    if (key === "mic") {
      if (sessionStatus !== "joined") {
        return;
      }
      await toggleMic();
      if (!hasResponded) {
        setHasResponded(true);
        setTeacherMessage(getTeacherResponseMessage(lesson));
      }
      return;
    }

    if (key === "subtitles") {
      setSubtitlesEnabled((value) => !value);
      return;
    }

    if (key === "camera") {
      setCameraPreviewVisible((value) => !value);
    }
  };

  const sessionLabel =
    sessionStatus === "connecting"
      ? "Connecting…"
      : sessionStatus === "joined"
        ? micMuted
          ? "Joined · Muted"
          : "Joined"
        : sessionStatus === "error"
          ? "Connection failed"
          : sessionStatus === "ended"
            ? "Ended"
            : "Online";

  const sessionDotColor =
    sessionStatus === "joined"
      ? micMuted
        ? "#F59E0B"
        : "#21C16B"
      : sessionStatus === "error"
        ? "#FF4D4F"
        : "#9CA3AF";

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={subtitlesEnabled ? ["top", "bottom"] : ["top"]}
    >
      <View className="relative flex-row items-center px-4 pb-2 pt-1">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          onPress={() => router.back()}
          className="z-10 h-10 w-10 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={24} color="#0D132B" />
        </Pressable>

        <View
          pointerEvents="none"
          className="absolute inset-x-0 items-center px-16"
        >
          <Text className="font-poppins-bold text-lg text-text-primary">
            AI Teacher
          </Text>
          <View className="mt-0.5 flex-row items-center">
            <View
              style={[styles.statusDot, { backgroundColor: sessionDotColor }]}
            />
            <Text className="ml-1.5 font-poppins-medium text-xs text-text-secondary">
              {sessionLabel}
            </Text>
          </View>
        </View>

        <View className="z-10 ml-auto flex-row items-center gap-2">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Lesson video preview"
            className="h-9 w-9 items-center justify-center rounded-full border border-border bg-white"
          >
            <Ionicons name="videocam-outline" size={18} color="#0D132B" />
          </Pressable>

          <View className="h-9 flex-row items-center rounded-full border border-streak bg-white px-2.5">
            <Image
              source={images.streakFire}
              style={styles.streakIcon}
              resizeMode="contain"
            />
            <Text className="ml-1 font-poppins-semibold text-sm text-text-primary">
              {progress.streakDays}
            </Text>
          </View>
        </View>
      </View>

      <View className="mx-4 mb-2 rounded-2xl bg-white/90 px-3 py-2">
        <Text className="font-poppins-semibold text-sm text-lingua-purple">
          {language?.name ?? lesson.languageId.toUpperCase()} · {lesson.title}
        </Text>
        {lesson.goals[0] ? (
          <Text
            className="mt-0.5 font-poppins-medium text-xs text-text-secondary"
            numberOfLines={1}
          >
            Goal: {lesson.goals[0].description}
          </Text>
        ) : null}
        {sessionStatus === "joined" ? (
          <Text className="mt-1 font-poppins-medium text-[11px] text-text-secondary">
            {localUserName} · {participantCount}{" "}
            {participantCount === 1 ? "participant" : "participants"}
            {callId ? ` · ${callId.slice(0, 18)}…` : ""}
          </Text>
        ) : null}
      </View>

      {sessionStatus === "error" && errorMessage ? (
        <View className="mx-4 mb-2 rounded-2xl border border-[#FECACA] bg-[#FEF2F2] px-3 py-3">
          <Text className="font-poppins-semibold text-sm text-[#B91C1C]">
            Could not join lesson call
          </Text>
          <Text className="mt-1 font-poppins-regular text-xs leading-5 text-[#7F1D1D]">
            {errorMessage}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retry connection"
            onPress={retry}
            className="mt-2 self-start rounded-full bg-[#FF4D4F] px-4 py-2"
          >
            <Text className="font-poppins-semibold text-xs text-white">
              Try again
            </Text>
          </Pressable>
        </View>
      ) : null}

      <View
        className="mx-4 mb-4 overflow-hidden rounded-3xl"
        style={subtitlesEnabled ? styles.lessonWindowWithSubtitles : styles.lessonWindow}
      >
        <ImageBackground
          source={getAudioLessonBackgroundSource()}
          style={styles.lessonBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              "rgba(255, 248, 240, 0.12)",
              "rgba(255, 248, 240, 0.38)",
              "rgba(255, 255, 255, 0.88)",
              "rgba(255, 255, 255, 0.96)",
            ]}
            locations={[0, 0.35, 0.72, 1]}
            style={StyleSheet.absoluteFill}
          />

          {cameraPreviewVisible ? (
            <View style={styles.userPip}>
              <Image
                source={getUserLessonAvatarSource(userAvatarUrl)}
                style={styles.userPipImage}
                resizeMode="cover"
              />
            </View>
          ) : null}

          <View className="flex-1 justify-between">
            <View className="flex-1 items-center justify-center px-4 pt-2">
              <Image
                source={images.mascotWelcome}
                style={styles.teacherMascot}
                resizeMode="contain"
              />
            </View>

            <View className="px-4 pb-4">
              <View style={styles.speechBubble}>
                <Text className="flex-1 font-poppins-medium text-[15px] leading-[22px] text-text-primary">
                  {teacherMessage}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Replay teacher audio"
                  hitSlop={8}
                  className="ml-3 h-9 w-9 items-center justify-center rounded-full bg-[#F3EEFF]"
                >
                  <Ionicons name="volume-high" size={20} color="#6C4EF5" />
                </Pressable>
              </View>

              <View className="mt-4 w-full flex-row justify-between px-1">
                {CONTROL_ITEMS.map((item) => {
                  const isMicActive = item.key === "mic" && !micMuted;
                  const isSubtitlesActive =
                    item.key === "subtitles" && subtitlesEnabled;
                  const isHighlighted = isMicActive || isSubtitlesActive;
                  const isDisabled =
                    (item.key === "mic" && sessionStatus !== "joined") ||
                    (item.key === "end" && sessionStatus === "connecting");

                  return (
                    <Pressable
                      key={item.key}
                      accessibilityRole="button"
                      accessibilityLabel={item.label}
                      accessibilityState={{
                        selected: isHighlighted,
                        disabled: isDisabled,
                      }}
                      disabled={isDisabled}
                      onPress={() => void handleControlPress(item.key)}
                      className="items-center"
                    >
                      <View
                        style={[
                          styles.controlButton,
                          item.destructive
                            ? styles.controlButtonEnd
                            : isHighlighted
                              ? styles.controlButtonActive
                              : styles.controlButtonDefault,
                        ]}
                      >
                        <Ionicons
                          name={
                            item.key === "mic" && micMuted
                              ? "mic-off-outline"
                              : item.icon
                          }
                          size={22}
                          color={item.destructive ? "#FFFFFF" : "#0D132B"}
                        />
                      </View>
                      <Text className="mt-1.5 font-poppins-medium text-[11px] text-text-primary">
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.feedbackCard}>
                <View className="flex-row">
                  {(
                    Object.entries(DEFAULT_FEEDBACK_SCORES) as [
                      keyof typeof DEFAULT_FEEDBACK_SCORES,
                      string,
                    ][]
                  ).map(([key, value], index) => (
                    <View key={key} className="flex-1 flex-row items-center">
                      {index > 0 ? (
                        <View style={styles.feedbackDivider} />
                      ) : null}
                      <View className="flex-1 items-center px-1">
                        <Text className="font-poppins-semibold text-xs capitalize text-text-primary">
                          {key}
                        </Text>
                        <Text
                          className={`mt-1 font-poppins-bold text-sm ${
                            key === "speaking"
                              ? "text-success"
                              : key === "pronunciation"
                                ? "text-lingua-blue"
                                : "text-lingua-purple"
                          }`}
                        >
                          {value}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      {subtitlesEnabled ? (
        <ScrollView
          style={styles.subtitlesScroll}
          contentContainerStyle={styles.subtitlesContent}
          showsVerticalScrollIndicator
          nestedScrollEnabled
        >
          <Text className="font-poppins-medium text-[11px] text-text-secondary">
            Subtitles
          </Text>
          <Text className="mt-1 font-poppins-regular text-xs leading-5 text-text-primary">
            {subtitlesText}
          </Text>
          <Text className="mt-2 font-poppins-medium text-[11px] text-text-secondary">
            AI teacher context
          </Text>
          <Text className="mt-1 font-poppins-regular text-xs leading-5 text-text-primary">
            {lesson.aiTeacher.lessonContext}
          </Text>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  streakIcon: {
    width: 16,
    height: 16,
  },
  lessonWindow: {
    flex: 1,
  },
  lessonWindowWithSubtitles: {
    flex: 1,
    minHeight: 0,
    marginBottom: 8,
  },
  subtitlesScroll: {
    marginHorizontal: 16,
    marginBottom: 8,
    flexShrink: 0,
    maxHeight: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  subtitlesContent: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
  },
  lessonBackground: {
    flex: 1,
  },
  userPip: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 88,
    height: 112,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  userPipImage: {
    width: "100%",
    height: "100%",
  },
  teacherMascot: {
    width: 220,
    height: 220,
  },
  speechBubble: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  controlButtonDefault: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  controlButtonActive: {
    backgroundColor: "#F3EEFF",
    borderWidth: 1,
    borderColor: "#6C4EF5",
  },
  controlButtonEnd: {
    backgroundColor: "#FF4D4F",
  },
  feedbackCard: {
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  feedbackDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
});
