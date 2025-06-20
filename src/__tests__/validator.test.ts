import { validateSVGContent, sanitizeSVGContent } from '../validator';

describe('validateSVGContent', () => {
  it('should pass valid SVG content', () => {
    const validSVG = '<svg><circle cx="12" cy="12" r="10"/></svg>';
    expect(() => validateSVGContent(validSVG, 'test.svg')).not.toThrow();
  });

  it('should throw error for empty content', () => {
    expect(() => validateSVGContent('', 'test.svg')).toThrow('File is empty');
  });

  it('should throw error for non-string content', () => {
    expect(() => validateSVGContent(null as any, 'test.svg')).toThrow('File is empty or not a string');
  });

  it('should throw error for missing svg element', () => {
    expect(() => validateSVGContent('<div>Not SVG</div>', 'test.svg')).toThrow('No <svg> element found');
  });

  it('should throw error for unclosed svg element', () => {
    expect(() => validateSVGContent('<svg><circle/>', 'test.svg')).toThrow('SVG element is not properly closed');
  });

  it('should throw error for script tags', () => {
    const svgWithScript = '<svg><script>alert("XSS")</script></svg>';
    expect(() => validateSVGContent(svgWithScript, 'test.svg')).toThrow('contains <script> tags');
  });
});

describe('sanitizeSVGContent', () => {
  it('should remove script tags', () => {
    const svg = '<svg><script>alert("XSS")</script><circle/></svg>';
    const sanitized = sanitizeSVGContent(svg);
    expect(sanitized).not.toContain('<script');
    expect(sanitized).toContain('<circle/>');
  });

  it('should remove event handlers', () => {
    const svg = '<svg onclick="alert(1)" onmouseover="alert(2)"><circle/></svg>';
    const sanitized = sanitizeSVGContent(svg);
    expect(sanitized).not.toContain('onclick');
    expect(sanitized).not.toContain('onmouseover');
  });

  it('should remove javascript: URLs', () => {
    const svg = '<svg><a href="javascript:alert(1)">Link</a></svg>';
    const sanitized = sanitizeSVGContent(svg);
    expect(sanitized).not.toContain('javascript:');
  });

  it('should preserve valid SVG content', () => {
    const svg = '<svg width="24" height="24"><circle cx="12" cy="12" r="10"/></svg>';
    const sanitized = sanitizeSVGContent(svg);
    expect(sanitized).toBe(svg);
  });
});