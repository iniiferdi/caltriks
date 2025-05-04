import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export function Footer() {
  return (
    <motion.footer
      className="w-full text-center py-6 text-sm text-gray-500 mt-auto z-10"
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{
        delay: 2, // Menambahkan delay selama 2 detik setelah konten lainnya muncul
        duration: 0.6, // Durasi animasi
      }}
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
