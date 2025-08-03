export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  // Detecta si es un código país o archivo general
  const isGeneral = code.startsWith('update') || code.startsWith('flag') || code === 'x000';

  const repo = isGeneral ? 'zbz31.github.io' : 'FL';
  const url = `https://raw.githubusercontent.com/zbz31/${repo}/main/${code}.txt`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(404).json({ error: 'File not found' });
    }

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
}
