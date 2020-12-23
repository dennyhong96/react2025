import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const useNProgress = (config = {}) => {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false, ...config });
    router.events.on("routeChangeStart", NProgress.start);
    router.events.on("routeChangeComplete", NProgress.done);
    router.events.on("routeChangeError", NProgress.done);

    return () => {
      router.events.off("routeChangeStart", NProgress.start);
      router.events.off("routeChangeComplete", NProgress.done);
      router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  return null;
};

export default useNProgress;
