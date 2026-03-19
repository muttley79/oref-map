export default {
  async fetch(request, env) {
    const key = request.headers.get('X-Ingest-Key');
    if (!key || key !== env.INGEST_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const mode = url.searchParams.get('mode') || '1';
    const city0 = url.searchParams.get('city_0');

    let targetUrl = `https://alerts-history.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=${mode}`;
    if (city0) {
      targetUrl += `&city_0=${encodeURIComponent(city0)}`;
    }

    const resp = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://www.oref.org.il/',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const body = await resp.arrayBuffer();
    return new Response(body, { status: resp.status });
  },
};
