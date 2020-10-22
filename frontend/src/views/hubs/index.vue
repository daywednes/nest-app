<template>
  <div class="app-container">
    <el-tabs v-model="editableTabsValue" style="width:95%; position: absolute;">
      <el-tab-pane label="" name="-1" v-if="!hubs || hubs.length == 0">
        <!-- <el-tab-pane label="Default" name="-1" > -->
        <div
          style="margin: 60px; text-align: -webkit-center;white-space: pre-wrap; word-wrap: break-word; font-size: 26px;"
        >
          <h1>Your new Hub is all set</h1>
          <br />
          <h1>
            You can start connecting devices to this Hub by pressing the +
            button
          </h1>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in hubs"
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
        @click="
          () => {
            showAddHUBDialog = true;
          }
        "
      >
        Add Hub
      </el-button>
    </div>

    <el-button
      style=" position: fixed; width:60px; height:60px; bottom:50px; right: 50px; font-size: 59px;"
      type="primary"
      icon="el-icon-circle-plus"
      circle
      @click="
        () => {
          showAddDialog = true;
        }
      "
    ></el-button>

    <el-dialog title="" :visible.sync="showAddDialog">
      <!-- Step 1 -->
      <div
        v-if="active == 0"
        style="height: 40vh; text-align: -webkit-center;white-space: pre-wrap; word-wrap: break-word; font-size: 20px;"
      >
        <h1>
          HARDWARE
        </h1>
        <h1>
          SCANNING &
        </h1>
        <h1>
          PARING
        </h1>
        <h1>
          INSTRUCTIONS TBD
        </h1>
      </div>

      <!-- Step 2 -->
      <div v-if="active == 1" style="height: 40vh;">
        <div style=" width:100%; float: right;    display: inline-flex;">
          <div style="width: 35%; margin-right: 30px;word-break: break-word;">
            <h1>
              Alarm Zone
            </h1>
            <h2>
              Alarm zones are groups of security devices that can be armed and
              dissarmed. Select or create a new zone for your [Device Type]
            </h2>
          </div>
          <div style="width: 60%"></div>
        </div>
      </div>

      <!-- Step 3 -->
      <div v-if="active == 2" style="height: 40vh;">
        <div style=" width:100%; float: right; display: inline-flex;">
          <div style="width: 35%; margin-right: 30px;word-break: break-word;">
            <h1>
              Devoce Location
            </h1>
            <h2>
              Where in [Zone Name] is this device located ?
            </h2>
            <h2>
              Example: Front Door or East Window.
            </h2>
          </div>
          <div style="width: 60%"></div>
        </div>
      </div>

      <!-- Step 4 -->
      <div v-if="active == 3" style="height: 40vh;">
        <div style=" width:100%; float: right; display: inline-flex;">
          <div style="width: 35%; margin-right: 30px;word-break: break-word;">
            <h1>
              Location Type
            </h1>
            <h2>
              Is this [Device Type] inside the home, outside or at a perimeter
              entry point, like a door or window ?
            </h2>
          </div>
          <div style="width: 60%"></div>
        </div>
      </div>

      <!-- Step 5 -->
      <div v-if="active == 4" style="height: 40vh;">
        <div style=" width:100%; float: right; display: inline-flex;">
          <div style="width: 35%; margin-right: 30px;word-break: break-word;">
            <h1>
              Tags
            </h1>
            <h2>
              Adding Tags can help find this device using search and enable
              actions on groups of devices in different zones.
            </h2>
          </div>
          <div style="width: 60%"></div>
        </div>
      </div>
      <br />
      <el-steps :active="active" finish-status="success">
        <el-step title="Scanning"></el-step>
        <el-step title="Alarm Zone"></el-step>
        <el-step title="Device Location"></el-step>
        <el-step title="Location Type"></el-step>
        <el-step title="Tags"></el-step>
      </el-steps>

      <div style=" width:100%; ">
        <el-button
          type="info"
          style="margin-top: 12px;"
          @click="previous"
          v-if="active > 0"
          >Previos step</el-button
        >
        <el-button
          type="primary"
          style="margin-top: 12px;"
          @click="next"
          v-if="active < 4"
          >Next step</el-button
        >
        <el-button
          type="success"
          style="margin-top: 12px;float: right; "
          @click="cancelPopup"
          v-if="active == 4"
          >Done
        </el-button>
      </div>
    </el-dialog>

    <!-- Add Hub -->
    <el-dialog title="" :visible.sync="showAddHUBDialog">
      <div
        v-if="!hubs || hubs.length == 0"
        style=" width:100%; float: right; display: inline-flex;"
      >
        <div style="width: 50%; margin-right: 30px;word-break: break-word;">
          <h1>
            New Hub
          </h1>
          <h2>
            Hubs are the brains of your security system. Give your Hub a
            uniquename
          </h2>
          <h2 style="font-weight: normal; margin-top: 10px;">
            Example: Madroda House, Main Building, Basement
          </h2>
        </div>
        <div style="width: 50%; margin-top:50px;">
          <el-form
            class="login-form-log"
            autocomplete="on"
            label-position="left"
          >
            <el-form-item prop="hubName">
              <!-- <span style="margin-left:10px;font-size: x-large;"> Name</span> -->
              <el-input
                ref="hubName"
                v-model="hubForm.name"
                style="color: black;"
                placeholder="Hub Name"
                name="hubName"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>
            <el-form-item prop="description">
              <!-- <span style="margin-left:10px;font-size: x-large;">
                Description</span
              > -->
              <el-input
                ref="hubDescription"
                v-model="hubForm.description"
                style="color: black;"
                placeholder="Hub Description"
                name="hubDescription"
                type="textarea"
                tabindex="2"
                :rows="3"
                autocomplete="on"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div
        v-if="hubs && hubs.length > 0"
        style=" width:100%; float: right; display: inline-flex;"
      >
        <div style="width: 50%; margin-right: 30px;word-break: break-word;">
          <h1>
            Add a Hub
          </h1>
          <h2>
            How do you want to use this Hub ? You can extend your radio range,
            add security to separate location, or increase computing power.
          </h2>
        </div>
        <div style="width: 50%; margin-top:50px;">
          <el-form
            class="login-form-log"
            autocomplete="on"
            label-position="left"
          >
            <el-form-item prop="hubName">
              <!-- <span style="margin-left:10px;font-size: x-large;"> Name</span> -->
              <el-input
                ref="hubName"
                v-model="hubForm.name"
                style="color: black;"
                placeholder="Hub Name"
                name="hubName"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>
            <el-form-item prop="description">
              <!-- <span style="margin-left:10px;font-size: x-large;">
                Description</span
              > -->
              <el-input
                ref="hubDescription"
                v-model="hubForm.description"
                style="color: black;"
                placeholder="Hub Description"
                name="hubDescription"
                type="textarea"
                tabindex="2"
                :rows="3"
                autocomplete="on"
              />
              <el-radio-group
                v-model="hubForm.option"
                style="margin-top: 20px; font-size: 24px; display: table-caption;"
              >
                <el-radio :label="3">Extent Range</el-radio>
                <el-radio :label="6">New Location</el-radio>
                <el-radio :label="9">Increase Performance</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style=" width:100%;margin-bottom:10px; ">
        <el-button type="info" @click="cancelPopup">Cancel</el-button>
        <el-button
          :loading="loading"
          type="primary"
          style="float: right"
          @click="createHub"
          >Create Hub</el-button
        >
      </div>
    </el-dialog>
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
import { getHubs, createHub, deleteHub } from '@/api/hubs';

