'use client'

import React from 'react'
import { Trash2, FileText, RefreshCw } from 'lucide-react'

interface InputSectionProps {
    markdown: string
    onChange: (value: string) => void
    onClear: () => void
    onLoadSample: () => void
}

export function InputSection({ markdown, onChange, onClear, onLoadSample }: InputSectionProps) {
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Handle tab key for proper indentation
        if (e.key === 'Tab') {
            e.preventDefault()
            const textarea = e.target as HTMLTextAreaElement
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const value = textarea.value
            const newValue = value.substring(0, start) + '  ' + value.substring(end)
            onChange(newValue)

            // Set cursor position after the inserted spaces
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 2
            }, 0)
        }
    }

    return (
        <div className="flex flex-col h-full border-r md:border-r border-[var(--border-primary)] border-b md:border-b-0 min-h-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] gap-2 flex-shrink-0">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span> Markdown Input</span>
                </h2>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <button
                        onClick={onLoadSample}
                        className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden sm:inline">Load Sample</span>
                        <span className="sm:hidden">Sample</span>
                    </button>

                    <button
                        onClick={onClear}
                        className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors text-red-600 hover:text-red-700"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Clear</span>
                    </button>
                </div>
            </div>

            <textarea
                value={markdown}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                className="flex-1 p-6 bg-[var(--bg-primary)] text-[var(--text-primary)] border-none outline-none resize-none font-mono text-sm leading-relaxed placeholder-[var(--text-muted)] min-h-0"
                placeholder="Type your Markdown here...

# Sample Markdown

## Introduction
This is a **sample** markdown document with various formatting options.

### Code Example
```javascript
function hello() {
    console.log('Hello, World!');
}
```

### List Example
- Item 1
- Item 2
  - Nested item
  - Another nested item

### Table Example
| Name | Age | City |
|------|-----|------|
| John | 25  | NYC  |
| Jane | 30  | LA   |

> This is a blockquote with some important information.

For more information, visit [GitHub](https://github.com)."
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                data-gramm="false"
            />
        </div>
    )
} 