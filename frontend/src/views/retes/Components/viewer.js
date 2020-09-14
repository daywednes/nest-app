import ContextMenuPlugin from 'rete-context-menu-plugin'
import ConnectionReroutePlugin from 'rete-connection-reroute-plugin'
import Components from '@/views/retes/rete/components/ecosystem'
import { initialize as init } from '@/views/retes/rete'
import { calculateGraph } from './graph'

export default async function(container) {
  const { editor, engine, resize, process } = await init(container)

  editor.use(ContextMenuPlugin)
  editor.use(ConnectionReroutePlugin);

  [
    new Components.PackageComponent()
  ].map(c => {
    editor.register(c)
    engine.register(c)
  })

  await editor.fromJSON(await calculateGraph())

  window.editor = editor

  resize()
  process()
}
