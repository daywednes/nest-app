/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const retesRouter = {
  path: '/retes',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Retes',
  meta: {
    title: 'Retes',
    icon: 'chart'
  },
  children: [{
    path: 'reteDock',
    component: () =>
      import ('@/views/retes/Examples/'),
    name: 'ReteDock',
    meta: { title: 'Rete Dock', noCache: true }
  }]
}

export default retesRouter
