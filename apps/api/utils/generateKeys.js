import { generateKeyPairSync } from "node:crypto";
import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function generateKeys() {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  const keysDir = join(__dirname, "../keys");
  
  await fs.mkdir(keysDir, { recursive: true });

  await fs.writeFile(join(keysDir, "private.pem"), privateKey);
  await fs.writeFile(join(keysDir, "public.pem"), publicKey);

  console.log("🔑 Keys generated and saved in /keys folder!");
}

generateKeys();
