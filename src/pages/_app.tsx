import "react-lazy-load-image-component/src/effects/blur.css";
import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NextNProgress color="#CAE962" options={{ showSpinner: false }} />
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}
