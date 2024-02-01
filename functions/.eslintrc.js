module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: ["prettier", "plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
	ignorePatterns: [
		"/lib/**/*", // Ignore built files.
		".eslintrc.js", // Ignore this file
	],
	plugins: ["@typescript-eslint", "import"],
	rules: {
		quotes: ["error", "double"],
		"import/no-unresolved": 0,
		"max-len": ["error", { code: 150 }],
		"linebreak-style": 0,
		"no-tabs": 0,
		"require-jsdoc": 0,
		"valid-jsdoc": 0,
		"prefer-promise-reject-errors": 0,
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			},
		],
	},
};
