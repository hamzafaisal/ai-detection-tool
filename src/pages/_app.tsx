import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/common/Header";
import AuthCheck from "@/components/auth/AuthCheck";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthCheck />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
