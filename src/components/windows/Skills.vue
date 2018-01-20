<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.skills.openApp}">
<transition-group name="fade" tag="div" class="windows">
<vue-draggable-resizable :x.sync="x" :y.sync="y" :active="true" :draggable="dragState" @activated="high" :maximize="true" :z.sync="appData.applications.skills.z" :parent="parent" :resizing="true" :h="400" :w="400" :minh="400" :minw="400" v-if="appData.applications.skills.openApp" v-bind:name="appData.applications.skills.text" v-bind:open="appData.applications.skills.openApp" v-bind:key="1" id="skills" class="box-md app">
<div class="big-rap">
<div class="box-header" @mouseover="dragOn" @mouseleave="dragOff">
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
</vue-draggable-resizable>
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
  beforeUpdate () {
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
  methods: {
    fullSize: function () {
      this.parent = true
      var doubleClickEvent = document.createEvent('MouseEvents')
      doubleClickEvent.initEvent('dblclick', true, true)
      for (var i = 0; i < 1000; i++) {
        this.$el.querySelector('#skills').dispatchEvent(doubleClickEvent)
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
        appData.applications.skills.z = largest + 1
      }
    },
    explode: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.appData.applications.skills.openApp = false
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
</script>
