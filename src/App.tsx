import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { DemoRequestProvider } from "@/components/site/DemoRequest";
import { LightboxProvider } from "@/components/site/Lightbox";
import { CursorFollower } from "@/components/site/Cursor";
import Index from "./pages/Index";
import { DemoPage, NotFoundPage } from "./routes";

/* The homepage ships in the main bundle so it paints immediately. The sandbox page
 * and the 404 page load on demand (and the sandbox is prefetched once the homepage
 * is idle). The demo request form loads the first time someone reaches for it. */

const RouteFallback = () => <div className="min-h-screen bg-[#0A0A0B]" aria-busy="true" />;

const App = () => (
  <BrowserRouter>
    <DemoRequestProvider>
      <LightboxProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/demo"
          element={
            <Suspense fallback={<RouteFallback />}>
              <DemoPage />
            </Suspense>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
      </LightboxProvider>
    </DemoRequestProvider>
    <CursorFollower />
    <Toaster position="bottom-right" />
  </BrowserRouter>
);

export default App;
