<template>
  <div class="table-toolbar">
    <!--Top left area-->
    <div class="flex items-center table-toolbar-left">
      <template v-if="props.title">
        <div class="table-toolbar-left-title">
          {{ props.title }}
          <n-tooltip trigger="hover" v-if="props.titleTooltip">
            <template #trigger>
              <n-icon size="18" class="ml-1 text-gray-400 cursor-pointer">
                <QuestionCircleOutlined />
              </n-icon>
            </template>
            {{ props.titleTooltip }}
          </n-tooltip>
        </div>
      </template>
      <slot name="tableTitle"></slot>
    </div>

    <div class="flex items-center leading-none table-toolbar-right">
      <!--Top right area-->
      <slot name="toolbar"></slot>

      <!--Zebra stripes-->
      <n-tooltip trigger="hover">
        <template #trigger>
          <div class="mr-2 table-toolbar-right-icon">
            <n-switch v-model:value="isStriped" @update:value="setStriped" />
          </div>
        </template>
        <span>Table zebra stripes</span>
      </n-tooltip>
      <n-divider vertical />

      <!--Refresh-->
      <n-tooltip trigger="hover">
        <template #trigger>
          <div class="table-toolbar-right-icon" @click="reload">
            <n-icon size="18">
              <ReloadOutlined />
            </n-icon>
          </div>
        </template>
        <span>Refresh</span>
      </n-tooltip>

      <!--Density-->
      <n-tooltip trigger="hover">
        <template #trigger>
          <div class="table-toolbar-right-icon">
            <n-dropdown
              @select="densitySelect"
              trigger="click"
              :options="densityOptions"
              v-model:value="tableSize"
            >
              <n-icon size="18">
                <ColumnHeightOutlined />
              </n-icon>
            </n-dropdown>
          </div>
        </template>
        <span>Density</span>
      </n-tooltip>

      <!--Table settings component-->
      <ColumnSetting />
    </div>
  </div>
  <div class="s-table">
    <n-data-table
      ref="tableElRef"
      v-bind="getBindValues"
      :striped="isStriped"
      :pagination="pagination"
      @update:page="updatePage"
      @update:page-size="updatePageSize"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </n-data-table>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, toRaw, computed, onMounted, nextTick } from 'vue';
  import { ReloadOutlined, ColumnHeightOutlined, QuestionCircleOutlined } from '@vicons/antd';
  import { createTableContext } from './hooks/useTableContext';

  import ColumnSetting from './components/settings/ColumnSetting.vue';

  import { useLoading } from './hooks/useLoading';
  import { useColumns } from './hooks/useColumns';
  import { useDataSource } from './hooks/useDataSource';
  import { usePagination } from './hooks/usePagination';

  import { basicProps } from './props';

  import type { BasicTableProps } from './types/table';

  import { getViewportOffset } from '@/utils/domUtils';
  import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn';
  import { isBoolean } from '@/utils/is';

  const densityOptions = [
    {
      type: 'menu',
      label: 'Compact',
      key: 'small',
    },
    {
      type: 'menu',
      label: 'Default',
      key: 'medium',
    },
    {
      type: 'menu',
      label: 'Loose',
      key: 'large',
    },
  ];

  const emit = defineEmits([
    'fetch-success',
    'fetch-error',
    'update:checked-row-keys',
    'edit-end',
    'edit-cancel',
    'edit-row-end',
    'edit-change',
  ]);

  const props = defineProps({ ...basicProps });
  const deviceHeight = ref(150);
  const tableElRef = ref<ComponentRef>(null);
  const wrapRef = ref<Nullable<HTMLDivElement>>(null);
  let paginationEl: HTMLElement | null;
  const isStriped = ref(props.striped || false);
  const tableData = ref<Recordable[]>([]);
  const innerPropsRef = ref<Partial<BasicTableProps>>();

  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
  });

  const tableSize = ref(unref(getProps as any).size || 'medium');

  const { getLoading, setLoading } = useLoading(getProps);

  const { getPaginationInfo, setPagination } = usePagination(getProps);

  const { getDataSourceRef, getDataSource, getRowKey, reload } = useDataSource(
    getProps,
    {
      getPaginationInfo,
      setPagination,
      tableData,
      setLoading,
    },
    emit
  );

  const { getPageColumns, setColumns, getColumns, getCacheColumns, setCacheColumnsField } =
    useColumns(getProps);

  //Page number change
  function updatePage(page) {
    setPagination({ page: page });
    reload();
  }

  //Pagination size change
  function updatePageSize(size) {
    setPagination({ page: 1, pageSize: size });
    reload();
  }

  //Density change
  function densitySelect(e) {
    tableSize.value = e;
  }

  //Get table size
  const getTableSize = computed(() => tableSize.value);

  //Assemble table information
  const getBindValues = computed(() => {
    const tableData = unref(getDataSourceRef);
    const maxHeight = tableData.length ? `${unref(deviceHeight)}px` : 'auto';
    return {
      ...unref(getProps),
      loading: unref(getLoading),
      columns: toRaw(unref(getPageColumns)),
      rowKey: unref(getRowKey),
      data: tableData,
      size: unref(getTableSize),
      remote: true,
      'max-height': maxHeight,
      title: '', // Reset to empty to avoid binding to table
    };
  });

  //Get pagination information
  const pagination = computed(() => toRaw(unref(getPaginationInfo)));

  function setProps(props: Partial<BasicTableProps>) {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props };
  }

  const setStriped = (value: boolean) => (isStriped.value = value);

  const tableAction = {
    reload,
    setColumns,
    setLoading,
    setProps,
    getColumns,
    getDataSource,
    getPageColumns,
    getCacheColumns,
    setCacheColumnsField,
    emit,
  };

  const getCanResize = computed(() => {
    const { canResize } = unref(getProps);
    return canResize;
  });

  async function computeTableHeight() {
    const table = unref(tableElRef);
    if (!table) return;
    if (!unref(getCanResize)) return;
    const tableEl: any = table?.$el;
    const headEl = tableEl.querySelector('.n-data-table-thead ');
    const { bottomIncludeBody } = getViewportOffset(headEl);
    const headerH = 64;
    let paginationH = 2;
    let marginH = 24;
    if (!isBoolean(unref(pagination))) {
      paginationEl = tableEl.querySelector('.n-data-table__pagination') as HTMLElement;
      if (paginationEl) {
        const offsetHeight = paginationEl.offsetHeight;
        paginationH += offsetHeight || 0;
      } else {
        paginationH += 28;
      }
    }
    let height =
      bottomIncludeBody - (headerH + paginationH + marginH + (props.resizeHeightOffset || 0));
    const maxHeight = props.maxHeight;
    height = maxHeight && maxHeight < height ? maxHeight : height;
    deviceHeight.value = height;
  }

  useWindowSizeFn(computeTableHeight, 280);

  onMounted(() => {
    nextTick(() => {
      computeTableHeight();
    });
  });

  createTableContext({ ...tableAction, wrapRef, getBindValues });

  defineExpose(tableAction);
</script>
<style lang="less" scoped>
  .table-toolbar {
    display: flex;
    justify-content: space-between;
    padding: 0 0 16px 0;

    &-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex: 1;

      &-title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 16px;
        font-weight: 600;
      }
    }

    &-right {
      display: flex;
      justify-content: flex-end;
      flex: 1;

      &-icon {
        margin-left: 12px;
        font-size: 16px;
        cursor: pointer;
        color: var(--text-color);

        :hover {
          color: #1890ff;
        }
      }
    }
  }

  .table-toolbar-inner-popover-title {
    padding: 2px 0;
  }
</style>
