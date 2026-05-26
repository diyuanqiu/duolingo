import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    id: "es",
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    description: "Learn everyday Spanish from your first hola.",
    flagEmoji: "https://flagcdn.com/w80/es.png",
    learners: "28.4M",
  },
  {
    id: "fr",
    code: "fr",
    name: "French",
    nativeName: "Français",
    description: "Start with friendly French greetings and introductions.",
    flagEmoji: "https://flagcdn.com/w80/fr.png",
    learners: "18.2M",
  },
  {
    id: "zh",
    code: "zh",
    name: "Chinese (Mandarin)",
    nativeName: "中文",
    description: "Build a foundation in Mandarin greetings and basics.",
    flagEmoji: "https://flagcdn.com/w80/cn.png",
    learners: "12.6M",
  },
];
