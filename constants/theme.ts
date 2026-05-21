/**
 * TypeScript mirror of Lingua design tokens (for non-className usage).
 * CSS source of truth: theme/tokens.css
 */

export const colors = {
  primary: {
    purple: "#6C4EF5",
    deepPurple: "#5B3BF6",
    blue: "#4D8BFF",
    green: "#21C16B",
  },
  semantic: {
    success: "#21C16B",
    warning: "#FFC800",
    streak: "#FF8A00",
    error: "#FF4D4F",
    info: "#4D8BFF",
  },
  neutral: {
    textPrimary: "#0D132B",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    surface: "#F6F7FB",
    background: "#FFFFFF",
  },
} as const;

export const typography = {
  h1: { size: 32, weight: "bold" as const, lineHeight: 1.2 },
  h2: { size: 24, weight: "semibold" as const, lineHeight: 1.3 },
  h3: { size: 20, weight: "semibold" as const, lineHeight: 1.3 },
  h4: { size: 16, weight: "medium" as const, lineHeight: 1.4 },
  bodyLarge: { size: 16, weight: "regular" as const, lineHeight: 1.6 },
  bodyMedium: { size: 14, weight: "regular" as const, lineHeight: 1.6 },
  bodySmall: { size: 13, weight: "regular" as const, lineHeight: 1.6 },
  caption: { size: 11, weight: "regular" as const, lineHeight: 1.4 },
} as const;

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;
