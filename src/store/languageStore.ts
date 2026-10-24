import { create } from 'zustand';
import { Language, translations } from '../data/translations';

interface LanguageState {
  language: Language;
  t: typeof translations['en'];
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY_LANG = 'smart_city_vellore_lang';

const getInitialLang = (): Language => {
  const saved = localStorage.getItem(STORAGE_KEY_LANG);
  if (saved === 'ta' || saved === 'en') {
    return saved;
  }
  return 'en';
};

export const useLanguageStore = create<LanguageState>((set, get) => {
  const initial = getInitialLang();
  return {
    language: initial,
    t: translations[initial],
    setLanguage: (lang: Language) => {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
      set({ language: lang, t: translations[lang] });
    },
    toggleLanguage: () => {
      const next = get().language === 'en' ? 'ta' : 'en';
      get().setLanguage(next);
    },
  };
});
