<template>
  <el-form class="login-form-log" autocomplete="on" label-position="left">
    <el-form-item prop="DeviceId">
      <span style="margin-left:10px;font-size: large;"> ID</span>
      <el-input
        ref="DeviceId"
        v-model="item.id"
        style="color: black;"
        placeholder="Device Id"
        name="DeviceId"
        type="text"
        tabindex="1"
        autocomplete="on"
        :readonly="true"
      /> </el-form-item
    ><el-form-item prop="DeviceName">
      <span style="margin-left:10px;font-size: large;"> Name</span>
      <el-input
        ref="DeviceName"
        v-model="item.name"
        style="color: black;"
        placeholder="Device Name"
        name="DeviceName"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item prop="description" v-if="item.user">
      <span style="margin-left:10px;font-size: large;"> Create By</span>
      <el-input
        ref="DeviceUser"
        v-model="item.user.username"
        style="color: black;"
        placeholder="User name"
        name="DeviceUser"
        type="text"
        tabindex="2"
        autocomplete="on"
        :readonly="true"
      />
    </el-form-item>
    <el-form-item prop="label">
      <span style="margin:0 10px;font-size: large;">Manage by</span>

      <el-select v-model="item.orgId" placeholder="Select">
        <el-option
          v-for="item in orgList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="label">
      <span style="margin:0 10px;font-size: large;"> Assign to Zone</span>
      <el-select v-model="item.zoneId" clearable placeholder="Select">
        <el-option
          v-for="item in optionsZone"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item prop="label">
      <el-checkbox label="Test Device" style="display:block; font-size: large;">
      </el-checkbox>
    </el-form-item> -->
    <el-form-item prop="description">
      <span style="margin-left:10px;font-size: large;"> Description</span>
      <el-input
        ref="DeviceForm"
        v-model="item.description"
        style="color: black;"
        placeholder="Description"
        name="DeviceDescription"
        type="textarea"
        tabindex="2"
        :rows="3"
        autocomplete="on"
      />
    </el-form-item>

    <!-- <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
        </el-tooltip> -->
    <el-button
      type="primary"
      style="width:48%;margin-bottom:10px;"
      @click="updateDeviceEntity"
      >Update Device</el-button
    >
    <el-button
      style="width:48%;margin-bottom:10px; background:red; color:white;"
      @click="deleteDeviceEntity"
      >Delete Device</el-button
    >
  </el-form>
</template>

<script>
import { updateDevice, deleteDevice } from '@/api/device';
import { getZones } from '@/api/zone';
import { getOrgs } from '@/api/org';

export default {
  name: 'DeviceDetails',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      optionsZone: [],
      orgList: [],
      DeviceForm: {
        DeviceName: '',
        DeviceType: '',
        DeviceLabel: '',
        DeviceDescription: '',
      },
    };
  },
  watch: {
    orgId(val, old) {
      this.isShowLeft = false;
      this.getZonesList(val);
      this.getOrgList();
    },
  },
  computed: {
    orgId() {
      if (this.$store.getters.orgId == null) {
        alert('empty');
      }
      return this.$store.getters.orgId;
    },
  },
  mounted: function() {
    this.getZonesList(this.orgId);
    this.getOrgList();
  },
  methods: {
    getOrgList() {
      getOrgs().then(response => {
        this.orgList = response;
      });
    },
    getZonesList(val) {
      getZones(val).then(response => {
        this.optionsZone = response;
      });
    },
    updateDeviceEntity() {
      if (!this.item.name || this.item.name.length < 1) {
        alert('Please input name');
        return;
      }
      if (!this.item.description || this.item.description.length < 1) {
        alert('Please input description');
        return;
      }
      updateDevice(this.item).then(response => {
        this.$emit('refreshUI');
      });
    },
    deleteDeviceEntity() {
      deleteDevice(this.item.id).then(response => {
        this.$emit('refreshUI');
      });
    },
  },
};
</script>
