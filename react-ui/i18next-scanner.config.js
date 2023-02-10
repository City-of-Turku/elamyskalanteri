// eslint-disable-next-line @typescript-eslint/no-var-requires
const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
  input: [
    'src/**/*.{js,ts,jsx,tsx}',
    // Use ! to filter out files or directories
    '!src/**/*.test.{js,ts,jsx,tsx}',
    '!src/**/*.spec.{js,ts,jsx,tsx}',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: false,
    sort: true,
    removeUnusedKeys: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: function (ns, value) {
        return value;
      },

      // https://react.i18next.com/latest/trans-component#usage-with-simple-html-elements-like-less-than-br-greater-than-and-others-v10.4.0
      supportBasicHtmlNodes: true, // Enables keeping the name of simple nodes (e.g. <br/>) in translations instead of indexed keys.
      keepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'], // Which nodes are allowed to be kept in translations during defaultValue generation of <Trans>.

      // https://github.com/acornjs/acorn/tree/master/acorn#interface
      acorn: {
        ecmaVersion: 'latest',
        sourceType: 'module', // defaults to 'module'
      },
    },
    lngs: ['en', 'fi', 'sv'],
    ns: [],
    defaultLng: 'en',
    defaultNs: 'translation',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'src/translations/{{lng}}/translation.json',
      savePath: 'src/translations/{{lng}}/translation.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: ':', // namespace separator
    keySeparator: '.', // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
    metadata: {},
    allowDynamicKeys: false,
  },
  transform: typescriptTransform({
    tsOptions: {
      target: 'ESNext',
    },
    extensions: ['.ts', '.tsx'],
  }),
};
