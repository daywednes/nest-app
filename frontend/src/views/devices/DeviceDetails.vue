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
        :readonly='true'
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
    <el-form-item prop="description">
      <span style="margin-left:10px;font-size: large;"> Description</span>
      <el-input
        ref="DeviceType"
        v-model="item.description"
        style="color: black;"
        placeholder="Device Description"
        name="DeviceType"
        type="text"
        tabindex="2"
        autocomplete="on"
      />
    </el-form-item>
    <!-- <el-form-item prop="label">
      <span style="margin-left:10px;font-size: large;"> Label</span>
      <el-input
        ref="DeviceType"
        v-model="DeviceForm.DeviceLabel"
        style="color: black;"
        placeholder="Label"
        name="Label"
        type="text"
        tabindex="2"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item prop="label">
      <el-checkbox label="Test Device" style="display:block; font-size: large;">
      </el-checkbox>
    </el-form-item>
    <el-form-item prop="description">
      <span style="margin-left:10px;font-size: large;"> Description</span>
      <el-input
        ref="DeviceForm"
        v-model="DeviceForm.DeviceDescription"
        style="color: black;"
        placeholder="Description"
        name="DeviceDescription"
        type="textarea"
        tabindex="2"
        :rows="3"
        autocomplete="on"
      />
    </el-form-item> -->

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
      DeviceForm: {
        DeviceName: '',
        DeviceType: '',
        DeviceLabel: '',
        DeviceDescription: '',
      },
    };
  },
  mounted: function() {},
  methods: {
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
