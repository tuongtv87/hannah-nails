export interface WorkSchedule {
  day: string
  hours: string
  isOpen: boolean
}

export interface WeekDay {
  key: string
  label: string
}

export const WEEKDAYS: WeekDay[] = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' }
]

export const WORK_SCHEDULE: WorkSchedule[] = [
  { day: 'mon', hours: '09:00 - 17:30', isOpen: true },
  { day: 'tue', hours: '09:00 - 17:30', isOpen: true },
  { day: 'wed', hours: '09:00 - 17:30', isOpen: true },
  { day: 'thu', hours: '09:00 - 19:00', isOpen: true },
  { day: 'fri', hours: '09:00 - 19:00', isOpen: true },
  { day: 'sat', hours: '09:00 - 16:00', isOpen: true },
  { day: 'sun', hours: '10:00 - 16:00', isOpen: true }
]

/**
 * Get working hours based on the day of the week
 * @param day day code (mon, tue, wed, ...)
 * @returns working hours or null if closed
 */
export function getWorkingHours(day: string): string | null {
  const schedule = WORK_SCHEDULE.find(s => s.day === day.toLowerCase())
  if (!schedule || !schedule.isOpen) return null
  return schedule.hours
}

/**
 * Check if a day is a working day
 * @param day day code (mon, tue, wed, ...)
 * @returns true if it's a working day, false if it's a day off
 */
export function isWorkingDay(day: string): boolean {
  const schedule = WORK_SCHEDULE.find(s => s.day === day.toLowerCase())
  return schedule?.isOpen ?? false
} 