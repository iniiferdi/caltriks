import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export function Footer() {
  return (
    <motion.footer
      className="w-full max-w-5xl px-12 flex justify-center items-center text-center py-6 text-sm text-gray-500 mx-auto mt-auto z-10"
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <p>
        Built with 💙 using React, Tailwind, and Framer Motion —{" "}
        <a
          href="https://github.com/your-repo-link"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors"
        >
          View on GitHub
        </a>
      </p>
    </motion.footer>
  );
}
