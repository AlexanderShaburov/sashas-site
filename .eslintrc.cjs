module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  settings: { react: { version: "detect" } },
  ignorePatterns: ["dist", "node_modules"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // ослабим самые строгие до миграции
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
