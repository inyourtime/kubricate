import { describe, it, expect } from 'vitest';
import { EnvSecretProvider } from './EnvSecretProvider.js';

describe('EnvSecretProvider', () => {

  it('should create correct kubectl effect in prepare()', () => {
    const provider = new EnvSecretProvider({ name: 'my-secret', namespace: 'custom-ns' });

    const effects = provider.prepare('API_KEY', 'super-secret-value');
    expect(effects[0]).toMatchObject({
      type: 'kubectl',
      value: {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
          name: 'my-secret',
          namespace: 'custom-ns',
        },
        type: 'Opaque',
        data: {
          API_KEY: expect.any(String),
        },
      },
    });
  });
});