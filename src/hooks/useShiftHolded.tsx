import React from "react";

//a hook that accept a key and return a boolean
// example   const isShiftHolde = useIsKeyHolded('shift')
export default function useShiftHolded() {
  const [isShiftHolded, setIsShiftHolded] = React.useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Shift") setIsShiftHolded(true);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Shift") setIsShiftHolded(false);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return isShiftHolded;
}
