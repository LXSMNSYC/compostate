import { Ref } from 'compostate';

export type VElement<P extends Record<string, any> = Record<string, any>> = ShallowReactive<{
  type: VConstructor;
  props: P;
}>;

export type VText = string | number;
export type VNull = boolean | null | undefined;
export type VChild = VElement | VText;
export type VNode = VChild | VNull | VNode[] | Ref<VNode> | VElement;

export interface Attributes {
  // empty
}

export interface RefAttributes<T> extends Attributes {
  ref?: Ref<T> | undefined;
}

export interface WithChildren extends Attributes {
  children?: VNode[] | undefined;
}

export interface BaseProps<T> extends RefAttributes<T>, WithChildren {
  [key: string]: any;
}

export type ShallowReactive<V> =
  V extends Ref<infer T>
    ? Ref<Ref<T>>
    : V | Ref<V>;

export type ReactiveProperty<K, V> =
  K extends 'ref'
    ? V
    :
  K extends 'children'
    ? V
    : ShallowReactive<V>;

export type Reactive<P> =
  P extends BaseProps<any>
    ? { [K in keyof P]: ReactiveProperty<K, P[K]> }
    :
  P extends Array<infer U>
    ? Array<U | Ref<U>>
    : ShallowReactive<P>;

export interface VComponent<P> {
  (props: P): VNode;
  props?: Reactive<P>;
}

export type VFragment = 1;
export type VSuspense = 2;
export type VOffscreen = 3;
export type VPortal = 4;
export type VFor = 5;

export type VSpecialConstructor =
  | VFragment
  | VSuspense
  | VOffscreen
  | VPortal
  | VFor;

export type VConstructor<P extends Record<string, any> = Record<string, any>> =
  | ShallowReactive<string
  | VComponent<P>
  | VSpecialConstructor>;
