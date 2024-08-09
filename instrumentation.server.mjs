import * as Sentry from "@sentry/remix";

Sentry.init({
    dsn: "__DSN__",
    tracesSampleRate: 1,
    autoInstrumentRemix: true,
    release: "2.0"
})