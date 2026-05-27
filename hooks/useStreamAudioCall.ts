import {
  connectStreamCall,
  type StreamCallSession,
} from "@/lib/stream-call-session";
import type { Lesson } from "@/types/learning";
import { useAuth, useUser } from "@clerk/expo";
import { useCallback, useEffect, useRef, useState } from "react";

export type StreamCallStatus =
  | "idle"
  | "connecting"
  | "joined"
  | "error"
  | "ended";

type UseStreamAudioCallOptions = {
  lesson: Lesson;
  enabled?: boolean;
};

type UseStreamAudioCallResult = {
  status: StreamCallStatus;
  micMuted: boolean;
  errorMessage: string | null;
  participantCount: number;
  localUserName: string;
  callId: string | null;
  toggleMic: () => Promise<void>;
  endCall: () => Promise<void>;
  retry: () => void;
};

export function useStreamAudioCall({
  lesson,
  enabled = true,
}: UseStreamAudioCallOptions): UseStreamAudioCallResult {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [status, setStatus] = useState<StreamCallStatus>("idle");
  const [micMuted, setMicMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(0);
  const [callId, setCallId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const sessionRef = useRef<StreamCallSession | null>(null);
  const mountedRef = useRef(true);

  const localUserName =
    user?.fullName ?? user?.firstName ?? user?.username ?? "You";

  const cleanup = useCallback(async () => {
    const session = sessionRef.current;
    sessionRef.current = null;

    if (!session) {
      return;
    }

    try {
      await session.leave();
    } catch {
      // Call may already be left.
    }

    try {
      await session.disconnect();
    } catch {
      // Client may already be disconnected.
    }
  }, []);

  const endCall = useCallback(async () => {
    await cleanup();
    if (mountedRef.current) {
      setStatus("ended");
      setParticipantCount(0);
    }
  }, [cleanup]);

  const toggleMic = useCallback(async () => {
    const session = sessionRef.current;
    if (!session || status !== "joined") {
      return;
    }

    try {
      if (micMuted) {
        await session.enableMicrophone();
      } else {
        await session.disableMicrophone();
      }
      if (mountedRef.current) {
        setMicMuted((value) => !value);
      }
    } catch (error) {
      console.error("[useStreamAudioCall] toggleMic", error);
    }
  }, [micMuted, status]);

  const retry = useCallback(() => {
    setErrorMessage(null);
    setStatus("idle");
    setRetryCount((value) => value + 1);
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (!enabled) {
      return () => {
        mountedRef.current = false;
      };
    }

    let cancelled = false;
    let unsubscribeParticipants: (() => void) | undefined;

    const connect = async () => {
      setStatus("connecting");
      setErrorMessage(null);
      setParticipantCount(0);

      try {
        const clerkToken = await getToken();
        if (!clerkToken) {
          throw new Error("Sign in required to start an audio lesson.");
        }

        if (cancelled) {
          return;
        }

        const session = await connectStreamCall({
          lesson,
          localUserName,
          userImageUrl: user?.imageUrl,
          clerkToken,
        });

        if (cancelled) {
          await session.leave().catch(() => undefined);
          await session.disconnect().catch(() => undefined);
          return;
        }

        sessionRef.current = session;
        setCallId(session.callId);
        unsubscribeParticipants = session.subscribeParticipants((count) => {
          if (mountedRef.current) {
            setParticipantCount(count);
          }
        });

        if (mountedRef.current) {
          setMicMuted(false);
          setStatus("joined");
        }
      } catch (error) {
        console.error("[useStreamAudioCall] connect", error);
        await cleanup();

        if (!cancelled && mountedRef.current) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Could not connect to the audio lesson."
          );
          setStatus("error");
        }
      }
    };

    void connect();

    return () => {
      cancelled = true;
      mountedRef.current = false;
      unsubscribeParticipants?.();
      void cleanup();
    };
  }, [cleanup, enabled, getToken, lesson, localUserName, retryCount, user?.imageUrl]);

  return {
    status,
    micMuted,
    errorMessage,
    participantCount,
    localUserName,
    callId,
    toggleMic,
    endCall,
    retry,
  };
}
