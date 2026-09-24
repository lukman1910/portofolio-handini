import { profileData } from "../data/profile";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/10 bg-black/80 backdrop-blur-md text-zinc-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-white tracking-tight">
            {profileData.name}<span className="text-indigo-500">.</span>
          </span>
          <span className="text-xs text-zinc-400 border-l border-white/10 pl-3">
            {profileData.title}
          </span>
        </div>

        <p className="text-xs text-zinc-400">
          © {currentYear} {profileData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
