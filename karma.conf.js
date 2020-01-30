// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

require('babel-polyfill');

const path = require('path');

module.exports = config => {
  config.set({
    basePath: 'lib',
    frameworks: [
      'jasmine'
    ],
    plugins: [
      'karma-*',
      'karma-cbt-launcher',
    ],
    files: [
      {pattern: '**/*.spec.ts'}
    ],
    preprocessors: {
      '**/*.ts': 'webpack',
    },

    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader'
          },
          {
            test: /\.ts$/,
            use: {loader: 'istanbul-instrumenter-loader'},
            enforce: 'post',
            exclude: /\.spec\.ts$/
          }

        ]
      },
    },
    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['progress', 'kjhtml', 'coverage-istanbul', 'spec'],
    // https://www.npmjs.com/package/karma-coverage-istanbul-reporter
    coverageIstanbulReporter: {
      dir: path.join(__dirname, 'coverage'),
      reports: ['text-summary', 'lcovonly', 'html'],
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      },
      combineBrowserReports: true // Combines coverage information from multiple browsers into one report
    },

    // crossbrowsertesting.com
    cbtConfig: {
      username: process.env.CBT_USERNAME,
      accessKey: process.env.CBT_AUTHKEY
    },

    logLevel: config.LOG_DEBUG,

    // define browsers
    customLaunchers: {
      bs_win_chrome: {
        base: 'CrossBrowserTesting',
        browserName: 'bs_win_chrome',
        os_api_name: 'Win10',
        browser_api_name: 'chrome-latest'
      },
      bs_win_firefox: {
        base: 'CrossBrowserTesting',
        browserName: 'Firefox',
        version: '72x64',
        platform: 'Windows 10'
      },
      bs_osx_safari: {
        base: 'CrossBrowserTesting',
        browserName: 'Safari',
        version: '13',
        platform: 'Mac OSX 10.15'
      },
      bs_win_edge: {
        base: 'CrossBrowserTesting',
        browserName: 'bs_win_edge',
        os_api_name: 'Win10',
        browser_api_name: 'edge-latest'
      }
    },

    //autoWatch: true,
    browsers: ['Chrome'],
    colors: true,
    singleRun: false,

    // Increase time-outs to prevent disconnects on BrowserStack
    captureTimeout: 300000,
    browserNoActivityTimeout: 300000,
    browserDisconnectTimeout: 300000,
    browserDisconnectTolerance: 3
  });
};
