import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/layout/header/Header";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />

      <main className="flex flex-col mx-auto 2xl:max-w-325 xl:max-w-300 lg:max-w-220 md:max-w-172 sm:max-w-100 max-w-80">
        <Component {...pageProps} />
      </main>

    </QueryClientProvider>
  );
}
