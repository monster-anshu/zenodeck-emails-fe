import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function IndexPage() {
  return <main className="">main</main>;
}
