<template>
  <div class="app-container">
    <el-tabs v-model="editableTabsValue" style="width:95%; position: absolute;">
      <el-tab-pane
        v-for="(item, index) in zonesList"
        :key="index"
        :label="item.name"
        :name="item.name"
      >
        <keep-alive>
          <!-- <Zones /> -->

          <draggable
            :list="listDrag"
            v-bind="$attrs"
            class="board-column-content"
            :set-data="setData"
          >
            <Kanban
              v-for="(item, index) in listDrag"
              :key="index"
              :list="item.list"
              :group="group"
              :class="item.listClass"
              :header-text="item.header"
            />
          </draggable>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <div style=" position: absolute;">
      <el-input
        placeholder="Type something"
        prefix-icon="el-icon-search"
        style="width: 60%; margin-right: 10px;"
        v-model="textSearch"
      >
      </el-input>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="addTab(editableTabsValue)"
      >
        Add Hub
      </el-button>
    </div>
    
  <el-button  style=" position: fixed; width:60px; height:60px; bottom:50px; right: 50px; font-size: 51px;" type="primary" icon="el-icon-circle-plus" circle></el-button>
  </div>
</template>
<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
<style>
.el-tabs__nav-scroll {
  float: right;
}
</style>
<style scoped>
.el-select {
  width: 300px;
}
.el-button--medium.is-circle {
    padding: 0px;
}
</style>
<script>
import draggable from 'vuedraggable';
import FontResizableContainer from '@/components/FontResizableContainer';
import Zones from '@/views/zones/index';
import Kanban from '@/components/Kanban';
import { getZones, createZone, deleteZone } from '@/api/zone';

export default {
  name: 'Hubs',
  components: {
    Zones,
    Kanban,
    draggable,
  },
  data() {
    return {
      editableTabsValue: '',
      textSearch: '',
      showDialogZones: false,
      editableTabsValue: '1',
      isShowLeft: false,
      multipleSelection: [],
      zonesList: [],
      zonesListTmp: [],
      queryCondition: { ...DEFAULT_SEARCH_QUERY },
      selectedZone: { ...DEFAULT_ITEM },
      ds_master: [],
      ds_commonCode: {},
      group: 'mission',
      listDrag: [
        {
          header:'Zone 1',
          listClass:'kanban todo',
          list: [
            { name: 'Mission', id: 1 },
            { name: 'Mission', id: 2 },
            { name: 'Mission', id: 3 },
            { name: 'Mission', id: 4 },
          ],
        },
        {
          header:'Zone 2',
          listClass:'kanban working',
          list: [
            { name: 'Mission', id: 5 },
            { name: 'Mission', id: 6 },
            { name: 'Mission', id: 7 },
          ],
        },
        {
          header:'Zone 3',
          listClass:'kanban done',
          list: [
            { name: 'Mission', id: 8 },
            { name: 'Mission', id: 9 },
            { name: 'Mission', id: 10 },
          ],
        },
      ],
      uploadProgress: { ...DEFAULT_PROGRESS },
    };
  },
  mounted: function() {
    this.getZonesList(this.orgId);
  },
  watch: {
    orgId(val, old) {
      this.getZonesList(val);
    },
    textSearch(val, old) {
      this.searchZone(val);
    },
  },
  computed: {
    orgId() {
      if (this.$store.getters.orgId == null) {
        this.$alert('empty');
      }

      return this.$store.getters.orgId;
    },
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '');
    },
    addTab(targetName) {
      console.log(targetName);
      let newTabName = targetName + '1';
      this.zonesList.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      });
      this.editableTabsValue = newTabName;
    },
    getZonesList(val) {
      getZones(val).then(response => {
        this.zonesListTmp = response;
        this.zonesList = this.zonesListTmp;
        this.editableTabsValue = this.zonesList[0].name;
        this.$store.dispatch('user/updateZones', response);
      });
    },
    refreshUI() {
      this.ZoneForm.name = '';
      this.ZoneForm.description = '';
      this.textSearch = '';
      this.getZonesList(this.orgId);
      this.isShowLeft = false;
      this.showDialogZones = false;
    },
  },
};
const DEFAULT_SEARCH_QUERY = {
  ctKey: null,
  logGrpCd: null,
  loadId: null,
  loadDesc: null,
  equipTyp: null,
  strdDate: null,
  customerId: null,
  carrierId: null,
  COMMON_PARAM: {
    startIndex: 0,
    pageSize: 100,
    sortConditions: [],
    orCondition: false,
  },
};
const DEFAULT_ITEM = {
  _index: -1,
  _checked: false,
};
const DEFAULT_PROGRESS = {
  showed: false,
  percent: 0,
  message: '',
};
</script>
