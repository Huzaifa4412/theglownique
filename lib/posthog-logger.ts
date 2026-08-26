import { SeverityNumber } from "@opentelemetry/api-logs";
import type { Logger } from "@opentelemetry/api-logs";

declare global {
  // eslint-disable-next-line no-var
  var __posthogLogger: Logger | undefined;
}

export { SeverityNumber };

export function getPostHogLogger(): Logger | undefined {
  return globalThis.__posthogLogger;
}

export interface LogOptions {
  severity?: "INFO" | "WARN" | "ERROR" | "DEBUG";
  attributes?: Record<string, string | number | boolean | undefined>;
}

export function logToPostHog(
  body: string,
  options?: LogOptions
) {
  const logger = globalThis.__posthogLogger;
  if (!logger) return;

  const severity = options?.severity ?? "INFO";
  let severityNumber = SeverityNumber.INFO;
  if (severity === "DEBUG") severityNumber = SeverityNumber.DEBUG;
  else if (severity === "WARN") severityNumber = SeverityNumber.WARN;
  else if (severity === "ERROR") severityNumber = SeverityNumber.ERROR;

  logger.emit({
    severityNumber,
    severityText: severity,
    body,
    attributes: options?.attributes,
  });
}
