import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  LoggerProvider,
  SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const posthogHost =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    const posthogToken =
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
      "phc_A7Tsd4jXoDR4ULBUhz84igBSUHMqVMpn7pzCPbrJBnvZ";

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
    (globalThis as any).__posthogLogger =
      loggerProvider.getLogger("theglownique");
  }
}
