import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
      <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-surface-container border border-outline/10 max-w-lg w-full shadow-sm">
        {/* Large Decorative Badge */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary-container/40 text-primary shrink-0">
            <FileQuestion className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
          </div>
          <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-secondary-container text-on-surface font-extrabold font-label-caps text-xs tracking-wider">
            404
          </span>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-2 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-secondary mb-8 leading-relaxed max-w-sm">
          The page you are looking for doesn't exist, was removed, or had its
          address changed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded w-full sm:w-auto transition-all text-on-primary bg-primary hover:bg-primary/90 active:scale-[0.98] font-label-caps text-xs sm:text-sm font-semibold uppercase shrink-0"
          >
            <Home className="w-4 h-4 text-on-primary shrink-0" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
