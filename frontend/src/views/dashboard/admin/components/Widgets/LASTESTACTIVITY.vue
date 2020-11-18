<template>
    <div>
        <div class="chart-wrapper" style="height:312px; overflow-x: auto;">
          LASTEST ACTIVITY
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
      ],
    };
  },
};
</script>