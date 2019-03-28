import {split} from '../esm/'

test('String is split into an array', () => {
    expect(split(' ', 'z y x')).toEqual(['z', 'y', 'x'])
})

test('Splitting string with separator that doesn\'t exist just returns one element array', () => {
    expect(split(' ', 'zyx')).toEqual(['zyx'])
})

test('Splitting with empty string just returns all characters as array elements', () => {
    expect(split('', 'z y x')).toEqual(['z', ' ', 'y', ' ', 'x'])
})
