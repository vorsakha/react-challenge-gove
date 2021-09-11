import { useEffect, MutableRefObject } from "react";
import { useHistory } from "react-router-dom";

export default function useClickOutside(
  ref: MutableRefObject<HTMLDivElement | null>,
  action: () => void
) {
  const history = useHistory();

  ref === undefined &&
    console.error("ref is not reachable | useOutsideClick hook");

  useEffect(() => {
    // If the event detects a click outside of the ref target
    // Deploy action function
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, history, action]);
}
