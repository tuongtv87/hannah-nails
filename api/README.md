# Nail Salon API

Backend API cho ứng dụng quản lý tiệm Nail, được xây dựng bằng Node.js, Express và TypeScript.

## Cấu trúc thư mục

```
src/api/
├── config/             # Cấu hình (database, axios, environment)
├── controllers/        # Xử lý logic API
├── middleware/         # Middleware (auth, error handling)
├── routes/             # Định nghĩa routes
├── services/           # Xử lý logic nghiệp vụ
├── types/              # TypeScript type definitions
├── package.json        # Dependencies
├── server.ts           # Entry point
└── README.md           # Tài liệu
```

## API Endpoints

### Schedule API

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/schedules | Lấy danh sách lịch hẹn |
| GET | /api/schedules/:id | Lấy chi tiết lịch hẹn |
| POST | /api/schedules | Tạo lịch hẹn mới |
| PUT | /api/schedules/:id | Cập nhật lịch hẹn |
| DELETE | /api/schedules/:id | Xóa lịch hẹn |
| PATCH | /api/schedules/:id/status | Cập nhật trạng thái lịch hẹn |
| GET | /api/schedules/staff/:staffId | Lấy lịch của nhân viên |
| GET | /api/schedules/customer/:customerId | Lấy lịch của khách hàng |

### Staff API

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/staffs | Lấy danh sách nhân viên |
| GET | /api/staffs/:id | Lấy chi tiết nhân viên |
| POST | /api/staffs | Tạo nhân viên mới |
| PUT | /api/staffs/:id | Cập nhật nhân viên |
| DELETE | /api/staffs/:id | Xóa nhân viên |
| PATCH | /api/staffs/:id/status | Cập nhật trạng thái nhân viên |
| GET | /api/staffs/:id/working-hours | Lấy lịch làm việc của nhân viên |
| PUT | /api/staffs/:id/working-hours | Cập nhật lịch làm việc |
| GET | /api/staffs/available | Lấy danh sách nhân viên có sẵn |

### Customer API

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/customers | Lấy danh sách khách hàng |
| GET | /api/customers/:id | Lấy chi tiết khách hàng |
| POST | /api/customers | Tạo khách hàng mới |
| PUT | /api/customers/:id | Cập nhật khách hàng |
| DELETE | /api/customers/:id | Xóa khách hàng |
| GET | /api/customers/search | Tìm kiếm khách hàng |
| GET | /api/customers/:id/history | Lấy lịch sử giao dịch |

### Service API

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/services | Lấy danh sách dịch vụ |
| GET | /api/services/:id | Lấy chi tiết dịch vụ |
| POST | /api/services | Tạo dịch vụ mới |
| PUT | /api/services/:id | Cập nhật dịch vụ |
| DELETE | /api/services/:id | Xóa dịch vụ |
| PATCH | /api/services/:id/status | Cập nhật trạng thái dịch vụ |
| GET | /api/services/category/:category | Lấy dịch vụ theo danh mục |

## Hướng dẫn cài đặt

1. Clone repository
2. Cài đặt dependencies:
```
cd src/api
npm install
```
3. Chạy development server:
```
npm run dev
```
4. Truy cập API tại `http://localhost:3000/api`

## Môi trường

Tạo file `.env` trong thư mục `src/api` với các biến sau:

```
PORT=3000
NODE_ENV=development
API_BASE_URL=/api
``` 