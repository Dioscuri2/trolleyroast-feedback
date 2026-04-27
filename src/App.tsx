import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GrocefullyLanding from "./pages/GrocefullyLanding";
import FeedbackPage from "./pages/FeedbackPage";
import ProPage from "./pages/ProPage";
import ReceiptIndexPage from "./pages/ReceiptIndexPage";
import SupermarketsPage from "./pages/SupermarketsPage";
import CategoriesPage from "./pages/CategoriesPage";
import BlogGuidesPage from "./pages/BlogGuidesPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import SupermarketDetailPage from "./pages/SupermarketDetailPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import WeeklyBasketSavingsPage from "./pages/WeeklyBasketSavingsPage";
import BrandVsOwnBrandPage from "./pages/BrandVsOwnBrandPage";
import SplitShopSavingsPage from "./pages/SplitShopSavingsPage";
import ComparisonHubPage from "./pages/ComparisonHubPage";
import ComparisonDetailPage from "./pages/ComparisonDetailPage";

import AboutPage from "./pages/legal/AboutPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import CleanSwapGuidePage from "./pages/CleanSwapGuidePage";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={GrocefullyLanding} />
      <Route path={"/clean-swap-guide"} component={CleanSwapGuidePage} />
      <Route path={"/about"} component={AboutPage} />
      <Route path={"/terms"} component={TermsPage} />
      <Route path={"/privacy"} component={PrivacyPage} />
      <Route path={"/feedback"} component={FeedbackPage} />
      <Route path={"/pro"} component={ProPage} />
      <Route path={"/calculators"} component={CalculatorsPage} />
      <Route path={"/calculators/weekly-basket-savings"} component={WeeklyBasketSavingsPage} />
      <Route path={"/calculators/brand-vs-own-brand"} component={BrandVsOwnBrandPage} />
      <Route path={"/calculators/split-shop-savings"} component={SplitShopSavingsPage} />
      <Route path={"/compare"} component={ComparisonHubPage} />
      <Route path={"/compare/:slug"} component={ComparisonDetailPage} />
      <Route path={"/receipt-index"} component={ReceiptIndexPage} />
      <Route path={"/supermarkets"} component={SupermarketsPage} />
      <Route path={"/supermarkets/:slug"} component={SupermarketDetailPage} />
      <Route path={"/categories"} component={CategoriesPage} />
      <Route path={"/categories/:slug"} component={CategoryDetailPage} />
      <Route path={"/blog"} component={BlogIndexPage} />
      <Route path={"/blog/guides"} component={BlogGuidesPage} />
      <Route path={"/blog/:slug"} component={BlogPostPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
