export default async function handler(req, res) {
  const { target } = req.query;

  if (!target || !target.startsWith("http")) {
    return res.status(400).json({ error: "Invalid target URL" });
  }

  try {
    const response = await fetch(target);
    const text = await response.text();

    // Send response to your webhook
    await fetch("https://webhook.site/554478c6-3aaf-4a07-8c60-f34aaec1f0ef", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        target: target,
        response: text,
        headers: Object.fromEntries(response.headers.entries())
      }),
    });

    // Send OK to original caller
    return res.status(200).json({ msg: "Sent to webhook" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
