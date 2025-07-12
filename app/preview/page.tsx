'use client'

import { useEffect, useState } from 'react'

export default function PreviewPage() {
    const [htmlContent, setHtmlContent] = useState('')

    useEffect(() => {
        // Get the content from sessionStorage
        const content = sessionStorage.getItem('markdownPreviewContent')
        if (content) {
            try {
                setHtmlContent(content)
            } catch (error) {
                console.error('Error loading content:', error)
                setHtmlContent('<p>Error loading content</p>')
            }
        } else {
            setHtmlContent('<p style="color: var(--text-muted); font-style: italic; text-align: center; margin-top: 2rem;">No content found. Please open this from the main editor.</p>')
        }
    }, [])

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <div className="container mx-auto max-w-4xl p-6">
                <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{
                        __html: htmlContent || '<p style="color: var(--text-muted); font-style: italic; text-align: center; margin-top: 2rem;">No content to preview</p>'
                    }}
                />
            </div>
        </div>
    )
} 