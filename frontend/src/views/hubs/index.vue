<template>
  <div class="app-container">
    <el-tabs v-model="editableTabsValue" style="width:95%; position: absolute;">
      <!-- @tab-click="askForSave" -->
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
          <div style="width:100%">
            <h1>{{ editableTabsValue }} - Devices and Zones</h1>
            <hr />
            <br />
            <!-- <div style="margin-botom: 20px;">
              <el-checkbox v-model="autoSaveChecked"
                >Auto Save After 5 Seconds</el-checkbox
              >

              <el-button
                style="margin-left: 40px;"
                type="primary"
                icon="el-icon-bottom"
                @click="saveChangesHub"
              >
                Save Changes
              </el-button>
            </div> -->
            <draggable
              :list="zonesList"
              v-bind="$attrs"
              class="board-column-content"
              :set-data="setData"
            >
              <Kanban
                v-for="(item, index) in zonesList"
                :key="index"
                :list="item.devices"
                :group="group"
                :class="item.name"
                :header-text="item.name"
                @click.native="showZoneInput = true"
                @fn_resetInterval="resetInterval()"
              />
            </draggable>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <div style=" position: absolute;">
      <el-input
        placeholder="Type something"
        prefix-icon="el-icon-search"
        style="width: 50%; margin-right: 10px;"
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
      style=" position: fixed; width:60px; height:60px; bottom:50px; right: 50px; font-size: 45px;"
      type="primary"
      icon="el-icon-circle-plus"
      circle
      @click="
        () => {
          active = 0;
          showAddDialog = true;
        }
      "
    ></el-button>

    <el-button
      style=" position: fixed; width:60px; height:60px; bottom:50px; right: 150px; font-size: 45px;"
      type="primary"
      circle
      @click="
        () => {
          showMenu = !showMenu;
        }
      "
      ><i :class="showMenu ? 'el-icon-close' : 'el-icon-setting'"
    /></el-button>

    <div v-if="showMenu" class="rightMenu">
      <h2>Simple things</h2>
      <!-- <el-row
                :gutter="32"
                v-for="(item, index) of items"
                :key="index"
                style="width: 95%;
            text-align: left; margin: 10px; "
              > -->
      <div
        style="height: 50vh;
  overflow: auto;"
      >
        <el-row
          :gutter="32"
          draggable="true"
          unselectable="on"
          style="background: transparent; width:100%;"
          class="chart-wrapper"
          v-for="item in widgetsList"
          :key="item.i"
        >
          <!-- <component :is="item.component" /> -->
          <el-col :xs="8" :sm="8" :lg="8">
            <img v-if="logo" :src="logo" style="float: left; height: 50px;" />
          </el-col>
          <el-col :xs="16" :sm="16" :lg="16">
            {{ item.i }}
            <br />
            {{ item.component }}
          </el-col>
          <hr
            style=" position: absolute;left: 0;bottom: 0;width: 100%;margin: 0;"
          />
        </el-row>
      </div>

      <h2>MORE</h2>
    </div>

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
          <div style="width: 50%; margin-right: 30px;word-break: break-word;">
            <h1>
              Alarm Zone
            </h1>
            <h2>
              Alarm zones are groups of security devices that can be armed and
              dissarmed. Select or create a new zone for your [Device Type]
            </h2>
          </div>
          <div style="width: 50%">
            <h2>
              Choose zone of your devices:
            </h2>
            <el-select
              v-model="addDeviceZoneId"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in zonesList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>

            <el-button
              style="margin-top: 40px;"
              type="primary"
              icon="el-icon-plus"
              @click="
                () => {
                  showDialogZones = true;
                }
              "
            >
              Create New Zone
            </el-button>
          </div>
        </div>
      </div>

      <!-- Step 3 -->
      <div v-if="active == 2" style="height: 40vh;">
        <div style=" width:100%; float: right; display: inline-flex;">
          <div style="width: 50%; margin-right: 30px;word-break: break-word;">
            <h1>
              Device Location
            </h1>
            <h2>Where in {{ zoneName }} is this device located ?</h2>
            <h2>
              Example: Front Door or East Window.
            </h2>
          </div>
          <div style="width: 50%">
            <h3>Device Name</h3>
            <el-input
              v-model="addDevice.name"
              style="color: black;"
              placeholder="Device Name"
              name="DeviceName"
              type="text"
              tabindex="1"
              autocomplete="on"
            />

            <h3>Device Description</h3>
            <el-input
              v-model="addDevice.description"
              style="color: black;"
              placeholder="Description"
              name="DeviceDescription"
              type="textarea"
              tabindex="2"
              :rows="3"
              autocomplete="on"
            />
            <br />

            <h3>Device Location</h3>
            <el-input
              v-model="addDevice.location"
              style="color: black;"
              placeholder="Device Location"
              name="DeviceLocation"
              type="text"
              tabindex="3"
              autocomplete="on"
            />
          </div>
        </div>
      </div>

      <!-- Step 4 -->
      <div v-if="active == 3" style="height: 40vh;">
        <div style=" width:100%; float: right; display: inline-flex;">
          <div style="width: 50%; margin-right: 30px;word-break: break-word;">
            <h1>
              Location Type
            </h1>
            <h2>
              Is this [Device Type] inside the home, outside or at a perimeter
              entry point, like a door or window ?
            </h2>
          </div>
          <div style="width: 50%">
            <el-radio-group
              v-model="addDevice.locationType"
              style="margin-top: 20px; font-size: 24px; display: table-caption;"
            >
              <el-radio :label="3">Inside the Home</el-radio>
              <el-radio :label="6">Outside the Home</el-radio>
              <el-radio :label="9">Entry Point</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>

      <!-- Step 5 -->
      <div v-if="active == 4" style="height: 40vh;">
        <div style=" width:100%; float: right; display: inline-flex;">
          <div style="width: 50%; margin-right: 30px;word-break: break-word;">
            <h1>
              Tags
            </h1>
            <h2>
              Adding Tags can help find this device using search and enable
              actions on groups of devices in different zones.
            </h2>
          </div>
          <div style="width: 50%">
            <h2>
              Add tags:
            </h2>
            <el-select
              v-model="addDevice.tagsName"
              multiple
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in optionsTag"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
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
          :loading="loadingDevice"
          type="success"
          style="margin-top: 12px;float: right; "
          @click="createDeviceEntity"
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
          :loading="loadingDevice"
          type="primary"
          style="float: right"
          @click="createHub"
          >Create Hub</el-button
        >
      </div>
    </el-dialog>

    <!-- Add Zone -->

    <el-dialog title="New Zone" :visible.sync="showDialogZones">
      <el-form class="login-form-log" autocomplete="on" label-position="left">
        <el-form-item prop="ZoneName">
          <span style="margin-left:10px;font-size: large;"> Name</span>
          <el-input
            ref="ZoneName"
            v-model="ZoneForm.name"
            style="color: black;"
            placeholder="Zone Name"
            name="ZoneName"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="description">
          <span style="margin-left:10px;font-size: large;"> Description</span>
          <el-input
            ref="ZoneType"
            v-model="ZoneForm.description"
            style="color: black;"
            placeholder="Zone Description"
            name="ZoneType"
            type="text"
            tabindex="2"
            autocomplete="on"
          />
        </el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:10px;"
          @click="createZoneEntity"
          >Create Zone</el-button
        >
      </el-form>
    </el-dialog>
    <!-- Zone Input -->

    <el-dialog :visible.sync="showZoneInput">
      <h1>ZONE INPUT</h1>
      <hr />
      <el-row>
        <el-col :span="12" style="text-align: center; overflow:auto;">
          <br />
          <img v-if="zonesInputImg" :src="zonesInputImg" />
          <br />
          <h2>
            Select an Input Zone to Configure
          </h2>
        </el-col>
        <el-col :span="12">
          <h3>#1: Zone Name</h3>
          <el-row style="margin :20px; font-size: medium;">
            <span class="demonstration">Sensor Type </span>
            <br />
            <el-select
              v-model="valueSensorType"
              clearable
              filterable
              placeholder="All"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-row>
          <el-row style="margin :20px; font-size: medium;">
            <span class="demonstration">Location Type </span>
            <br />
            <el-select
              v-model="valueLocationType"
              clearable
              filterable
              placeholder="All"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-row>
          <el-row style="margin :20px; font-size: medium;">
            <span class="demonstration">Device Group </span>
            <br />
            <el-select
              v-model="valueDeviceGroup"
              clearable
              filterable
              placeholder="All"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-row>
          <el-row style="margin :20px; font-size: medium;">
            <span class="demonstration">State to Trigger Alarm </span>
            <br />
            <el-button class="filter-item" type="primary" icon="el-icon-edit"
              >Open</el-button
            >
            <el-button class="filter-item" type="primary" icon="el-icon-success"
              >Closed</el-button
            >
          </el-row>
          <el-row style="margin :20px; font-size: medium;">
            <span class="demonstration">Tags Of Device </span>
            <br />
            <el-select
              v-model="itemTags"
              multiple
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in optionsTag"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-row>
        </el-col>
      </el-row>
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
.rightMenu {
  position: fixed;
  bottom: 120px;
  right: 50px;
  background: lightgray;
  height: 60vh;
  margin-top: 10px;
  padding: 10px;
  text-align-last: center;
  border: 2px solid steelblue;
  border-radius: 20px;
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
.el-radio__label {
  font-size: 20px;
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.chart-wrapper {
  background: #fff;
  padding: 20px 0px 20px 0px;
  text-align-last: left;
  font-weight: bold;
  font-size: small;
}
</style>
<script>
import draggable from 'vuedraggable';
import FontResizableContainer from '@/components/FontResizableContainer';
import logoSimpleThings from '@/assets/img_src/simple_things_logo.png';
import zonesInput from '@/assets/img_src/zonesInput.png';
import Zones from '@/views/zones/index';
import Kanban from '@/components/Kanban';
import { saveChanges, createZone, getZonesHub } from '@/api/zone';
import { getHubs, createHub, deleteHub } from '@/api/hubs';
import { getTags, getTagsById } from '@/api/tags';
import { createDevice } from '@/api/device';

export default {
  name: 'Hubs',
  components: {
    Zones,
    Kanban,
    draggable,
  },
  data() {
    return {
      valueDeviceGroup: null,
      valueSensorType: null,
      valueLocationType: null,
      logo: logoSimpleThings,
      zonesInputImg: zonesInput,
      active: 0,
      autoSaveChecked: true,
      showAddDialog: false,
      showMenu: false,
      loadingDevice: false,
      showAddHUBDialog: false,
      textSearch: '',
      showDialogZones: false,
      showZoneInput: false,
      editableTabsValue: '-1',
      isShowLeft: false,
      multipleSelection: [],
      optionsTag: [],
      zonesList: [],
      zonesListTmp: [],
      queryCondition: { ...DEFAULT_SEARCH_QUERY },
      selectedZone: { ...DEFAULT_ITEM },
      ds_master: [],
      ds_commonCode: {},
      group: 'device',
      addDeviceZoneId: '',
      ZoneForm: {
        name: '',
        ZoneType: '',
        ZoneLabel: '',
        description: '',
        orgId: '',
        hubId: '',
      },
      hubForm: {
        name: '',
        description: '',
        option: '',
        orgId: '',
      },
      addDevice: {
        zoneId: '',
        tagsName: '',
        name: '',
        description: '',
        orgId: '',
        location: '',
        locationType: 3,
      },
      uploadProgress: { ...DEFAULT_PROGRESS },
      runInterval: null,
      widgetsList: [
        {
          i: 'Zone Input',
          component: 'DISARMED',
          isStatic: true,
        },
        {
          i: 'Zone Output',
          component: 'DISARMED',
          isStatic: true,
        },
        {
          i: 'Contact Sensor',
          component: 'DISARMED',
          isStatic: true,
        },
        {
          i: 'Motion Sensor',
          component: 'DISARMED',
          isStatic: true,
        },
        {
          i: 'Radar Sensor',
          component: 'DISARMED',
          isStatic: true,
        },
        {
          i: 'Camera',
          component: 'DISARMED',
          isStatic: true,
        },
      ],

      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
    };
  },
  mounted: function() {
    this.getHubsList();
    this.getTagsList();
  },
  beforeDestroy: function() {
    this.saveChangesHub(this.zonesList);
  },
  watch: {
    orgId(val, old) {
      this.saveChangesHub();
      this.getHubsList();
    },
    hubs(val, old) {
      if (val && val.length > 0) {
        this.editableTabsValue = val[val.length - 1].name;
      } else {
        this.editableTabsValue = '-1';
      }
    },
    zonesList(val, old) {
      this.resetInterval();
      if (val && val.length > 0) {
        this.addDeviceZoneId = val[val.length - 1].id;
      } else {
        this.addDeviceZoneId = null;
      }
    },
    textSearch(val, old) {
      this.searchZone(val);
    },
    autoSaveChecked(val, old) {
      if (val) {
        this.resetInterval();
      } else {
        if (this.runInterval) {
          clearInterval(this.runInterval);
        }
      }
    },
    editableTabsValue(val, old) {
      // this.askForSave();

      if (this.zonesList && this.zonesList.length > 0) {
        this.saveChangesHub(this.zonesList);
      }
      this.ZoneForm.hubId = this.currentHubId;
      this.getZonesList();
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
      return this.$store.getters.hubs;
    },
    currentHubId() {
      let tmpId = this.$store.getters.hubs.find(
        x => x.name == this.editableTabsValue,
      );

      if (tmpId) {
        return tmpId.id;
      }

      return null;
    },
    zoneName() {
      let tmpName = this.zonesList.find(y => y.id == this.addDeviceZoneId);
      if (tmpName) {
        return tmpName.name;
      }

      return null;
    },
  },
  methods: {
    resetInterval() {
      if (this.autoSaveChecked) {
        if (this.runInterval) {
          clearInterval(this.runInterval);
        }
        this.runInterval = setInterval(this.saveChangesHub, 5000);
      }
    },
    getTagsList() {
      getTags().then(response => {
        this.optionsTag = response.map(x => x.name)
          ? response.map(x => x.name)
          : [];
      });
    },
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
      this.showDialogZones = false;
      this.active = 0;
      this.hubForm.name = '';
      this.hubForm.description = '';
      this.addDevice.tagsName = [];
      this.addDevice.name = '';
      this.addDevice.description = '';
      this.addDevice.location = '';
      this.loadingDevice = false;
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
    askForSave() {
      let oldList = this.zonesList;
      if (oldList && oldList.length > 0) {
        this.$confirm(
          'Would you like to save changes of previous HUB ?',
          'Warning',
          {
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
            type: 'warning',
          },
        )
          .then(() => {
            saveChanges(oldList);

            // this.$message({
            //   type: 'success',
            //   message: 'Save changes completed',
            // });
            return true;
          })
          .catch(() => {
            return false;
          });
      }
      return;
    },
    saveChangesHub() {
      if (this.zonesList && this.zonesList.length > 0) {
        // const loadingSaveChanges = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)',
        // });

        for (let index = 0; index < this.zonesList.length; index++) {
          const tmpZone = this.zonesList[index];
          tmpZone.index = index;
          if (tmpZone.devices) {
            for (
              let indexDevice = 0;
              indexDevice < tmpZone.devices.length;
              indexDevice++
            ) {
              const tmpDevice = tmpZone.devices[indexDevice];
              tmpDevice.index = indexDevice;
            }
          }
        }

        saveChanges(this.zonesList);
        this.$message({
          type: 'success',
          message: 'Save changes completed',
        });
        // loadingSaveChanges.close();
      }

      clearInterval(this.runInterval);
    },
    createHub() {
      this.hubForm.orgId = this.orgId;
      if (!this.hubForm.orgId && this.hubForm.orgId.length < 1) {
        this.$alert(
          'Please create Organization of Hub first' + this.ZoneForm.orgId,
        );
      }
      if (!this.hubForm.name || this.hubForm.name.length < 1) {
        this.$alert('Please input hub name');
        return;
      }
      if (!this.hubForm.description || this.hubForm.description.length < 1) {
        this.$alert('Please input description');
        return;
      }

      this.loadingDevice = true;
      createHub(this.hubForm)
        .then(response => {
          this.getZonesList();
        })
        .catch(() => {
          this.loadingDevice = false;
        });
    },
    getHubsList() {
      this.editableTabsValue = '-1';
      this.$store.dispatch('user/updateHubs', []);
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      getHubs(this.orgId)
        .then(response => {
          this.$store.dispatch('user/updateHubs', response);
          this.cancelPopup();
        })
        .finally(() => {
          loading.close();
        });
    },
    getZonesList() {
      // this.saveChangesHub();
      if (!this.currentHubId) {
        this.$store.dispatch('user/updateZones', []);
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      getZonesHub(this.currentHubId)
        .then(response => {
          this.zonesListTmp = response;
          for (let index = 0; index < this.zonesListTmp.length; index++) {
            const element = this.zonesListTmp[index];
            if (element.devices) {
              element.devices.sort((a, b) => (a.index > b.index ? 1 : -1));
            }
          }
          this.zonesList = this.zonesListTmp.sort((a, b) =>
            a.index > b.index ? 1 : -1,
          );
          this.$store.dispatch('user/updateZones', response);
        })
        .catch(() => {
          this.$store.dispatch('user/updateZones', []);
        })
        .finally(() => {
          clearInterval(this.runInterval);
          loading.close();
        });
    },
    createDeviceEntity() {
      this.loadingDevice = true;
      this.addDevice.orgId = this.orgId;
      this.addDevice.zoneId = this.addDeviceZoneId;
      if (!this.addDevice.orgId && this.addDevice.orgId.length < 1) {
        this.$alert('Please create Organization of Device first');
        this.cancelPopup();
        return;
      }

      if (!this.zoneName || this.zoneName.length < 1) {
        this.$alert('Please input zone name');
        this.active = 1;
        this.loadingDevice = false;
        return;
      }

      if (!this.addDevice.name || this.addDevice.name.length < 1) {
        this.$alert('Please input device name');
        this.active = 2;
        this.loadingDevice = false;
        return;
      }
      if (
        !this.addDevice.description ||
        this.addDevice.description.length < 1
      ) {
        this.$alert('Please input description');
        this.active = 2;
        this.loadingDevice = false;
        return;
      }
      if (!this.addDevice.location || this.addDevice.description.length < 1) {
        this.$alert('Please input location');
        this.active = 2;
        this.loadingDevice = false;
        return;
      }

      const loadingCreateDevice = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      createDevice(this.addDevice)
        .then(response => {
          this.cancelPopup();
          this.getZonesList();
        })
        .finally(() => {
          loadingCreateDevice.close();
        });

      // getHubs(this.orgId)
      //   .then(response => {
      //     this.$store.dispatch('user/updateHubs', response);

      //     this.cancelPopup();
      //   })
      //   .catch(() => {
      //     this.editableTabsValue = '-1';
      //     this.$store.dispatch('user/updateHubs', []);
      //   })
      //   .finally(() => {
      //     loadingDevice.close();
      //   });
    },
    createZoneEntity() {
      this.ZoneForm.orgId = this.orgId;
      const loadingZone = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (!this.ZoneForm.orgId && this.ZoneForm.orgId.length < 1) {
        this.$alert(
          'Please create Organization of Zone first' + this.ZoneForm.orgId,
        );
      }
      if (!this.ZoneForm.name || this.ZoneForm.name.length < 1) {
        this.$alert('Please input name');
        return;
      }
      if (!this.ZoneForm.description || this.ZoneForm.description.length < 1) {
        this.$alert('Please input description');
        return;
      }

      createZone(this.ZoneForm)
        .then(response => {
          this.getZonesList();
          this.showDialogZones = false;
        })
        .finally(() => {
          this.ZoneForm.name = '';
          this.ZoneForm.description = '';
          loadingZone.close();
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
