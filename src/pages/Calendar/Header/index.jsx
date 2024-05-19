import React from 'react'

import PropTypes from 'prop-types'

import { weekDaysList } from '../../../constants'

import { Header, Month, WeekDays } from '../styles'

export default function CalendarHeader({ month }) {
  return (
    <Header>
      <Month>{month}</Month>
      <WeekDays>
        {weekDaysList.map((weekday) => {
          return (
            <div className='cell' key={weekday}>
              {weekday}
            </div>
          )
        })}
      </WeekDays>
    </Header>
  )
}

CalendarHeader.propTypes = {
  month: PropTypes.string
}
