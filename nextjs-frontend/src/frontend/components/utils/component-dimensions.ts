import { MutableRefObject } from 'react';

export class ComponentDimensions {

  constructor(public readonly x: number,
              public readonly y: number,
              public readonly height: number,
              public readonly width: number,
              public readonly top: number,
              public readonly right: number,
              public readonly bottom: number) {
  }

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFromRef(ref: MutableRefObject<any>) {
  const {x, y, height, width, top, right, bottom} = ref.current.getBoundingClientRect();
  return new ComponentDimensions(x, y, height, width, top, right, bottom);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHeightFromRef(ref: MutableRefObject<any>): number {
  return ref.current?.getBoundingClientRect()?.height || 0;
}


