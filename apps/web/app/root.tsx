import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Toaster } from "sonner";
import type { Route } from "./+types/root";

import sharedCss from "@repo/ui/style.css?url";
import Sidebar from "@web-components/Sidebar";
import AuthProvider from "@web-providers/auth.provider";
import ReactQueryProvider from "@web-providers/react-query";
import stylesheet from "./app.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: sharedCss },
  { rel: "stylesheet", href: stylesheet },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: "Zenodeck Campaign" }];
}

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) {
      return;
    }
    (window as any).toggleTheme = () => {
      if (html.classList.contains("dark")) {
        html.classList.remove("dark");
      } else {
        html.classList.add("dark");
      }
    };
  }, []);

  return (
    <html lang="en" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <div className="flex h-screen">
              <Sidebar />
              {children}
            </div>
          </AuthProvider>
        </ReactQueryProvider>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto flex-1 p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
