module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@components": "./src/components/",
            "@context": "./src/context/",
            "@hooks": "./src/hooks/",
            "@lib": "./src/lib/",
            "@screens": "./src/screens/",
            "@api": "./src/api/",
            "@stores": "./src/stores/",
            "@appTypes": "./src/types/",
            "@utils": "./src/utils/",
            "@config": "./config/",
            "@assets": "./assets/",
          },
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin", // Should be placed last
    ],
  };
};
