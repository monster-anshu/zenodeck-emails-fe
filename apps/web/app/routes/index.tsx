import type { Route } from "./+types/index";
import { Button } from "@repo/ui/components/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <Button>Press me</Button>
    </main>
  );
}
