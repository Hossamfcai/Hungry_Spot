import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import { motion } from "framer-motion";
export default function AuthenticationLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col gap-10 justify-center">
      <Navbar />
      <div className="flex justify-center">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-136 relative z-10 flex flex-col mx-4 font-sans text-on-surface"
        >
          {/* Decorative accent top beam */}
          <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-primary-container to-transparent mx-auto mb-space-sm" />

          {/* Main Container Card */}
          <div className="bg-surface-container-lowest/85 backdrop-blur-2xl rounded-xl border border-outline-variant/60 shadow-2xl p-6 md:p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 inset-x-8 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            {/* Header Section */}
            {location.pathname.includes("/Authentication/Login") ? (
              <motion.div
                initial={{ opacity: 0 }} // Start invisible
                animate={{ opacity: 1 }} // Fade1 second to fully visible
                transition={{ duration: 1 }}
                className="text-center mb-6"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary block mb-1">
                  Exclusive Membership
                </span>
                <h1 className="text-2xl md:text-3xl font-serif text-on-surface tracking-tight mb-2">
                  Patron Access Portal
                </h1>
                <p className="text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Sign in with your atelier account or request access to private
                  seating.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} // Start invisible
                animate={{ opacity: 1 }} // Fade1 second to fully visible
                transition={{ duration: 1 }}
                className="text-center mb-6"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary block mb-1">
                  Join The Community
                </span>
                <h1 className="text-2xl md:text-3xl font-serif text-on-surface tracking-tight mb-2">
                  Create Your Account
                </h1>
                <p className="text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Register today to get full access to our menu, reservation
                  features, and member perks.
                </p>
              </motion.div>
            )}

            {/* Tab Toggle Controls */}
            <div className="bg-surface-container-lowest p-1 rounded-lg flex items-center mb-6 relative border border-outline-variant/40">
              <Link
                to={"/Authentication/Login"}
                type="button"
                className={
                  location.pathname.includes("/Authentication/Login")
                    ? "flex-1 py-space-xs font-label-caps text-label-caps uppercase tracking-wider text-center transition-all duration-300 rounded bg-primary-container text-on-primary-container shadow-md"
                    : "flex-1 py-space-xs font-label-caps text-label-caps uppercase tracking-wider text-center transition-all duration-300 rounded text-on-surface-variant hover:text-on-surface"
                }
              >
                Sign In
              </Link>
              <Link
                to={"/Authentication/Sign_Up"}
                type="button"
                className={
                  location.pathname.includes("/Authentication/Sign_Up")
                    ? "flex-1 py-space-xs font-label-caps text-label-caps uppercase tracking-wider text-center transition-all duration-300 rounded bg-primary-container text-on-primary-container shadow-md"
                    : "flex-1 py-space-xs font-label-caps text-label-caps uppercase tracking-wider text-center transition-all duration-300 rounded text-on-surface-variant hover:text-on-surface"
                }
              >
                Create Account
              </Link>
            </div>

            {/* Sign In Form */}
            <Outlet />
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
