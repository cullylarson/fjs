import {set} from '../esm/'

test('Sets object using string key', () => {
    expect(
        set('id', 10, {
            id: 20,
            name: 'Fred',
        })
    ).toEqual({
        id: 10,
        name: 'Fred',
    })
})

test('Sets object using array key', () => {
    expect(
        set(['post', 'id'], 10, {
            id: 20,
            name: 'Fred',
            post: {
                id: 30,
                title: 'Something Great',
            },
        })
    ).toEqual({
        id: 20,
        name: 'Fred',
        post: {
            id: 10,
            title: 'Something Great',
        },
    })
})

test('Sets array using int key', () => {
    expect(
        set(2, 10, [1, 5, 6, 20])
    ).toEqual([1, 5, 10, 20])
})

test('Sets array using array key', () => {
    expect(
        set([2, 1], 10, [1, 5, [7, 9, 13], 20])
    ).toEqual([1, 5, [7, 10, 13], 20])
})

test('Sets mixed object/array using array key', () => {
    expect(
        set(['user', 'posts', 2, 'id'], 10, {
            user: {
                id: 20,
                name: 'Fred',
                posts: [
                    {
                        id: 30,
                        title: 'Something Great',
                    },
                    {
                        id: 13,
                        title: 'Something Useful',
                    },
                    {
                        id: 3,
                        title: 'Something Boring',
                    },
                ],
            },
        })
    ).toEqual({
        user: {
            id: 20,
            name: 'Fred',
            posts: [
                {
                    id: 30,
                    title: 'Something Great',
                },
                {
                    id: 13,
                    title: 'Something Useful',
                },
                {
                    id: 10,
                    title: 'Something Boring',
                },
            ],
        },
    })
})
