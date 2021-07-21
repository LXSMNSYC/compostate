import { effect, EffectCleanup, Ref } from 'compostate';
import { Marker } from '../dom';
import { handleError } from '../error-boundary';
import { ShallowReactive, VNode } from '../types';
import { Boundary, RenderChildren } from './types';

export default function renderRef(
  boundary: Boundary,
  root: HTMLElement,
  children: Ref<VNode>,
  renderChildren: RenderChildren,
  marker: ShallowReactive<Marker | null> = null,
  suspended: Ref<boolean | undefined> | boolean | undefined = false,
): EffectCleanup {
  return effect(() => {
    renderChildren(
      boundary,
      root,
      children.value,
      marker,
      suspended,
    );
  }, {
    onError(error) {
      handleError(boundary.error, error);
    },
  });
}
