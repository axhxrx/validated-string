import { ValidatedString, type ValidatedStringFactory } from './ValidatedString.ts';

const isPrometheusMetricNameWithoutColon = (s: string): boolean => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(s);

/**
 Why JSRCompatibleFactory? See https://github.com/axhxrx/validated-string/issues/1 — consumers of this lib probably don't need to deal with this
 */
const JSRCompatibleFactory = ValidatedString.create(
  isPrometheusMetricNameWithoutColon,
  {
    name: 'PrometheusMetricNameWithoutColon',
    description:
      'must start with a letter or underscore, followed by letters, digits, or underscores',
  },
);

const type: ValidatedString<typeof isPrometheusMetricNameWithoutColon> = JSRCompatibleFactory.type;
const factory: ValidatedStringFactory<typeof isPrometheusMetricNameWithoutColon> = JSRCompatibleFactory.factory;

/**
 A validated string that represents a Prometheus metric name, but without the colon. See {@link ValidatedString} and {@link PrometheusMetricName} for more information.

 @category Prometheus
 */
export type PrometheusMetricNameWithoutColon = typeof type;
export const PrometheusMetricNameWithoutColon = factory;
