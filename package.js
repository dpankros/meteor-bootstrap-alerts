Package.describe({
  name: 'dpankros:bootstrap-alerts',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'livedata',
    'underscore',
    'deps',
    'templating',
    'ui',
    'blaze',
    'ejson',
    'reactive-var',
    'reactive-dict',
    'random',
    'jquery',
    'dpankros:timer'
  ], 'client');

  api.imply('dpankros:timer');

  api.addFiles([
    'bootstrap-alerts.html',
    'bootstrap-alerts.js'
  ], 'client');

  api.export([
    'AlertCategory',
    'BootstrapAlert'
  ],
  'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('dpankros:bootstrap-alerts');
  api.addFiles('bootstrap-alerts-tests.js');
});
