import { ValidatedString } from './ValidatedString.ts';

const isPrometheusMetricNameWithoutColon = (s: string) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(s);

const { factory, type } = ValidatedString.create(isPrometheusMetricNameWithoutColon, {
  name: 'PrometheusMetricNameWithoutColon',
  description: 'must start with a letter or underscore, followed by letters, digits, or underscores',
});

export type PrometheusMetricNameWithoutColon = typeof type;
export const PrometheusMetricNameWithoutColon = factory;
