import tseslint from "typescript-eslint";
import config from "eslint-config-final";

export default tseslint.config(
	{
		ignores: [
			"**/node_modules/",
			"dist/",
			"eslint.config.mjs",
		],
	},
	{
		files: ["**/*.ts", "**/*.mts"],

		extends: [
			...config.typescript,
		],

		languageOptions: {
			ecmaVersion: 5,
			sourceType: "script",

			parserOptions: {
				project: ["./tsconfig.app.json", "./tsconfig.spec.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
);
