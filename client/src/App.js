import Dashboard from "./components/Dashboard";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemesProvider } from "./contexts/ThemesContext";
import AuthProvider from "./contexts/AuthContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { Signup } from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ForgotPassword } from "./components/ForgotPassword";
import { UpdateProfile } from "./components/UpdateProfile";
import { ReactQueryDevtools } from "react-query/devtools";
import { BudgetsProvider } from "./contexts/BudgetsContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BudgetsProvider>
          <LanguageProvider>
            <ThemesProvider>
              <Router>
                <AuthProvider>
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
                </AuthProvider>
              </Router>
            </ThemesProvider>
          </LanguageProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </BudgetsProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
