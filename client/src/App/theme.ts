import { createContext, useState, useMemo } from 'react'
import { createTheme } from '@mui/material/styles'
import { UseModeReturnType, ColorModeContextType } from './types'

export const tokens = (mode: 'dark' | 'light') => ({
  ...(mode === 'dark'
    ? {
        black: {
          100: '#d3d3d3',
          200: '#a6a6a6',
          300: '#7a7a7a',
          400: '#4d4d4d',
          500: '#212121',
          600: '#1a1a1a',
          700: '#141414',
          800: '#0d0d0d',
          900: '#070707',
        },
        white: {
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#ffffff',
          500: '#ffffff',
          600: '#cccccc',
          700: '#999999',
          800: '#666666',
          900: '#333333',
        },

        blue: {
          100: '#ddecf9',
          200: '#bbd8f3',
          300: '#99c5ee',
          400: '#77b1e8',
          500: '#559ee2',
          600: '#447eb5',
          700: '#335f88',
          800: '#223f5a',
          900: '#11202d',
        },
      }
    : {
        black: {
          900: '#d3d3d3',
          800: '#a6a6a6',
          700: '#7a7a7a',
          600: '#4d4d4d',
          500: '#212121',
          400: '#1a1a1a',
          300: '#141414',
          200: '#0d0d0d',
          100: '#070707',
        },
        white: {
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#ffffff',
          500: '#ffffff',
          600: '#cccccc',
          700: '#999999',
          800: '#666666',
          900: '#333333',
        },

        blue: {
          900: '#ddecf9',
          800: '#bbd8f3',
          700: '#99c5ee',
          600: '#77b1e8',
          500: '#559ee2',
          400: '#447eb5',
          300: '#335f88',
          200: '#223f5a',
          100: '#11202d',
        },
      }),
})

export const themeSettings = (mode: 'dark' | 'light') => {
  const colors = tokens(mode)

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.blue[500],
            },
            secondary: {
              main: colors.white[500],
            },
            neutral: {
              dark: colors.black[500],
              main: colors.blue[500],
              light: colors.white[500],
            },
            background: {
              default: colors.blue[900],
            },
          }
        : {
            primary: {
              main: colors.blue[500],
            },
            secondary: {
              main: colors.black[500],
            },
            neutral: {
              dark: colors.black[500],
              main: colors.blue[500],
              light: colors.white[500],
            },
            background: {
              default: colors.white[500],
            },
          }),
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 40,
        color: colors.blue[500],
      },
      h2: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 32,
        color: colors.blue[500],
      },
      h3: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  }
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
})

export const useMode = (): UseModeReturnType => {
  const [mode, setMode] = useState<'dark' | 'light'>('light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  )

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return [theme, colorMode]
}
