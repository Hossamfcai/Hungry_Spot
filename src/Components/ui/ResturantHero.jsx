import { Star } from "lucide-react";
import { motion } from "framer-motion";
import heroPhoto from "../../assets/images/resturantHero.jpeg";
export default function ResturantHero() {
  return (
    <section
      className="relative w-full -mt-16 md:-mt-20 overflow-hidden bg-surface-container-lowest  bg-cover bg-right bg-no-repeat "
      style={{ backgroundImage: `url(${heroPhoto})` }}
      id="home"
    >
      <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-44 md:pb-24 flex flex-col gap-4 sm:gap-6 md:gap-space-lg"
      >
        {/* Michelin Star Badge */}
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-container-high/90 text-primary shadow-xl backdrop-blur-md max-w-full">
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary fill-secondary shrink-0" />
          <span className="font-label-caps text-[10px] sm:text-xs md:text-label-caps tracking-widest uppercase truncate">
            Autumn Degustation &amp; À La Carte · 2 Michelin Stars
          </span>
        </div>

        {/* Headline & Description */}
        <div className="max-w-4xl flex flex-col gap-2 sm:gap-3 md:gap-space-sm">
          <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight md:leading-[64px] text-on-surface tracking-tight">
            The Atelier{" "}
            <span className="text-primary italic font-serif block sm:inline">
              Culinary Collection
            </span>
          </h1>
          <p className="font-body-xl text-sm sm:text-base md:text-body-xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
            Each culinary creation honors the sacred tension between classical
            French heritage technique and untamed seasonal nature, choreographed
            daily from early morning market harvests.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
