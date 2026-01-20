import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import ExperienceDetail from "./pages/ExperienceDetail";
import Itinerary from "./pages/Itinerary";
import MyItineraries from "./pages/MyItineraries";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Favorites from "./pages/Favorites";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import GuideProfile from "./pages/GuideProfile";
import Chat from "./pages/Chat";
import GuideDashboard from "./pages/GuideDashboard";
import GuideSchedule from "./pages/GuideSchedule";
import CreateExperience from "./pages/CreateExperience";
import AdminDashboard from "./pages/AdminDashboard";
import GuideEditProfile from "./pages/GuideEditProfile";
import GuideInbox from "./pages/GuideInbox";
import GuideEarnings from "./pages/GuideEarnings";
import Notifications from "./pages/Notifications";
import WriteReview from "./pages/WriteReview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/my-itineraries" element={<MyItineraries />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/guide-profile/:id" element={<GuideProfile />} />
          <Route path="/chat/:guideId" element={<Chat />} />
          <Route path="/guide" element={<GuideDashboard />} />
          <Route path="/guide-dashboard" element={<GuideDashboard />} />
          <Route path="/guide-schedule" element={<GuideSchedule />} />
          <Route path="/guide-edit-profile" element={<GuideEditProfile />} />
          <Route path="/guide-inbox" element={<GuideInbox />} />
          <Route path="/guide-earnings" element={<GuideEarnings />} />
          <Route path="/create-experience" element={<CreateExperience />} />
          <Route path="/write-review/:bookingId" element={<WriteReview />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
