import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import YearOverview from "./pages/YearOverview";
import RichtingDetail from "./pages/RichtingDetail";
import VakDetail from "./pages/VakDetail";
import OnderdeelDetail from "./pages/OnderdeelDetail";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jaar/:year" element={<YearOverview />} />
          <Route path="/jaar/:year/:richting" element={<RichtingDetail />} />
          <Route path="/jaar/:year/:richting/:vak" element={<VakDetail />} />
          <Route path="/jaar/:year/:richting/:vak/:onderdeel" element={<OnderdeelDetail />} />
          <Route path="/premium" element={<Premium />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
