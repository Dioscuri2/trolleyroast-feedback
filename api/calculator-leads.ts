import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { calculator, email, payload } = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};

  return res.status(200).json({
    ok: true,
    calculator,
    email,
    capturedAt: new Date().toISOString(),
    note: "Placeholder lead capture endpoint is active. Swap to real email/CRM integration later without changing the calculator UI flow.",
    payload,
  });
}
