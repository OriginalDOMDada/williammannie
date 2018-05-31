<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.skills.openApp}">
<transition-group name="fade" tag="div" class="windows">
<div v-if="appData.applications.skills.openApp" v-bind:name="appData.applications.skills.text" v-bind:open="appData.applications.skills.openApp" v-bind:key="3" id="skills" class="box-md app" @mousedown="high" v-bind:style="{ left: x + 'px', top: y + 'px', height: height + 'px', width: width + 'px', 'z-index': z }">
<div class="big-rap">
<div class="box-header" @mousedown.prevent="startMove" @touchstart.prevent="startMove">
    <div class="title-box">
      <div class="subtitle fancy">
      <span><h2>{{appData.applications.skills.text}}</h2></span>
      </div>
      <div class="button-section">
        <button v-touch:tap="explode" v-on:click="explode" class="opt red" type="button" name="expand"><svgicon v-on:click="appData.applications.skills.openApp = false" name="close" height="6" width="6" :original="true"></svgicon></button>
        <button class="opt green" type="button" name="fullSize" v-touch:tap="fullSize" v-on:click="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
      </div>
    </div>
  </div>
    <div class="wrappa-da-rappa">
        <div class="app-content" name="skills">
          <div class="skills-wrapper">
            <p class="skilltitle"><vue-typer text="William Mannie's Skills" :repeat="0" caret-animation="blink" @completed="skilltitle = true"></vue-typer></p>
            <div class="daskills">
              <ul>
                <li><vue-typer v-if="skilltitle" text="Adobe Photoshop" :repeat="0" @completed="photoshop = true"></vue-typer></li>
                <li><vue-typer v-if="photoshop" text="Adobe Illustrator" :repeat="0" @completed="illustrator = true"></vue-typer></li>
                <li><vue-typer v-if="illustrator" text="Adobe XD"  :repeat="0" @completed="xd = true"></vue-typer></li>
                <li><vue-typer v-if="xd" text="Adobe After Effects" :repeat="0" @completed="aftereffects = true"></vue-typer></li>
                <li><vue-typer v-if="aftereffects" text="HTML5"  :repeat="0" @completed="html5 = true"></vue-typer></li>
                <li><vue-typer v-if="html5" text="XML"  :repeat="0" @completed="xml = true"></vue-typer></li>
                <ul>
                  <li><vue-typer v-if="xml" text="SVG's"  :repeat="0" @completed="svg = true"></vue-typer></li>
                </ul>
                <li><vue-typer v-if="svg" text="CSS"  :repeat="0" @completed="css = true"></vue-typer></li>
                  <ul>
                    <li><vue-typer v-if="css" text="CSS3"  :repeat="0" @completed="css3 = true"></vue-typer></li>
                    <li><vue-typer v-if="css3" text="SASS"  :repeat="0" @completed="sass = true"></vue-typer></li>
                  </ul>
                <li><vue-typer v-if="sass" text="Javascript"  :repeat="0" @completed="javascript = true"></vue-typer></li>
                  <ul>
                    <li><vue-typer v-if="javascript" text="Vue.js"  :repeat="0" @completed="vue = true"></vue-typer></li>
                    <li><vue-typer v-if="vue" text="Node"  :repeat="0" @completed="node = true"></vue-typer></li>
                    <li><vue-typer v-if="node" text="D3"  :repeat="0" @completed="d3 = true"></vue-typer></li>
                    <li><vue-typer v-if="d3" text="Angular"  :repeat="0" @completed="angular = true"></vue-typer></li>
                    <li><vue-typer v-if="angular" text="Ajax"  :repeat="0" @completed="ajax = true"></vue-typer></li>
                    <li><vue-typer v-if="ajax" text="Api's"  :repeat="0" @completed="apis = true"></vue-typer></li>
                  </ul>
                <li><vue-typer v-if="apis" text="Php"  :repeat="0" @completed="php = true"></vue-typer></li>
                  <ul>
                    <li><vue-typer v-if="php" text="PHP5"  :repeat="0" @completed="php5 = true"></vue-typer></li>
                    <li><vue-typer v-if="php5" text="Wordpress"  :repeat="0" @completed="wordpress = true"></vue-typer></li>
                    <li><vue-typer v-if="wordpress" text="Drupal 7 & 8"  :repeat="0" @completed="drupal = true"></vue-typer></li>
                  </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </div>
    <div class="resize bottom-right" @touchstart.prevent='resizebottomright' @mousedown.prevent='resizebottomright'></div>
