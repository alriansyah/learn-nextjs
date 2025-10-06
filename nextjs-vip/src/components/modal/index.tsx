"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function onClose(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === overlay.current) {
      router.back();
    }
  }

  return (
    <div
      ref={overlay}
      className="fixed top-0 right-0 bottom-0 left-0 z-10 mx-auto bg-black/60"
      onClick={onClose}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
        <button
          onClick={router.back}
          className="w-full cursor-pointer text-end text-red-600"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
