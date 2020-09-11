/* eslint-disable */
<template>
<div>
    <!-- <DockPlugin/> -->
  <div class="editor">
    <div class="container">
        <div class="node-editor"></div>
    </div>
    <div class="dock"></div>
</div>
</div>
</template>

<script>
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import DockPlugin from "rete-dock-plugin";

export default {
  name: "ReteDock",
  components: { DockPlugin, Rete, ConnectionPlugin, VueRenderPlugin }
};
</script>
<style scoped>
.editor {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    height: 100vh;
}

.dock {
    height: 100px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
}

.dock-item {
    display: inline-block;
    vertical-align: top;
    transform: scale(0.8);
    transform-origin: 50% 0;
}

.container {
    flex: 1;
    overflow: hidden;
}
</style>