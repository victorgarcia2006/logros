import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { UserProvider } from "@/context/UserContext";

const theme = createTheme({
  colors: {
    'guinda': ['#fff0f9', '#ffe4f6', '#ffc9ee', '#ff9ddf', '#ff60c7', '#ff31ad', '#f40e8b', '#d5016e', '#b0045a', '#840846', '#5a002b'],
  },
  primaryColor: 'guinda',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </MantineProvider>
  );
}
