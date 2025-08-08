"use client";
import React, { ReactNode, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const dismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && dismiss) {
        dismiss();
      }
    },
    [dismiss, overlay]
  );

  return (
    <div onClick={handleClick} className="modal" ref={overlay}>
      <button
        type="button"
        onClick={dismiss}
        className="absolute top-3 right-8"
      >
        <Image src={"/close.svg"} width={17} height={17} alt="close" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
