`@cley_faye/pocoma`
===================
Small server+webapp to take pictures of people and save them for later use.

Why this name
-------------
I took the first two letters from the words in the random name github suggested.

How to use
----------
When you start the app (using `npm start`) it will displays the URL to open in your browser.
(optionally it will try to launch chromium/chrome/firefox if available).
The webapp allows you to either setup the application or start the "kiosk" mode.

There's three operating mode:

- taking picture then filling email info
- filling email info then taking picture
- both on the same screen

In addition to the mode of operation, after each "picture" is ready, it can trigger a print.

All pictures will be saved in a directory with a shortcut on the "setup" page when the webapp is
started.

Closing the server
------------------
Once the webapp is loaded, closing the webapp for more than five seconds will kill the server.

Building
--------
Full application is built when the project is packaged using `npm pack`.
It can be built manually with the default Grunt command.

For development, running `npm run dev` will start the server and monitor changes in the source with
livereload.
