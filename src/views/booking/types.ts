import type { Ref } from 'vue'

export interface Staff {
  id: string
  title: string
  name?: string
  avatar: string
  position?: string
  skills?: string[]
  status: 'available' | 'busy' | 'off'
}

export interface Booking {
  id: string
  title: string
  resourceId: string
  start: string
  end: string
  content?: string
  status: 'Pending' | 'Confirmed' | 'Working' | 'Completed'
}

export interface BookingCardProps {
  id: string
  title: string
  resourceId: string
  start: string
  end: string
  content?: string
  status: string
  date: string
  duration: number
}

export interface WorkSchedule {
  day: string
  isOpen: boolean
  hours: string
}

export interface WeekDay {
  key: string
  label: string
}

export interface StaffBookingTime {
  startMinutes: number
  endMinutes: number
}

export interface BookingState {
  currentDate: Ref<Date>
  isOpen: Ref<boolean>
  workingHours: Ref<string>
  startHour: Ref<number>
  startMinute: Ref<number>
  endHour: Ref<number>
  endMinute: Ref<number>
  timeSlots: Ref<string[]>
  bookings: Ref<Booking[]>
  datePickerValue: Ref<number>
} 