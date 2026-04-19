import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createExpressMiddleware } = require("@trpc/server/adapters/express");
const { appRouter } = require("../server/routers.js");
const { createContext } = require("../server/_core/context.js");
const { registerOAuthRoutes } = require("../server/_core/oauth.js");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerOAuthRoutes(app);

const trpcMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
});

app.use("/api/trpc", trpcMiddleware);
app.use("/trpc", trpcMiddleware);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
