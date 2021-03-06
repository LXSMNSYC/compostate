/**
 * @license
 * MIT License
 *
 * Copyright (c) 2021 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2021
 */
import {
  createReactiveAtom,
  destroyReactiveAtom,
  notifyReactiveAtom,
  onCleanup,
  TRACKING,
} from './core';
import {
  createReactiveWeakKeys,
  notifyReactiveWeakKeys,
  ReactiveWeakKeys,
  trackReactiveWeakKeys,
} from './nodes/reactive-weak-keys';
import { registerTrackable } from './trackable';

// eslint-disable-next-line @typescript-eslint/ban-types
export default class ReactiveWeakMap<K extends object, V> implements WeakMap<K, V> {
  private source: WeakMap<K, V>;

  private atom = createReactiveAtom();

  private collection?: ReactiveWeakKeys<K>;

  constructor(source: WeakMap<K, V>) {
    this.source = source;

    onCleanup(() => {
      destroyReactiveAtom(this.atom);
    });

    registerTrackable(this.atom, this);
  }

  delete(key: K): boolean {
    const result = this.source.delete(key);
    if (result) {
      if (this.collection) {
        notifyReactiveWeakKeys(this.collection, key, true);
      }
      notifyReactiveAtom(this.atom);
    }
    return result;
  }

  get [Symbol.toStringTag](): string {
    return this.source[Symbol.toStringTag];
  }

  get(key: K): V | undefined {
    if (TRACKING) {
      if (!this.collection) {
        this.collection = createReactiveWeakKeys();
      }
      trackReactiveWeakKeys(this.collection, key);
    }
    return this.source.get(key);
  }

  set(key: K, value: V): this {
    const current = this.source.get(key);
    if (!Object.is(current, value)) {
      this.source.set(key, value);
      if (this.collection) {
        notifyReactiveWeakKeys(this.collection, key);
      }
      notifyReactiveAtom(this.atom);
    }
    return this;
  }

  has(key: K): boolean {
    if (TRACKING) {
      if (!this.collection) {
        this.collection = createReactiveWeakKeys();
      }
      trackReactiveWeakKeys(this.collection, key);
    }
    return this.source.has(key);
  }
}
