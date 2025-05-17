import customersData from '@/data/customers.json'

// Lấy 5 khách hàng đầu tiên làm staff mẫu
const staffList = (customersData.results.slice(100, 105)).map((c: any) => ({
  id: c.login.uuid,
  name: `${c.name.first} ${c.name.last}`,
  avatar: c.picture.thumbnail,
  email: c.email,
  phone: c.phone
}))

export default staffList 