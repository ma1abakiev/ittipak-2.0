export type ThemeColors = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type ThemeMode = "dark" | "light";

export type ThemeTokens = {
  grey: ThemeColors;
  primary: ThemeColors;
  iceAccent: ThemeColors;
  blueAccent: ThemeColors;
};

export type ThemeSettings = {
  palette: {
    mode: ThemeMode;
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    neutral: {
      dark: string;
      main: string;
      light: string;
    };
    background: {
      default: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h2: {
      fontFamily: string;
      fontSize: number;
    };
    h3: {
      fontFamily: string;
      fontSize: number;
    };
    h4: {
      fontFamily: string;
      fontSize: number;
    };
    h5: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
};

export type ColorModeContextType = {
  toggleColorMode: () => void;
};

export type UseModeReturnType = [import("@mui/material/styles").Theme, ColorModeContextType];