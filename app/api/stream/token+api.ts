import { authenticateClerkRequest } from "@/lib/stream-auth";
import { getStreamApiKey, getStreamClient } from "@/lib/stream-server";

export async function GET(request: Request) {
  try {
    const user = await authenticateClerkRequest(request);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = getStreamClient();
    await client.upsertUsers([
      {
        id: user.userId,
        name: user.name,
        image: user.imageUrl,
      },
    ]);

    const token = client.generateUserToken({ user_id: user.userId });

    return Response.json({
      apiKey: getStreamApiKey(),
      token,
      userId: user.userId,
    });
  } catch (error) {
    console.error("[stream/token]", error);
    return Response.json(
      { error: "Failed to create Stream token" },
      { status: 500 }
    );
  }
}
