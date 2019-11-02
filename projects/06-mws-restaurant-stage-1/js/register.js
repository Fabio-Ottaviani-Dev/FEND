// -----------------------------------------------------------------------------------------------
// Service Worker
// -----------------------------------------------------------------------------------------------
// hhttps://jakearchibald.github.io/isserviceworkerready/
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/serviceWorker
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
// https://developers.google.com/web/fundamentals/primers/service-workers/
// -----------------------------------------------------------------------------------------------

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/sw.js')
    .then(reg => {
      console.log('serviceWorker: reg OK: ' + reg.scope);
    })
    .catch(error => {
    console.log('serviceWorker: reg KO: ' + error);
  });
}

// -----------------------------------------------------------------------------------------------