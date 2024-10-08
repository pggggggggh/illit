import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from '@/theme';
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "ILLIT Photo Archive",
  description: "ILLIT Photo Archive",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <meta name="naver-site-verification" content="04d2b338a878617a1cf74ccc20e41b4a272cf8e7"/>
            <link rel="icon" type="image/x-icon" href="favicon.ico"/>
        </head>
        <body>
        <Analytics/>
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
