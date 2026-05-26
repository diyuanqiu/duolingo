import { languages } from "@/data/languages";
import { units } from "@/data/units";
import type { Language, LanguageCode, Lesson, Unit } from "@/types/learning";

export const lessons: Lesson[] = [
  // Spanish — Greetings
  {
    id: "es-lesson-1",
    unitId: "es-unit-1",
    languageId: "es",
    order: 1,
    title: "Greetings",
    description: "Say hello and ask how someone is doing.",
    lessonType: "audio",
    xpReward: 10,
    goals: [
      {
        id: "es-lesson-1-goal-1",
        description: "Greet someone with hola and buenos días.",
      },
      {
        id: "es-lesson-1-goal-2",
        description: "Ask and answer ¿Cómo estás?",
      },
    ],
    vocabulary: [
      {
        id: "es-lesson-1-vocab-1",
        term: "hola",
        translation: "hello",
        pronunciation: "OH-lah",
        example: "Hola, ¿cómo estás?",
      },
      {
        id: "es-lesson-1-vocab-2",
        term: "buenos días",
        translation: "good morning",
        pronunciation: "BWEH-nos DEE-as",
        example: "Buenos días, María.",
      },
      {
        id: "es-lesson-1-vocab-3",
        term: "buenas noches",
        translation: "good night",
        pronunciation: "BWEH-nas NOH-ches",
        example: "Buenas noches, hasta mañana.",
      },
      {
        id: "es-lesson-1-vocab-4",
        term: "adiós",
        translation: "goodbye",
        pronunciation: "ah-DYOHS",
        example: "Adiós, nos vemos pronto.",
      },
    ],
    phrases: [
      {
        id: "es-lesson-1-phrase-1",
        text: "¿Cómo estás?",
        translation: "How are you?",
        note: "Informal; use with friends.",
      },
      {
        id: "es-lesson-1-phrase-2",
        text: "Estoy bien, gracias.",
        translation: "I'm fine, thank you.",
      },
      {
        id: "es-lesson-1-phrase-3",
        text: "Mucho gusto.",
        translation: "Nice to meet you.",
      },
    ],
    activities: [
      {
        id: "es-lesson-1-activity-1",
        type: "intro",
        title: "Meet your greetings",
        instruction: "Listen to each word and repeat it out loud.",
        vocabularyIds: [
          "es-lesson-1-vocab-1",
          "es-lesson-1-vocab-2",
          "es-lesson-1-vocab-3",
        ],
      },
      {
        id: "es-lesson-1-activity-2",
        type: "phrase_practice",
        title: "Practice a short exchange",
        instruction: "Say the greeting, ask how they are, and respond politely.",
        phraseIds: ["es-lesson-1-phrase-1", "es-lesson-1-phrase-2"],
      },
    ],
    aiTeacher: {
      system:
        "You are a warm, energetic Spanish teacher. Speak mostly in English, introduce Spanish words slowly with translations, and stay strictly within this lesson's greetings vocabulary and phrases. Use short natural sentences, gentle encouragement, and ask the student to repeat. Keep replies to one or two conversational sentences.",
      kickoff:
        "Hey! Today we're learning Spanish greetings — hola, buenos días, and how to ask ¿Cómo estás? Let's start with hola. Can you try saying it with me?",
      lessonContext:
        "Focus: hola, buenos días, buenas noches, adiós. Phrases: ¿Cómo estás?, Estoy bien gracias, Mucho gusto. Do not teach unrelated topics or other languages.",
    },
  },
  // Spanish — Introductions
  {
    id: "es-lesson-2",
    unitId: "es-unit-1",
    languageId: "es",
    order: 2,
    title: "Introductions",
    description: "Share your name and where you are from.",
    lessonType: "audio",
    xpReward: 15,
    goals: [
      {
        id: "es-lesson-2-goal-1",
        description: "Introduce yourself with Me llamo…",
      },
      {
        id: "es-lesson-2-goal-2",
        description: "Say where you are from using Soy de…",
      },
    ],
    vocabulary: [
      {
        id: "es-lesson-2-vocab-1",
        term: "me llamo",
        translation: "my name is / I'm called",
        pronunciation: "meh YAH-moh",
        example: "Me llamo Ana.",
      },
      {
        id: "es-lesson-2-vocab-2",
        term: "soy de",
        translation: "I'm from",
        pronunciation: "soy deh",
        example: "Soy de México.",
      },
      {
        id: "es-lesson-2-vocab-3",
        term: "y tú",
        translation: "and you?",
        pronunciation: "ee too",
        example: "Soy de España, ¿y tú?",
      },
      {
        id: "es-lesson-2-vocab-4",
        term: "encantado / encantada",
        translation: "pleased to meet you",
        pronunciation: "en-kan-TAH-doh / en-kan-TAH-dah",
        example: "Encantada, me llamo Lucía.",
      },
    ],
    phrases: [
      {
        id: "es-lesson-2-phrase-1",
        text: "Me llamo…",
        translation: "My name is…",
      },
      {
        id: "es-lesson-2-phrase-2",
        text: "Soy de los Estados Unidos.",
        translation: "I'm from the United States.",
      },
      {
        id: "es-lesson-2-phrase-3",
        text: "¿De dónde eres?",
        translation: "Where are you from?",
      },
    ],
    activities: [
      {
        id: "es-lesson-2-activity-1",
        type: "vocabulary",
        title: "Build your introduction",
        instruction: "Practice me llamo and soy de with your own name and country.",
        vocabularyIds: [
          "es-lesson-2-vocab-1",
          "es-lesson-2-vocab-2",
          "es-lesson-2-vocab-3",
        ],
      },
      {
        id: "es-lesson-2-activity-2",
        type: "speaking",
        title: "Introduce yourself",
        instruction: "Say your name, where you're from, and ask ¿De dónde eres?",
        phraseIds: [
          "es-lesson-2-phrase-1",
          "es-lesson-2-phrase-2",
          "es-lesson-2-phrase-3",
        ],
      },
    ],
    aiTeacher: {
      system:
        "You are a warm, energetic Spanish teacher. Speak mostly in English, introduce Spanish slowly with translations, and stay strictly within introductions vocabulary and phrases. Use contractions, gentle encouragement, and ask the student to repeat. Keep replies to one or two conversational sentences.",
      kickoff:
        "Nice work on greetings! Now let's introduce ourselves in Spanish. We'll use me llamo — that means 'my name is.' What's your name? Try saying Me llamo plus your name.",
      lessonContext:
        "Focus: me llamo, soy de, y tú, encantado/encantada. Phrases: Me llamo…, Soy de los Estados Unidos, ¿De dónde eres? Do not teach unrelated topics or other languages.",
    },
  },
  // Spanish — At the café
  {
    id: "es-lesson-cafe",
    unitId: "es-unit-3",
    languageId: "es",
    order: 1,
    title: "At the café",
    description: "Order drinks and snacks at a café.",
    lessonType: "chat",
    xpReward: 20,
    goals: [
      {
        id: "es-lesson-cafe-goal-1",
        description: "Order a drink politely.",
      },
      {
        id: "es-lesson-cafe-goal-2",
        description: "Ask for the check.",
      },
    ],
    vocabulary: [
      {
        id: "es-lesson-cafe-vocab-1",
        term: "café",
        translation: "coffee / café",
        pronunciation: "kah-FEH",
        example: "Un café, por favor.",
      },
      {
        id: "es-lesson-cafe-vocab-2",
        term: "la cuenta",
        translation: "the bill",
        pronunciation: "lah KWEHN-tah",
        example: "La cuenta, por favor.",
      },
    ],
    phrases: [
      {
        id: "es-lesson-cafe-phrase-1",
        text: "Quisiera un café con leche.",
        translation: "I would like a coffee with milk.",
      },
      {
        id: "es-lesson-cafe-phrase-2",
        text: "¿Cuánto cuesta?",
        translation: "How much does it cost?",
      },
    ],
    activities: [
      {
        id: "es-lesson-cafe-activity-1",
        type: "vocabulary",
        title: "Café essentials",
        instruction: "Practice café and la cuenta.",
        vocabularyIds: ["es-lesson-cafe-vocab-1", "es-lesson-cafe-vocab-2"],
      },
      {
        id: "es-lesson-cafe-activity-2",
        type: "speaking",
        title: "Order at the counter",
        instruction: "Order a drink and ask for the bill.",
        phraseIds: ["es-lesson-cafe-phrase-1", "es-lesson-cafe-phrase-2"],
      },
    ],
    aiTeacher: {
      system:
        "You are a warm Spanish teacher helping the student order at a café. Stay within café vocabulary and phrases.",
      kickoff:
        "Welcome to our café lesson! Let's start with un café, por favor. Can you try ordering a coffee?",
      lessonContext:
        "Focus: café, la cuenta. Phrases: Quisiera un café con leche, ¿Cuánto cuesta?",
    },
  },
  // French — Greetings
  {
    id: "fr-lesson-1",
    unitId: "fr-unit-1",
    languageId: "fr",
    order: 1,
    title: "Greetings",
    description: "Say hello and goodbye in French.",
    lessonType: "audio",
    xpReward: 10,
    goals: [
      {
        id: "fr-lesson-1-goal-1",
        description: "Use bonjour and bonsoir appropriately.",
      },
      {
        id: "fr-lesson-1-goal-2",
        description: "Ask Comment ça va? and give a simple reply.",
      },
    ],
    vocabulary: [
      {
        id: "fr-lesson-1-vocab-1",
        term: "bonjour",
        translation: "hello / good morning",
        pronunciation: "bon-ZHOOR",
        example: "Bonjour, madame.",
      },
      {
        id: "fr-lesson-1-vocab-2",
        term: "bonsoir",
        translation: "good evening",
        pronunciation: "bon-SWAHR",
        example: "Bonsoir, comment allez-vous?",
      },
      {
        id: "fr-lesson-1-vocab-3",
        term: "salut",
        translation: "hi / bye (informal)",
        pronunciation: "sah-LOO",
        example: "Salut, à demain!",
      },
      {
        id: "fr-lesson-1-vocab-4",
        term: "au revoir",
        translation: "goodbye",
        pronunciation: "oh ruh-VWAHR",
        example: "Au revoir et bonne journée.",
      },
    ],
    phrases: [
      {
        id: "fr-lesson-1-phrase-1",
        text: "Comment ça va?",
        translation: "How's it going?",
        note: "Informal.",
      },
      {
        id: "fr-lesson-1-phrase-2",
        text: "Ça va bien, merci.",
        translation: "I'm doing well, thanks.",
      },
      {
        id: "fr-lesson-1-phrase-3",
        text: "Enchanté(e).",
        translation: "Nice to meet you.",
      },
    ],
    activities: [
      {
        id: "fr-lesson-1-activity-1",
        type: "intro",
        title: "French hellos",
        instruction: "Listen and repeat bonjour, bonsoir, and salut.",
        vocabularyIds: [
          "fr-lesson-1-vocab-1",
          "fr-lesson-1-vocab-2",
          "fr-lesson-1-vocab-3",
        ],
      },
      {
        id: "fr-lesson-1-activity-2",
        type: "phrase_practice",
        title: "A friendly check-in",
        instruction: "Greet someone, ask how they are, and say goodbye.",
        phraseIds: ["fr-lesson-1-phrase-1", "fr-lesson-1-phrase-2"],
      },
    ],
    aiTeacher: {
      system:
        "You are a warm, energetic French teacher. Speak mostly in English, introduce French words slowly with translations, and stay strictly within this lesson's greetings. Use short natural sentences and ask the student to repeat. Keep replies to one or two conversational sentences.",
      kickoff:
        "Bonjour! Well — we'll say bonjour properly in a moment. Today we're learning French greetings like bonjour and Comment ça va? Ready to try bonjour with me?",
      lessonContext:
        "Focus: bonjour, bonsoir, salut, au revoir. Phrases: Comment ça va?, Ça va bien merci, Enchanté(e). Do not teach unrelated topics or other languages.",
    },
  },
  // French — Introductions
  {
    id: "fr-lesson-2",
    unitId: "fr-unit-1",
    languageId: "fr",
    order: 2,
    title: "Introductions",
    description: "Introduce yourself and ask someone's name.",
    lessonType: "audio",
    xpReward: 15,
    goals: [
      {
        id: "fr-lesson-2-goal-1",
        description: "Say Je m'appelle… to share your name.",
      },
      {
        id: "fr-lesson-2-goal-2",
        description: "Ask Comment tu t'appelles?",
      },
    ],
    vocabulary: [
      {
        id: "fr-lesson-2-vocab-1",
        term: "je m'appelle",
        translation: "my name is",
        pronunciation: "zhuh mah-PELL",
        example: "Je m'appelle Pierre.",
      },
      {
        id: "fr-lesson-2-vocab-2",
        term: "je suis",
        translation: "I am",
        pronunciation: "zhuh swee",
        example: "Je suis étudiant.",
      },
      {
        id: "fr-lesson-2-vocab-3",
        term: "de",
        translation: "from / of",
        pronunciation: "duh",
        example: "Je suis de Paris.",
      },
      {
        id: "fr-lesson-2-vocab-4",
        term: "et toi",
        translation: "and you?",
        pronunciation: "ay twah",
        example: "Je suis de Lyon, et toi?",
      },
    ],
    phrases: [
      {
        id: "fr-lesson-2-phrase-1",
        text: "Je m'appelle…",
        translation: "My name is…",
      },
      {
        id: "fr-lesson-2-phrase-2",
        text: "Je suis américain(e).",
        translation: "I am American.",
      },
      {
        id: "fr-lesson-2-phrase-3",
        text: "Comment tu t'appelles?",
        translation: "What's your name?",
        note: "Informal.",
      },
    ],
    activities: [
      {
        id: "fr-lesson-2-activity-1",
        type: "vocabulary",
        title: "Name and origin",
        instruction: "Practice je m'appelle and je suis with your details.",
        vocabularyIds: [
          "fr-lesson-2-vocab-1",
          "fr-lesson-2-vocab-2",
          "fr-lesson-2-vocab-3",
        ],
      },
      {
        id: "fr-lesson-2-activity-2",
        type: "speaking",
        title: "Introduce yourself",
        instruction: "Share your name and ask Comment tu t'appelles?",
        phraseIds: [
          "fr-lesson-2-phrase-1",
          "fr-lesson-2-phrase-2",
          "fr-lesson-2-phrase-3",
        ],
      },
    ],
    aiTeacher: {
      system:
        "You are a warm, energetic French teacher. Speak mostly in English, introduce French slowly with translations, and stay strictly within introductions content. Encourage repetition and keep replies to one or two conversational sentences.",
      kickoff:
        "Great job on greetings! Now let's introduce ourselves. In French we say je m'appelle — 'my name is.' Can you try je m'appelle with your name?",
      lessonContext:
        "Focus: je m'appelle, je suis, de, et toi. Phrases: Je m'appelle…, Je suis américain(e), Comment tu t'appelles? Do not teach unrelated topics or other languages.",
    },
  },
  // Mandarin — Greetings
  {
    id: "zh-lesson-1",
    unitId: "zh-unit-1",
    languageId: "zh",
    order: 1,
    title: "Greetings",
    description: "Say hello and ask how someone is doing.",
    lessonType: "audio",
    xpReward: 10,
    goals: [
      {
        id: "zh-lesson-1-goal-1",
        description: "Greet someone with 你好 and 早上好.",
      },
      {
        id: "zh-lesson-1-goal-2",
        description: "Ask 你好吗? and reply 我很好.",
      },
    ],
    vocabulary: [
      {
        id: "zh-lesson-1-vocab-1",
        term: "你好",
        translation: "hello",
        pronunciation: "nǐ hǎo",
        example: "你好，很高兴认识你。",
      },
      {
        id: "zh-lesson-1-vocab-2",
        term: "早上好",
        translation: "good morning",
        pronunciation: "zǎo shang hǎo",
        example: "早上好！",
      },
      {
        id: "zh-lesson-1-vocab-3",
        term: "晚上好",
        translation: "good evening",
        pronunciation: "wǎn shang hǎo",
        example: "晚上好，再见。",
      },
      {
        id: "zh-lesson-1-vocab-4",
        term: "再见",
        translation: "goodbye",
        pronunciation: "zài jiàn",
        example: "再见，明天见。",
      },
    ],
    phrases: [
      {
        id: "zh-lesson-1-phrase-1",
        text: "你好吗？",
        translation: "How are you?",
      },
      {
        id: "zh-lesson-1-phrase-2",
        text: "我很好，谢谢。",
        translation: "I'm very well, thank you.",
      },
      {
        id: "zh-lesson-1-phrase-3",
        text: "很高兴认识你。",
        translation: "Nice to meet you.",
      },
    ],
    activities: [
      {
        id: "zh-lesson-1-activity-1",
        type: "intro",
        title: "Mandarin hellos",
        instruction: "Listen and repeat 你好 and 早上好.",
        vocabularyIds: [
          "zh-lesson-1-vocab-1",
          "zh-lesson-1-vocab-2",
          "zh-lesson-1-vocab-3",
        ],
      },
      {
        id: "zh-lesson-1-activity-2",
        type: "phrase_practice",
        title: "A polite exchange",
        instruction: "Greet someone, ask 你好吗?, and respond.",
        phraseIds: ["zh-lesson-1-phrase-1", "zh-lesson-1-phrase-2"],
      },
    ],
    aiTeacher: {
      system:
        "You are a warm, energetic Mandarin teacher. Speak mostly in English, introduce Chinese characters and pinyin slowly with translations, and stay strictly within greetings content. Ask the student to repeat tones carefully. Keep replies to one or two conversational sentences.",
      kickoff:
        "Hi! Today we're learning Mandarin greetings — starting with 你好, which means 'hello.' It's pronounced nǐ hǎo. Can you try saying it with me?",
      lessonContext:
        "Focus: 你好, 早上好, 晚上好, 再见. Phrases: 你好吗?, 我很好谢谢, 很高兴认识你. Do not teach unrelated topics or other languages.",
    },
  },
  // Mandarin — Introductions
  {
    id: "zh-lesson-2",
    unitId: "zh-unit-1",
    languageId: "zh",
    order: 2,
    title: "Introductions",
    description: "Share your name and nationality.",
    lessonType: "audio",
    xpReward: 15,
    goals: [
      {
        id: "zh-lesson-2-goal-1",
        description: "Introduce yourself with 我叫…",
      },
      {
        id: "zh-lesson-2-goal-2",
        description: "Say where you are from with 我是…人.",
      },
    ],
    vocabulary: [
      {
        id: "zh-lesson-2-vocab-1",
        term: "我叫",
        translation: "I'm called / my name is",
        pronunciation: "wǒ jiào",
        example: "我叫李明。",
      },
      {
        id: "zh-lesson-2-vocab-2",
        term: "我是",
        translation: "I am",
        pronunciation: "wǒ shì",
        example: "我是学生。",
      },
      {
        id: "zh-lesson-2-vocab-3",
        term: "美国人",
        translation: "American (person)",
        pronunciation: "měi guó rén",
        example: "我是美国人。",
      },
      {
        id: "zh-lesson-2-vocab-4",
        term: "你呢",
        translation: "and you?",
        pronunciation: "nǐ ne",
        example: "我是中国人，你呢？",
      },
    ],
    phrases: [
      {
        id: "zh-lesson-2-phrase-1",
        text: "我叫…",
        translation: "My name is…",
      },
      {
        id: "zh-lesson-2-phrase-2",
        text: "我是美国人。",
        translation: "I am American.",
      },
      {
        id: "zh-lesson-2-phrase-3",
        text: "你叫什么名字？",
        translation: "What's your name?",
      },
    ],
    activities: [
      {
        id: "zh-lesson-2-activity-1",
        type: "vocabulary",
        title: "Name and nationality",
        instruction: "Practice 我叫 and 我是 with your own details.",
        vocabularyIds: [
          "zh-lesson-2-vocab-1",
          "zh-lesson-2-vocab-2",
          "zh-lesson-2-vocab-3",
        ],
      },
      {
        id: "zh-lesson-2-activity-2",
        type: "speaking",
        title: "Introduce yourself",
        instruction: "Say your name and ask 你叫什么名字?",
        phraseIds: [
          "zh-lesson-2-phrase-1",
          "zh-lesson-2-phrase-2",
          "zh-lesson-2-phrase-3",
        ],
      },
    ],
    aiTeacher: {
      system:
        "You are a warm, energetic Mandarin teacher. Speak mostly in English, introduce Chinese slowly with pinyin and translations, and stay strictly within introductions content. Encourage repetition and keep replies to one or two conversational sentences.",
      kickoff:
        "Nice work on greetings! Let's introduce ourselves. In Mandarin we say 我叫 — 'my name is.' It sounds like wǒ jiào. Can you try 我叫 with your name?",
      lessonContext:
        "Focus: 我叫, 我是, 美国人, 你呢. Phrases: 我叫…, 我是美国人, 你叫什么名字? Do not teach unrelated topics or other languages.",
    },
  },
];

export function getLanguageById(id: LanguageCode): Language | undefined {
  return languages.find((language) => language.id === id);
}

export function getUnitsForLanguage(languageId: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsForUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}
