import { IconPaths } from "~/utils/iconsLib";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-zinc py-6 text-center">
      <div className="mb-10 border-t-2 border-black px-10"></div>
      <div className="flex items-center justify-center">
        {/* Twitter Icon */}
        <a
          href="https://twitter.com/your-twitter-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <svg
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={IconPaths.twitter.viewBox}
          >
            <path d={IconPaths.twitter.path} fill="#000000" />
          </svg>
        </a>

        {/* GitHub Icon */}
        <a
          href="https://github.com/your-github-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <svg
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={IconPaths.github.viewBox}
          >
            <path d={IconPaths.github.path} fill="#181717" />
          </svg>
        </a>

        {/* LinkedIn Icon */}
        <a
          href="https://www.linkedin.com/in/your-linkedin-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <svg
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={IconPaths.linkedin.viewBox}
          >
            <path d={IconPaths.linkedin.path} fill="#000000" />
          </svg>
        </a>

        {/* Discord Icon */}
        <a
          href="https://discordapp.com/invite/your-discord-invite"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <svg
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={IconPaths.discord.viewBox}
          >
            <path d={IconPaths.discord.path} fill="#000000" />
          </svg>
        </a>
      </div>
      <div className="pt-5 text-center">
        Copyright © {currentYear}{" "}
        <div className="text-xl font-bold">zeetcode</div> All rights reserved.
        <div className="text-lg">Contact: hello@zeetcode.com</div>
      </div>
    </footer>
  );
}
