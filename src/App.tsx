
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { BlogProvider } from "./contexts/BlogContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import CookieConsent from "./components/CookieConsent";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BlogProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <CookieConsent />
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <Routes>
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/articles" element={<Layout><Articles /></Layout>} />
                <Route path="/articles/:slug" element={<Layout><ArticleDetail /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Layout><SearchResults /></Layout>} />
                <Route path="/create-post" element={<ProtectedRoute adminOnly={true}><Layout><CreatePost /></Layout></ProtectedRoute>} />
                <Route path="/edit-post/:postId" element={<ProtectedRoute adminOnly={true}><Layout><EditPost /></Layout></ProtectedRoute>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BlogProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
