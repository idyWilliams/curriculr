'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface XPToastData {
  id: number
  amount: number
  message: string
  isLarge?: boolean
}

// Simple event emitter for toasts
type Listener = (toast: XPToastData) => void
let listeners: Listener[] = []
let nextId = 0

export const toastXP = (amount: number, message: string, isLarge = false) => {
  const toast: XPToastData = { id: nextId++, amount, message, isLarge }
  listeners.forEach((l) => l(toast))
}

export function XPToastContainer() {
  const [toasts, setToasts] = useState<XPToastData[]>([])

  useEffect(() => {
    const handleToast = (toast: XPToastData) => {
      setToasts((prev) => [...prev, toast])
      // Auto dismiss
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 3000)
    }
    listeners.push(handleToast)
    return () => {
      listeners = listeners.filter((l) => l !== handleToast)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
            className="bg-[#141410] border border-[#24C97E]/30 rounded-2xl px-5 py-4 shadow-lg flex items-center gap-4"
          >
            <div className="text-2xl">⚡</div>
            <div>
              <div
                className={`font-display font-bold text-[#24C97E] leading-none mb-1 ${
                  t.isLarge ? 'text-3xl' : 'text-[22px]'
                }`}
              >
                +{t.amount} XP
              </div>
              <div className="font-sans text-[13px] text-white/70 leading-none">{t.message}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
