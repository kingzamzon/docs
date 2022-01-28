---
sidebar_position: 11
---

# Tests

Currently we have manual tests that you can run in the browser in manual_tests.html. To run these, set up a HTTP server in the build folder. We use python for this with the built in SimpleHTTPServer module by running "python2 -m SimpleHTTPServer" and then going to "http://localhost:8000/manual_tests.html" in a browser.

There is also an attempt at automated tests in the tests folder but running it with nodejs does not work because this project is bundled. An attempt at bundling the tests as well is in esbuild-tests.js which should work someday, but the project depends on fetch and I gave up when trying to inject fetch into esbuild.
