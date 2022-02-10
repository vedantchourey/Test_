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

export function createFromRef(ref: MutableRefObject<HTMLElement | null>): ComponentDimensions {
  if (ref.current == null) return new ComponentDimensions(0, 0, 0, 0, 0, 0, 0);
  const {x, y, height, width, top, right, bottom} = ref.current.getBoundingClientRect();
  return new ComponentDimensions(x, y, height, width, top, right, bottom);
}

export function getHeightFromRef(ref: MutableRefObject<HTMLElement | null>): number {
  return ref.current?.getBoundingClientRect()?.height || 0;
}



