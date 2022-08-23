import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { useApollo } from '../apollo/client';
import { reducer, StateProvider } from '../utils/state';
import { AuthProvider } from '../utils/auth';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false



const clientSideEmotionCache = createEmotionCache();

interface AppPropsWithEmotionCache extends AppProps {
  emotionCache: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppPropsWithEmotionCache) {
  const client = useApollo(pageProps);

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <StateProvider reducer={reducer}>
            <AuthProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </AuthProvider>
          </StateProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  )
};

export default MyApp
