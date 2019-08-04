import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components'

const DataContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-color: rgb(242, 242, 242);
padding: 30px;
margin-bottom: 50px;
border-radius: 0.3rem;
`
const Header = styled.h2`
 text-align: center;
 margin-bottom: 10px;
 font-size: 20px;
`
const TableRow = styled.tr`
  text-align: left;
`

const Table = styled.table`
  width: 100%;
`

const TableCell = styled.td`
  margin-bottom: 10px;
`
const SpinnerWrapper = styled.span`
  text-align: center;
  margin-top: 200px;
  display: block;
`

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 100px;
  height: 100px;
  text-align: center;
  
  & .path {
    stroke: #5652BF;
    stroke-linecap: round;
    animation: dash 0.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const Styles = {
  DataContainer,
  Header,
  TableRow,
  Table,
  TableCell,
  SpinnerWrapper,
  StyledSpinner
}