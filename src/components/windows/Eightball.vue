<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.eightball.openApp}">
<transition-group name="fade"  tag="div" class="windows">
<vue-draggable-resizable :x.sync="x" :y.sync="y" :active="true" @activated="high" :z.sync="appData.applications.eightball.z" :h="400" :w="400" v-if="appData.applications.eightball.openApp" v-bind:name="appData.applications.eightball.text" v-bind:open="appData.applications.eightball.openApp" v-bind:key="1" id="eightball" class="box-md app">
<div class="big-rap">
<div class="box-header">
    <div class="title-box">
      <div class="subtitle fancy">
      <span><h2>{{appData.applications.eightball.text}}</h2></span>
      </div>
      <div class="button-section">
        <button v-touch:tap="explode" v-on:click="explode" class="opt red" type="button" name="expand"><svgicon v-on:click="appData.applications.eightball.openApp = false" name="close" height="6" width="6" :original="true"></svgicon></button>
        <button class="opt green" type="button" name="fullSize" v-touch:tap="fullSize" v-on:click="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
      </div>
    </div>
  </div>
    <div class="wrappa-da-rappa">
        <div class="app-content" name="eightball">
        <div class="magic-8-ball" id="magic-move">
          <div class="da-blue">
            <div class="magic-triangle">
              <p class="da-answer">{{answer}}</p>
            </div>
          </div>
        </div>
        <div class="button-wrapper">
          <p id="ballanswer">{{answer}}</p>
          <div class="prebee">
          <button id="answerButton" v-on:click.prevent="answerMe" @mousedown="buttonpress" @mouseup="buttonup" v-bind:class="{ active: isActive }">Try Me</button>
          </div>
        </div>
        </div>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
      </div>
  </div>
</vue-draggable-resizable>
</transition-group>
</div>
</template>

<script>
import appData from '../../appData.json'

export default {
  data: function () {
    return {
      appData,
      answer: '',
      dragState: false,
      parent: false,
      isActive: false,
      x: 0,
      y: 0,
      clickon: false,
      answers: ['Maybe.', 'Certainly not.', 'I hope so.', 'Not in your wildest dreams.', 'There is a good chance.', 'Quite likely.', 'I think so.', 'I hope not.', 'I hope so.', 'Never!', 'Forget about it.', 'Ahaha! Really?!?', 'Pfft.', 'Sorry, bucko.', 'Hell, yes.', 'Hell to the no.', 'The future is bleak.', 'The future is uncertain.', 'I would rather not say.', 'Who cares?', 'Possibly.', 'Never, ever, ever.', 'There is a small chance.', 'Yes!']
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
    answerMe: function () {
      if (this.clickon) {
        return false
      }
      var $this = this
      $this.clickon = true
      var ball = document.getElementById('magic-move')
      var daanswer = document.getElementById('ballanswer')
      var innerball = this.$el.querySelector('.magic-triangle')
      ball.classList.add('answerShake')
      innerball.classList.add('hide')
      innerball.classList.remove('show')
      innerball.classList.add('answerShake')
      daanswer.classList.remove('show')
      daanswer.classList.add('hide')
      setTimeout(function () {
        $this.answer = $this.answers[Math.floor(Math.random() * $this.answers.length)]
        daanswer.classList.remove('hide')
        daanswer.classList.add('show')
        ball.classList.remove('answerShake')
        innerball.classList.remove('answerShake')
        innerball.classList.add('show')
        innerball.classList.remove('hide')
        $this.clickon = false
      }, 1500)
    },
    buttonpress: function () {
      this.isActive = true
    },
    buttonup: function () {
      this.isActive = false
    },
    fullSize: function () {
      this.parent = true
      var doubleClickEvent = document.createEvent('MouseEvents')
      doubleClickEvent.initEvent('dblclick', true, true)
      for (var i = 0; i < 1000; i++) {
        this.$el.querySelector('#eightball').dispatchEvent(doubleClickEvent)
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
        appData.applications.eightball.z = largest + 1
      }
    },
    explode: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.appData.applications.eightball.openApp = false
      setTimeout(function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
        document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
      }, 1000)
    }
  }
}
</script>
