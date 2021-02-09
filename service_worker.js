importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.routing.registerRoute(
  ({url}) => url.host.indexOf('jdev') != -1 || url.host.indexOf('localhost') != -1,
  new workbox.strategies.NetworkFirst()
);