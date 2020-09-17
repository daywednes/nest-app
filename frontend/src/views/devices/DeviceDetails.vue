<template>
  <el-form class="login-form-log" autocomplete="on" label-position="left">
    <el-form-item prop="DeviceName">
      <span style="margin-left:10px;font-size: large;"> Name</span>
      <el-input
        ref="DeviceName"
        v-model="DeviceForm.DeviceName"
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
        v-model="DeviceForm.DeviceType"
        style="color: black;"
        placeholder="Device Description"
        name="DeviceType"
        type="text"
        tabindex="2"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item prop="label">
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
    </el-form-item>

    <!-- <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
        </el-tooltip> -->
    <el-button type="primary" style="width:100%;margin-bottom:10px;"
      >Create Device</el-button
    >
  </el-form>
</template>

<script>


export default {
  name: 'DeviceDetails',
  data() {
    return {
      DeviceForm: {
        DeviceName: '',
        DeviceType: '',
        DeviceLabel: '',
        DeviceDescription: '',
      }
    };
  },
  mounted: function() {},
  methods: {
    
  },
};

</script>
