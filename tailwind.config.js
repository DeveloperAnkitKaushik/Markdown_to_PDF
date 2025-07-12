/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                github: {
                    light: {
                        bg: {
                            primary: '#ffffff',
                            secondary: '#f6f8fa',
                            tertiary: '#f1f3f4',
                        },
                        text: {
                            primary: '#24292f',
                            secondary: '#656d76',
                            muted: '#8b949e',
                        },
                        border: {
                            primary: '#d1d9e0',
                            secondary: '#d8dee4',
                        },
                        accent: {
                            primary: '#0969da',
                            hover: '#0550ae',
                        },
                        code: {
                            bg: '#f6f8fa',
                            border: '#d1d9e0',
                        },
                        blockquote: {
                            bg: '#ddf4ff',
                            border: '#54aeff',
                        },
                        table: {
                            header: '#f6f8fa',
                            border: '#d1d9e0',
                        },
                    },
                    dark: {
                        bg: {
                            primary: '#0d1117',
                            secondary: '#161b22',
                            tertiary: '#21262d',
                        },
                        text: {
                            primary: '#f0f6fc',
                            secondary: '#8b949e',
                            muted: '#6e7681',
                        },
                        border: {
                            primary: '#30363d',
                            secondary: '#21262d',
                        },
                        accent: {
                            primary: '#58a6ff',
                            hover: '#79c0ff',
                        },
                        code: {
                            bg: '#161b22',
                            border: '#30363d',
                        },
                        blockquote: {
                            bg: '#0c2d6b',
                            border: '#1f6feb',
                        },
                        table: {
                            header: '#161b22',
                            border: '#30363d',
                        },
                    },
                },
            },
            fontFamily: {
                system: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans', 'Helvetica', 'Arial', 'sans-serif'],
                mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
            },

        },
    },
    plugins: [],
} 