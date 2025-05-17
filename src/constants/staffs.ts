export interface Staff {
  id: string
  title: string
  position: string
  skills: string[]
  avatar?: string
  status: 'available' | 'busy' | 'off'
}

export const STAFFS: Staff[] = [
  { 
    id: '1', 
    title: 'Tracey', 
    position: 'Senior Nail Technician',
    skills: ['Nail Design', 'Nail Art', 'Manicure', 'Pedicure'],
    status: 'available',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { 
    id: '2', 
    title: 'Hannah', 
    position: 'Nail Technician',
    skills: ['Manicure', 'Pedicure', 'Nail Extension'],
    status: 'busy',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  { 
    id: '3', 
    title: 'Jenny', 
    position: 'Nail Technician',
    skills: ['Nail Art', 'Nail Design'],
    status: 'available',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  { 
    id: '4', 
    title: 'Sophia', 
    position: 'Junior Nail Technician',
    skills: ['Manicure'],
    status: 'available',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
  },
  { 
    id: '5', 
    title: 'Emma', 
    position: 'Nail Technician',
    skills: ['Pedicure'],
    status: 'available',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
  }
]

export const STATUS_TYPES: Record<string, { type: 'success' | 'warning' | 'error', label: string }> = {
  'available': {
    type: 'success',
    label: 'Available'
  },
  'busy': {
    type: 'warning',
    label: 'Busy'
  },
  'off': {
    type: 'error',
    label: 'Day Off'
  }
} 