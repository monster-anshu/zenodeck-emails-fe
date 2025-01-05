import { Button } from "@repo/ui/components/button";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function IndexPage() {
  return (
    <main>
      <h1>Hello world</h1>
      <Button>Press me</Button>
    </main>
  );
}
