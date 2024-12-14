import { assertEquals, assertThrows } from '@std/assert';
import { PrometheusMetricName } from './PrometheusMetricName.ts';

Deno.test('PrometheusMetricName - validates standard Prometheus metric names', () =>
{
  const validInputs = [
    // Standard metrics
    'http_requests_total',
    'prometheus_http_requests_total',
    'process_cpu_seconds_total',
    
    // With colons (common in some exporters)
    'node:http_requests_total:sum_rate5m',
    'namespace:container_memory_usage_bytes:sum',
    ':leading_colon',
    'trailing_colon:',
    'multiple::colons',
    
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
    ':',
  ];

  for (const input of validInputs)
  {
    const result = PrometheusMetricName.try(input);
    assertEquals(result, input);
  }
});

Deno.test('PrometheusMetricName - rejects invalid metric names', () =>
{
  const invalidInputs = [
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
    const result = PrometheusMetricName.try(input);
    assertEquals(result, undefined);
  }
});

Deno.test('PrometheusMetricName - assert throws with descriptive message', () =>
{
  assertThrows(
    () => PrometheusMetricName.assert('invalid-metric-name'),
    Error,
    'Invalid string did not pass validation: Supplied value "invalid-metric-name" is not valid for validator "PrometheusMetricName" (must start with a letter, underscore, or colon, followed by letters, digits, underscores, or colons).',
  );
});

Deno.test('PrometheusMetricName - type safety', () =>
{
  // @ts-expect-error Type 'string' is not assignable to type 'PrometheusMetricName'
  const _invalid: PrometheusMetricName = 'invalid-metric-name';

  const valid: PrometheusMetricName = PrometheusMetricName.assert('valid_metric_name');
  assertEquals(valid, 'valid_metric_name');
});
