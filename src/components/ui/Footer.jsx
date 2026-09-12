import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-surface-container-lowest">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-10">

        {/* BRAND */}
        <div>
          <Logo />

          <p className="mt-5 max-w-sm text-xs leading-6 text-on-surface-variant">
            A contemporary dining experience built around seasonal
            ingredients, thoughtful craft, and warm hospitality.
          </p>

          <div className="mt-5 flex gap-3">

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="grid size-8 place-items-center rounded-full border border-outline-variant/50 text-on-surface-variant transition hover:border-primary hover:text-primary"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="grid size-8 place-items-center rounded-full border border-outline-variant/50 text-xs font-semibold text-on-surface-variant transition hover:border-primary hover:text-primary"
            >
              f
            </a>

            {/* X */}
            <a
              href="#"
              aria-label="X"
              className="grid size-8 place-items-center rounded-full border border-outline-variant/50 text-xs text-on-surface-variant transition hover:border-primary hover:text-primary"
            >
              𝕏
            </a>

          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Explore
          </p>

          <div className="mt-5 flex flex-col gap-3 text-xs text-on-surface-variant">
            <a href="#menu" className="transition hover:text-primary">
              Our menu
            </a>

            <a href="#about" className="transition hover:text-primary">
              Our story
            </a>

            <a href="#contact" className="transition hover:text-primary">
              Contact
            </a>
          </div>
        </div>

        {/* VISIT */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Visit
          </p>

          <div className="mt-5 text-xs leading-6 text-on-surface-variant">
            <p>18 Artisan Avenue</p>
            <p>Downtown District</p>
            <p className="mt-2">
              Daily · 12 PM — 12 AM
            </p>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Newsletter
          </p>

          <p className="mt-5 text-xs leading-6 text-on-surface-variant">
            Seasonal menus, private events, and stories from our kitchen.
          </p>

          <div className="mt-4 flex overflow-hidden border border-outline-variant/50">
            <input
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-xs text-on-surface outline-none placeholder:text-on-surface-variant"
            />

            <button
              type="button"
              className="bg-primary-container px-4 text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-secondary-container"
            >
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-outline-variant/20 px-5 py-5 text-center text-[9px] uppercase tracking-[0.15em] text-on-surface-variant">
        © 2026 Hungry Spot. Crafted for memorable moments.
      </div>
    </footer>
  );
}