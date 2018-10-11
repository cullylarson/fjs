import {replaceAll} from '../esm/'

test('String replace works', () => {
    expect(replaceAll('a', 'A', 'aabbccaabb')).toBe('AAbbccAAbb')
    expect(replaceAll('get', 'GET', 'forget')).toBe('forGET')
    expect(replaceAll('get', 'GET', 'forget to get the stuff')).toBe('forGET to GET the stuff')
})
