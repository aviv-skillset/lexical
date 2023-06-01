/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export default function caretFromPoint(
  x: number,
  y: number,
): null | {
  offset: number;
  node: Node;
} {
  if (typeof document.caretRangeFromPoint !== 'undefined') {
    const range = document.caretRangeFromPoint(x, y);
    if (range === null) {
      return null;
    }
    return {
      node: range.startContainer,
      offset: range.startOffset,
    };
    /**
     * ? there is no TS types for this specifig FireFox only function
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Document/caretPositionFromPoint
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } else if (document.caretPositionFromPoint !== 'undefined') {
    /**
     * ? there is no TS types for this specifig FireFox only function
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Document/caretPositionFromPoint
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore FF - no types
    const range = document.caretPositionFromPoint(x, y);
    if (range === null) {
      return null;
    }
    return {
      node: range.offsetNode,
      offset: range.offset,
    };
  } else {
    // Gracefully handle IE
    return null;
  }
}
