import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import { useDebounce } from 'hooks/useDebounce'
import { isEmpty, remove } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import * as uuid from 'uuid'
import * as Yup from 'yup'

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import WeatherBox from 'components/Weather'

import { storeReminderData } from 'store/modules/reminder/actions'

import { colorsList } from '../../constants'

import * as Styles from './styles'

function ModalReminder({
  GetRemindersDataFromStorage,
  open = false,
  remindersData,
  selectedData,
  setOpen,
  setRemindersData,
  setSelectedData
}) {
  const dispatch = useDispatch()
  const maxChar = 30
  const timeoutValue = 500
  const [weatherData, setWeatherData] = useState({})

  const isEditing = selectedData?.reminders?.length === 0
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY
  const baseUrl = process.env.REACT_APP_WEATHER_BASE_URL
  //
  // FORM SCHEMA VALIDATIONS
  const schema = Yup.object().shape({
    title: Yup.string()
      .max(maxChar, 'limit of 30 chars')
      .required('is required'),
    date: Yup.date().required().typeError('is required'),
    hour: Yup.string().required('is required'),
    city: Yup.string().required('is required'),
    color: Yup.string()
  })

  const { register, control, handleSubmit, watch, errors, setValue, reset } =
    useForm({
      defaultValues: { city: '', color: '', date: '', hour: '', title: '' },
      resolver: yupResolver(schema)
    })

  const cityField = watch('city')
  const debouncedSearchValue = useDebounce(cityField)

  const getCityData = async () => {
    try {
      const url = `${baseUrl}/locations/v1/cities/search?apikey=${apiKey}&q=${cityField}`
      const response = await fetch(url)

      // Fetch does not throw an error if the response status is not in the range 200-299
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      getWeather(data[0].Key)
    } catch (err) {
      console.error(err)
    }
  }

  // FUNC TO CALL WEATHER API
  const getWeather = async (locationKey) => {
    try {
      const url = `${baseUrl}/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&metric=true`
      const response = await fetch(url)

      // Check if the response is ok (status code is in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const dailyForecasts = data?.DailyForecasts[0]
      setWeatherData(dailyForecasts)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (cityField?.length > 0) {
      getCityData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityField?.length, debouncedSearchValue])

  // POPULATE VALUES ON FORM WHEN MODAL IS OPEN
  useEffect(() => {
    if (!isEmpty(selectedData) && open) {
      setTimeout(() => {
        setValue('city', selectedData?.city ?? '')
        setValue('color', selectedData?.color ?? '')
        setValue('date', moment(selectedData.date).format().split('T')[0])
        setValue('hour', selectedData?.hour ?? '')
        setValue('title', selectedData?.title ?? '')
      }, timeoutValue)
    }
  }, [selectedData, open, timeoutValue, setValue])

  // SAVE DATA FROM FORM
  const onSubmit = (data) => {
    const { title, date, hour, city, color } = data
    debugger
    const reminders = remindersData

    const obj = {
      city,
      color,
      date: moment(date).format('L'),
      fullDate: moment(date)
        .set('hour', hour?.split(':')[0])
        .set('minute', hour?.split(':')[1]),
      id: uuid.v4(),
      hour,
      title
    }
    //
    if (selectedData?.id) {
      remove(reminders, ['id', selectedData?.id])
    }
    reminders.push(obj)
    setRemindersData(reminders)
    //
    // CALL REDUX TO SAVE VALUES.
    dispatch(storeReminderData(reminders))
    toast.success('Reminder saved')
    handleClear()
  }
  //
  // WHEN MODAL IS CLOSED, ALL FIELDS ARE CLEARED
  const handleClear = () => {
    reset({
      title: '',
      date: '',
      hour: '',
      city: '',
      color: ''
    })
    setOpen(false)
    setWeatherData({})
    setSelectedData([])
    // Reload reminders
    GetRemindersDataFromStorage()
  }

  const renderModalTitle = () => {
    if (isEditing) {
      return <span style={{ color: '#000' }}>New Reminder</span>
    }
    return <span style={{ color: '#fff' }}>Edit Reminder</span>
  }

  return (
    <Dialog
      aria-describedby='dialog-description'
      aria-labelledby='dialog-title'
      fullWidth
      maxWidth='sm'
      onClose={handleClear}
      open={open}>
      <DialogTitle
        className='align-title'
        id='alert-dialog-title'
        style={{ backgroundColor: selectedData?.color }}>
        <Grid container spacing={2}>
          <Grid item md={10} xs={10}>
            {renderModalTitle()}
          </Grid>
          <Grid item md={2} xs={2}>
            <Styles.CloseButton fontSize='small' onClick={handleClear} />
          </Grid>
        </Grid>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '0' }}>
        <DialogContent dividers>
          <Styles.Container>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <InputLabel id='title-id'>Title</InputLabel>
                <TextField
                  data-testid='form-title'
                  fullWidth
                  id='title-id'
                  inputRef={register}
                  label=''
                  name='title'
                  type='text'
                />
                <FormHelperText style={{ color: '#ff0000' }}>
                  {errors?.title?.message}
                </FormHelperText>
              </Grid>

              <Grid item md={4} xs={12}>
                <InputLabel id='color-id'>Color</InputLabel>
                <Controller
                  as={
                    <Select
                      data-testid='form-color'
                      error={errors.color}
                      id='color-id'
                      fullWidth>
                      <MenuItem value={''}>{'Select Color'}</MenuItem>
                      {colorsList.map((item) => [
                        <MenuItem
                          key={item.name}
                          value={item.hex}
                          style={{ color: item.hex }}>
                          {item.name}
                        </MenuItem>
                      ])}
                    </Select>
                  }
                  control={control}
                  defaultValue=''
                  name='color'
                />
              </Grid>

              <Grid item md={8} xs={12}>
                <InputLabel id='date-id'>Date</InputLabel>
                <TextField
                  data-testid='form-date'
                  fullWidth
                  id='date-id'
                  inputRef={register}
                  label=''
                  name='date'
                  type='date'
                />
                <FormHelperText style={{ color: '#ff0000' }}>
                  {errors?.date?.message}
                </FormHelperText>
              </Grid>

              <Grid item md={4} xs={12}>
                <InputLabel id='hour-id'>Hour</InputLabel>
                <TextField
                  data-testid='form-time'
                  fullWidth
                  id='hour-id'
                  inputRef={register}
                  label=''
                  name='hour'
                  type='time'
                />
                <FormHelperText style={{ color: '#ff0000' }}>
                  {errors?.hour?.message}
                </FormHelperText>
              </Grid>

              <Grid item md={8} xs={12}>
                <InputLabel id='city-id'>City</InputLabel>
                <TextField
                  data-testid='form-city'
                  fullWidth
                  id='city-id'
                  inputRef={register}
                  label=''
                  name='city'
                  type='text'
                />
                <FormHelperText style={{ color: '#ff0000' }}>
                  {errors?.city?.message}
                </FormHelperText>
              </Grid>

              {!isEmpty(weatherData) && WeatherBox(weatherData)}
            </Grid>
          </Styles.Container>
        </DialogContent>
        <Styles.DialogActionsWrapper>
          <Button
            data-testid='form-btn-cancel'
            onClick={handleClear}
            variant='outlined'>
            Cancel
          </Button>
          <Button
            data-testid='form-btn-submit'
            color='primary'
            style={{ marginLeft: '8px' }}
            type='submit'
            variant='contained'>
            Save
          </Button>
        </Styles.DialogActionsWrapper>
      </form>
    </Dialog>
  )
}

ModalReminder.propTypes = {
  GetRemindersDataFromStorage: PropTypes.func,
  open: PropTypes.bool,
  remindersData: PropTypes.array,
  selectedData: PropTypes.object,
  setOpen: PropTypes.func,
  setRemindersData: PropTypes.func,
  setSelectedData: PropTypes.func
}

export default ModalReminder
