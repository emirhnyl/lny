declare module 'lenis' {
  export default class Lenis {
    constructor(options?: {
      duration?: number;
      easing?: (t: number) => number;
      infinite?: boolean;
    });
    raf(time: number): void;
    destroy(): void;
  }
}
