import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Markdown to PDF Converter by Ankit Kaushik',
    description: 'Convert Markdown to PDF with perfect GitHub styling, dark mode, and responsive design. Created by Ankit Kaushik. Free online tool for markdown to pdf conversion.',
    keywords: [
        'markdown', 'pdf', 'converter', 'github', 'dark mode',
        'ankit kaushik', 'markdown-to-pdfs.vercel.app', 'ankit kaushik md to pdf',
        'markdown to pdf', 'md to pdf', 'github markdown pdf', 'markdown pdf export',
        'free markdown to pdf', 'online markdown converter', 'markdown editor pdf'
    ],
    authors: [
        { name: 'Ankit Kaushik', url: 'https://kaushikankit.vercel.app' }
    ],
    viewport: 'width=device-width, initial-scale=1',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'IhleRkwS3CAPHzFgSf0ySPwCj7IYM1DdenB4JQzDb28',
    },
    openGraph: {
        title: 'Markdown to PDF Converter by Ankit Kaushik',
        description: 'Convert Markdown to PDF with perfect GitHub styling, dark mode, and responsive design. Created by Ankit Kaushik.',
        url: 'https://markdown-to-pdfs.vercel.app',
        siteName: 'Markdown to PDF Converter',
        images: [
            {
                url: 'https://markdown-to-pdfs.vercel.app/og-image.webp',
                width: 1200,
                height: 630,
                alt: 'Markdown to PDF Converter by Ankit Kaushik',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Markdown to PDF Converter by Ankit Kaushik',
        description: 'Convert Markdown to PDF with perfect GitHub styling, dark mode, and responsive design. Created by Ankit Kaushik.',
        site: '@kaushikankit',
        creator: '@kaushikankit',
        images: ['https://markdown-to-pdfs.vercel.app/og-image.webp'],
    },
    metadataBase: new URL('https://markdown-to-pdfs.vercel.app'),
    alternates: {
        canonical: 'https://markdown-to-pdfs.vercel.app',
    },
    icons: {
        icon: '/favicon.webp',
        shortcut: '/favicon.webp',
        apple: '/favicon.webp',
    },
    manifest: '/manifest.json',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    {/* SEO: JSON-LD structured data for WebApplication */}
                    <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebApplication',
                            'name': 'Markdown to PDF Converter by Ankit Kaushik',
                            'url': 'https://markdown-to-pdfs.vercel.app',
                            'author': {
                                '@type': 'Person',
                                'name': 'Ankit Kaushik',
                                'url': 'https://kaushikankit.vercel.app'
                            },
                            'description': 'Convert Markdown to PDF with perfect GitHub styling, dark mode, and responsive design. Created by Ankit Kaushik.',
                            'applicationCategory': 'Productivity',
                            'operatingSystem': 'All',
                            'offers': {
                                '@type': 'Offer',
                                'price': '0',
                                'priceCurrency': 'USD'
                            },
                            'aggregateRating': {
                                '@type': 'AggregateRating',
                                'ratingValue': '4.8',
                                'ratingCount': '150'
                            },
                            'featureList': [
                                'GitHub-style markdown rendering',
                                'Dark and light theme support',
                                'Real-time preview',
                                'High-quality PDF export',
                                'Responsive design',
                                'Syntax highlighting',
                                'Auto-save functionality'
                            ]
                        })
                    }} />
                    {children}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: 'var(--toast-bg)',
                                color: 'var(--toast-text)',
                                border: '1px solid var(--toast-border)',
                            },
                        }}
                    />
                </ThemeProvider>
            </body>
        </html>
    )
} 