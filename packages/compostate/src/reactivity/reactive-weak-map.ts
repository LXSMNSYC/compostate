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
import ReactiveAtom from './nodes/reactive-atom';
import ReactiveWeakKeys from './nodes/reactive-weak-keys';
import { registerTrackable } from './nodes/track-map';

// eslint-disable-next-line @typescript-eslint/ban-types
export default class ReactiveWeakMap<K extends object, V> implements WeakMap<K, V> {
  private source: WeakMap<K, V>;

  private atom = new ReactiveAtom();

  private collection?: ReactiveWeakKeys<K>;

  constructor(source: WeakMap<K, V>) {
    this.source = source;

    registerTrackable(this.atom, this);
  }

  delete(key: K): boolean {
    const result = this.source.delete(key);
    if (result) {
      this.collection?.notify(key);
      this.atom.notify();
    }
    return result;
  }

  get [Symbol.toStringTag](): string {
    return this.source[Symbol.toStringTag];
  }

  get(key: K): V | undefined {
    if (!this.collection) {
      this.collection = new ReactiveWeakKeys();
    }
    this.collection.track(key);
    return this.source.get(key);
  }

  set(key: K, value: V): this {
    const current = this.source.get(key);
    if (!Object.is(current, value)) {
      this.source.set(key, value);
      this.collection?.notify(key);
      this.atom.notify();
    }
    return this;
  }

  has(key: K): boolean {
    if (!this.collection) {
      this.collection = new ReactiveWeakKeys();
    }
    this.collection.track(key);
    return this.source.has(key);
  }
}
