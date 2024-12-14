import { ValidatedString } from './ValidatedString.ts';

const isPrometheusMetricName = (s: string): boolean => /^[a-zA-Z_:][a-zA-Z0-9_:]*$/.test(s);

const JSRCompatibleFactory = ValidatedString.create(isPrometheusMetricName, {
  name: 'PrometheusMetricName',
  description: 'must start with a letter, underscore, or colon, followed by letters, digits, underscores, or colons',
});

/**
 A validated string that represents a Prometheus metric name. See {@link ValidatedString} for more information. Note that this might not really exactly match the rules for Prometheus metric names, but it's close enough for our purposes; namely, generating metrics — don't rely on this to *validate* Prometheus metric names, as it is based on a quick skim of the Prometheus docs.
 */
export type PrometheusMetricName = typeof JSRCompatibleFactory.type;
export const PrometheusMetricName = JSRCompatibleFactory.factory;
