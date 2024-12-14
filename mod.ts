export { ValidatedString } from './ValidatedString.ts';

export { AlphabeticOrUnderscoreOrHyphenString } from './AlphabeticOrUnderscoreOrHyphenString.ts';
export { AlphabeticOrUnderscoreString } from './AlphabeticOrUnderscoreString.ts';
export { AlphabeticString } from './AlphabeticString.ts';
export { AwesomeString } from './AwesomeString.ts';
export { LowercaseAlphabeticString } from './LowercaseAlphabeticString.ts';
export { PrometheusMetricName } from './PrometheusMetricName.ts';
export { PrometheusMetricNameWithoutColon } from './PrometheusMetricNameWithoutColon.ts';

if (import.meta.main)
{
  console.log(
    `This is the @axhxrx/validated-string module. It doesn't have any CLI functionality, though. It exists only to help build programs that use runtime-validate strings with some modicum of build-time type-safety.`,
  );
}
