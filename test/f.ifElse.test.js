import {ifElse} from '../esm/'

test('Executes if', () => {
    const result = ifElse(
        x => x === 'if',
        x => 'if ' + x.toUpperCase(),
        x => 'ELSE',
        'if'
    )

    expect(result).toBe('if IF')
})

test('Executes else', () => {
    const result = ifElse(
        x => x === 'if',
        x => 'IF',
        x => 'else ' + x.toUpperCase(),
        'else'
    )

    expect(result).toBe('else ELSE')
})
