import ContextMenuPlugin from 'rete-context-menu-plugin'
import DockPlugin from 'rete-dock-plugin'
import VueRenderPlugin from 'rete-vue-render-plugin'
import Components from '@/views/retes/rete/components/customdevice';
import { DockComponent } from '@/views/retes/rete/components/dock-component'
import { initialize as init } from '@/views/retes/rete'
import MinimapPlugin from 'rete-minimap-plugin'

import './styles.sass'


import { getDevices, createDevice, deleteDevice } from '@/api/device';
import store from '@/store'

export default async function(container, extra) {
    const { editor, engine, resize, process } = await init(container)

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

    // [
    //     new Components.DeviceComponent()
    // ].map(c => {
    //     editor.register(c);
    //     engine.register(c);
    // });
    
    await getDevices(store.getters.orgId).then(response => {
        response
        // .filter(x => x.zone == null)
            .map(item => {
            let tmpCom = new Components.DeviceComponent(item);

            editor.register(tmpCom)
            engine.register(tmpCom)
        });
    });


    resize()
    process()

    return { editor, engine }
}