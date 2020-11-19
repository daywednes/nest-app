<template>
  <div
    class="chart-wrapper"
    style="overflow: auto;"
  >
    DISARMED
    <br />
    <img class="img-circle" style="background: #13ce66;; " />
    <br />
    <p>Ready to Arm</p>
    <br />
    <el-button
      style="font-size: large; padding: 5px 40px;"
      type="primary"
      round
      disabled
      >ARM</el-button
    >
  </div>
</template>
<style scoped>
.img-circle {
  margin: 20px;
  border-radius: 50%;
  width: 120px;
  height: 120px;
}
p {
  font-size: small;
}
</style>
<script>
import logoSimpleThings from '@/assets/img_src/simple_things_logo.png';
export default {
  data() {
    return {
      logo: logoSimpleThings,
    };
  },
};
</script>
