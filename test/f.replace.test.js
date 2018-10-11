import {replace} from '../esm/'

test('String replace works', () => {
    expect(replace('a', 'A', 'aabbccaabb')).toBe('Aabbccaabb')
})

test('Regex replace works', () => {
    expect(replace(/a$/, 'A', 'aabbccaabba')).toBe('aabbccaabbA')
    expect(replace(/a/g, 'A', 'aabbccaabb')).toBe('AAbbccAAbb')
})
