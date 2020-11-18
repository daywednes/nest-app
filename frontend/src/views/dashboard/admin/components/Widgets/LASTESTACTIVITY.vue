<template>
  <div>
    <div class="chart-wrapper">
      LASTEST ACTIVITY

      <div style="height:280px; overflow-x: auto;">
        <el-row
          :gutter="32"
          v-for="(item, index) of items"
          :key="index"
          style="width: 95%;
            text-align: left; margin: 10px; "
        >
          <el-col :xs="4" :sm="4" :lg="4">
            <img v-if="logo" :src="logo" style="float: left; height: 50px;" />
          </el-col>
          <el-col :xs="8" :sm="16" :lg="16">
            {{ item.name }}
            <br />
            {{ item.status }}
          </el-col>
          <el-col :xs="4" :sm="4" :lg="4">
            {{ item.time }}
          </el-col>
          <hr
            style=" position: absolute;left: 0;bottom: 0;width: 100%;margin: 0;"
          />
        </el-row>
        more
      </div>
    </div>
  </div>
</template>

<script>
import logoSimpleThings from '@/assets/img_src/simple_things_logo.png';
export default {
  data() {
    return {
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
        {
          icon: 'Drive Way',
          name: 'Face Detected',
          status: 'Closed',
          time: '5:42p',
        },
      ],
    };
  },
};
</script>
