import ContextMenuPlugin from 'rete-context-menu-plugin'
import DockPlugin from 'rete-dock-plugin'
import VueRenderPlugin from 'rete-vue-render-plugin'
import { NumComponent } from '@/views/retes/rete/components/num-component'
import { AddComponent } from '@/views/retes/rete/components/add-component'
import { DockComponent } from '@/views/retes/rete/components/dock-component'
import { initialize as init } from '@/views/retes/rete'
import data from '@/views/retes/rete/data/customdata.json'
import MinimapPlugin from 'rete-minimap-plugin'
import './styles.sass'


import { getDevices, createDevice, deleteDevice } from '@/api/device';
import store from '@/store'

export default async function(container, extra) {
    const { editor, engine, resize, process } = await init(container)

    extra.classList.add('dock-menu')

    editor.use(ContextMenuPlugin);
    editor.use(MinimapPlugin);
    editor.use(DockPlugin, {
        container: extra,
        plugins: [VueRenderPlugin]
    });

    // [
    //     new NumComponent(),
    //     new AddComponent(),
    //     new DockComponent(null, 'Test Device'),
    // ].map(c => {
    //     editor.register(c)
    //     engine.register(c)
    // })

    await getDevices(store.getters.orgId).then(response => {

        console.log(response)
        response
        // .filter(x => x.zone == null)
            .map(item => {
            console.log(item.name)
                // return { value: item.id, label: item.name };
            let tmpCom = new DockComponent(null, item.name);

            editor.register(tmpCom)
            engine.register(tmpCom)
        });
    });

    await editor.fromJSON(data)

    resize()
    process()

    return { editor, engine }
}