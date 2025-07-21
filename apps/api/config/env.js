import "dotenv/config";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const DATABASE_URL = process.env.DATABASE_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 3000;
export const SECRET = process.env.SECRET;
export const PRIV_KEY = await fs.readFile(join(__dirname, "../keys/private.pem"));
export const PUB_KEY = await fs.readFile(join(__dirname, "../keys/public.pem"));
