import Context from '../../context';

export type ErrorCapture = (error: Error) => void;

export const ERROR = new Context<ErrorBoundary>();

export default class ErrorBoundary {
  private collection?: Set<ErrorCapture>;

  private parent?: ErrorBoundary;

  constructor(parent?: ErrorBoundary) {
    this.parent = parent;
  }

  register(callback: ErrorCapture): () => void {
    if (!this.collection) {
      this.collection = new Set();
    }
    this.collection.add(callback);
    return () => {
      this.collection?.delete(callback);
    };
  }

  capture(error: Error): void {
    if (this.collection?.size) {
      try {
        new Set(this.collection).forEach((capture) => {
          capture(error);
        });
      } catch (newError) {
        if (this.parent) {
          this.parent.capture(error);
          this.parent.capture(newError);
        } else {
          throw newError;
        }
      }
    } else if (this.parent) {
      this.parent.capture(error);
    } else {
      throw error;
    }
  }
}