import { motion } from "framer-motion"

export default function Card({ title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="border border-border bg-panel rounded-xl p-6 
                 hover:border-accent 
                 hover:shadow-[0_0_25px_rgba(184,187,38,0.15)] 
                 transition"
    >
      <h3 className="text-lg font-medium hover:text-accent transition">
        {title}
      </h3>
      <p className="text-sm text-text-muted mt-2">
        {description}
      </p>
    </motion.div>
  )
}
