import React from 'react'

import { render } from '@testing-library/react'

import CalendarHeader from '.'

// Mock the constants used in the component
jest.mock('constants', () => ({
  weekDaysList: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
}))

describe('CalendarHeader component', () => {
  it('renders month correctly', () => {
    const { getByText } = render(<CalendarHeader month='May' />)
    expect(getByText('May')).toBeInTheDocument()
  })

  it('renders week days correctly', () => {
    const { getByText } = render(<CalendarHeader month='May' />)
    expect(getByText('Sunday')).toBeInTheDocument()
    expect(getByText('Monday')).toBeInTheDocument()
    expect(getByText('Tuesday')).toBeInTheDocument()
    expect(getByText('Wednesday')).toBeInTheDocument()
    expect(getByText('Thursday')).toBeInTheDocument()
    expect(getByText('Friday')).toBeInTheDocument()
    expect(getByText('Saturday')).toBeInTheDocument()
  })

  it('renders correct number of week days', () => {
    const { container } = render(<CalendarHeader month='May 2024' />)
    const weekDayCells = container.querySelectorAll('.cell')
    expect(weekDayCells.length).toBe(7)
  })
})
