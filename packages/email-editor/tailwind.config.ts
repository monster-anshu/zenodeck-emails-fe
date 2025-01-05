import sharedConfig from "@repo/config-tailwind";
import { join } from "path";
import type { Config } from "tailwindcss";

const src = join(__dirname, "src/**/*.{ts,tsx,html}");

const config: Config = {
  content: [src],
  presets: [sharedConfig],
};

export default config;
