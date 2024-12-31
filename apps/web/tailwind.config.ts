import type { Config } from "tailwindcss";
import sharedConfig from "@repo/config-tailwind";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{tsx,ts,jsx,js,html,mjs}",
  ],
  presets: [sharedConfig],
} satisfies Config;
