// This script copies src/index.html into /dist/index.html
// and adds TrackJS error tracking code for use in production
// when useTrackJs is set to true below and a trackJsToken is provided.
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only want to track errors in the built production code.

// Allowing console calls below since this is a build file.
/* eslint-disable no-console */

import fs from 'fs';
import cheerio from 'cheerio';

const useTrackJs = false; // If you choose not to use TrackJS, just set this to false and the build warning will go away.
const trackJsToken = ''; // If you choose to use TrackJS, insert your unique token here. To get a token, go to https://trackjs.com

fs.readFile('src/index.html', 'utf8', (readError, markup) => {
  if (readError) {
    return console.log(readError);
  }

  const $ = cheerio.load(markup);

  if (useTrackJs) {
    if (trackJsToken) {
      const trackJsCode = `<!-- BEGIN TRACKJS Note: This should be the first <script> on the page per https://my.trackjs.com/install --><script>window._trackJs = { token: '${trackJsToken}' };</script><script src=https://d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js></script><!-- END TRACKJS -->`;

      $('head').prepend(trackJsCode); // add TrackJS tracking code to the top of <head>
    } else {
      console.log('To track JavaScript errors, sign up for a free trial at TrackJS.com and enter your token in /tools/build.html on line 10.');
    }
  }

  fs.writeFile('index.html', $.html(), 'utf8', (writeError) => {
    if (writeError) {
      return console.log(writeError);
    }
    console.log('index.html written to /');

    return writeError;
  });

  return readError;
});