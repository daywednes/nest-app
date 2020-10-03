import ContextMenuPlugin from 'rete-context-menu-plugin'
import DockPlugin from 'rete-dock-plugin'
import VueRenderPlugin from 'rete-vue-render-plugin'
import Components from '@/views/retes/rete/components/customdevice';
import { DockComponent } from '@/views/retes/rete/components/dock-component'
import { initialize as init } from '@/views/retes/rete'
import MinimapPlugin from 'rete-minimap-plugin'

import './styles.sass'


import { getDevices} from '@/api/device';
import store from '@/store'

export default async function(container, extra) {
    const { editor, engine, resize, process } = await init(container)

    editor.clear();
    extra.classList.add('dock-menu')

    editor.use(ContextMenuPlugin, {
        searchBar: true,
        delay: 100,
        allocate(component) {
            return ['Device'];
        },
        rename(component) {
            return component.name;
        }
    });
    editor.use(MinimapPlugin);
    editor.use(DockPlugin, {
        container: extra,
        plugins: [VueRenderPlugin]
    });
    resize()
    process()

    return { editor, engine }
}