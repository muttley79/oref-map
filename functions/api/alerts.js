import { orefProxy } from './_proxy.js';

export async function onRequestGet(context) {
  return orefProxy(context, {
    target: 'https://www.oref.org.il/warningMessages/alert/Alerts.json',
    redirectSuffix: '/api2/alerts',
    kind: 'alerts',
    debugTarget: 'http://3536600d-9ce5-48c3-9324-e37374eb3979.cfargotunnel.com/api/alerts',
  });
}
