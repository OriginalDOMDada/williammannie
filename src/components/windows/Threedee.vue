<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.threedee.openApp}">
<transition-group name="fade"  tag="div" class="windows">
<vue-draggable-resizable :x.sync="x" :y.sync="y" :active="true" :draggable="dragState" @activated="high" :maximize="true" :z.sync="appData.applications.threedee.z" :parent="parent" :resizing="true" :h="400" :w="400" :minh="400" :minw="400" v-if="appData.applications.threedee.openApp" v-bind:name="appData.applications.threedee.text" v-bind:open="appData.applications.threedee.openApp" v-bind:key="1" id="threedee" class="box-md app">
<div class="big-rap">
<div class="box-header">
    <div class="title-box">
      <div class="subtitle fancy">
      <span><h2>{{appData.applications.threedee.text}}</h2></span>
      </div>
      <div class="button-section">
        <button v-touch:tap="explode" v-on:click="explode" class="opt red" type="button" name="expand"><svgicon v-on:click="appData.applications.threedee.openApp = false" name="close" height="6" width="6" :original="true"></svgicon></button>
        <button class="opt green" type="button" name="fullSize" v-touch:tap="fullSize" v-on:click="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
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
    data: function () {
      return {
        appData,
        dragState: false,
        parent: false,
        x: 0,
        y: 0
      }
    },
    beforeUpdate () {
      var initalWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      var initalHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      console.log(initalHeight)
      var initalX = (initalWidth / 2) - 200
      var initalY = 50
      var activeApps = document.getElementsByClassName('app')
      var appArray = []
      for (var i = 0; i < activeApps.length; i++) {
        var eachActive = activeApps[i]
        appArray.push(eachActive)
      }
      initalY = 50 + (50 * appArray.length)
      initalX = initalX + (50 * appArray.length)
      this.x = initalX
      this.y = initalY
    },
    methods: {
      fullSize: function () {
        this.parent = true
        var doubleClickEvent = document.createEvent('MouseEvents')
        doubleClickEvent.initEvent('dblclick', true, true)
        for (var i = 0; i < 1000; i++) {
          this.$el.querySelector('#threedee').dispatchEvent(doubleClickEvent)
        }
      },
      dragOn: function () {
        this.dragState = true
      },
      dragOff: function () {
        this.dragState = false
      },
      parentOn: function () {
        this.parent = true
      },
      parentOff: function () {
        this.parent = false
      },
      high: function () {
        var activeApps = document.getElementsByClassName('app')
        var initalHi = 200
        var zIndexs = []
        for (var i = 0; i < activeApps.length; i++) {
          var zindex = parseInt(activeApps[i].style.zIndex)
          zIndexs.push(zindex)
        }
        var largest = Math.max.apply(Math, zIndexs)
        if (initalHi <= largest) {
          appData.applications.threedee.z = largest + 1
        }
      },
      explode: function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
        document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
        this.appData.applications.threedee.openApp = false
        setTimeout(function () {
          document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
          document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
          document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
        }, 1000)
      }
    }
  }
</script>
