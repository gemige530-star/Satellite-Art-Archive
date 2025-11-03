export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: req.body.messages || [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Hello!" }
        ],
        stream: false
      })
    });

    // 处理 DeepSeek 的响应
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: true,
        message: `DeepSeek API Error: ${errorText}`
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
}
