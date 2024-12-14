import { ValidatedString } from './ValidatedString.ts';

const isPrometheusMetricNameWithoutColon = (s: string): boolean => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(s);

const JSRCompatibleFactory = ValidatedString.create(
  isPrometheusMetricNameWithoutColon,
  {
    name: 'PrometheusMetricNameWithoutColon',
    description: 'must start with a letter or underscore, followed by letters, digits, or underscores',
  },
);

export type PrometheusMetricNameWithoutColon = typeof JSRCompatibleFactory.type;
export const PrometheusMetricNameWithoutColon = JSRCompatibleFactory.factory;
