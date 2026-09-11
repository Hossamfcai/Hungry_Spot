import {
  Key,
  Mail,
  Lock,
  Eye,
  ConciergeBell,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useAuthDispatch } from "../../Contexts/AppContext";

// 1. Define Zod validation schema

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberDevice: z.boolean().optional(),
});
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useAuthDispatch();

  // 2. Initialize react-hook-form
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberDevice: true,
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Collected User Data:", data);
    handleLogin(data);
  };

  // Helper to auto-fill demo credentials
  // const handleAutoFill = () => {
  //   setValue("email", "admin@techmaster.com", { shouldValidate: true });
  //   setValue("password", "password123", { shouldValidate: true });
  // };
  return (
    <div className="w-full max-w-[34rem] relative z-10 flex flex-col mx-auto my-8 font-sans text-on-surface">
      {/* Decorative accent top beam */}
      <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary-container/60 to-transparent mx-auto mb-4" />

      {/* Main Container Card */}
      <div className="bg-surface-container-low/90 backdrop-blur-2xl rounded-xl border border-outline-variant/60 shadow-2xl p-6 md:p-8 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Header Section */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary block mb-1">
            Exclusive Membership
          </span>
          <h1 className="text-2xl md:text-3xl font-serif text-on-surface tracking-tight mb-2">
            Patron Access Portal
          </h1>
          <p className="text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Enter your atelier credentials or request admission to our private
            salon tables.
          </p>
        </div>

        {/* Tab Toggle Controls */}
        <div className="bg-surface-container-lowest p-1 rounded-lg flex items-center mb-6 relative border border-outline-variant/40">
          <button
            type="button"
            className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider text-center rounded-md bg-primary-container/20 text-primary border border-primary/30 font-bold shadow-sm"
          >
            Sign In
          </button>
          <button
            type="button"
            className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider text-center rounded-md text-on-surface-variant hover:text-on-surface"
          >
            Create Account
          </button>
        </div>

        {/* Sign In Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* Demo Hint Banner */}
          <div className="bg-surface-container border border-outline-variant/50 px-4 py-2.5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <Key className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs text-on-surface-variant shrink-0">
                Demo Sommelier:
              </span>
              <code className="text-xs text-primary font-mono truncate">
                admin@techmaster.com
              </code>
            </div>
            <button
              type="button"
              // onClick={handleAutoFill}
              className="text-xs font-semibold text-primary hover:text-primary-fixed uppercase tracking-wider transition-colors ml-2 shrink-0 cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="signin-email"
                className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider"
              >
                Patron Email
              </label>
              <span className="text-xs text-outline">Sanctuary Account</span>
            </div>
            <div className="relative flex items-center">
              <Mail className="w-5 h-5 absolute left-3.5 text-outline pointer-events-none" />
              <input
                {...register("email")}
                id="signin-email"
                type="email"
                placeholder="patron@culinaryatelier.com"
                className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm pl-11 pr-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-1 ${
                  errors.email
                    ? "border-error focus:border-error focus:ring-error"
                    : "border-outline-variant/60 focus:border-primary focus:ring-primary"
                }`}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1.5 mt-0.5 text-error text-xs">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="signin-password"
                className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider"
              >
                Vault Key / Password
              </label>
              <a
                href="#forgot"
                className="text-xs text-primary hover:text-primary-fixed transition-colors"
              >
                Forgot Key?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-5 h-5 absolute left-3.5 text-outline pointer-events-none" />
              <input
                {...register("password")}
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/70 text-sm pl-11 pr-11 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-1 ${
                  errors.password
                    ? "border-error focus:border-error focus:ring-error"
                    : "border-outline-variant/60 focus:border-primary focus:ring-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Toggle password view"
                className="absolute right-3.5 text-outline hover:text-on-surface flex items-center cursor-pointer"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1.5 mt-0.5 text-error text-xs">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.password.message}</span>
              </div>
            )}
          </div>

          {/* Remember & Security Meta */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                {...register("rememberDevice")}
                type="checkbox"
                id="remember-device"
                className="w-4 h-4 rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary/40 cursor-pointer accent-primary"
              />
              <span className="text-xs text-on-surface-variant">
                Remember this terminal session
              </span>
            </label>
            <span className="text-[11px] text-outline font-mono">
              TLS 1.3 256-bit
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 bg-primary hover:bg-primary-fixed text-on-primary font-semibold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-candlelight flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>
              {isSubmitting ? "Authenticating..." : "Sign In to Atelier"}
            </span>
          </button>
        </form>

        {/* Footer Support Section */}
        <div className="mt-8 pt-4 border-t border-outline-variant/40 bg-surface-container-lowest/60 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-4 rounded-b-xl text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <ConciergeBell className="w-4 h-4 text-primary" />
            <span>Assistance required?</span>
          </div>
          <a
            href="#"
            className="font-medium text-primary hover:text-primary-fixed transition-colors flex items-center gap-1"
          >
            Contact Atelier Concierge
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Security Status Badge */}
      <div className="mt-4 py-2 px-4 bg-surface-container-low/70 backdrop-blur rounded-lg border border-outline-variant/40 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-outline">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] text-on-surface-variant">
            API /auth/login &amp; /auth/register
          </span>
        </div>
        <span className="hidden sm:inline text-outline-variant">•</span>
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Bearer JWT Token Secure Session</span>
        </div>
      </div>
    </div>
  );
}
