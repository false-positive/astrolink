import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'dark',
        primaryColor: 'violet',
      }}
    >
      {/* <style jsx global>{`
        body {
          background-color: #16141c;
        }
      `}</style> */}
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
}
