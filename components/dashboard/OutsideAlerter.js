import { useEffect, useRef } from "react";

function useOutsideAlerter(ref, action) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.outerHTML !== "<span>Có</span>"
      ) {
        action();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const OutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.action);

  return <div ref={wrapperRef}>{props.children}</div>;
};

export default OutsideAlerter;
