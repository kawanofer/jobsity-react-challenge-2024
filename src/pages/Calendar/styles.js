import PerfectScrollbar from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Container = styled.div`
  width: 800px;
  margin: 2rem auto;

  padding: 0 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .pageTitle {
    font-size: 2.5rem;
    margin-top: 15px;
  }

  .pageSubTitle {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
`

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;

  font-size: 1.2em;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`

export const Month = styled.div`
  align-items: center;
  background-color: #3173b2;
  color: #fff;
  display: flex;
  font-weight: bold;
  justify-content: center;
  padding: 4px 8px;
`

export const WeekDays = styled.div`
  display: flex;
  flex-direction: row;

  .cell {
    align-items: center;
    width: 150px;
    background-color: #3173b2;
    text-transform: capitalize;
    letter-spacing: 1px;
    text-align: center;
    color: #fff;
    padding: 8px;
    border: 1px solid #fff;
  }
`

export const Days = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const ScrollHeader = styled(PerfectScrollbar)`
  height: 110px;
`

export const Box = styled.div`
  width: 150px;
  border: 1px solid #ccc;
  padding: 8px;

  color: ${({ type }) => (type === 'current' ? '#2c3e50' : '#ccc')};

  background-color: ${({ today, date }) => {
    return today === date ? 'rgba(52, 152, 219, 0.3)' : '#fff'
  }};

  .boxHeader {
    display: flex;
  }

  .boxIconButton {
    color: #2c3e50;
    cursor: pointer;

    :hover {
      color: #7f8c8d;
    }
  }
`

export const Reminder = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 25px;

  font-weight: normal;
  font-size: 12px;
  border-radius: 3px;
  margin: 1px 0;
  padding: 4px 6px;

  cursor: pointer;
  color: #fff;
  background-color: ${({ color }) => color || '#aaa'};
`
