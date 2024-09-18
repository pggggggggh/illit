import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from '@/theme';

export const metadata = {
  title: "ILLIT Photo Archive",
  description: "ILLIT Photo Archive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
          <CssBaseline />
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
