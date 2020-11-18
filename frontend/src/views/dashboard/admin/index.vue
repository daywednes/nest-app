<template>
  <div class="dashboard-editor-container">
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <el-row
      style="background:#fff;padding:10px 10px;margin:10px 10px 10px 10px; text-align:right;"
    >
      <!-- <line-chart :chart-data="lineChartData" /> -->
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-search"
        >Edit</el-button
      > -->

      <el-checkbox v-model="isEdited">Edit</el-checkbox>
    </el-row>

    <RightPanel
      :showLeft="isEdited"
      @leftPanelIsShow="leftPanelIsShow"
      @leftPanelIsHide="leftPanelIsHide"
    >
      <div>
        <WEATHER/>
      </div>
    </RightPanel>
    <grid-layout
      :style="{
        width: this.isEdited ? 'calc(100% - 300px)' : '100%',
        transition: 'all 1s cubic-bezier(0.7, 0.3, 0.1, 1)',
      }"
      :isResizable="false"
      :layout.sync="layout"
      :col-num="5"
      :row-height="160"
      :is-draggable="isEdited"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        class="chart-wrapper"
        style="background: white"
        v-for="item in layout"
        :static="item.isStatic"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <component :is="item.component" />
      </grid-item>
    </grid-layout>
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

import RightPanel from '@/components/RightPanelExtra';
import weatherBG from '@/assets/img_src/weather_bg.png';
import logoSimpleThings from '@/assets/img_src/simple_things_logo.png';
import lasthourBG from '@/assets/img_src/lasthour_bg.png';
import VueGridLayout from 'vue-grid-layout';
import LAST12HOURS from './components/Widgets/LAST12HOURS';
import WEATHER from './components/Widgets/WEATHER';
import LASTESTACTIVITY from './components/Widgets/LASTESTACTIVITY';
import ADDDEVICES from './components/Widgets/ADDDEVICES';
import ADDAUTOMATION from './components/Widgets/ADDAUTOMATION';
import ZONES from './components/Widgets/ZONES';
import DISARMED from './components/Widgets/DISARMED';
import SECURITYSENSORS from './components/Widgets/SECURITYSENSORS';
import CITYZEN from './components/Widgets/CITYZEN';

export default {
  name: 'DashboardAdmin',

  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    LAST12HOURS,
    WEATHER,
    LASTESTACTIVITY,
    ADDDEVICES,
    ADDAUTOMATION,
    ZONES,
    DISARMED,
    CITYZEN,
    SECURITYSENSORS,
    RightPanel,
  },

  data() {
    return {
      isEdited: false,
      isEdited: false,
      lineChartData: lineChartData.newVisitis,
      weatherimg: weatherBG,
      lasthourimg: lasthourBG,
      logo: logoSimpleThings,
      items: [
        {
          icon: 'Front-door',
          name: 'Front-door',
          status: 'Opened',
          time: '1:22p',
        },
        {
          icon: 'Front-door',
          name: 'Front-door',
          status: 'Closed',
          time: '2:34p',
        },
        {
          icon: 'Bedroom Window',
          name: 'Bedroom Window',
          status: 'Opened & Closed',
          time: '3:40p',
        },
        {
          icon: 'Drive Way',
          name: 'Face Detected',
          status: 'Opened',
          time: '5:22p',
        },
      ],
      layout: [
        {
          x: 0,
          y: 0,
          w: 2,
          h: 2,
          i: 'DISARMED',
          component: 'DISARMED',
          isStatic: true,
        },
        {
          x: 0,
          y: 2,
          w: 2,
          h: 1,
          i: 'SECURITY SENSORS',
          component: 'SECURITYSENSORS',
        },
        { x: 0, y: 3, w: 2, h: 2, i: 'CITYZEN', component: 'CITYZEN' },
        { x: 2, y: 0, w: 2, h: 1, i: 'WEATHER', component: 'WEATHER' },
        {
          x: 2,
          y: 1,
          w: 2,
          h: 2,
          i: 'LASTEST ACTIVITY',
          component: 'LASTESTACTIVITY',
        },
        {
          x: 2,
          y: 3,
          w: 3,
          h: 2,
          i: 'LAST 12 HOURS',
          component: 'LAST12HOURS',
        },
        { x: 4, y: 0, w: 1, h: 1, i: 'ZONES', component: 'ZONES' },
        { x: 4, y: 1, w: 1, h: 1, i: 'ADD DEVICES', component: 'ADDDEVICES' },
        {
          x: 4,
          y: 2,
          w: 1,
          h: 1,
          i: 'ADD AUTOMATION',
          component: 'ADDAUTOMATION',
        },
      ],
    };
  },
  methods: {
    leftPanelIsShow: function() {
      this.isEdited = true;
    },
    leftPanelIsHide: function() {
      this.isEdited = false;
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
  },
};
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
