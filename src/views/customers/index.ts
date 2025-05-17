import { ref, reactive, h, computed, onMounted } from 'vue'
import { NIcon } from 'naive-ui'
import { AddOutline, SearchOutline, RefreshOutline, MailOutline, CallOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import customersData from '../../data/customers.json'

export const useCustomersLogic = () => {
  // Icons
  const icons = {
    AddOutline,
    SearchOutline,
    RefreshOutline,
    MailOutline,
    CallOutline,
    CreateOutline,
    TrashOutline
  };

  // Trạng thái loading
  const loading = ref(true)
  
  // Tham chiếu đến bảng
  const tableRef = ref(null)
  
  // Giá trị tìm kiếm
  const searchValue = ref('')
  
  // Dữ liệu khách hàng
  const customers = ref<any[]>([])
  
  // Xử lý dữ liệu từ JSON
  const loadCustomers = () => {
    loading.value = true
    
    try {
      // Xử lý dữ liệu
      const processedData = customersData.results.map((customer: any) => ({
        key: customer.login.uuid,
        id: customer.login.uuid,
        name: `${customer.name.first} ${customer.name.last}`,
        email: customer.email,
        phone: customer.phone,
        country: customer.location.country,
        city: customer.location.city,
        age: customer.dob.age,
        gender: customer.gender,
        picture: customer.picture.thumbnail,
        active: Math.random() > 0.2 // Trạng thái ngẫu nhiên
      }))
      
      customers.value = processedData
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu khách hàng:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Tải dữ liệu khi component được mount
  onMounted(() => {
    loadCustomers()
  })
  
  // Lọc dữ liệu theo tìm kiếm
  const filteredData = computed(() => {
    if (!searchValue.value) return customers.value
    
    const searchLower = searchValue.value.toLowerCase()
    return customers.value.filter((customer: any) => 
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.toLowerCase().includes(searchLower) ||
      customer.city.toLowerCase().includes(searchLower) ||
      customer.country.toLowerCase().includes(searchLower)
    )
  })
  
  // Cấu hình pagination
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    pageSizes: [5, 10, 20, 50],
    itemCount: computed(() => filteredData.value.length),
  })
  
  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const displayData = computed(() => {
    const { page, pageSize } = pagination;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.value.slice(startIndex, endIndex);
  });
  
  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    pagination.page = page
  }
  
  // Xử lý thay đổi kích thước trang
  const handlePageSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
  
  // Định nghĩa các cột
  const columns = [
    {
      title: 'Khách Hàng',
      key: 'customer',
      render(row: any) {
        return h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          },
          {
            default: () => [
              h('img', {
                src: row.picture,
                style: {
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  marginRight: '12px'
                }
              }),
              h('div', [
                h('div', { style: { fontWeight: 'bold' } }, row.name),
                h('div', { style: { fontSize: '12px', color: '#666' } }, `${row.age} tuổi, ${row.gender === 'male' ? 'Nam' : 'Nữ'}`)
              ])
            ]
          }
        )
      }
    },
    {
      title: 'Liên Hệ',
      key: 'contact',
      render(row: any) {
        return h(
          'div',
          [
            h('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '4px' } }, [
              h(NIcon, { size: 14, style: { marginRight: '4px' } }, { default: () => h(icons.MailOutline) }),
              row.email
            ]),
            h('div', { style: { display: 'flex', alignItems: 'center' } }, [
              h(NIcon, { size: 14, style: { marginRight: '4px' } }, { default: () => h(icons.CallOutline) }),
              row.phone
            ])
          ]
        )
      }
    },
    {
      title: 'Địa Chỉ',
      key: 'location',
      render(row: any) {
        return h('div', `${row.city}, ${row.country}`)
      }
    },
    {
      title: 'Tuổi',
      key: 'age'
    },
    {
      title: 'Trạng Thái',
      key: 'active',
      render(row: any) {
        return h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          },
          {
            default: () => [
              h(
                'div',
                {
                  style: {
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: row.active ? '#18a058' : '#d03050',
                    marginRight: '8px'
                  }
                }
              ),
              row.active ? 'Hoạt động' : 'Không hoạt động'
            ]
          }
        )
      }
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render(row: any) {
        return h(
          'div',
          {
            style: {
              display: 'flex',
              gap: '8px'
            }
          },
          {
            default: () => [
              h(
                'div',
                {
                  style: {
                    cursor: 'pointer',
                    color: 'var(--primary-color)'
                  },
                  onClick: () => console.log('Sửa', row.id)
                },
                [
                  h(
                    NIcon,
                    { size: 18 },
                    { default: () => h(icons.CreateOutline) }
                  ),
                  ' Sửa'
                ]
              ),
              h(
                'div',
                {
                  style: {
                    cursor: 'pointer',
                    color: 'var(--error-color)'
                  },
                  onClick: () => console.log('Xóa', row.id)
                },
                [
                  h(
                    NIcon,
                    { size: 18 },
                    { default: () => h(icons.TrashOutline) }
                  ),
                  ' Xóa'
                ]
              )
            ]
          }
        )
      }
    }
  ]
  
  // Reset tìm kiếm
  const handleReset = () => {
    searchValue.value = ''
  }
  
  return {
    icons,
    columns,
    filteredData,
    displayData,
    pagination,
    loading,
    searchValue,
    handleReset,
    tableRef,
    handlePageChange,
    handlePageSizeChange
  }
} 