// Geçici JSX ve React türleri - Bağımlılıklar yüklendikten sonra kaldırılacak
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactElement<any, any> { }
  }
  
  namespace React {
    type ReactNode = any;
    type ReactElement<P = any, T = any> = {
      type: T;
      props: P;
      key: string | number | null;
    };
    
    type ChangeEvent<T = Element> = {
      target: T & {
        name?: string;
        value: string;
      };
      currentTarget: T;
    };
    
    type FormEvent<T = Element> = {
      preventDefault(): void;
      target: T;
      currentTarget: T;
    };
    
    type MouseEvent<T = Element> = {
      preventDefault(): void;
      clientX: number;
      clientY: number;
      target: T;
      currentTarget: T;
    };
  }
}

declare module 'react' {
  export function useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T>(initial: T | null): { current: T | null };
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export const Fragment: any;
  export type ReactNode = any;
  export type ReactElement = any;
  export type FC<P = {}> = (props: P) => ReactElement | null;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export const Fragment: any;
}

declare module 'lucide-react' {
  export const Upload: any;
  export const FileText: any;
  export const Phone: any;
  export const Mail: any;
  export const MapPin: any;
  export const CheckCircle: any;
  export const AlertCircle: any;
  export const Menu: any;
  export const X: any;
  export const ArrowRight: any;
  export const ExternalLink: any;
}

declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
    keywords?: string[];
  }
}

declare module 'next/font/google' {
  export function Montserrat(options?: any): any;
  export function Inter(options?: any): any;
}

export {};
