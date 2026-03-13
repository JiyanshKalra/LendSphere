import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Load persisted language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('appLanguage', newLang);
  };

  const currentLangDisplay = i18n.language === 'hi' ? 'हिन्दी' : 'English';

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#174E4F] text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-[0.98] group"
      aria-label={`Language is ${i18n.language === 'en' ? 'English' : 'Hindi'}. Click to change.`}
    >
      <Globe className="w-4 h-4 text-[#174E4F] group-hover:rotate-12 transition-transform" />
      <span>{currentLangDisplay}</span>
    </button>
  );
};

export default LanguageSwitcher;
