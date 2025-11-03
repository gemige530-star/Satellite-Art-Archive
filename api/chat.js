export default async function handler(req, res) {
  const { message } = await req.json();

  try {
    // 调用 DeepSeek Chat API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, // 改为 DeepSeek 的密钥环境变量
      },
      body: JSON.stringify({
        model: "deepseek-chat", // DeepSeek 的模型名
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response from DeepSeek.",
    });
  } catch (err) {
    res.status(500).json({ reply: "Server error with DeepSeek API." });
  }
}
