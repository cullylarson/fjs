import {last} from '../esm/'

test('Returns last item in an array.', () => {
    expect(last(['a', 'b', 'c'])).toEqual('c')
})

test('Returns undefined if no items.', () => {
    expect(last([])).toEqual(undefined)
})
