import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import "./tailwind.css";
// Sentry provides a type for Remix v2 MetaFunction parameters
// so you can access `data.sentryTrace` and `data.sentryBaggage` alongside other data from loader.
import type { SentryMetaArgs } from "@sentry/remix";
import type { MetaFunction } from "@remix-run/node";

import { withSentry } from "@sentry/remix";


export const loader = async () => {
  return { name: "Customer name" };
};


export const meta = ({
  data,
}: SentryMetaArgs<MetaFunction<typeof loader>>) => {
  return [
    {
      name: "sentry-trace",
      content: data.sentryTrace,
    },
    {
      name: "baggage",
      content: data.sentryBaggage,
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

function App() {
  return <Outlet />;
}

export default withSentry(App);