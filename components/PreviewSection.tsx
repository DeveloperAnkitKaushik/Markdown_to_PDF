'use client'

import React, { forwardRef } from 'react'
import { Eye, RefreshCw, ExternalLink } from 'lucide-react'

interface PreviewSectionProps {
    htmlContent: string
}

export const PreviewSection = forwardRef<HTMLDivElement, PreviewSectionProps>(
    ({ htmlContent }, ref) => {
        const handleRefresh = () => {
            // Force re-render of the preview
            window.location.reload()
        }

        const handleOpenInNewWindow = () => {
            // Store content in sessionStorage and open in new tab
            if (htmlContent) {
                sessionStorage.setItem('markdownPreviewContent', htmlContent)
                window.open('/preview', '_blank')
            }
        }

        return (
            <div className="flex flex-col h-full min-h-0">
                <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex-shrink-0">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center space-x-2">
                        <Eye className="w-5 h-5" />
                        <span> Live Preview</span>
                    </h2>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleOpenInNewWindow}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
                            title="Open preview in new tab"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">New Tab</span>
                            <span className="sm:hidden">Open</span>
                        </button>

                        <button
                            onClick={handleRefresh}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0">
                    <div
                        ref={ref}
                        className="markdown-body p-6 min-h-full bg-[var(--bg-primary)] w-full max-w-none"
                        style={{
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: htmlContent || '<div class="empty-state"><p style="color: var(--text-muted); font-style: italic; text-align: center; margin-top: 2rem;">Your markdown preview will appear here...</p></div>'
                        }}
                    />
                </div>
            </div>
        )
    }
)

PreviewSection.displayName = 'PreviewSection' 