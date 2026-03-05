const TARGET = 'https://alerts-history.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=1';

const OREF_HEADERS = {
  'Referer': 'https://www.oref.org.il/',
  'X-Requested-With': 'XMLHttpRequest',
};

export async function onRequestGet() {
  const resp = await fetch(TARGET, { headers: OREF_HEADERS });
  const body = await resp.arrayBuffer();
  return new Response(body, {
    status: resp.status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': resp.headers.get('Cache-Control') || 'public, max-age=2',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
