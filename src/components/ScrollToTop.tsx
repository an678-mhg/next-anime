import React, { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 150 ? setShow(true) : setShow(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () =>
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return (
    <div
      onClick={handleScrollTop}
      style={{
        display: show ? "flex" : "none",
      }}
      className="fixed bottom-0 opacity-animation z-[99999] right-0 w-10 h-10 bg-primary rounded-full m-4 items-center justify-center"
    >
      <HiArrowUp fontWeight={800} size={15} color="#fff" />
    </div>
  );
};

export default ScrollToTop;
