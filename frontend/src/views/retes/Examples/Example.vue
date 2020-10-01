<template lang="pug">
.example
  el-input.inline-input(
    placeholder='search...',
    autofocus,
    style='position: absolute; width: 200px; left: 2%',
    prefix-icon='el-icon-search',
    v-model='searchText'
  )
  //- Info(:item="example")
  CommonFunction(
    style='position: absolute;',
    :isShowDeploy='true',
    @functionDeploy='fn_deploy'
  )

  .view
    div(style='margin-top: 20px;', ref='view')
    div(ref='extra')
</template>

<script>
import Vue from 'vue';
import Info from './Info';
import CommonFunction from '@/components/CommonFunction';

export default {
  props: ['example'],
  methods: {
    async init() {
      this.$refs.view.innerHTML = '';
      this.$refs.extra.innerHTML = '';
      this.$refs.extra.className = '';

      if (this.editor) this.editor.destroy();
      if (this.engine) this.engine.destroy();

      const { editor, engine } = await this.example.init(
        this.$refs.view,
        this.$refs.extra,
      );

      this.editor = editor;
      this.engine = engine;
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
  },
  data() {
    return {
      editor: null,
      engine: null,
      counter: 1,
      searchText: '',
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    this.init();
  },
  components: {
    Info,
    CommonFunction,
  },
};
</script>

<style lang="sass" scoped>
@import '../assets/styles/media.sass'

.example
  display: flex
  max-width: 100%
  margin: 2vh 0
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
