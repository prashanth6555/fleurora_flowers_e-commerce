import { AnimatePresence, motion } from 'framer-motion'
import { useShop } from '../context/ShopContext'

export default function Toast() {
  const { toast } = useShop()

  return (
    <div className="pointer-events-none fixed bottom-5 left-0 z-50 flex w-full justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="bg-ink px-5 py-3 text-sm text-cream shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
