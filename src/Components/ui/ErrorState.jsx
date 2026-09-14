import { WifiOff } from "lucide-react";

export default function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-xl bg-surface-container border border-outline/10 max-w-md mx-auto my-6 shadow-sm">
      {/* Icon Badge */}
      <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-error-container/20 text-error mb-4 shrink-0">
        <WifiOff className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
      </div>

      {/* Heading */}
      <h3 className="text-lg sm:text-xl font-bold text-on-surface mb-2">
        Unable to Connect to Server
      </h3>

      {/* Subtext */}
      <p className="text-xs sm:text-sm text-secondary mb-6 leading-relaxed max-w-xs">
        We couldn't reach to the server. Please check your internet connection.
      </p>
    </div>
  );
}
