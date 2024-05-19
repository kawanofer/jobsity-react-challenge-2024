module.exports = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  experimentalTernaries: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  importOrderParserPlugins: ['jsx', 'decorators-legacy'],
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^@mui',
    '^components',
    '^store',
    'constants',
    '^utils',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true
}
