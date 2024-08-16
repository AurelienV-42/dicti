import { readableDate, onlyHours } from '../../src/utils/dates';

describe('dates utility functions', () => {
  describe('readableDate', () => {
    it('formats the date correctly in French', () => {
      const testDate = new Date(2023, 5, 15); // June 15, 2023
      expect(readableDate(testDate)).toBe('15 juin 2023');
    });

    it('handles different months correctly', () => {
      const testDate = new Date(2023, 0, 1); // January 1, 2023
      expect(readableDate(testDate)).toBe('01 janvier 2023');
    });
  });

  describe('onlyHours', () => {
    it('formats the time correctly', () => {
      const testDate = new Date(2023, 5, 15, 14, 30); // June 15, 2023, 14:30
      expect(onlyHours(testDate)).toBe('14:30');
    });

    it('pads single-digit hours and minutes with zeros', () => {
      const testDate = new Date(2023, 5, 15, 9, 5); // June 15, 2023, 09:05
      expect(onlyHours(testDate)).toBe('09:05');
    });
  });
});