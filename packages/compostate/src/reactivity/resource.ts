import batch from './batch';
import effect from './effect';
import reactive from './reactive';

export interface ResourcePending {
  status: 'pending';
  value?: undefined;
}

export interface ResourceFailure {
  status: 'failure';
  value: any;
}

export interface ResourceSuccess<T> {
  status: 'success';
  value: T;
}

export type Resource<T> =
  | ResourcePending
  | ResourceFailure
  | ResourceSuccess<T>;

export interface ResourceOptions<T> {
  initialValue?: T;
  timeoutMS?: number;
}

export default function resource<T>(
  fetcher: () => Promise<T>,
  options: ResourceOptions<T> = {},
): Resource<T> {
  const baseState: Resource<T> = options.initialValue != null
    ? { status: 'success', value: options.initialValue }
    : { status: 'pending' };

  const state = reactive<Resource<T>>(baseState);

  effect(() => {
    let alive = true;

    const promise = fetcher();

    const stop = effect(() => {
      // If there's a transition timeout,
      // do not fallback to pending state.
      if (options.timeoutMS) {
        const timeout = setTimeout(() => {
          // Resolution takes too long,
          // fallback to pending state.
          batch(() => {
            state.status = 'pending';
          });
        }, options.timeoutMS);

        return () => {
          clearTimeout(timeout);
        };
      }
      state.status = 'pending';
      return undefined;
    });

    promise.then(
      (value) => {
        if (alive) {
          stop();
          batch(() => {
            state.status = 'success';
            state.value = value;
          });
        }
      },
      (value: any) => {
        if (alive) {
          stop();
          batch(() => {
            state.status = 'failure';
            state.value = value;
          });
        }
      },
    );

    return () => {
      alive = false;
    };
  });

  return state;
}
