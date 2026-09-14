import { Mail, Lock, Eye, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthDispatch, useAuthState } from "../../Contexts/AppContext";
import { Notification } from "../../utils/sweetAlertNotification";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const { loading, error } = useAuthState();
  const { handleLogin } = useAuthDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setDisabledButton((prev) => {
      return !prev;
    });
    console.log(disabledButton);
    console.log(isSubmitting);
    console.log("Collected User Data:", data);
    const response = handleLogin(data);
    response
      .then((response) => {
        Notification(
          "Welcome Back!",
          "You have logged in successfully.",
          "success",
        );
        console.log(response.status);
        if (response.role === "admin") {
          navigate("/Dashboard/Analytics");
        } else if (response.role === "user") {
          navigate("/Restaurant");
        }
      })
      .catch(() => {
        setDisabledButton((prev) => {
          return !prev;
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} // Start invisible
      animate={{ opacity: 1 }} // Fade1 second to fully visible
      transition={{ duration: 1 }}
    >
      {/* Sign In Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <div className="flex">
            <label
              htmlFor="signin-email"
              className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider"
            >
              Email
            </label>
          </div>
          <div className="relative flex items-center">
            <Mail className="w-5 h-5 absolute left-3.5 text-outline pointer-events-none" />
            <input
              {...register("email")}
              id="signin-email"
              type="email"
              placeholder="patron@culinaryatelier.com"
              className={`w-full bg-surface-container-high text-on-surface placeholder:text-outline font-body-md text-body-md pl-11 pr-space-md py-space-sm rounded transition-all focus:outline-none focus:bg-surface-container-highest shadow-inner ${
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
          <div className="flex">
            <label
              htmlFor="signin-password"
              className="text-[11px] font-semibold uppercase text-on-surface-variant tracking-wider"
            >
              Password
            </label>
          </div>
          <div className="relative flex items-center">
            <Lock className="w-5 h-5 absolute left-3.5 text-outline pointer-events-none" />
            <input
              {...register("password")}
              id="signin-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              className={`w-full bg-surface-container-high text-on-surface placeholder:text-outline font-body-md text-body-md pl-11 pr-space-md py-space-sm rounded transition-all focus:outline-none focus:bg-surface-container-highest shadow-inner ${
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
        {/* error state */}
        {error.isError && (
          <div className="flex justify-center w-full p-4 rounded-lg bg-surface-container-low border border-outline-variant/60 shadow-lg  transition-all duration-300">
            <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
              {error.message}
            </p>
          </div>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isSubmitting && disabledButton}
          className="w-full py-3 bg-primary-container hover:bg-secondary-container text-on-primary-container hover:text-on-secondary font-label-caps text-label-caps uppercase tracking-widest rounded transition-all duration-300 shadow-[0_12px_36px_-8px_rgba(217,119,6,0.35)] flex items-center justify-center gap-space-xs "
        >
          {loading ? (
            <div
              className="w-6 h-6 rounded-full animate-spin border-2 border-on-primary/25 border-t-on-primary"
              aria-label="Loading indicator"
            />
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
    </motion.div>
  );
}
