'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') as Theme
        if (savedTheme) {
            setThemeState(savedTheme)
        } else {
            // Check system preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            setThemeState(systemTheme)
        }
    }, [])

    useEffect(() => {
        if (mounted) {
            // Update document class and localStorage
            document.documentElement.classList.remove('light', 'dark')
            document.documentElement.classList.add(theme)
            localStorage.setItem('theme', theme)
        }
    }, [theme, mounted])

    // Apply theme immediately to prevent flash
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.remove('light', 'dark')
            document.documentElement.classList.add(theme)
        }
    }, [theme])

    const toggleTheme = () => {
        setThemeState(prev => prev === 'light' ? 'dark' : 'light')
    }

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
    }

    // Prevent hydration mismatch by providing context even when not mounted
    const contextValue = { theme, toggleTheme, setTheme }

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider. Make sure your component is wrapped with <ThemeProvider>.')
    }
    return context
} 