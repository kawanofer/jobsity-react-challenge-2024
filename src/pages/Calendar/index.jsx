import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { clone, differenceBy, filter, isEmpty, toUpper } from 'lodash'
import moment from 'moment'
import * as uuid from 'uuid'

import ModalConfirmation from 'components/ModalConfirmation'
import ModalReminders from 'components/ModalReminders'

import {
  requestReminderData,
  storeReminderData
} from 'store/modules/reminder/actions'

import DayBox from './Day'
import CalendarHeader from './Header'
import { Calendar, Container, Days } from './styles'

function CalendarComp(props) {
  const dispatch = useDispatch()
  //
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [remindersData, setRemindersData] = useState([])
  const [selectedData, setSelectedData] = useState({})

  const [calendarDays, setCalendarDays] = useState([])
  //
  const remindersDataRedux = useSelector(
    (state) => state.reminder.remindersData
  )

  useEffect(() => {
    if (!isEmpty(remindersDataRedux)) {
      setRemindersData(
        clone(remindersDataRedux)?.sort(
          (a, b) => new Date(a.fullDate) - new Date(b.fullDate)
        )
      )
    }
  }, [remindersDataRedux])

  // WHEN INITIALIZE, CALL FUNC TO GET REMINDERS FROM "backend" localStorage.
  useEffect(() => {
    GetRemindersDataFromStorage()
  }, [])

  // GENERATE DAYS OF CALENDAR WHEN REMINDERS CHANGE.
  useEffect(() => {
    GenerateCalendar()
  }, [remindersData])

  // GET REMINDERS FROM "backend"
  const GetRemindersDataFromStorage = () => {
    dispatch(requestReminderData())
  }

  // GENERATE CALENDAR 'INSERTING' REMINDERS IN EVERY DAY.
  const GenerateCalendar = () => {
    const days = []

    // Get the current date
    const currentDate = moment()

    // Get the first day of the current month
    const firstDayOfMonth = moment(currentDate).startOf('month')

    // Get the weekday index of the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const firstDayOfWeekIndex = firstDayOfMonth.day() + 1

    // Calculate the number of days to add from the previous month to complete the first week
    const daysToAddFromPreviousMonth =
      firstDayOfWeekIndex === 0 ? 6 : firstDayOfWeekIndex - 1

    // Get the date to start rendering the calendar
    const startDate = moment(firstDayOfMonth).subtract(
      daysToAddFromPreviousMonth,
      'days'
    )

    // Loop through each day of the calendar (42 days for 6 weeks)
    for (let i = 0; i < 35; i++) {
      const day = moment(startDate).add(i, 'days')
      let type = ''
      if (day.isSame(firstDayOfMonth, 'month')) {
        type = 'current'
      } else if (day.isBefore(firstDayOfMonth, 'month')) {
        type = 'prev'
      } else {
        type = 'next'
      }

      days.push({
        id: uuid.v4(),
        day: day.format('DD'),
        date: day.format('L'),
        type,
        reminders: filter(remindersData, ['date', day.format('L')])
      })
    }
    setCalendarDays(days)
  }

  // OPEN MODAL TO ADD OR EDIT REMINDER
  const handleReminder = (item) => {
    setSelectedData(item)
    setOpen(true)
  }

  // 'DELETE' REMINDER FROM 'backend', AFTER MODAL CONFIRMATION
  const handleDelete = () => {
    const dif = differenceBy(remindersData, selectedData.reminders, 'id')
    dispatch(storeReminderData(dif))
    setOpenDelete(false)

    GetRemindersDataFromStorage()
    toast.success('All reminder was deleted.')
  }

  // OPEN MODAL TO CONFIRM WHEN DELETE ALL REMINDERS FROM THAT DAY
  const handleOpenDelete = (item) => {
    setSelectedData(item)
    setOpenDelete(true)
  }

  return (
    <Container>
      <Calendar>
        <>
          <CalendarHeader month={toUpper(moment().format('MMMM'))} />
          <Days>
            {calendarDays?.map((item) => {
              return (
                <DayBox
                  key={item.date}
                  item={item}
                  onReminder={handleReminder}
                  onOpenDelete={handleOpenDelete}
                />
              )
            })}
          </Days>
        </>
      </Calendar>
      <ModalReminders
        GetRemindersDataFromStorage={GetRemindersDataFromStorage}
        open={open}
        remindersData={remindersData}
        selectedData={selectedData}
        setOpen={setOpen}
        setRemindersData={setRemindersData}
        setSelectedData={setSelectedData}
      />

      <ModalConfirmation
        buttonCancelTitle='No'
        buttonConfirmTitle='Yes'
        handleCancel={() => setOpenDelete(false)}
        handleClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        open={openDelete}
        subtitle='Are you sure you want to permanently delete these reminders?'
        title='Delete all reminders'
      />
    </Container>
  )
}

export default CalendarComp
