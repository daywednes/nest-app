import basic from './basic'
import readonly from './readonly'
import area from './area'
import module from './module'
import task from './task'
import customization from './customization'
import reroute from './reroute'
import dock from './dock'
import minimap from './minimap'

export default [{
        key: 'Zone1 Name1',
        init: basic,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin',
            'rete-context-menu-plugin'
        ]
    },
    {
        key: 'Zone2 Name2',
        init: readonly,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin',
            'rete-readonly-plugin'
        ]
    },
    {
        key: 'Zone3',
        init: area,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin',
            'rete-area-plugin'
        ]
    },
    {
        key: 'Zone4',
        init: module,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin',
            'rete-module-plugin'
        ]
    },
    {
        key: 'Zone5',
        init: task,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin',
            'rete-task-plugin'
        ]
    },
    {
        key: 'Zone6',
        init: customization,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin'
        ]
    },
    {
        key: 'Zone7',
        init: reroute,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin',
            'rete-connection-reroute-plugin'
        ]
    },
    {
        key: 'Zone8',
        init: dock,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin',
            'rete-dock-plugin'
        ]
    },
    {
        key: 'Zone9',
        init: minimap,
        packages: [
            'rete',
            'rete-connection-plugin',
            'rete-vue-render-plugin',
            'rete-minimap-plugin'
        ]
    }
]