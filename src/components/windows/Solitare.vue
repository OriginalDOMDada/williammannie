<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.solitare.openApp}">
<transition-group name="fade"  tag="div" class="windows">
<vue-draggable-resizable :x.sync="x" :y.sync="y" :active="true" @activated="high" :h="400" :w="400" :z.sync="appData.applications.solitare.z" v-if="appData.applications.solitare.openApp" v-bind:name="appData.applications.solitare.text" v-bind:open="appData.applications.solitare.openApp" v-bind:key="1" id="solitare" class="box-md app" v-on:resizing="onResize">
<div class="big-rap">
<div class="box-header">
    <div class="title-box">
      <div class="subtitle fancy">
      <span><h2>{{appData.applications.solitare.text}}</h2></span>
      </div>
      <div class="button-section">
        <button v-on:click="appData.applications.solitare.openApp = false" class="opt red" type="button" name="expand"></button>
        <button class="opt green" type="button" name="close"></button>
      </div>
    </div>
  </div>
    <div class="wrappa-da-rappa">
        <div class="app-content viewport" name="solitare">
          <p id="solitare-message">Screw it, you already won!<br> Just toss the cards!</p>
          <div class="button-wrapper">
            <div class="prebee">
              <button class="throwsum" v-on:click="throwsum">Throw Some</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</vue-draggable-resizable>
</transition-group>
</div>
</template>

<script>
  import SolitaireWin from 'solitairewin'
  import appData from '../../appData.json'

  export default {
    components: { SolitaireWin },
    name: 'Solitare',
    data () {
      return {
        appData,
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
      console.log(appArray)
      this.x = initalX
      this.y = initalY
    },
    methods: {
      throwsum: function (event) {
        console.log(this.$el)
        document.getElementById('solitare-message').remove()
        var win = new SolitaireWin({
          viewport: document.querySelector('.viewport'),
          path: 'static/cards/',
          images: [
            'AC.svg',
            'AD.svg',
            'AH.svg',
            'AS.svg',
            'JC.svg',
            'JD.svg',
            'JH.svg',
            'JS.svg',
            'KC.svg',
            'KD.svg',
            'KH.svg',
            'KS.svg',
            'QC.svg',
            'QD.svg',
            'QH.svg',
            'QS.svg'
          ],
          resize: true
        })
        win.load(function () {
          win.start()
        })
      },
      onResize: function (x, y, width, height) {
        var hasCanvas = document.getElementsByClassName('sw-canvas')
        if (typeof (hasCanvas) !== 'undefined' && hasCanvas !== null) {
          if (this.$el.getElementsByClassName('sw-canvas').length > 0) {
            var resizeEvent = window.document.createEvent('UIEvents')
            resizeEvent.initUIEvent('resize', true, false, window, 0)
            window.dispatchEvent(resizeEvent)
          }
        }
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
          appData.applications.solitare.z = largest + 1
        }
        console.log(this.$el)
      }
    }
  }
</script>
