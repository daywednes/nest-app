/** When your routing devices is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
    path: '/devices',
    component: Layout,
    redirect: '/devices',
    name: 'Table',
    meta: {
        title: 'Devices',
        icon: 'guide'
    },
    children: [{
        path: '/devices',
        component: () =>
            import ('@/views/devices/index'),
        name: 'Devices',
        meta: { title: 'Devices' }
    }]
}
export default tableRouter