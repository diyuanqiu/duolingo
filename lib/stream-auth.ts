import { verifyToken } from "@clerk/backend";

export type AuthenticatedUser = {
  userId: string;
  name: string;
  imageUrl?: string;
};

export async function authenticateClerkRequest(
  request: Request
): Promise<AuthenticatedUser | null> {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("CLERK_SECRET_KEY is not configured.");
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice("Bearer ".length).trim();
  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token, { secretKey });
    const userId = payload.sub;
    if (!userId) {
      return null;
    }

    const name =
      (typeof payload.name === "string" && payload.name) ||
      (typeof payload.first_name === "string" && payload.first_name) ||
      "Learner";

    const imageUrl =
      typeof payload.image_url === "string" ? payload.image_url : undefined;

    return { userId, name, imageUrl };
  } catch {
    return null;
  }
}
