import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";

/** Closes an open disclosure on Escape (focus goes back to its button) and on a press outside `root`. */
export function useDismiss(
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  root: RefObject<HTMLElement | null>,
  button: RefObject<HTMLButtonElement | null>,
) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, setOpen, root, button]);
}
