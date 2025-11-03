export default async function handler(req, res) {
  const { message } = await req.json();

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // 或 "deepseek-reasoner"（思考模式）
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    // 调试输出（可选）
    console.log("DeepSeek response:", data);

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response from DeepSeek.",
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ reply: "Server error" });
  }
}
