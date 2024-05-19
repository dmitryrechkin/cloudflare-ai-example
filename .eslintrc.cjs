module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	extends: [
	  'eslint:recommended', // Uses the recommended rules from ESLint
	  'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
	],
	parserOptions: {
	  ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
	  sourceType: 'module', // Allows for the use of imports
	  project: './tsconfig.json', // It has to include current folder name, because it falls back to the root folder otherwise
	},
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		'@typescript-eslint/explicit-function-return-type': 'error',
		//'linebreak-style': 'off', // Disable linebreak style rule
		'@typescript-eslint/no-explicit-any': 'off', // Turn off the rule for no-explicit-any

		/// coding guidelines
		'brace-style': ['error', 'allman', { 'allowSingleLine': true }], // Use Allman style for braces
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
		'no-trailing-spaces': 'error',
		'eol-last': ['error', 'always'],
		'comma-dangle': ['error', 'never'],
		
		// naming conventions
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'variableLike',
				format: ['camelCase'],
				leadingUnderscore: 'forbid'
			},
			{
				selector: 'function',
				format: ['camelCase'],
				leadingUnderscore: 'forbid'
			},
			{
				selector: 'class',
				format: ['PascalCase'],
				leadingUnderscore: 'forbid'
			},
			{
				selector: 'parameter',
				format: ['camelCase'],
				leadingUnderscore: 'forbid'
			},
			{
				selector: 'memberLike',
				format: ['camelCase'],
				leadingUnderscore: 'forbid'
			}
		]
	}
};