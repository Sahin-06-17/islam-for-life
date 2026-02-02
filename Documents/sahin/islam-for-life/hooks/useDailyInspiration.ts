import { useState, useEffect } from 'react';
import { duasData } from '@/lib/duasData';

type Inspiration = {
  id: string;
  type: 'Verse' | 'Dua' | 'Hadith';
  arabic?: string;
  ref: string;
  // Multi-language Text
  text_en: string;
  text_bn: string;
  text_hi: string;
  text_ur: string;
};

const hadithGems = [
  { 
    id: 'h1', 
    type: 'Hadith', 
    ref: "Sahih Bukhari 1",
    text_en: "Actions are judged by intentions.",
    text_bn: "সকল কাজই নিয়তের ওপর নির্ভরশীল।",
    text_hi: "कर्मों का दारोमदार नीयत पर है।",
    text_ur: "اعمال کا دارومدار نیتوں پر ہے۔"
  },
  { 
    id: 'h2', 
    type: 'Hadith', 
    ref: "Sahih Bukhari 13",
    text_en: "None of you truly believes until he loves for his brother what he loves for himself.", 
    text_bn: "তোমাদের কেউ ততক্ষণ পর্যন্ত মুমিন হতে পারবে না, যতক্ষণ না সে তার ভাইয়ের জন্য তাই পছন্দ করে যা সে নিজের জন্য পছন্দ করে।",
    text_hi: "तुम में से कोई तब तक मोमिन नहीं हो सकता जब तक वह अपने भाई के लिए वही पसंद न करे जो अपने लिए करता है।",
    text_ur: "تم میں سے کوئی اس وقت تک مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے کرتا ہے۔"
  },
  { 
    id: 'h3', 
    type: 'Hadith', 
    ref: "Tirmidhi",
    text_en: "Smiling in the face of your brother is charity.",
    text_bn: "তোমার ভাইয়ের সামনে হাসিমুখে কথা বলাও একটি সদকা।",
    text_hi: "अपने भाई को देखकर मुस्कुराना भी सदका है।",
    text_ur: "اپنے بھائی کے سامنے مسکرانا صدقہ ہے۔"
  },
  { 
    id: 'h4', 
    type: 'Hadith', 
    ref: "Sahih Bukhari 6114",
    text_en: "The strong man is not the good wrestler; the strong man is the one who controls himself when he is angry.", 
    text_bn: "সে ব্যক্তি শক্তিশালী নয় যে কুস্তিতে কাউকে আছাড় দেয়, বরং সেই ব্যক্তিই শক্তিশালী যে রাগের সময় নিজেকে নিয়ন্ত্রণ করতে পারে।",
    text_hi: "पहलवान वह नहीं जो कुश्ती में पछाड़ दे, बल्कि पहलवान वह है जो गुस्से के वक्त खुद पर काबू रखे।",
    text_ur: "پہلوان وہ نہیں جو کشتی میں پچھاڑ دے، بلکہ پہلوان وہ ہے جو غصے کے وقت خود پر قابو رکھے۔"
  },
  { 
    id: 'h5', 
    type: 'Hadith', 
    ref: "Sahih Muslim 223",
    text_en: "Cleanliness is half of faith.", 
    text_bn: "পবিত্রতা ঈমানের অর্ধেক।",
    text_hi: "सफाई आधा ईमान है।",
    text_ur: "صفائی نصف ایمان ہے۔"
  }
];

export function useDailyInspiration() {
  const [inspiration, setInspiration] = useState<Inspiration | null>(null);

  useEffect(() => {
    const today = new Date().toDateString(); 
    const savedDate = localStorage.getItem('daily-date');
    
    // UPDATED KEY: 'daily-quote-v2' forces a fresh load to fix the blank error
    const savedQuote = localStorage.getItem('daily-quote-v2');

    // 2. Return cached quote if it exists for today AND has valid data
    if (savedDate === today && savedQuote) {
      const parsed = JSON.parse(savedQuote);
      // Extra safety check: ensure text_en exists
      if (parsed.text_en) {
        setInspiration(parsed);
        return;
      }
    }

    // 3. Generate New Quote
    const allContent: Inspiration[] = [
      ...hadithGems.map(h => ({ ...h, type: 'Hadith' as const })),
      ...duasData.map(d => ({ 
        id: d.id, 
        type: 'Dua' as const, 
        ref: d.ref,
        arabic: d.arabic,
        text_en: d.translation_en,
        text_bn: d.translation_bn || d.translation_en, 
        text_hi: d.translation_hi || d.translation_en,
        text_ur: d.translation_ur || d.translation_en,
      }))
    ];

    const randomPick = allContent[Math.floor(Math.random() * allContent.length)];

    localStorage.setItem('daily-date', today);
    localStorage.setItem('daily-quote-v2', JSON.stringify(randomPick)); // Save with new key
    setInspiration(randomPick);

  }, []);

  return inspiration;
}