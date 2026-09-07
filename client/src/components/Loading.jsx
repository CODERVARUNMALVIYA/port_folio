import React from 'react'

export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3 py-8">
      <div className="w-7 h-7 border-4 border-slate-200 border-t-accent rounded-full animate-spin" aria-hidden="true" />
      <p className="text-slate-600">{message}</p>
    </div>
  )
}
