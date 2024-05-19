import React from 'react'

import { truncate } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'

import { Add, Delete } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

import { Box, Reminder, ScrollHeader } from '../styles'

export default function DayBox({ item, onReminder, onOpenDelete }) {
  const today = moment().format('L')
  return (
    <Box date={item.date} today={today} type={item.type}>
      <div className='boxHeader'>
        <div style={{ flexGrow: '1' }}>{item.day}</div>

        {item.reminders.length > 0 && (
          <Tooltip arrow placement='right' title='Delete all reminders'>
            <Delete
              className='boxIconButton'
              fontSize='small'
              onClick={() => onOpenDelete(item)}
            />
          </Tooltip>
        )}

        <Tooltip arrow placement='right' title='Add new reminder'>
          <Add
            className='boxIconButton'
            fontSize='small'
            onClick={() => onReminder(item)}
          />
        </Tooltip>
      </div>

      <ScrollHeader>
        {item.reminders?.map((reminder) => (
          <Tooltip
            arrow
            key={reminder.id}
            placement='right'
            title={`${reminder.title} - ${reminder.date} ${reminder.hour}`}>
            <Reminder
              color={reminder?.color}
              onClick={() => onReminder(reminder)}>
              {truncate(`${reminder.title} - ${reminder.hour}`, {
                length: 20
              })}
            </Reminder>
          </Tooltip>
        ))}
      </ScrollHeader>
    </Box>
  )
}

DayBox.propTypes = {
  item: PropTypes.object,
  onReminder: PropTypes.func,
  onOpenDelete: PropTypes.func
}
