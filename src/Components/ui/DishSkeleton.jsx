import { motion } from "framer-motion";
export function DishCardSkeleton() {
  const skeletonContainerVariants = {
    hidden: { opacity: 0.6 },
    visible: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };
  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };
  return (
    <motion.article
      variants={skeletonContainerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-md border border-outline-variant/35 bg-surface-container-low animate-pulse"
    >
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      {/* IMAGE PLACEHOLDER */}
      <div className="relative aspect-[4/3] w-full bg-surface-container-high">
        {/* Category Badge Placeholder */}
        <div className="absolute left-3 top-3 h-5 w-16 rounded-sm bg-surface-container-highest/60" />
      </div>

      {/* CONTENT PLACEHOLDER */}
      <div className="p-5">
        {/* Title & Price Header */}
        <div className="flex items-start justify-between gap-4">
          {/* Title Placeholder */}
          <div className="h-6 w-2/3 rounded bg-surface-container-high" />

          {/* Price Placeholder */}
          <div className="h-5 w-12 rounded bg-surface-container-high" />
        </div>

        {/* Description Lines (Matching line-clamp-2 and leading-6) */}
        <div className="mt-2 space-y-2">
          <div className="h-3 w-full rounded bg-surface-container-high" />
          <div className="h-3 w-4/5 rounded bg-surface-container-high" />
        </div>

        {/* Action Button Placeholder */}
        <div className="mt-5 h-3.5 w-28 rounded bg-surface-container-high" />
      </div>
    </motion.article>
  );
}
