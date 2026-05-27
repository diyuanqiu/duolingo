import {
  isStreamNativeAvailable,
  STREAM_DEV_BUILD_MESSAGE,
} from "@/lib/stream-native";
import {
  createStreamCall,
  fetchStreamToken,
  type StreamCallResponse,
  type StreamTokenResponse,
} from "@/lib/stream";
import type { Lesson } from "@/types/learning";

type StreamUser = {
  id: string;
  name: string;
  image?: string;
};

export type StreamCallSession = {
  callId: string;
  leave: () => Promise<void>;
  disconnect: () => Promise<void>;
  enableMicrophone: () => Promise<void>;
  disableMicrophone: () => Promise<void>;
  subscribeParticipants: (onChange: (count: number) => void) => () => void;
};

type ConnectStreamCallParams = {
  lesson: Lesson;
  localUserName: string;
  userImageUrl?: string;
  clerkToken: string;
};

export async function connectStreamCall(
  params: ConnectStreamCallParams
): Promise<StreamCallSession> {
  if (!isStreamNativeAvailable()) {
    throw new Error(STREAM_DEV_BUILD_MESSAGE);
  }

  const { StreamVideoClient } = await import(
    "@stream-io/video-react-native-sdk"
  );

  const credentials: StreamTokenResponse = await fetchStreamToken(
    params.clerkToken
  );

  const streamUser: StreamUser = {
    id: credentials.userId,
    name: params.localUserName,
    image: params.userImageUrl,
  };

  const client = StreamVideoClient.getOrCreateInstance({
    apiKey: credentials.apiKey,
    user: streamUser,
    token: credentials.token,
  });

  const callInfo: StreamCallResponse = await createStreamCall(params.clerkToken, {
    lessonId: params.lesson.id,
    languageId: params.lesson.languageId,
    lessonTitle: params.lesson.title,
    lessonDescription: params.lesson.description,
    goals: params.lesson.goals,
    phrases: params.lesson.phrases,
    aiTeacherContext: params.lesson.aiTeacher.lessonContext,
  });

  const call = client.call(callInfo.callType, callInfo.callId);
  await call.join({ create: false });
  await call.camera.disable().catch(() => undefined);
  await call.microphone.enable().catch(() => undefined);

  return {
    callId: callInfo.callId,
    leave: () => call.leave(),
    disconnect: () => client.disconnectUser(),
    enableMicrophone: () => call.microphone.enable(),
    disableMicrophone: () => call.microphone.disable(),
    subscribeParticipants: (onChange) => {
      const update = () => {
        onChange(Math.max(call.state.participants.length, 1));
      };
      update();
      const subscription = call.state.participants$.subscribe(update);
      return () => subscription.unsubscribe();
    },
  };
}
