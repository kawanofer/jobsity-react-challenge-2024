import styled from 'styled-components'

import { Close } from '@mui/icons-material'
import { DialogActions } from '@mui/material'

export const Container = styled.div``

export const DialogActionsWrapper = styled(DialogActions)`
  padding: 16px 24px !important;
`

export const CloseButton = styled(Close)`
  float: right;
  cursor: pointer;
  color: #000;
`
