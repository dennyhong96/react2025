import { useRef } from "react";

const useDateFormat = () => {
  const intlRef = useRef((isoStr) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date(isoStr));
  });

  return { format: intlRef.current };
};

export default useDateFormat;
