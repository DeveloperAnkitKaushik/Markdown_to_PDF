'use client'

import toast from 'react-hot-toast'

export class EnhancedPDFGenerator {
    private theme: 'light' | 'dark'

    constructor(theme: 'light' | 'dark') {
        this.theme = theme
    }

    async generatePDF(htmlContent: string, filename: string): Promise<void> {
        try {
            toast.loading('Generating high-quality PDF...', { id: 'pdf-generation' })

            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    htmlContent,
                    theme: this.theme
                })
            })

            if (!response.ok) {
                throw new Error(`PDF generation failed: ${response.statusText}`)
            }

            // Get the PDF blob
            const pdfBlob = await response.blob()

            // Create download link
            const url = window.URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = url

            // Generate filename with timestamp
            const timestamp = new Date().toISOString().split('T')[0]
            link.download = `${filename}-${timestamp}.pdf`

            // Trigger download
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Clean up
            window.URL.revokeObjectURL(url)

            toast.success('PDF generated successfully!', { id: 'pdf-generation' })

        } catch (error) {
            console.error('Enhanced PDF generation failed:', error)
            toast.error('Failed to generate PDF. Please try again.', { id: 'pdf-generation' })
            throw error
        }
    }

    // Alternative method for screenshot-like capture
    async generateScreenshot(htmlContent: string, format: 'png' | 'jpeg' = 'png'): Promise<void> {
        try {
            toast.loading(`Generating ${format.toUpperCase()} screenshot...`, { id: 'screenshot-generation' })

            // This would be another API endpoint for screenshots
            const response = await fetch('/api/generate-screenshot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    htmlContent,
                    theme: this.theme,
                    format
                })
            })

            if (!response.ok) {
                throw new Error(`Screenshot generation failed: ${response.statusText}`)
            }

            const imageBlob = await response.blob()

            // Create download link
            const url = window.URL.createObjectURL(imageBlob)
            const link = document.createElement('a')
            link.href = url

            const timestamp = new Date().toISOString().split('T')[0]
            link.download = `markdown-screenshot-${timestamp}.${format}`

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            window.URL.revokeObjectURL(url)

            toast.success(`${format.toUpperCase()} generated successfully!`, { id: 'screenshot-generation' })

        } catch (error) {
            console.error('Screenshot generation failed:', error)
            toast.error(`Failed to generate ${format.toUpperCase()}. Please try again.`, { id: 'screenshot-generation' })
            throw error
        }
    }
} 