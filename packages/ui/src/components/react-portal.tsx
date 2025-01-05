import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IReactPortalProps {
  children: React.ReactNode;
  wrapperId?: string;
  wrapperClassName?: string;
  dontRemoveWrapperSetNull?: boolean;
}

function createWrapperAndAppendToBody(
  wrapperId: string
): HTMLDivElement | null {
  if (typeof document === "undefined") return null;
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export default function ReactPortal({
  children,
  wrapperId = "react-portal-wrapper",
  wrapperClassName,
  dontRemoveWrapperSetNull = false,
}: IReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId) as HTMLDivElement | null;

    // Create the wrapper if it doesn't exist
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }

    if (!element) return;

    // Add class names if provided
    const classNames = wrapperClassName?.split(" ").map((c) => c.trim()) || [];
    if (classNames.length > 0) {
      element.classList.add(...classNames);
    }

    setWrapperElement(element);

    return () => {
      if (!dontRemoveWrapperSetNull) {
        element.remove();
      } else {
        if (classNames.length > 0) {
          element.classList.remove(...classNames);
        }
        setWrapperElement(null);
      }
    };
  }, [wrapperId, wrapperClassName, dontRemoveWrapperSetNull]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
}
