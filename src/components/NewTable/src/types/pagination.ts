export interface PaginationProps {
  page?: number;
  pageCount?: number;
  pageSize?: number;
  pageSizes?: number[];
  showSizePicker?: boolean;
  showQuickJumper?: boolean;
  itemCount?: number;
  prefix?: string | ((info: { page: number; pageSize: number; pageCount: number; itemCount: number | undefined }) => string);
  simple?: boolean;
  hideOnSinglePage?: boolean;
  displayOrder?: Array<'pages' | 'size-picker' | 'quick-jumper'>;
} 