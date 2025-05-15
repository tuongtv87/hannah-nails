import type { Ref, ComputedRef } from 'vue';
import type { BasicTableProps, TableActionType } from '../types/table';
import { provide, inject } from 'vue';

type Nullable<T> = T | null;
type Recordable<T = any> = Record<string, T>;

const key = Symbol('s-table');

type Instance = TableActionType & {
  wrapRef: Ref<Nullable<HTMLElement>>;
  getBindValues: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>;
};

export function createTableContext(instance: Instance) {
  provide(key, instance);
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance;
}
