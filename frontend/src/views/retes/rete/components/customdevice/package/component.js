import { Component, Input, Output } from 'rete';
import Socket from '../../../sockets';
import devicecomponent from './DeviceComponent.vue';
import 'style-loader!./style.sass';

export class DeviceComponent extends Component {

    constructor(item) {
        super(item.name);
        this.data.component = devicecomponent;
    }

    builder(node) {
        var out = new Output('pkg', "Device", Socket.package);
        var inp = new Input('pkg', "Device", Socket.package, true);

        return node.addInput(inp).addOutput(out);
    }

    worker() {}
}