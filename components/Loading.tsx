import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export default function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} border-2 border-primary-500 border-t-transparent rounded-full`}
      />
      {text && (
        <p className="text-gray-400 text-sm">{text}</p>
      )}
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <LoadingSpinner size="lg" text="Loading page..." />
    </div>
  )
}

export function ButtonLoading({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </div>
  )
}