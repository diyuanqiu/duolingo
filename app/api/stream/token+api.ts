import { authenticateClerkRequest } from "@/lib/stream-auth";
import { getStreamApiKey, getStreamClient } from "@/lib/stream-server";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(request: Request) {
  try {
    const user = await authenticateClerkRequest(request);
    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401, headers: NO_CACHE_HEADERS }
      );
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

    return Response.json(
      {
        apiKey: getStreamApiKey(),
        token,
        userId: user.userId,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("[stream/token]", error);
    return Response.json(
      { error: "Failed to create Stream token" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
