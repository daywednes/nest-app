<template>
  <div class="chart-wrapper" style="overflow: auto;">
    DISARMED
    <br />
    <img class="img-circle" style="background: #13ce66;margin:10px;" />
    <p>Ready to Arm</p>
    <el-button
      style="font-size: large; padding: 10px 0px; width:240px;"
      type="primary"
      round
      @click="
        () => {
          activeScreen = 0;
          dialogVisible = true;
        }
      "
      >ARM</el-button
    >
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      append-to-body
      style="text-align: center"
    >
      <!-- Select mode -->
      <div v-if="activeScreen == 0">
        <h1>CHOOSE AN ARMING MODE</h1>
        <br />
        <el-button
          style="font-size: large; padding: 10px 0px; width:240px;"
          type="primary"
          round
          @click="
            () => {
              activeScreen = 1;
            }
          "
          >AWAY</el-button
        >
        <p>All sensors trigger alarm</p>
        <el-button
          style="font-size: large; padding: 10px 0px; width:240px;"
          type="primary"
          round
          @click="
            () => {
              activeScreen = 1;
            }
          "
          >STAY</el-button
        >
        <p>only stay mode sensors trigger alarm</p>
        <el-button
          style="font-size: large; padding: 10px 0px; width:240px;"
          type="primary"
          round
          @click="
            () => {
              activeScreen = 1;
            }
          "
          >SLEEP</el-button
        >
        <p>sleep mode sensors trigger alarm with no entry delay</p>
      </div>

      <!-- Enter Password -->
      <div v-if="activeScreen == 1">
        <h1>ENTER YOUR PIN</h1>
        <div class="input-wrapper">
          <PincodeInput :secure="true" v-model="code" />
        </div>
        <br />
        <el-button
          style="font-size: large; padding: 10px 0px; width:240px;"
          type="primary"
          round
          @click="
            () => {
              activeScreen = 2;
            }
          "
          >NEXT</el-button
        >
      </div>

      <!-- Custom Arm -->
      <div v-if="activeScreen == 2">
        <h3>ARM BLOCKING ZONES MUST BE CLEARED OR BYPASSED BEFORE ARMING</h3>

        <div class="container">
          <img class="img-circle" style="background: red; " />
          <div class="centered">
            <countTo
              style="font-size: xx-large; color white"
              ref="countDown"
              :startVal="startVal"
              :decimals="2"
              :endVal="endVal"
              :duration="20000"
              :autoplay="false"
              :useEasing="false"
            ></countTo>
          </div>
        </div>
        <el-button
          style="font-size: large; padding: 10px 0px; margin:10px; width:100px;"
          type="warning"
          round
          @click="startCountDown"
          >Start</el-button
        >
        <br />
        <el-button
          style="font-size: large; padding: 10px 0px; width:300px;"
          type="primary"
          round
          @click="pauseResume"
          >Cancel</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
div.vue-pincode-input-wrapper {
}

input.vue-pincode-input {
}
.container {
  position: relative;
  text-align: center;
  color: white;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.img-circle {
  margin: 20px;
  border-radius: 50%;
  width: 120px;
  height: 120px;
}
p {
  font-size: small;
  margin: 5px;
}
</style>
<script>
import countTo from 'vue-count-to';
import PincodeInput from 'vue-pincode-input';
import logoSimpleThings from '@/assets/img_src/simple_things_logo.png';
export default {
  components: { countTo, PincodeInput },
  data() {
    return {
      startVal: 20,
      endVal: 0,
      activeScreen: 0,
      dialogVisible: false,
      innerVisible: false,
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
  methods: {
    startCountDown() {
      this.$refs.countDown.start();
    },
    pauseResume() {
      this.$refs.countDown.pauseResume();
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  },
};
</script>
