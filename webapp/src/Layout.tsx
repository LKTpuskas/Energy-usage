import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components'

const Wrapper = styled.div`
max-width: 1300px;
    margin: 32px auto;
    padding: 0 42px;

`

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  
}
`


const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper>
        {children}
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
