<template>
  <div class="board-column">
    <div class="board-column-header">
      <el-button
        style="background: transparent; color: white; border: 0px;"
        @click="
          () => {
            editHeader = !editHeader;
          }
        "
        ><i :class="editHeader ? 'el-icon-check' : 'el-icon-edit'"
      /></el-button>
      <el-input
        class="inputKaban"
        :disabled="!editHeader"
        style="min-width: 400px; font-size: x-large;"
        placeholder="Please input"
        v-model="groupName"
      ></el-input>
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
        @click.native="deviceClick(device)"
        style="margin: 15px;"
        v-for="device in list"
        :key="device.id"
        :item="device"
        :isDefine="device.isDefine"
      />
    </draggable>

    <!-- Zone Input -->

    <el-dialog :visible.sync="showZoneInput" width="70%">
      <h1>ZONE INPUT</h1>
      <hr />
      <el-row>
        <el-col :span="16" style="text-align: center; overflow:auto;">
          <br />
          <img v-if="zonesInputImg" :src="zonesInputImg" />
          <br />
          <h2>
            Select an Input Zone to Configure
          </h2>
        </el-col>
        <el-col :span="8">
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

    <!-- Contact Sensor -->

    <el-dialog :visible.sync="showContactSensor" width="60%" append-to-body>
      <h1>Contact Sensor</h1>
      <hr />

      <img style="width:70px;" v-if="logo" :src="logo" />
      <el-row>
        <el-col :span="12">
          <el-row style="margin :20px; font-size: medium;">
            <span class="demonstration">Device Group </span>
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
            <el-tooltip content="Global Size" effect="dark" placement="right">
              <div slot="content">
                Is this [Device Type] inside the home, <br />
                outside or at a perimeter entry point, <br />like a door or
                window ?
              </div>
              <i
                style="margin-left: 20px; font-size: large;"
                class="el-icon-warning-outline"
            /></el-tooltip>
          </el-row>
          <el-row style="margin :20px; font-size: medium;">
            <span class="demonstration">Device Name</span>
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

            <el-tooltip effect="dark" placement="right">
              <div slot="content">
                Is this [Device Type] inside the home, <br />
                outside or at a perimeter entry point, <br />like a door or
                window ?
              </div>
              <i
                style="margin-left: 20px; font-size: large;"
                class="el-icon-warning-outline"
            /></el-tooltip>
          </el-row>
          <el-row style="margin :20px; font-size: medium;">
            <span class="demonstration"> Location type </span>
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
            <el-tooltip effect="dark" placement="right">
              <div slot="content">
                Is this [Device Type] inside the home, <br />
                outside or at a perimeter entry point, <br />like a door or
                window ?
              </div>
              <i
                style="margin-left: 20px; font-size: large;"
                class="el-icon-warning-outline"
            /></el-tooltip>
          </el-row>
        </el-col>
        <el-col :span="12">
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
      <el-dialog :visible.sync="showAuthenSensor" width="40%" append-to-body>
        <div style="height: 30vh;">
          <div style=" width:100%; float: right;display: inline-flex;">
            <div style="width: 50%; margin-right: 30px;word-break: break-word;">
              <h1>
                Authenticate Sensor
              </h1>
              <h2>
                Hold the button on your [Sensor Type] for N seconds to
                authenticate it.
              </h2>
            </div>
            <div style="width: 50%">
              <div class="square">
                <div class="content">
                  Animated Graphic Feedback
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import SingleDevice from '@/components/SingleDevice';
import logoSimpleThings from '@/assets/img_src/simple_things_logo.png';
import zonesInput from '@/assets/img_src/zonesInput.png';

export default {
  name: 'DragKanbanDemo',
  components: {
    draggable,
    SingleDevice,
  },
  mounted() {
    this.groupName = this.headerText;
  },
  data() {
    return {
      groupName: '',
      editHeader: false,
      showZoneInput: false,
      showContactSensor: false,
      showAuthenSensor: false,
      itemTags: null,
      valueDeviceGroup: null,
      valueSensorType: null,
      valueLocationType: null,
      logo: logoSimpleThings,
      zonesInputImg: zonesInput,
      optionsTag: [],
    };
  },
  watch: {
    list(val, old) {
      this.resetInterval();
    },
    groupName(val, old) {
      this.changeName(val);
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
    deviceClick(item) {
      if (!item.isDefine && item.isActive) {
        var that = this;
        switch (item.name) {
          case 'Zone Input':
            this.showZoneInput = true;
            break;
          case 'Contact Sensor':
            this.showContactSensor = true;
            setTimeout(function() {
              that.showAuthen();
            }, 500);
            break;
        }
      }
    },
    showAuthen() {
      this.showAuthenSensor = true;
    },
    resetInterval: function() {
      this.$emit('fn_resetInterval');
    },
    changeName: function(val) {
      this.$emit('changeName', val);
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '');
    },
  },
};
</script>
<style scope>
.inputKaban.is-disabled .el-input__inner {
  background: transparent;
  color: white;
  border: 0px;
}
</style>
<style lang="scss" scoped>
.square {
  position: relative;
  display: inline-flex;
  margin: 15%;
  width: 60%;
  height: 60%;
}
.content {
  position: relative;
  padding: 20%;
  display: inline-flex;
  background: gray;
  color: #f0f0f0;
  font-size: medium;
  font-weight: bold;
  word-break: break-word;
  align-items: center;
}
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
    display: inline-flex;
    width: 100%;
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
