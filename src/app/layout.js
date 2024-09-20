import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from '@/theme';
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

export const metadata = {
  title: "ILLIT Photo Archive",
  description: "ILLIT Photo Archive",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>

        <AppRouterCacheProvider>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
