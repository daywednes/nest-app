<template>
  <div class="board-column">
    <div class="board-column-header">
      <i class="el-icon-edit" />
      {{ headerText }}
    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
    >
      <!-- <div v-for="element in list" :key="element.id" class="board-item">
        {{ element.name }} {{ element.id }}
      </div> -->
      <SingleDevice
        style="margin: 15px;"
        v-for="device in list"
        :key="device.id"
        :item="device"
      />
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import SingleDevice from '@/components/SingleDevice';

export default {
  name: 'DragKanbanDemo',
  components: {
    draggable,
    SingleDevice,
  },
  watch: {
    list(val, old) {
      this.resetInterval();
    },
  },
  props: {
    headerText: {
      type: String,
      default: 'Header',
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    resetInterval: function() {
      this.$emit('fn_resetInterval');
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '');
    },
  },
};
</script>
<style lang="scss" scoped>
.board-column {
  margin: 10px 0px;
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 75px;
    line-height: 75px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
    font-size: 24px;
    text-align: start;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: block;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 260px;
      height: 64px;
      margin: 5px;
      float: left;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
