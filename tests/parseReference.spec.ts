import { describe, expect, test } from 'vitest';

import { parseReference } from '@/Shared/helpers';

describe('Parse Bible references', () => {
  test('Parse John 1', () => {
    expect(parseReference('John 1')).toBe('JHN.1');
  });
  test('Parse John 1:1', () => {
    expect(parseReference('John 1:1')).toBe('JHN.1.1');
  });
  test('Parse John 2:1-7', () => {
    expect(parseReference('John 2:1-7')).toBe('JHN.2.1-JHN.2.7');
  });
  test('Parse John 2:1-7', () => {
    expect(parseReference('John 2:1-7')).toBe('JHN.2.1-JHN.2.7');
  });
  test('Parse Matthew 2:3-7', () => {
    expect(parseReference('Matthew 2:3-7')).toBe('MAT.2.3-MAT.2.7');
  });
  test('Parse Mats 2:3-7', () => {
    expect(parseReference('Mats 2:3-7')).toBe('');
  });
  test('Parse Psalm 1', () => {
    expect(parseReference('Psalm 1')).toBe('PSA.1');
  });
  test('Parse Psalms 1', () => {
    expect(parseReference('Psalms 1')).toBe('');
  });
  test('Parse Proverbs 1:8', () => {
    expect(parseReference('Proverbs 1:8')).toBe('PRO.1.8');
  });
  test('Parse Nahum 3:8', () => {
    expect(parseReference('Nahum 3:8')).toBe('NAM.3.8');
  });
  test('Parse 1 Samuel 3:8', () => {
    expect(parseReference('1 samuel 3:8')).toBe('1SA.3.8');
  });
  test('Parse 1 Samuel 1:4-5', () => {
    expect(parseReference('1 Samuel 1:4-5')).toBe('1SA.1.4-1SA.1.5');
  });
  test('Parse Psalm 1', () => {
    expect(parseReference('Psalm 1')).toBe('PSA.1');
  });
  test('Parse Psalms 1', () => {
    expect(parseReference('Psalms 1')).toBe('');
  });
  test('Parse Proverbs 1:8', () => {
    expect(parseReference('Proverbs 1:8')).toBe('PRO.1.8');
  });
  test('Parse Nahum 3:8', () => {
    expect(parseReference('Nahum 3:8')).toBe('NAM.3.8');
  });
});
