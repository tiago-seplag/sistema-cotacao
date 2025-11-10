import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${theme.typography.fontFamily};
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.dark};
    line-height: 1.6;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }
`;