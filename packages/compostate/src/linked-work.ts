export interface LinkedWork {
  type: 'subscriber' | 'publisher';
  tag: number;
  id: number;
  alive: boolean;
  links?: Set<LinkedWork>
}

let RUNNER: (work: LinkedWork) => void;

export function setRunner(work: (work: LinkedWork) => void): void {
  RUNNER = work;
}

let STATE = 0;

export function createLinkedWork(
  type: 'publisher' | 'subscriber',
  tag: number,
): LinkedWork {
  return {
    type,
    tag,
    id: STATE++,
    alive: true,
  };
}

export function publisherLinkSubscriber(
  publisher: LinkedWork,
  subscriber: LinkedWork,
): void {
  if (publisher.alive && subscriber.alive) {
    if (!publisher.links) {
      publisher.links = new Set();
    }
    publisher.links.add(subscriber);
    if (!subscriber.links) {
      subscriber.links = new Set();
    }
    subscriber.links.add(publisher);
  }
}

function enqueueSubscriberWork(
  target: LinkedWork,
  queue: Set<LinkedWork>,
): void {
  // Sets are internally ordered, so we can emulate
  // a simple queue where we move the node to the end
  // of the order
  // Currently this is the fastest and cheapest
  // non-linked list operation we can do
  queue.delete(target);
  queue.add(target);
}

function enqueuePublisherWork(
  target: LinkedWork,
  queue: Set<LinkedWork>,
): void {
  if (target.links?.size) {
    for (const item of target.links.keys()) {
      enqueueSubscriberWork(item, queue);
    }
  }
}

function evaluatePublisherWork(target: LinkedWork): void {
  if (target.links?.size) {
    for (const item of target.links.keys()) {
      RUNNER(item);
    }
  }
}

export function runLinkedWork(target: LinkedWork, queue?: Set<LinkedWork>): void {
  if (target.alive) {
    if (target.type === 'publisher') {
      if (queue) {
        enqueuePublisherWork(target, queue);
      } else {
        evaluatePublisherWork(target);
      }
    } else if (queue) {
      enqueueSubscriberWork(target, queue);
    } else {
      RUNNER(target);
    }
  }
}

export function unlinkLinkedWorkPublishers(target: LinkedWork): void {
  if (target.links) {
    for (const item of target.links.keys()) {
      item.links?.delete(target);
    }
    target.links.clear();
  }
}

export function destroyLinkedWork(target: LinkedWork): void {
  if (target.alive) {
    target.alive = false;
    if (target.type === 'subscriber') {
      unlinkLinkedWorkPublishers(target);
    }
    target.links = undefined;
  }
}