</div>
</transition-group>
</div>
</template>

<script>
import appData from '../../appData.json'
import '../../compiled-icons'

export default {
  data: function () {
    return {
      appData,
      dragState: false,
      parent: false,
      x: 0,
      y: 0,
      height: 400,
      width: 400,
      z: 200,
      count: 0,
      skilltitle: false,
      photoshop: false,
      illustrator: false,
      xd: false,
      aftereffects: false,
      html5: false,
      xml: false,
      svg: false,
      css: false,
      css3: false,
      sass: false,
      javascript: false,
      vue: false,
      node: false,
      d3: false,
      angular: false,
      ajax: false,
      php: false,
      php5: false,
      apis: false,
      wordpress: false
    }
  },
  updated () {
    if (this.count === 0) {
      this.startup()
      this.count = 1
    }
  },
  methods: {
    startup: function () {
      var initalWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
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
    fullSize: function () {
      this.height = window.innerHeight - 55
      this.width = window.innerWidth
      this.x = 0
      this.y = 0
    },
    startMove: function (event) {
      var $this = this
      const touch = event.type === 'touchstart'
      if (!touch && event.button !== 0) return
      const events = touch ? {move: 'touchmove', stop: 'touchend'} : {move: 'mousemove', stop: 'mouseup'}
      const point = {
        x: event.clientX || event.touches[0].clientX,
        y: event.clientY || event.touches[0].clientY
      }
      const getPos = touch ? getTouchPos : getMousePos
      var moving = true
      var differenceX = $this.x - point.x
      var differenceY = $this.y - point.y
      const updateFn = () => {
        if (moving) {
          requestAnimationFrame(updateFn)
          $this.x = point.x - Math.abs(differenceX)
          $this.y = point.y - Math.abs(differenceY)
        }
      }
      const moveFn = event => getPos(event, point)
      const stopFn = event => {
        moving = false
        window.removeEventListener(events.move, moveFn)
        window.removeEventListener(events.stop, stopFn)
      }
      requestAnimationFrame(updateFn)
      moveFn(events)
      window.addEventListener(events.move, moveFn)
      window.addEventListener(events.stop, stopFn)
    },
    resizebottomright: function (event) {
      var $this = this
      const touch = event.type === 'touchstart'
      if (!touch && event.button !== 0) return
      const events = touch ? {move: 'touchmove', stop: 'touchend'} : {move: 'mousemove', stop: 'mouseup'}
      const point = {
        x: event.clientX || event.touches[0].clientX,
        y: event.clientY || event.touches[0].clientY
      }
      const getPos = touch ? getTouchPos : getMousePos
      var moving = true
      const updateFn = () => {
        if (moving) {
          requestAnimationFrame(updateFn)
          $this.width = Math.abs($this.x - point.x)
          var height = Math.abs($this.y - point.y) - 55
          $this.height = height
          // $this.y = point.y - Math.abs(differenceY)
        }
      }
      const moveFn = event => getPos(event, point)
      const stopFn = event => {
        moving = false
        window.removeEventListener(events.move, moveFn)
        window.removeEventListener(events.stop, stopFn)
      }
      requestAnimationFrame(updateFn)
      moveFn(events)
      window.addEventListener(events.move, moveFn)
      window.addEventListener(events.stop, stopFn)
    },
    buttonpress: function () {
      this.isActive = true
    },
    buttonup: function () {
      this.isActive = false
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
        this.z = largest + 1
      }
    },
    explode: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.appData.applications.skills.openApp = false
      this.count = 0
      this.height = 400
      this.width = 400
      setTimeout(function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
        document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
      }, 1000)
      this.skilltitle = false
      this.photoshop = false
      this.illustrator = false
      this.xd = false
      this.aftereffects = false
      this.html5 = false
      this.xml = false
      this.svg = false
      this.css = false
      this.css3 = false
      this.sass = false
      this.javascript = false
      this.vue = false
      this.node = false
      this.d3 = false
      this.angular = false
      this.ajax = false
      this.php = false
      this.php5 = false
      this.apis = false
      this.wordpress = false
    }
  }
}
function getMousePos (mouseEvent, point) {
  point.x = mouseEvent.clientX
  point.y = mouseEvent.clientY
}
function getTouchPos (touchEvent, point) {
  point.x = event.touches[0].clientX
  point.y = event.touches[0].clientY
}
</script>
