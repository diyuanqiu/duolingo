import { authenticateClerkRequest } from "@/lib/stream-auth";
import {
  buildLessonCallId,
  getStreamClient,
  STREAM_CALL_TYPE,
} from "@/lib/stream-server";
import type { CreateStreamCallPayload } from "@/lib/stream";

export async function POST(request: Request) {
  try {
    const user = await authenticateClerkRequest(request);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CreateStreamCallPayload;
    const { lessonId, languageId, lessonTitle } = body;

    if (!lessonId || !languageId || !lessonTitle) {
      return Response.json(
        { error: "lessonId, languageId, and lessonTitle are required" },
        { status: 400 }
      );
    }

    const callId = buildLessonCallId(lessonId, user.userId);
    const client = getStreamClient();
    const call = client.video.call(STREAM_CALL_TYPE, callId);

    await call.getOrCreate({
      data: {
        created_by_id: user.userId,
        custom: {
          lessonId,
          languageId,
          lessonTitle,
          lessonDescription: body.lessonDescription ?? "",
          goals: JSON.stringify(body.goals ?? []),
          phrases: JSON.stringify(body.phrases ?? []),
          aiTeacherContext: body.aiTeacherContext ?? "",
          userName: user.name,
        },
        settings_override: {
          video: {
            camera_default_on: false,
          },
          audio: {
            mic_default_on: true,
            default_device: "speaker",
          },
        },
      },
    });

    return Response.json({
      callId,
      callType: STREAM_CALL_TYPE,
    });
  } catch (error) {
    console.error("[stream/call]", error);
    return Response.json(
      { error: "Failed to create Stream call" },
      { status: 500 }
    );
  }
}
