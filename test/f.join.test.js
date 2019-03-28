import {join} from '../esm/'

test('Array joined into string', () => {
    expect(join(' ', ['z', 'y', 'x'])).toBe('z y x')
})

test('Array joined with empty string just concats all elements', () => {
    expect(join('', ['z', 'y', 'x'])).toBe('zyx')
})
