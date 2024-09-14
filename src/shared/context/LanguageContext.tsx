"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

export type Language = "ar" | "en" | "de";

type LanguageContextType = {
  language: Language;
  updateLanguage: (newLang: Language) => void;
};
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  updateLanguage: () => null,
});
type LanguageState = {
  language: Language;
};
const INITIAL_STATE: LanguageState = {
  language: "en",
};
type ActionType = { type: "UPDATE_LANGUAGE"; payload: Language };
const languageReducer = (state: LanguageState, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_LANGUAGE":
      return { ...state, language: payload };

    default:
      throw new Error(`Unrecognized action type ${type} !!`);
  }
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(languageReducer, INITIAL_STATE);
  const { language } = state;

  const updateLanguage = useCallback((newLang: Language) => {
    dispatch({ type: "UPDATE_LANGUAGE", payload: newLang });
  }, []);

  const value = useMemo(
    () => ({
      language,
      updateLanguage,
    }),
    [language, updateLanguage]
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const tasksNewContext = useContext(LanguageContext);
  if (!tasksNewContext)
    throw new Error("We must use useLanguage inside LanguageProvider only");
  return tasksNewContext;
};
