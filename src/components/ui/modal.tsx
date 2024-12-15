"use client";
import React, { useEffect, useRef } from "react";
import { TModalProps } from "../types";

const Modal = ({ isOpen, children }: TModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]):not(.hidden), textarea:not([disabled]), select:not([disabled]), details:not([disabled]), [tabindex]:not([tabindex="-1"]), label:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;
        if (e.key === "Tab") {
          if (focusableElements.length > 0) {
            if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            } else if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          }
        }

        if (e.key === "Escape") {
          e.preventDefault();
        }
      }
    };

    if (isOpen) {
      modalRef.current?.showModal();

      window.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden";
    } else {
      modalRef.current?.close();

      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
      <dialog
        ref={modalRef}
        className=" bg-white/90 backdrop-blur relative -z-10 min-h-screen min-w-full"
      >
        <div className="width p-2 pt-6 text-stone-700 ">{children}</div>
      </dialog>
    </>
  );
};

export default Modal;
