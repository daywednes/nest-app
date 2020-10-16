<template lang="pug">
.example
  //- Info(:item="example")
  CommonFunction(
    style='position: absolute;',
    :isShowDeploy='true',
    @functionDeploy='fn_deploy'
  )

  //- .components 
  //-   .viewer(ref="viewer")
  .view(ref="viewer")
    div(style='margin-top: 20px;', ref='view')
    div(ref='extra')
    
  el-input.inline-input(
    placeholder='search...',
    autofocus,
    style='position: absolute; width: 200px; left: 2%',
    prefix-icon='el-icon-search',
    v-model='searchText'
  )
  el-select( slot="prepend",
    style='position: absolute; width: 200px; left: 2%; top:7%',
    v-model='filterText')
    el-option(value='ALL') ALL
    el-option(value='Devices') Devices
    el-option(value='Zones') Zones
</template>

<script>
import Vue from 'vue';
import CommonFunction from '@/components/CommonFunction';
import { getDevices } from '@/api/device';
import { getZones } from '@/api/zone';
import store from '@/store';
import Components from '@/views/retes/rete/components/customdevice';

import initViewer from './Examples/list/customdock';

export default {
  watch: {
    searchText(val) {
      this.searchDevice(val);
    },
    filterText(val) {
      this.searchDevice(this.searchText);
    },
    async devicesList(vals) {
      this.devicesListTmp.map(item => {
        let itemName = item.name.toLowerCase().replace(/\s/g, '-');
        let className = 'node ' + itemName.replace(/\s/g, '-');

        var x = document.getElementsByClassName(className);
        if (vals.includes(item)) {
          x[x.length - 1].style.contentVisibility = 'visible';
        } else {
          x[x.length - 1].style.contentVisibility = 'hidden';
        }
      });
    },
  },
  methods: {
    async init() {
      this.$refs.view.innerHTML = '';
      this.$refs.extra.innerHTML = '';

      if (this.editor) {
        await this.editor.destroy();
      }
      if (this.engine) {
        await this.engine.destroy();
        await this.engine.abort();
      }

      const { editor, engine } = await initViewer(
        this.$refs.view,
        this.$refs.extra,
      );

      this.editor = editor;
      this.engine = engine;
      if (this.devicesListTmp.length < 1) {
        await getDevices(store.getters.orgId).then(response => {
          this.$store.dispatch('user/updateDevices', response);
          response
            // .filter(x => x.zone == null)
            .map(item => {
              item.type = 'Devices';
              item.color = null;
              let tmpCom = new Components.DeviceComponent(item);

              editor.register(tmpCom);
              engine.register(tmpCom);
            });

          this.devicesListTmp = response;
        });

        await getDevices(store.getters.orgId).then(response => {
          this.$store.dispatch('user/updateDevices', response);
          response
            // .filter(x => x.zone == null)
            .map(item => {
              item.name = item.name + ' Zones';
              item.type = 'Zones';
              item.color = '1';
              let tmpCom = new Components.DeviceComponent(item);

              editor.register(tmpCom);
              engine.register(tmpCom);
            });

          this.devicesListTmp = [...this.devicesListTmp, ...response];
        });
      }
    },
    fn_deploy() {
      const modes = [
        [
          {
            from_device_id: '1',
            to_device_id: '2',
            interval: 1,
            rpc: {
              name: 'procedure1',
              parameters: ['faster'],
            },
          },
        ],
        [
          {
            from_device_id: '1',
            to_device_id: '2',
            interval: 2,
            rpc: {
              name: 'procedure1',
              parameters: ['normal'],
            },
          },
        ],
        [
          {
            from_device_id: '1',
            to_device_id: '2',
            interval: 3,
            rpc: {
              name: 'procedure1',
              parameters: ['slower'],
            },
          },
        ],
      ];

      Vue.$wamp.publish('com.myapp.hello', [
        JSON.stringify(modes[this.counter % 3]),
      ]);
      this.counter = this.counter + 1;

      //let msg = 'Hello World from Nest App ' + this.counter;
      //Vue.$wamp.publish('com.myapp.hello', [msg]);
      //this.counter = this.counter + 1;
    },
    searchDevice(txt) {
      if (this.filterText != 'ALL') {
        this.devicesList = this.devicesListTmp.filter(
          device =>
            (this.filterText == 'ALL' || device.type == this.filterText) &&
            (device.name
              .trim()
              .toUpperCase()
              .includes(txt.toUpperCase()) ||
              (device.zone
                ? device.zone.name
                    .trim()
                    .toUpperCase()
                    .includes(txt.toUpperCase())
                : false) ||
              // device.description.toUpperCase().includes(txt.toUpperCase()) ||
              device.tags
                .map(tag => tag.trim().toUpperCase())
                .includes(txt.toUpperCase())),
        );
      } else if (txt && txt.length > 0) {
        this.devicesList = this.devicesListTmp.filter(
          device =>
            (device.name
              .trim()
              .toUpperCase()
              .includes(txt.toUpperCase()) ||
              (device.zone
                ? device.zone.name
                    .trim()
                    .toUpperCase()
                    .includes(txt.toUpperCase())
                : false) ||
              // device.description.toUpperCase().includes(txt.toUpperCase()) ||
              device.tags
                .map(tag => tag.trim().toUpperCase())
                .includes(txt.toUpperCase())),
        );
      } else {
        this.devicesList = this.devicesListTmp;
      }
    },
  },
  data() {
    return {
      editor: null,
      engine: null,
      counter: 1,
      searchText: '',
      filterText: 'ALL',
      devicesListTmp: [],
      devicesList: [],
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    // this.init();
  },
  components: {
    CommonFunction,
  },
};
</script>
<style>
.ivu-card-bordered {
  margin: 30px 0px;
}
</style>

<style lang="sass" scoped>
@import './assets/styles/media.sass'

.example
  display: flex
  max-width: 100%
  padding: 2vh 0
  flex-direction: row-reverse
  +phone
    flex-direction: column !important
  .title
    display: block
    font-size: 120%
    margin-bottom: 1em
  .view
    flex: 2
    position: relative
    overflow: hidden
    float: left
    max-height: 140vh
    min-height: 80vh
    margin: 20px
    +phone
      max-height: 60vh
</style>
