import http from '../http'

/**
 * Customer data interface
 */
export interface CustomerData {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  address?: string;
  notes?: string;
  lastVisit?: string;
  totalVisits?: number;
  totalSpent?: number;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

/**
 * API response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

/**
 * Pagination response interface
 */
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Customer parameters interface
 */
export interface CustomerParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Get all customers
 */
export const getCustomers = async (params: CustomerParams = {}): Promise<ApiResponse<PaginatedData<CustomerData>>> => {
  try {
    const response = await http.get('/customers', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return { success: false, message: 'Failed to fetch customers' };
  }
}

/**
 * Get customer by ID
 */
export const getCustomer = async (id: string): Promise<ApiResponse<CustomerData>> => {
  try {
    const response = await http.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error);
    return { success: false, message: 'Failed to fetch customer details' };
  }
}

/**
 * Create new customer
 */
export const createCustomer = async (data: Partial<CustomerData>): Promise<ApiResponse<CustomerData>> => {
  try {
    const response = await http.post('/customers', data);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    return { success: false, message: 'Failed to create customer' };
  }
}

/**
 * Update customer
 */
export const updateCustomer = async (id: string, data: Partial<CustomerData>): Promise<ApiResponse<CustomerData>> => {
  try {
    const response = await http.put(`/customers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating customer ${id}:`, error);
    return { success: false, message: 'Failed to update customer' };
  }
}

/**
 * Delete customer
 */
export const deleteCustomer = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await http.delete(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer ${id}:`, error);
    return { success: false, message: 'Failed to delete customer' };
  }
}

/**
 * Search customers
 */
export const searchCustomers = async (search: string): Promise<ApiResponse<PaginatedData<CustomerData>>> => {
  try {
    const response = await http.get('/customers', { params: { search } });
    return response.data;
  } catch (error) {
    console.error('Error searching customers:', error);
    return { success: false, message: 'Failed to search customers' };
  }
}

/**
 * Get customer schedules
 */
export function getCustomerSchedules(id: string, params?: any) {
  return http.get(`/customers/${id}/schedules`, { params })
}

/**
 * Get customer transactions
 */
export const getCustomerTransactions = async (
  id: string, 
  params: CustomerParams = {}
): Promise<ApiResponse<PaginatedData<any>>> => {
  try {
    const response = await http.get(`/customers/${id}/transactions`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer ${id} transactions:`, error);
    return { success: false, message: 'Failed to fetch customer transactions' };
  }
}

/**
 * Get customer statistics
 */
export const getCustomerStats = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await http.get('/customers/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching customer statistics:', error);
    return { success: false, message: 'Failed to fetch customer statistics' };
  }
}

/**
 * Generate mock customers
 */
export const generateMockCustomers = (count = 20): CustomerData[] => {
  const mockCustomers: CustomerData[] = [];
  
  for (let i = 1; i <= count; i++) {
    mockCustomers.push({
      id: `cust-${i}`,
      name: `Khách hàng ${i}`,
      phone: `098765${i.toString().padStart(4, '0')}`,
      email: `customer${i}@example.com`,
      address: `Địa chỉ khách hàng ${i}, Hà Nội`,
      notes: i % 3 === 0 ? `Ghi chú về khách hàng ${i}` : undefined,
      avatar: i % 5 === 0 ? `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i % 10}.jpg` : undefined,
      lastVisit: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      totalVisits: Math.floor(Math.random() * 20),
      totalSpent: Math.floor(Math.random() * 5000) * 1000,
      status: i % 7 === 0 ? 'inactive' : 'active',
      createdAt: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      updatedAt: new Date(Date.now() - (i * 2 * 24 * 60 * 60 * 1000)).toISOString()
    });
  }
  
  return mockCustomers;
} 