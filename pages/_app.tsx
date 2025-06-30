import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider, Input } from "@mantine/core";
import { UserProvider } from "@/context/UserContext";

const theme = createTheme({
  components: {
    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: "background-color: var(--mantine-color-orange-6)",
      },
    }),
  },
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
