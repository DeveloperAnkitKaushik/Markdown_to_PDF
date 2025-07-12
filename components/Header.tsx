'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { Moon, Sun, Download, FileText, ChevronDown, FileImage, Image } from 'lucide-react'

interface HeaderProps {
  onDownloadPDF: () => void
  onDownloadPNG?: () => void
  onDownloadJPEG?: () => void
  wordCount: number
}

export function Header({ onDownloadPDF, onDownloadPNG, onDownloadJPEG, wordCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] shadow-sm gap-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-[var(--accent-primary)]" />
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              Markdown to PDF Converter
            </h1>
            <p className="text-sm text-[var(--text-secondary)] hidden sm:block">
              Made with ❤️ by <a target="_blank" href="https://kaushikankit.vercel.app" className="text-[var(--accent-primary)] hover:underline">Ankit Kaushik</a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center space-x-4 w-full sm:w-auto sm:justify-end">
        <div className="text-sm text-[var(--text-secondary)]">
          Words: <span className="font-medium text-[var(--text-primary)]">{wordCount}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-[var(--text-primary)]" />
            ) : (
              <Sun className="w-5 h-5 text-[var(--text-primary)]" />
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <div className="flex">
              {/* Main PDF button */}
              <button
                onClick={onDownloadPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white rounded-l-md transition-colors font-medium"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </button>
              
              {/* Dropdown toggle */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-2 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white rounded-r-md border-l border-white/20 transition-colors"
                aria-label="More export options"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onDownloadPDF()
                      setDropdownOpen(false)
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-left text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download as PDF</span>
                  </button>
                  
                  {onDownloadPNG && (
                    <button
                      onClick={() => {
                        onDownloadPNG()
                        setDropdownOpen(false)
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <FileImage className="w-4 h-4" />
                      <span>Download as PNG</span>
                    </button>
                  )}
                  
                  {onDownloadJPEG && (
                    <button
                      onClick={() => {
                        onDownloadJPEG()
                        setDropdownOpen(false)
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <Image className="w-4 h-4" />
                      <span>Download as JPEG</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 