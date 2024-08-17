export default {
  expo: {
    name: process.env.APP_NAME || "Dicti",
    slug: "dicti",
    scheme: "dicti",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/logo/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/logo/splash.png",
      resizeMode: "cover",
      backgroundColor: "#9ADDFE",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.dicti",
      config: {
        usesNonExemptEncryption: false,
      },
      buildNumber: "11",
    },
    android: {
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/logo/adaptiveIcon.png",
        backgroundColor: "#EBF8FF",
      },
      package: "app.dicti",
      versionCode: 23,
    },
    plugins: [
      "expo-font",
      "expo-localization",
      [
        "@sentry/react-native/expo",
        {
          url: "https://sentry.io/",
          project: "dicti",
          organization: "aurelien-vandaele",
        },
      ],
      [
        "expo-tracking-transparency",
        {
          userTrackingPermission:
            "Cela permet de suivre votre utilisation pour améliorer votre expérience.",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "4d267a78-bac2-4dce-b589-5ab2f3046d09",
      },
    },
    owner: "aurelienv",
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/4d267a78-bac2-4dce-b589-5ab2f3046d09",
    },
  },
};
