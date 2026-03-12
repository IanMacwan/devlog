import { motion } from "framer-motion"

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  )
}
