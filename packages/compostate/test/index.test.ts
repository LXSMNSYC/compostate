import {
  effect,
  state,
} from '../src';

describe('get', () => {
  it('should receive the initial state of the state', () => {
    const expected = 'Example';

    const reference = state(() => expected);

    expect(reference.value).toBe(expected);
  });
  it('should receive the derived state of the state', () => {
    const expected = 'Example';

    const reference = state(() => expected);

    const derived = state(() => reference.value);

    expect(derived.value).toBe(expected);
  });
});
describe('set', () => {
  it('should overwrite the state', () => {
    const expectedA = 'Example';
    const expectedB = 'Updated';

    const reference = state(() => expectedA);

    expect(reference.value).toBe(expectedA);
    reference.value = expectedB;
    expect(reference.value).toBe(expectedB);
  });
  it('should update the dependent state', () => {
    const expectedA = 'Example';
    const expectedB = 'Updated';

    const reference = state(() => expectedA);

    const derived = state(() => reference.value);

    expect(derived.value).toBe(expectedA);
    reference.value = expectedB;
    expect(derived.value).toBe(expectedB);
  });
});
describe('reset', () => {
  it('should reset the state', () => {
    const expectedA = 'Example';
    const expectedB = 'Updated';

    const reference = state(() => expectedA);

    expect(reference.value).toBe(expectedA);
    reference.value = expectedB;
    expect(reference.value).toBe(expectedB);
    reference.reset();
    expect(reference.value).toBe(expectedA);
  });
  it('should reset the dependent state', () => {
    const expectedA = 'Example';
    const expectedB = 'Updated';

    const reference = state(() => expectedA);

    const derived = state(() => reference.value);

    expect(derived.value).toBe(expectedA);
    reference.value = expectedB;
    expect(derived.value).toBe(expectedB);
    reference.reset();
    expect(derived.value).toBe(expectedA);
  });
  it('should destroy internal state on state reset', () => {
    const expectedA = 'Example';
    const expectedB = 'Updated';

    let destroyed = false;

    const reference = state(() => {
      const internal = state(() => 'Example', () => {
        destroyed = true;
      });

      internal.reset();

      return expectedA;
    });

    expect(reference.value).toBe(expectedA);
    reference.value = expectedB;
    expect(reference.value).toBe(expectedB);
    reference.reset();
    expect(reference.value).toBe(expectedA);
    expect(destroyed).toBe(true);
  });
  it('should destroy the internal state of the dependent state', () => {
    const expectedA = 'Example';
    const expectedB = 'Updated';

    const reference = state(() => expectedA);

    let destroyed = 0;

    const derived = state(() => {
      const internal = state(() => 'Example', () => {
        destroyed += 1;
      });

      internal.reset();

      return reference.value;
    });

    expect(derived.value).toBe(expectedA);
    reference.value = expectedB;
    expect(derived.value).toBe(expectedB);
    reference.reset();
    expect(derived.value).toBe(expectedA);
    // 2 times, one for set, one for reset
    expect(destroyed).toBe(2);
  });
});
describe('destroy', () => {
  it('should fail to destroy the state if state isn\'t initialized.', () => {
    let destroyed = false;

    const reference = state(() => 'Example', () => {
      destroyed = true;
    });

    expect(destroyed).toBe(false);
    reference.destroy();
    expect(destroyed).toBe(false);
  });
  it('should destroy the state if state is initialized.', () => {
    let destroyed = false;

    const reference = state(() => 'Example', () => {
      destroyed = true;
    });

    reference.reset();
    expect(destroyed).toBe(false);
    reference.destroy();
    expect(destroyed).toBe(true);
  });
  it('should fail to destroy the derived state if derived state isn\'t initialized.', () => {
    let destroyed = false;

    const reference = state(() => 'Example');

    state(() => reference.value, () => {
      destroyed = true;
    });

    expect(destroyed).toBe(false);
    reference.destroy();
    expect(destroyed).toBe(false);
  });
  it('should throw an error if state is attempted to be destroyed and derived is initialized.', () => {
    let destroyed = false;

    const reference = state(() => 'Example');

    const derived = state(() => reference.value, () => {
      destroyed = true;
    });

    derived.reset();
    expect(destroyed).toBe(false);
    expect(() => reference.destroy()).toThrow();
  });
  it('should destroy the derived state in cascade mode', () => {
    let destroyed = false;

    const reference = state(() => 'Example');

    const derived = state(() => reference.value, () => {
      destroyed = true;
    });

    derived.reset();
    expect(destroyed).toBe(false);
    reference.destroy(true);
    expect(destroyed).toBe(true);
  });
});

describe('effect', () => {
  it('should re-run for state updates', () => {
    const reference = state(() => 'Example');

    let called = 0;

    effect(() => {
      reference.watch();
      called += 1;
    });

    expect(called).toBe(1);
    reference.value = 'Update';
    expect(called).toBe(2);
  });
  it('should re-run for derived updates', () => {
    const reference = state(() => 'Example');

    const derived = state(() => reference.value);

    let called = 0;

    effect(() => {
      derived.watch();
      called += 1;
    });

    expect(called).toBe(1);
    reference.value = 'Update';
    expect(called).toBe(2);
  });

  it('should cleanup when stopped', () => {
    let destroyed = false;

    const stop = effect(() => () => {
      destroyed = true;
    });

    expect(destroyed).toBe(false);
    stop();
    expect(destroyed).toBe(true);
  });
  it('should destroy internal state when stopped', () => {
    let destroyed = false;

    const stop = effect(() => {
      const internal = state(() => 'Example', () => {
        destroyed = true;
      });

      internal.reset();
    });

    expect(destroyed).toBe(false);
    stop();
    expect(destroyed).toBe(true);
  });
  it('should cleanup recursively when stopped', () => {
    let destroyed = false;

    const stop = effect(() => effect(() => () => {
      destroyed = true;
    }));

    expect(destroyed).toBe(false);
    stop();
    expect(destroyed).toBe(true);
  });
  it('should cleanup internal effects when stopped', () => {
    let destroyed = false;

    const stop = effect(() => {
      effect(() => () => {
        destroyed = true;
      });
    });

    expect(destroyed).toBe(false);
    stop();
    expect(destroyed).toBe(true);
  });
});
