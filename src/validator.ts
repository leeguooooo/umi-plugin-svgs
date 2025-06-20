/**
 * Validate SVG content
 */
export function validateSVGContent(content: string, filename: string): void {
  if (!content || typeof content !== 'string') {
    throw new Error(`Invalid SVG file: ${filename} - File is empty or not a string`);
  }

  if (!content.includes('<svg')) {
    throw new Error(`Invalid SVG file: ${filename} - No <svg> element found`);
  }

  if (!content.includes('</svg>')) {
    throw new Error(`Invalid SVG file: ${filename} - SVG element is not properly closed`);
  }

  // Check for common issues
  if (content.includes('<script')) {
    throw new Error(`Security warning: ${filename} contains <script> tags which are not allowed`);
  }
}

/**
 * Sanitize SVG content by removing potentially dangerous elements
 */
export function sanitizeSVGContent(content: string): string {
  // Remove script tags
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  content = content.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove javascript: URLs
  content = content.replace(/javascript:/gi, '');
  
  return content;
}