'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useTheme } from '@/components/ThemeProvider'
import { EnhancedPDFGenerator } from '@/components/EnhancedPDFGenerator'
import { Header } from '@/components/Header'
import { InputSection } from '@/components/InputSection'
import { PreviewSection } from '@/components/PreviewSection'
import toast from 'react-hot-toast'

// Configure marked for GitHub-style rendering
marked.setOptions({
    breaks: true,
    gfm: true,
})

// Set up custom renderer for syntax highlighting
const renderer = new marked.Renderer()
renderer.code = function (code: string, language: string | undefined) {
    if (language && hljs.getLanguage(language)) {
        try {
            const highlighted = hljs.highlight(code, { language }).value
            return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
        } catch (err) {
            console.error('Highlight.js error:', err)
        }
    }
    const highlighted = hljs.highlightAuto(code).value
    return `<pre><code class="hljs">${highlighted}</code></pre>`
}

marked.use({ renderer })

const SAMPLE_MARKDOWN = `# LangChain Complete Guide - Detailed Notes
*Based on LangChain Tutorial Video*

## Table of Contents
1. [Introduction](#introduction)
2. [What is LangChain?](#what-is-langchain)
3. [LangChain Installation and Setup](#langchain-installation-and-setup)

---

## Introduction (00:00)
LangChain has revolutionized how developers build applications with Large Language Models (LLMs). This comprehensive guide covers the essential concepts, practical implementations, and real-world applications of LangChain.

## What is LangChain? (00:22)
LangChain is an **open-source framework** designed to simplify the development of applications powered by large language models.

### Key Features
- **Modular Architecture**: Components can be mixed and matched
- **Provider Agnostic**: Works with multiple LLM providers
- **Production Ready**: Built with scalability in mind

### Code Example
\`\`\`python
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate

# Initialize LLM
llm = OpenAI(temperature=0.7)

# Create prompt template
template = "Tell me about {topic}"
prompt = PromptTemplate(
    input_variables=["topic"],
    template=template
)

# Generate response
response = llm(prompt.format(topic="artificial intelligence"))
print(response)
\`\`\`

### Comparison Table
| Feature | LangChain | Traditional |
|---------|-----------|-------------|
| Setup | Easy | Complex |
| Flexibility | High | Low |
| Community | Large | Small |

> **Note**: LangChain provides a standardized interface for working with different LLM providers.

For more information, visit the [official documentation](https://docs.langchain.com).

---

*This is a sample document demonstrating various Markdown features.*`

export function MarkdownEditor() {
    const [markdown, setMarkdown] = useState('')
    const [htmlContent, setHtmlContent] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const { theme } = useTheme()
    const previewRef = useRef<HTMLDivElement>(null)

    // Update preview when markdown changes
    const updatePreview = useCallback((text: string) => {
        try {
            const html = marked.parse(text)
            setHtmlContent(html)

            // Update word count
            const words = text.trim().split(/\s+/).filter(word => word.length > 0)
            setWordCount(words.length)
        } catch (error) {
            console.error('Markdown parsing error:', error)
            toast.error('Error parsing markdown')
        }
    }, [])

    // Handle markdown input changes
    const handleMarkdownChange = useCallback((value: string) => {
        setMarkdown(value)
        updatePreview(value)

        // Auto-save to localStorage
        localStorage.setItem('markdownContent', value)
    }, [updatePreview])

    // Load saved content on mount
    useEffect(() => {
        const savedContent = localStorage.getItem('markdownContent')
        if (savedContent) {
            setMarkdown(savedContent)
            updatePreview(savedContent)
        } else {
            // Load sample content
            setMarkdown(SAMPLE_MARKDOWN)
            updatePreview(SAMPLE_MARKDOWN)
        }
    }, [updatePreview])

    // Re-highlight code blocks when theme changes
    useEffect(() => {
        if (previewRef.current) {
            const codeBlocks = previewRef.current.querySelectorAll('pre code')
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement)
            })
        }
    }, [htmlContent, theme])

    const handleClear = () => {
        setMarkdown('')
        setHtmlContent('')
        setWordCount(0)
        localStorage.removeItem('markdownContent')
    }

    const handleLoadSample = () => {
        setMarkdown(SAMPLE_MARKDOWN)
        updatePreview(SAMPLE_MARKDOWN)
    }

    const handleDownloadPDF = async () => {
        if (!htmlContent.trim()) {
            toast.error('Please add some markdown content first!')
            return
        }

        try {
            const pdfGenerator = new EnhancedPDFGenerator(theme)
            await pdfGenerator.generatePDF(htmlContent, 'markdown-document')
        } catch (error) {
            console.error('PDF generation error:', error)
        }
    }

    const handleDownloadPNG = async () => {
        if (!htmlContent.trim()) {
            toast.error('Please add some markdown content first!')
            return
        }

        try {
            const pdfGenerator = new EnhancedPDFGenerator(theme)
            await pdfGenerator.generateScreenshot(htmlContent, 'png')
        } catch (error) {
            console.error('PNG generation error:', error)
        }
    }

    const handleDownloadJPEG = async () => {
        if (!htmlContent.trim()) {
            toast.error('Please add some markdown content first!')
            return
        }

        try {
            const pdfGenerator = new EnhancedPDFGenerator(theme)
            await pdfGenerator.generateScreenshot(htmlContent, 'jpeg')
        } catch (error) {
            console.error('JPEG generation error:', error)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-[var(--bg-primary)]">
            <Header
                onDownloadPDF={handleDownloadPDF}
                onDownloadPNG={handleDownloadPNG}
                onDownloadJPEG={handleDownloadJPEG}
                wordCount={wordCount}
            />

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
                <div className="flex-1 md:max-w-[50%] flex flex-col min-h-0">
                    <InputSection
                        markdown={markdown}
                        onChange={handleMarkdownChange}
                        onClear={handleClear}
                        onLoadSample={handleLoadSample}
                    />
                </div>

                <div className="flex-1 md:max-w-[50%] flex flex-col min-h-0">
                    <PreviewSection
                        htmlContent={htmlContent}
                        ref={previewRef}
                    />
                </div>
            </div>
        </div>
    )
} 