import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TransitionLink } from "@/components/site/transitions";
import { Logo } from "@/components/site/brand";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: no route for", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0B] px-6 py-5 font-sans text-white">
      <TransitionLink to="/" aria-label="Martian home" className="self-start">
        <Logo dark size={26} />
      </TransitionLink>
      <main className="flex flex-1 flex-col items-start justify-center gap-5 self-center">
        <p className="m-0 font-mono text-[13px] uppercase tracking-[0.04em] text-[#FF6B3D]">404</p>
        <h1 className="m-0 text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.03em]">There's nothing at this address.</h1>
        <p className="m-0 max-w-[460px] text-[17px] leading-[1.6] text-[#B4B7BD]">
          The link might be old, or it might have a typo in it. The homepage has everything this site covers.
        </p>
        <TransitionLink to="/" className="btn btn-accent rounded-[10px] border border-[#D2401A] bg-[#D2401A] px-5 py-3 text-[15px] font-semibold text-white">
          Go to the homepage
        </TransitionLink>
      </main>
    </div>
  );
};

export default NotFound;
