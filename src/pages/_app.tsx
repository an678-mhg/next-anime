import "react-lazy-load-image-component/src/effects/blur.css";
import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { useRouter } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!router?.asPath?.startsWith("/watch")) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    }
  }, [router?.asPath]);

  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress color="#CAE962" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
