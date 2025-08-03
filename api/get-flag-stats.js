export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(`https://puzzle-rate-012n12.replit.app/get-flag-stats/${id}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to backend' });
  }
}
