<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.aboutme.openApp}">
<transition-group name="fade" tag="div" class="windows">
<vue-draggable-resizable :x.sync="x" :y.sync="y" :active="true" :draggable="dragState" @activated="high" :maximize="true" :z.sync="appData.applications.aboutme.z" :parent="parent" :resizing="true" :h="400" :w="400" :minh="400" :minw="400" v-if="appData.applications.aboutme.openApp" v-bind:name="appData.applications.aboutme.text" v-bind:open="appData.applications.aboutme.openApp" v-bind:key="1" id="aboutme" class="box-md app">
<div class="big-rap">
<div class="box-header" @mouseover="dragOn" @mouseleave="dragOff">
    <div class="title-box">
      <div class="subtitle fancy">
      <span><span class="two"><h2>{{appData.applications.aboutme.text}}</h2></span></span>
      </div>
      <div class="button-section">
        <button v-touch:tap="explode" v-on:click="explode" class="opt red" type="button" name="expand"><svgicon v-on:click="appData.applications.aboutme.openApp = false" name="close" height="6" width="6" :original="true"></svgicon></button>
        <button class="opt green" type="button" name="fullSize" v-touch:tap="fullSize" v-on:click="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
      </div>
    </div>
  </div>
    <div class="wrappa-da-rappa">
        <div class="app-content" name="aboutme">
          <p><span class="intro-heading">H</span>ello, My name is <a v-touch:tap="mannie" @mouseover='mannie' @mouseleave='before' href='#'>William Mannie</a>, I am a magical <a v-touch:tap="unicorn" @mouseover='unicorn' @mouseleave='before' href="#">unicorn</a> that likes to <a v-touch:tap="create" @mouseover='create' @mouseleave='before' href="#">create</a> really <a v-touch:tap="cool" @mouseover='cool' @mouseleave='before' href="#">cool</a> ass <a v-touch:tap="shit" @mouseover='shit' @mouseleave='before' href="#">shit</a>. I currently <a v-touch:tap="blaze" @mouseover='blaze' @mouseleave='before' href="#">blaze</a> the streets of <a v-touch:tap="dc" @mouseover='dc' @mouseleave='before' href="#">Washinton, D.C.</a>, where by day I am <a v-touch:tap="webdev" @mouseover='webdev' @mouseleave='before' href="#">web developer</a> at Adfro. To maintain my <a v-touch:tap="survival"  @mouseover='survival' @mouseleave='before' href="#">survial</a> i eat... <a v-touch:tap="alot" @mouseover='alot' @mouseleave='before' href="#">a lot</a>. But in my spare <a v-touch:tap="time" @mouseover='time' @mouseleave='before' href="#">time</a>, i enjoy riding my <a v-touch:tap="bike" @mouseover='bike' @mouseleave='before' href="#">bike</a> and <a  v-touch:tap="hunting" @mouseover='hunting' @mouseleave='before' href="#">hunting</a> the <a v-touch:tap="internet" @mouseover='internet' @mouseleave='before' href="#">internet</a> for <a v-touch:tap="awesomeness" @mouseover='awesomeness' @mouseleave='before' href="#">awesomeness</a>. My areas of <a v-touch:tap="expert" @mouseover='expert' @mouseleave='before' href="#">expertiese</a> lie within Front-End Development, User Experience <a v-touch:tap="design" @mouseover='design' @mouseleave='before' href="#">Design</a>, and <a v-touch:tap="draw" @mouseover='draw' @mouseleave='before' href="#">Illustrating</a>. Check out my <a v-touch:tap="domain" @mouseover='domain' @mouseleave='before' href='#'>domain</a> and see what I've been up to <a v-touch:tap="lately" @mouseover='lately' @mouseleave='before' href="#">lately</a>.</p>
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
      y: 0
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
    window.getSelection().empty()
  },
  methods: {
    fullSize: function () {
      this.parent = true
      var doubleClickEvent = document.createEvent('MouseEvents')
      doubleClickEvent.initEvent('dblclick', true, true)
      for (var i = 0; i < 1000; i++) {
        this.$el.querySelector('#aboutme').dispatchEvent(doubleClickEvent)
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
        appData.applications.aboutme.z = largest + 1
      }
    },
    mannie: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/keef.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
      document.getElementsByClassName('hello')['0'].style.opacity = '0'
    },
    unicorn: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/unicorn.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    create: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/lego.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    cool: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/cool.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    shit: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/shit.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    blaze: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/blaze.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    dc: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/dc.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    webdev: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/webdev.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    bike: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/bike.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    survival: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/survival.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    alot: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/alot.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    hunting: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/hunting.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    internet: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/internet.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '50% auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    awesomeness: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/coolio.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    time: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/time.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    lately: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/lately.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    expert: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/cut-it-out.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    design: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/design.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    draw: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/draw.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '50% auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    domain: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/looking.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    before: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
      document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.9)'
      document.getElementsByClassName('hello')['0'].style.opacity = '1'
    },
    explode: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.appData.applications.aboutme.openApp = false
      setTimeout(function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
        document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
      }, 1000)
    }
  }
}
</script>
