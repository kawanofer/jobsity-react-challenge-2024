import React from 'react'

import PropTypes from 'prop-types'

import ThermostatIcon from '@mui/icons-material/Thermostat'
import { Tooltip } from '@mui/material'

import * as S from './styles'

const WeatherBox = (weatherData) => {
  const tempMax = weatherData?.Temperature.Maximum.Value
  const tempMin = weatherData?.Temperature.Minimum.Value
  const unit = weatherData?.Temperature.Minimum.Unit
  const iconPhrase = weatherData?.Day.IconPhrase
  const icon = weatherData?.Day.Icon

  return (
    <S.WeatherBox>
      <div className='wrapper'>
        <Tooltip arrow placement='top' title={iconPhrase}>
          <img
            src={`${process.env.PUBLIC_URL}/icons/${icon}.png`}
            alt={iconPhrase}
            width={50}
            height={30}
            className='img scale-animation'
          />
        </Tooltip>

        <div>
          <ThermostatIcon fontSize='small' />{' '}
          <span className='mimTemp' data-testid='temp-min'>
            {tempMin} º{unit}
          </span>{' '}
          -{' '}
          <span className='maxTemp' data-testid='temp-max'>
            {tempMax} º{unit}
          </span>
        </div>
      </div>
    </S.WeatherBox>
  )
}

WeatherBox.propTypes = {
  weatherData: PropTypes.object
}

export default WeatherBox
