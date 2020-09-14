import list from './list'
const Example = () =>
    import ('./Example.vue')

export default [{
        path: '',
        redirect: list[0].key,
        name: list[0].key,
        // meta: { title: 'list[0].key' } 
    },
    {
        path: ':key',
        component: Example,
        // meta: { title: 'list[0].key' }
    }
]