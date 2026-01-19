import { getAsyncStorage, setAsyncStorage } from "@utils/asyncStorage";
import { create } from "zustand";

export type VoiceGender = "female" | "male";

const STORAGE_KEY_VOICE = "voice_preference";
const STORAGE_KEY_ALERT_SHOWN = "enhanced_voice_alert_shown";

interface SettingsState {
  voiceGender: VoiceGender;
  enhancedVoiceAlertShown: boolean;
  setVoiceGender: (gender: VoiceGender) => Promise<void>;
  setEnhancedVoiceAlertShown: () => Promise<void>;
  initSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  voiceGender: "female",
  enhancedVoiceAlertShown: false,

  setVoiceGender: async (gender: VoiceGender) => {
    await setAsyncStorage(STORAGE_KEY_VOICE, gender);
    set({ voiceGender: gender });
  },

  setEnhancedVoiceAlertShown: async () => {
    await setAsyncStorage(STORAGE_KEY_ALERT_SHOWN, "true");
    set({ enhancedVoiceAlertShown: true });
  },

  initSettings: async () => {
    const savedVoice = await getAsyncStorage(STORAGE_KEY_VOICE);
    const alertShown = await getAsyncStorage(STORAGE_KEY_ALERT_SHOWN);

    set({
      voiceGender: (savedVoice as VoiceGender) || "female",
      enhancedVoiceAlertShown: alertShown === "true",
    });
  },
}));

export const useSettings = (): SettingsState => useSettingsStore();
