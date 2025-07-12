# 📄 Markdown to PDF Converter

A modern, feature-rich web application built with Next.js that converts Markdown to PDF with GitHub-style formatting and dark mode support.

## ✨ Features

- **🎨 GitHub-Style Formatting**: Exact replica of GitHub's markdown rendering
- **🌙 Dark/Light Theme**: Toggle between themes with PDF generation matching the selected theme
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Real-time Preview**: See your markdown rendered as you type
- **📥 High-Quality PDF Export**: Generate PDFs that match the preview exactly
- **💾 Auto-save**: Automatically saves your work to local storage
- **🔤 Syntax Highlighting**: Code blocks with proper syntax highlighting
- **📊 Word Count**: Live word counting
- **🎯 Sample Content**: Pre-loaded examples to get started quickly

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd markdown-to-pdf-converter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom GitHub-style themes
- **Markdown Processing**: Marked.js with GitHub Flavored Markdown
- **Syntax Highlighting**: Highlight.js
- **PDF Generation**: Puppeteer (server-side)
- **Screenshot Generation**: Puppeteer (PNG/JPEG)
- **State Management**: React hooks
- **Notifications**: React Hot Toast
- **TypeScript**: Full type safety

## 📖 Usage

### Basic Usage

1. **Write Markdown**: Type or paste your markdown content in the left panel
2. **Live Preview**: See the rendered output in the right panel
3. **Toggle Theme**: Use the theme button to switch between light and dark modes
4. **Download PDF**: Click the download button to generate a PDF

### Keyboard Shortcuts

- `Ctrl/Cmd + S`: Auto-save content
- `Ctrl/Cmd + P`: Generate PDF
- `Ctrl/Cmd + D`: Toggle dark/light theme

### Supported Markdown Features

- **Headers**: H1-H6 with proper styling
- **Text Formatting**: Bold, italic, strikethrough
- **Code Blocks**: Syntax-highlighted code with 100+ languages
- **Tables**: GitHub-style tables with proper borders
- **Lists**: Ordered and unordered lists with nesting
- **Links**: Clickable links with hover effects
- **Blockquotes**: Styled quote blocks
- **Horizontal Rules**: Section dividers
- **Images**: Responsive image handling

## 🎨 Theme System

The application features a sophisticated theme system that:

- **Matches GitHub's Design**: Exact color schemes and typography
- **Smooth Transitions**: Animated theme switching
- **PDF Consistency**: Generated PDFs match the selected theme
- **System Preference**: Automatically detects system theme preference
- **Persistent Storage**: Remembers your theme choice

## 📄 PDF Generation

The PDF generation system is designed to:

- **Preserve Exact Styling**: PDFs look identical to the preview
- **Theme-Aware**: Dark theme generates dark PDFs, light theme generates light PDFs
- **High Quality**: 2x scaling for crisp text and images
- **Proper Pagination**: Automatic page breaks for long documents
- **Optimized File Size**: Efficient compression without quality loss

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for any environment-specific configurations:

```env
# Add any environment variables here
NEXT_PUBLIC_APP_NAME=Markdown to PDF Converter
```

### Customization

The application is highly customizable:

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Update font families in the global CSS
- **PDF Settings**: Adjust PDF generation parameters in `PDFGenerator.tsx`
- **Markdown Options**: Configure marked.js options in `MarkdownEditor.tsx`

## 📱 Responsive Design

The application is fully responsive with:

- **Desktop**: Side-by-side editor and preview
- **Tablet**: Stacked layout with full-width sections
- **Mobile**: Optimized touch interface with collapsible sections

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub**: For the amazing markdown styling inspiration
- **Next.js Team**: For the incredible framework
- **Marked.js**: For excellent markdown parsing
- **Highlight.js**: For syntax highlighting
- **Tailwind CSS**: For the utility-first CSS framework

## 🐛 Known Issues

- PDF generation may take a few seconds for very large documents
- Some complex CSS animations may not render in PDFs
- Mobile PDF generation requires sufficient memory

## 🔮 Future Enhancements

- [ ] Real-time collaboration
- [ ] Cloud storage integration
- [ ] Custom themes
- [ ] Export to other formats (Word, HTML)
- [ ] Plugin system for custom markdown extensions
- [ ] Advanced PDF customization options

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ using Next.js and modern web technologies**
