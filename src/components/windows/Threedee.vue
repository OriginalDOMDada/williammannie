<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.threedee.openApp}">
<transition-group name="fade"  tag="div" class="windows">
<vue-draggable-resizable :h="400" :w="400" v-if="appData.applications.threedee.openApp" v-bind:name="appData.applications.threedee.text" v-bind:open="appData.applications.threedee.openApp" v-bind:key="1" id="threedee" class="box-md app">
<div class="big-rap">
<div class="box-header">
    <div class="title-box">
      <div class="subtitle fancy">
      <span><h2>{{appData.applications.threedee.text}}</h2></span>
      </div>
      <div class="button-section">
        <button v-on:click="appData.applications.threedee.openApp = false" class="opt red" type="button" name="expand"></button>
        <button class="opt green" type="button" name="close"></button>
      </div>
    </div>
  </div>
    <div class="wrappa-da-rappa">
        <div class="app-content viewport" name="threedee">
          <a-scene>
          <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
          <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
          <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
          <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
          <a-sky color="#ECECEC"></a-sky>
          </a-scene>
        </div>
      </div>
  </div>
</vue-draggable-resizable>
</transition-group>
</div>
</template>

<script>
  import Aframe from 'aframe'
  import appData from '../../appData.json'
  export default {
    components: { Aframe },
    name: 'Threedee',
    data () {
      return {
        appData
      }
    },
    methods: {
      changeSize () {
        this.width = Math.round(Math.random() * 400) + 100
      }
    }
  }
</script>
