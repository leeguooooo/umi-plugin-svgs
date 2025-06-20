import { convertStringToCamelCase } from '../utils';

describe('convertStringToCamelCase', () => {
  it('should convert hyphenated names to camelCase', () => {
    expect(convertStringToCamelCase('test-icon')).toBe('testIcon');
    expect(convertStringToCamelCase('my-test-icon')).toBe('myTestIcon');
  });

  it('should convert underscored names to camelCase', () => {
    expect(convertStringToCamelCase('test_icon')).toBe('testIcon');
    expect(convertStringToCamelCase('my_test_icon')).toBe('myTestIcon');
  });

  it('should convert mixed separators to camelCase', () => {
    expect(convertStringToCamelCase('test-icon_name')).toBe('testIconName');
    expect(convertStringToCamelCase('my_test-icon')).toBe('myTestIcon');
  });

  it('should handle spaces', () => {
    expect(convertStringToCamelCase('test icon')).toBe('testIcon');
    expect(convertStringToCamelCase('my test icon')).toBe('myTestIcon');
  });

  it('should handle already camelCase strings', () => {
    expect(convertStringToCamelCase('testIcon')).toBe('testIcon');
    expect(convertStringToCamelCase('myTestIcon')).toBe('myTestIcon');
  });

  it('should handle single word', () => {
    expect(convertStringToCamelCase('icon')).toBe('icon');
    expect(convertStringToCamelCase('ICON')).toBe('iCON');
  });

  it('should handle empty string', () => {
    expect(convertStringToCamelCase('')).toBe('');
  });
});