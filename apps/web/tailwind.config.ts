import sharedConfig from "@repo/config-tailwind";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{tsx,ts,jsx,js,html,mjs}",
  ],
  presets: [sharedConfig],
} satisfies Config;
