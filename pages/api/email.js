export default async function handler(req, res) {
  const apiKey = process.env.MAILSAC_API_KEY;

  const response = await fetch('https://mailsac.com/api/addresses', {
    headers: {
      'Mailsac-Key': apiKey
    }
  });

  const emails = await response.json();
  const email = emails.length
    ? emails[Math.floor(Math.random() * emails.length)]._id
    : null;

  res.status(200).json({ email: email || "aucun email trouvé" });
}
