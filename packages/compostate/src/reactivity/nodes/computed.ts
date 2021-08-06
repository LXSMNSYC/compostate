import onCleanup from '../on-cleanup';
import ErrorBoundary, { ERROR_BOUNDARY, handleError, setErrorBoundary } from './error-boundary';
import LinkedWork, { setTracking, TRACKING } from './linked-work';
import ReactiveAtom from './reactive-atom';
import { registerTrackable } from './track-map';

interface Value<T> {
  value: T;
}

export default class ComputedNode<T> {
  private val: Value<T> | undefined;

  private atom = new ReactiveAtom();

  constructor(
    compute: () => T,
    errorBoundary?: ErrorBoundary,
  ) {
    const work = new LinkedWork(() => {
      work.unlinkDependencies();
      const parentTracking = TRACKING;
      const parentErrorBoundary = ERROR_BOUNDARY;
      setTracking(work);
      setErrorBoundary(errorBoundary);
      try {
        this.val = {
          value: compute(),
        };
      } catch (error) {
        handleError(errorBoundary, error);
      } finally {
        setErrorBoundary(parentErrorBoundary);
        setTracking(parentTracking);
      }
      this.atom.notify();
    });

    work.run();

    onCleanup(() => {
      work.destroy();
    });

    registerTrackable(this.atom, this);
  }

  get value(): T {
    this.atom.track();
    if (this.val) {
      return this.val.value;
    }
    throw new Error('failed computed');
  }
}
