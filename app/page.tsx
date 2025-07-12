'use client'

import React from 'react'
import { MarkdownEditor } from '@/components/MarkdownEditor'

export default function Home() {
    return (
        <main className="min-h-screen bg-[var(--bg-primary)]">
            <MarkdownEditor />
        </main>
    )
} 