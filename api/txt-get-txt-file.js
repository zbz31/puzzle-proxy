export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { file } = req.query;

  const validFiles = {
    update1: 'update38nodef.txt',
    update2: 'x000.txt',
    flagca: 'flagca.txt',
    update3: 'update26nodef.txt'
  };

  if (!file || !validFiles[file]) {
    return res.status(400).json({ error: 'Invalid or missing file' });
  }

  const targetUrl = `https://raw.githubusercontent.com/zbz31/zbz31.github.io/main/${validFiles[file]}`;

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error('❌ Error fetching file:', error);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
}
