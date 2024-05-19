import React from 'react'
import { Provider } from 'react-redux'

import { fireEvent, render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'

import ModalReminder from '.'

const mockStore = configureStore([])
const store = mockStore({})

const mockProps = {
  GetRemindersDataFromStorage: jest.fn(),
  open: true,
  remindersData: [],
  selectedData: {},
  setOpen: jest.fn(),
  setRemindersData: jest.fn(),
  setSelectedData: jest.fn()
}

const renderComponent = (props = {}) => {
  return render(
    <Provider store={store}>
      <ModalReminder {...mockProps} {...props} />
    </Provider>
  )
}

describe('ModalReminder', () => {
  test('should render all fields from the form', () => {
    renderComponent()
    expect(screen.getByTestId('form-title')).toBeInTheDocument()
    expect(screen.getByTestId('form-color')).toBeInTheDocument()
    expect(screen.getByTestId('form-date')).toBeInTheDocument()
    expect(screen.getByTestId('form-time')).toBeInTheDocument()
    expect(screen.getByTestId('form-city')).toBeInTheDocument()
    expect(screen.getByTestId('form-btn-cancel')).toBeInTheDocument()
    expect(screen.getByTestId('form-btn-submit')).toBeInTheDocument()
  })

  test('should display error message when form-title has more than 30 characters and submit button is clicked', async () => {
    renderComponent()
    const formTitleInput = screen
      .getByTestId('form-title')
      .querySelector('input')
    fireEvent.change(formTitleInput, {
      target: { value: 'This is a form title with more than 30 characters' }
    })

    const submitButton = screen.getByTestId('form-btn-submit')
    fireEvent.click(submitButton)

    const errorMessage = await screen.findByText('limit of 30 chars')
    expect(errorMessage).toBeInTheDocument()
  })
})
