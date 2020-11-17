<template>
  <div class="dashboard-editor-container">
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <el-row
      style="background:#fff;padding:16px 16px;margin-bottom:32px; width:100%; text-align:right;"
    >
      <!-- <line-chart :chart-data="lineChartData" /> -->
      Edit
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper" style="height:290px;">
          DISARMED
        </div>
        <div class="chart-wrapper" style="height:162px;">
          SECURITY SENSOR
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper" style="color:white; height:140px; background: #101f3e;">
          WEATHER
          <br />
          <img v-if="weatherimg" :src="weatherimg"  style="height:90px;" />
        </div>
        <div class="chart-wrapper" style="height:312px;">
          LASTEST ACTIVITY
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="4">
        <div class="chart-wrapper" style="height:140px;">
          ZONES
          <br />
          <span style="font-size: xxx-large;"><i class="el-icon-plus"/></span>
        </div>
        <div class="chart-wrapper" style="height:140px;">
          ADD DEVICE
          <br />
          <span style="font-size: xxx-large;"><i class="el-icon-plus"/></span>
        </div>
        <div class="chart-wrapper" style="height:140px;">
          ADD AUTOMATION
          <br />
          <span style="font-size: xxx-large;"><i class="el-icon-plus"/></span>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper" style="height:200px;">
          CITIZEN
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="14">
        <div class="chart-wrapper" style="height:200px;">
          LAST 12 HOURS
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: 'DashboardAdmin',

  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      weatherimg: weatherBG,
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
  },
};

import weatherBG from '@/assets/img_src/weather_bg.png';
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    text-align: center;
    font-weight: bold;
    font-size: large;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
