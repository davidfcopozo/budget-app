import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemesProvider } from "./contexts/ThemesContext";
import AuthProvider from "./contexts/AuthContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ReactQueryDevtools } from "react-query/devtools";
import { BudgetsProvider } from "./contexts/BudgetsContext";
import Dashboard from "./pages/Dashboard";
import { UpdateProfile } from "./pages/UpdateProfile";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BudgetsProvider>
            <LanguageProvider>
              <ThemesProvider>
                <Router>
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      exact
                      path="/update-profile"
                      element={
                        <ProtectedRoute>
                          <UpdateProfile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      exact
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Routes>
                </Router>
              </ThemesProvider>
            </LanguageProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </BudgetsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
