# Component NewTable

NewTable là một component bảng đơn giản dựa trên NDataTable của Naive UI. Component này có các tính năng:

- Hiển thị dữ liệu trong bảng
- Hỗ trợ phân trang
- Chiều cao tự động co giãn theo dữ liệu
- Hỗ trợ maxHeight để giới hạn chiều cao
- Hỗ trợ thanh cuộn nếu dữ liệu vượt quá chiều cao

## Các thuộc tính (Props)

| Tên | Loại | Mặc định | Mô tả |
| --- | --- | --- | --- |
| title | string | undefined | Tiêu đề bảng |
| columns | BasicColumn[] | [] | Cấu hình cột của bảng |
| dataSource | Function \| any[] | [] | Dữ liệu hoặc function để lấy dữ liệu |
| pagination | boolean \| PaginationProps | true | Cấu hình phân trang |
| maxHeight | number | undefined | Chiều cao tối đa của bảng |
| rowKey | string \| Function | 'id' | Khóa chính của mỗi hàng |
| loading | boolean | false | Trạng thái loading của bảng |
| tableProps | Object | {} | Props mở rộng cho NDataTable |

## Các sự kiện (Events)

| Tên | Tham số | Mô tả |
| --- | --- | --- |
| page-change | number | Kích hoạt khi thay đổi trang |
| page-size-change | number | Kích hoạt khi thay đổi kích thước trang |
| fetch-success | Object | Kích hoạt khi lấy dữ liệu thành công |
| fetch-error | Error | Kích hoạt khi lấy dữ liệu thất bại |

## API public

| Tên | Tham số | Mô tả |
| --- | --- | --- |
| reload | (params?: any) => Promise<any> | Tải lại dữ liệu |
| setTableData | (data: any[]) => void | Cập nhật dữ liệu bảng |
| setPagination | (info: Partial<PaginationProps>) => void | Cập nhật cấu hình phân trang |
| fetchData | (params?: any) => Promise<any> | Lấy dữ liệu từ API |

## Ví dụ sử dụng

```vue
<template>
  <NewTable
    title="Danh sách người dùng"
    :columns="columns"
    :dataSource="getUsers"
    :pagination="{ pageSize: 10 }"
    :maxHeight="400"
    @page-change="onPageChange"
  />
</template>

<script setup>
import { NewTable } from '@/components/NewTable';

const columns = [
  { title: 'ID', key: 'id' },
  { title: 'Tên', key: 'name' },
  { title: 'Email', key: 'email' },
];

const getUsers = async (params) => {
  // Gọi API lấy danh sách người dùng
  const response = await fetch(`/api/users?page=${params.page}&pageSize=${params.pageSize}`);
  return await response.json();
};

const onPageChange = (page) => {
  console.log('Trang hiện tại:', page);
};
</script> 