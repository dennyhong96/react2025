import { useState, useEffect } from "react";

// Nextjs's getStaticProps is returning props as undefined in dev mode
// Use this hook in place of useState in dev mode
const useInitialState = (initialState) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    typeof state === "undefined" && initialState && setState(initialState);
  }, [initialState]);

  return [state, setState];
};

export default useInitialState;
