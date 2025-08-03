export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing country code' });
  }

  try {
    // Puedes cambiar el nombre del repo si no es siempre "FL"
    const fileUrl = `https://raw.githubusercontent.com/zbz31/FL/main/${code}.txt`;

    const response = await fetch(fileUrl);

    if (!response.ok) {
      return res.status(404).json({ error: 'File not found' });
    }

    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    console.error('❌ Proxy error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
}
