import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
  try {
    const { htmlContent, theme, format = "png" } = await request.json();

    if (!htmlContent) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set viewport for high quality screenshots
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2, // High DPI for crisp screenshots
    });

    // Set the HTML content with proper styling
    const fullHtml = `
        <!DOCTYPE html>
        <html class="${
          theme === "dark" ? "dark" : ""
        }" style="background-color: ${
      theme === "dark" ? "#0d1117" : "#ffffff"
    };">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Markdown Preview Screenshot</title>
            <style>
                :root {
                    /* Light theme variables */
                    --bg-primary: #ffffff;
                    --bg-secondary: #f6f8fa;
                    --text-primary: #24292f;
                    --text-secondary: #656d76;
                    --text-muted: #8b949e;
                    --border-primary: #d1d9e0;
                    --code-bg: #f6f8fa;
                    --code-border: #d1d9e0;
                    --blockquote-bg: #ddf4ff;
                    --blockquote-border: #54aeff;
                    --table-header-bg: #f6f8fa;
                    --table-border: #d1d9e0;
                    --accent-primary: #0969da;
                }

                .dark {
                    /* Dark theme variables */
                    --bg-primary: #0d1117;
                    --bg-secondary: #161b22;
                    --text-primary: #f0f6fc;
                    --text-secondary: #8b949e;
                    --text-muted: #6e7681;
                    --border-primary: #30363d;
                    --code-bg: #161b22;
                    --code-border: #30363d;
                    --blockquote-bg: #0c2d6b;
                    --blockquote-border: #1f6feb;
                    --table-header-bg: #161b22;
                    --table-border: #30363d;
                    --accent-primary: #58a6ff;
                }

                html.dark {
                    background-color: #0d1117 !important;
                }

                .dark body {
                    background-color: #0d1117 !important;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                html, body {
                    background-color: var(--bg-primary) !important;
                    width: 100% !important;
                    height: 100% !important;
                }

                html.dark, html.dark body {
                    background-color: #0d1117 !important;
                }

                body {
                    background-color: var(--bg-primary) !important;
                    color: var(--text-primary);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
                    line-height: 1.6;
                    padding: 30px;
                    margin: 0;
                    min-height: 100vh;
                    width: 100%;
                }

                .markdown-body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: var(--text-primary);
                    background-color: transparent;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
                    margin-top: 2rem;
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                    line-height: 1.25;
                    color: var(--text-primary);
                }

                .markdown-body h1 {
                    font-size: 2.25rem;
                    border-bottom: 1px solid var(--border-primary);
                    padding-bottom: 0.75rem;
                    margin-bottom: 2rem;
                }

                .markdown-body h2 {
                    font-size: 1.75rem;
                    border-bottom: 1px solid var(--border-primary);
                    padding-bottom: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .markdown-body h3 { font-size: 1.375rem; }
                .markdown-body h4 { font-size: 1.125rem; }
                .markdown-body h5 { font-size: 1rem; }
                .markdown-body h6 { font-size: 0.875rem; color: var(--text-secondary); }

                .markdown-body p {
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                }

                .markdown-body a {
                    color: var(--accent-primary);
                    text-decoration: none;
                }

                .markdown-body a:hover {
                    text-decoration: underline;
                }

                .markdown-body ul, .markdown-body ol {
                    margin-bottom: 1rem;
                    padding-left: 2rem;
                    list-style: revert;
                }

                .markdown-body ul {
                    list-style-type: disc;
                }

                .markdown-body ol {
                    list-style-type: decimal;
                }

                .markdown-body li {
                    margin-bottom: 0.25rem;
                    display: list-item;
                    list-style-position: outside;
                    line-height: 1.6;
                }

                .markdown-body ul li {
                    list-style-type: disc;
                }

                .markdown-body ol li {
                    list-style-type: decimal;
                }

                .markdown-body ul ul li {
                    list-style-type: circle;
                }

                .markdown-body ul ul ul li {
                    list-style-type: square;
                }

                .markdown-body pre {
                    background-color: var(--code-bg);
                    border: 1px solid var(--code-border);
                    border-radius: 6px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    overflow-x: auto;
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                    font-size: 0.875rem;
                    line-height: 1.45;
                }

                .markdown-body code {
                    background-color: var(--code-bg);
                    border: 1px solid var(--code-border);
                    border-radius: 3px;
                    padding: 0.2em 0.4em;
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                    font-size: 0.875em;
                }

                .markdown-body pre code {
                    background-color: transparent;
                    border: none;
                    padding: 0;
                    font-size: inherit;
                }

                .markdown-body table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 1rem;
                    border: 1px solid var(--table-border);
                    border-radius: 6px;
                    overflow: hidden;
                }

                .markdown-body th, .markdown-body td {
                    border: 1px solid var(--table-border);
                    padding: 0.75rem;
                    text-align: left;
                }

                .markdown-body th {
                    background-color: var(--table-header-bg);
                    font-weight: 600;
                }

                .markdown-body tr:nth-child(even) {
                    background-color: var(--bg-secondary);
                }

                .markdown-body blockquote {
                    background-color: var(--blockquote-bg);
                    border-left: 4px solid var(--blockquote-border);
                    margin: 1rem 0;
                    padding: 1rem;
                    border-radius: 0 6px 6px 0;
                }

                .markdown-body hr {
                    border: none;
                    height: 1px;
                    background-color: var(--border-primary);
                    margin: 2rem 0;
                }

                .markdown-body img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 6px;
                }
            </style>
        </head>
        <body>
            <div class="markdown-body">
                ${htmlContent}
            </div>
        </body>
        </html>
        `;

    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

    // Take full page screenshot
    const screenshot = await page.screenshot({
      type: format as "png" | "jpeg",
      fullPage: true,
      quality: format === "jpeg" ? 95 : undefined, // High quality for JPEG
    });

    await browser.close();

    // Return the screenshot
    const mimeType = format === "png" ? "image/png" : "image/jpeg";

    return new NextResponse(Buffer.from(screenshot), {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="markdown-screenshot-${
          new Date().toISOString().split("T")[0]
        }.${format}"`,
      },
    });
  } catch (error) {
    console.error("Screenshot generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate screenshot" },
      { status: 500 }
    );
  }
}