export default {
  name: 'Hubs',
  components: {
    Zones,
    Kanban,
    draggable,
  },
  data() {
    return {
      active: 0,
      showAddDialog: false,
      loading: false,
      showAddHUBDialog: false,
      textSearch: '',
      showDialogZones: false,
      editableTabsValue: '-1',
      isShowLeft: false,
      multipleSelection: [],
      zonesList: [],
      zonesListTmp: [],
      queryCondition: { ...DEFAULT_SEARCH_QUERY },
      selectedZone: { ...DEFAULT_ITEM },
      ds_master: [],
      ds_commonCode: {},
      group: 'mission',
      hubForm: {
        name: '',
        description: '',
        option: '',
        orgId: '',
      },
      listDrag: [
        {
          header: 'Zone 1',
          listClass: 'kanban todo',
          list: [
            { name: 'Mission', id: 1 },
            { name: 'Mission', id: 2 },
            { name: 'Mission', id: 3 },
            { name: 'Mission', id: 4 },
          ],
        },
        {
          header: 'Zone 2',
          listClass: 'kanban working',
          list: [
            { name: 'Mission', id: 5 },
            { name: 'Mission', id: 6 },
            { name: 'Mission', id: 7 },
          ],
        },
        {
          header: 'Zone 3',
          listClass: 'kanban done',
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
    hubs(val, old) {
      if (val && val.length > 0) {
        this.editableTabsValue = val[val.length].name;
      }
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
    hubs() {
      if (
        this.$store.getters.hubs == null ||
        this.$store.getters.hubs.length == 0
      ) {
        // this.$alert('empty');
        this.editableTabsValue = '-1';
        return [];
      }

      this.editableTabsValue = this.$store.getters.hubs[0].name;
      return this.$store.getters.hubs;
    },
  },
  methods: {
    next() {
      if (this.active + 1 > 4) {
        this.active = 4;
      } else {
        this.active++;
      }
    },
    previous() {
      if (this.active - 1 < 0) {
        this.active = 0;
      } else {
        this.active--;
      }
    },
    cancelPopup() {
      this.showAddHUBDialog = false;

      this.showAddDialog = false;
      this.active = 0;
      this.hubForm.name = '';
      this.hubForm.description = '';
      this.loading = false;
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '');
    },
    addTab(targetName) {
      let newTabName = 'New Tab ' + this.hubs.length;
      this.hubs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      });
      this.editableTabsValue = newTabName;
    },
    createHub() {
      if (!this.hubForm.name || this.hubForm.name.length < 1) {
        this.$alert('Please input name');
        return;
      }
      if (!this.hubForm.description || this.hubForm.description.length < 1) {
        this.$alert('Please input description');
        return;
      }

      this.hubForm.orgId = this.orgId;
      this.loading = true;
      createHub(this.hubForm).then(response => {
        this.getHubsList();
      });
      // .catch(() => {
      //   this.loading = false;
      // });
    },
    getHubsList() {
      getHubs(this.orgId).then(response => {
        this.$store.dispatch('user/updateHubs', response);

        this.cancelPopup();
      });
    },
    getZonesList(val) {
      getZones(val).then(response => {
        this.zonesListTmp = response;
        this.zonesList = this.zonesListTmp;
        // this.editableTabsValue = this.zonesList[0].name;
        this.$store.dispatch('user/updateZones', response);
      });
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
