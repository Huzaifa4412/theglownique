import type { Logger } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  LoggerProvider,
  SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";

declare global {
  var __posthogLogger: Logger | undefined;
}

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

    if (!posthogHost || !posthogToken) {
      if (process.env.NODE_ENV !== "production") {
        const missingVariable = !posthogToken
          ? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"
          : "NEXT_PUBLIC_POSTHOG_HOST";
        console.error(
          `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
        );
      }
      return;
    }

    const exporter = new OTLPLogExporter({
      url: `${posthogHost.replace(/\/+$/, "")}/otlp/v1/logs`,
      headers: {
        Authorization: `Bearer ${posthogToken}`,
      },
    });

    const loggerProvider = new LoggerProvider({
      resource: resourceFromAttributes({
        "service.name": "theglownique",
      }),
      processors: [
        new SimpleLogRecordProcessor({
          exporter,
        }),
      ],
    });

    // make the logger available globally
    globalThis.__posthogLogger = loggerProvider.getLogger("theglownique");
  }
}
