import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css"; 
import "../styles/toast.css"; 
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import React ,{useState,useEffect} from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1, // no of retries
          },
        },
      })
  );

  return (
    <>
    <Head>
        <title>Almari</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>

        {/* <meta name="description" content={APP.DESC} />
        <meta name="keywords" content={APP.KEYWORDS} />
        <meta name="author" content={APP.AUTHOR} /> */}
      </Head>

    <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ToastContainer />
      </Hydrate>
    </QueryClientProvider>
  </>
  );
}

export default MyApp;
