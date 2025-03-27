import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/common/Header";
import AuthCheck from "@/components/auth/AuthCheck";

// Mark AuthCheck as a client component
const ClientAuthCheck = () => {
  return <AuthCheck />;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClientAuthCheck />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
