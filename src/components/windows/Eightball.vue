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
        <button v-on:click="explode" class="opt red" type="button" name="expand"><span>+</span></button>
        <button class="opt green" type="button" name="close"><span>&#8853;</span></button>
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
          <p>{{answer}}</p>
          <div class="prebee">
          <button id="answerButton" v-on:click="answerMe">Try Me</button>
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
      x: 0,
      y: 0,
      answers: ['Maybe.', 'Certainly not.', 'I hope so.', 'Not in your wildest dreams.']
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
    answerMe: function () {
      this.answer = this.answers[Math.floor(Math.random() * this.answers.length)]
      var ball = document.getElementById('magic-move')
      if (ball.classList.contains('answerShake')) {
        ball.classList.remove('answerShake')
      }
      ball.classList.add('answerShake')
      setTimeout(answerReveal, 1000)
      function answerReveal () {
        ball.classList.remove('answerShake')
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
        appData.applications.eightball.z = largest + 1
      }
      console.log(this.$el)
    },
    explode: function () {
      this.appData.applications.eightball.openApp = false
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      setTimeout(function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
        document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
      }, 1000)
    }
  }
}
</script>
