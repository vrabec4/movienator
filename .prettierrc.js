module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '^react(.*)',
    '<THIRD_PARTY_MODULES>',
    '@mui/(.*)',
    '@/(.*)',
    '^@types/?(.*)',
    '^@hooks/?(.*)',
    '^@utils/?(.*)',
    '^@features/(.*)',
    '^@components/(.*)',
    'src/(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
};