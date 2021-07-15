import { Resource } from 'compostate';
import Context from './context';
import { MOUNT } from './lifecycle';

export type SuspenseCapture = <T>(resource: Resource<T>) => void;

export interface SuspenseData {
  capture: SuspenseCapture;
  parent?: SuspenseData;
}

export const SUSPENSE = new Context<SuspenseData | undefined>();

export function suspend<T>(resource: Resource<T>): void {
  const mounting = MOUNT.getContext();

  if (!mounting) {
    throw new Error('Illegal suspend');
  }

  const suspense = SUSPENSE.getContext();

  if (suspense) {
    suspense.capture(resource);
  }
}