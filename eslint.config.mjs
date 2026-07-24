import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const config = [
  {
    ignores: [
      'scripts/**',
    ],
  },

  ...nextVitals,
  ...nextTypescript,

  {
    rules: {
      // ===== TypeScript =====
      '@typescript-eslint/no-explicit-any': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // ===== Console =====
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      // ===== React =====
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',

      // ===== Next =====
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
