import type { MessageApi } from 'naive-ui'

declare global {
  interface Window {
    $toggleTheme: () => void;
    $message: MessageApi;
  }
}

declare type Recordable<T = any> = Record<string, T>;
declare type Nullable<T> = T | null;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = '_self' | '_blank';

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare type AnyFunction<T = any> = (...args: any[]) => T;

export {}; 