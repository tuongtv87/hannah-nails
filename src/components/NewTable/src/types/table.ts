import type { DataTableProps } from 'naive-ui';
import type { PaginationProps } from './pagination';

export interface BasicColumn {
  title: string;
  key: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  defaultSortOrder?: 'ascend' | 'descend';
  children?: BasicColumn[];
  [key: string]: any;
}

export interface NewTableProps {
  title?: string;
  columns: BasicColumn[];
  data?: any[];
  pagination?: boolean | PaginationProps;
  maxHeight?: number;
  rowKey?: string | ((record: any) => string);
  loading?: boolean;
  tableProps?: Partial<DataTableProps>;
} 