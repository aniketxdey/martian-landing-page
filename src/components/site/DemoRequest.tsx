import React, { createContext, lazy, Suspense, useCallback, useContext, useMemo, useRef, useState } from "react";

/* "Book a demo" without shipping the form up front. The dialog (Radix, the
 * select, icons) and Supabase load on first hover or click, so the homepage's
 * first paint only carries the page itself. */

const loadDialog = () => import("@/components/DemoRequestDialog");
const DemoRequestDialog = lazy(loadDialog);

type Ctx = { open: () => void; prefetch: () => void };
const DemoRequestContext = createContext<Ctx>({ open: () => undefined, prefetch: () => undefined });

export function DemoRequestProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const prefetch = useCallback(() => {
    void loadDialog();
  }, []);
  const openDialog = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setMounted(true);
    setOpen(true);
  }, []);
  const value = useMemo(() => ({ open: openDialog, prefetch }), [openDialog, prefetch]);

  return (
    <DemoRequestContext.Provider value={value}>
      {children}
      {mounted && (
        <Suspense fallback={null}>
          <DemoRequestDialog open={open} onOpenChange={setOpen} returnFocusTo={returnFocus} />
        </Suspense>
      )}
    </DemoRequestContext.Provider>
  );
}

export const useDemoRequest = () => useContext(DemoRequestContext);

/** Any button that opens the demo request form. */
export const DemoRequestButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function DemoRequestButton({ onClick, onPointerEnter, onFocus, children, ...rest }, ref) {
    const { open, prefetch } = useDemoRequest();
    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="dialog"
        onPointerEnter={(e) => {
          prefetch();
          onPointerEnter?.(e);
        }}
        onFocus={(e) => {
          prefetch();
          onFocus?.(e);
        }}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) open();
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
