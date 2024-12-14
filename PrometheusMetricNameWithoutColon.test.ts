import { assertEquals, assertThrows } from '@std/assert';
import { PrometheusMetricNameWithoutColon } from './PrometheusMetricNameWithoutColon.ts';

Deno.test('PrometheusMetricNameWithoutColon - validates standard Prometheus metric names without colons', () =>
{
  const validInputs = [
    // Standard metrics
    'http_requests_total',
    'prometheus_http_requests_total',
    'process_cpu_seconds_total',
    
    // With numbers (but not leading)
    'http_2xx_requests_total',
    'tcp_port_8080_connections',
    
    // With underscores
    '_leading_underscore',
    'trailing_underscore_',
    'multiple__underscores',
    
    // Single character
    'a',
    '_',
  ];

  for (const input of validInputs)
  {
    const result = PrometheusMetricNameWithoutColon.try(input);
    assertEquals(result, input);
  }
});

Deno.test('PrometheusMetricNameWithoutColon - rejects invalid metric names', () =>
{
  const invalidInputs = [
    // With colons (not allowed in this version)
    'node:http_requests_total',
    ':leading_colon',
    'trailing_colon:',
    'multiple::colons',
    
    // Invalid starts
    '1_metric', // starts with number
    '123abc', // starts with number
    
    // Invalid characters
    'http-requests-total', // hyphens not allowed
    'http.requests.total', // dots not allowed
    'http requests total', // spaces not allowed
    'http$requests', // special characters
    'metric/sec', // slashes
    'metric@host', // at symbol
    
    // Empty
    '',
    
    // Unicode/emoji
    'http_requests_😀',
    'métric_name',
  ];

  for (const input of invalidInputs)
  {
    const result = PrometheusMetricNameWithoutColon.try(input);
    assertEquals(result, undefined);
  }
});

Deno.test('PrometheusMetricNameWithoutColon - assert throws with descriptive message', () =>
{
  assertThrows(
    () => PrometheusMetricNameWithoutColon.assert('invalid:metric:name'),
    Error,
    'Invalid string did not pass validation: Supplied value "invalid:metric:name" is not valid for validator "PrometheusMetricNameWithoutColon" (must start with a letter or underscore, followed by letters, digits, or underscores).',
  );
});

Deno.test('PrometheusMetricNameWithoutColon - type safety', () =>
{
  // @ts-expect-error Type 'string' is not assignable to type 'PrometheusMetricNameWithoutColon'
  const _invalid: PrometheusMetricNameWithoutColon = 'invalid:metric:name';

  const valid: PrometheusMetricNameWithoutColon = PrometheusMetricNameWithoutColon.assert('valid_metric_name');
  assertEquals(valid, 'valid_metric_name');
});
