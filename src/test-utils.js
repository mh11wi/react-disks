import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  light: "#90caf9",
  main: "#1e88e5",
  dark: "#0d47a1"
}

const lightTheme = {
  background: 'white',
  text: 'black',
  border: '#666',
  shadow: '#ccc',
  selected: defaultTheme.light,
  disabled: '#f2f2f2',
  outline: defaultTheme.dark,
  button: defaultTheme.dark,
  highlight: defaultTheme.main,
  filter: '#ccc'
};

const AllTheProviders = ({children}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      {children}
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}