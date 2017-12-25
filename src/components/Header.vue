<template>
<div>
  <div class='header'>
    <div class='dropdown'>
      <svgicon class="top-logo" name="top_logo" height="30" width="30" :original="true"></svgicon>
      <button v-on:click='expand' class='dropbtn' id='window'>William <b>Mannie</b></button>
      <div id='myDropdown' class='dropdown-content' style="display:none;">
        <a href='#'>Link 1</a>
        <a href='#'>Link 2</a>
        <a href='#'>Link 3</a>
      </div>
    </div>
    <div class="marquee3k disco" data-speed="0.25" data-pausable="bool">
      <p>Dreaming a thought... that could dream about a thought, that could think of the dreamer that thought, that could think of dreaming and getting a glimmer of God...</p>
    </div>
    <div id='todaysDate'></div>
  </div>
  <div class="social">
    <div class="twitter">
      <svgicon height="28" width="28" name="twitter"></svgicon>
    </div>
    <div class="dribble">
      <svgicon height="28" width="28" name="dribble"></svgicon>
    </div>
    <div class="instagram">
      <svgicon height="28" width="28" name="instagram"></svgicon>
    </div>
    <div class="facebook">
      <svgicon height="28" width="28" name="facebook"></svgicon>
    </div>
    <div class="github">
      <svgicon height="28" width="28" name="github"></svgicon>
    </div>
    <div class="linkedin">
      <svgicon height="28" width="28" name="linkedin"></svgicon>
    </div>
    <div class="pocket">
      <svgicon height="28" width="28" name="pocket"></svgicon>
    </div>
    <div class="soundcloud">
      <svgicon height="28" width="28" name="soundcloud"></svgicon>
    </div>
  </div>
  <div class="share">
    <div class="share-wrapper">
      <span class="bink-text">Share:</span>
      <span class="under-blink">send domain to other users.</span>
      <div class="share-twitter"></div>
      <div class="share-facebook"></div>
      <div class="share-text"></div>
    </div>
  </div>
</div>
</template>

<script>
    import appData from '../appData.json'
    import Marquee3k from 'marquee3000'
    export default {
      data () {
        return {
          appData,
          topLogo: require('../assets/svg/top_logo.svg')
        }
      },
      mounted () {
        Marquee3k.init()
      },
      methods: {
        expand (event) {
          var x = document.getElementById(event.target.id)
          if (x.nextSibling.nextSibling.style.display === 'none') {
            x.style.backgroundColor = '#0000FF'
            x.nextSibling.nextSibling.style.display = 'block'
          } else {
            x.style.backgroundColor = 'black'
            x.nextSibling.nextSibling.style.display = 'none'
          }
        }
      }
    }
    function doDate () {
      var str = ''
      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      var now = new Date()
      var hours = now.getHours()
      var minutes = now.getMinutes()
      var ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      if (hours === 0) {
        hours = 12
      }
      minutes = minutes < 10 ? '0' + minutes : minutes
      str += days[now.getDay()] + ' ' + hours + ':' + minutes + ' ' + ampm
      document.getElementById('todaysDate').innerHTML = str
      if (ampm === 'PM') {
        document.getElementById('todaysDate').classList.add('night')
        document.getElementById('todaysDate').classList.remove('day')
      }
      if (ampm === 'AM') {
        document.getElementById('todaysDate').classList.add('day')
        document.getElementById('todaysDate').classList.remove('night')
      }
    }
    setInterval(doDate, 1000)
</script>

<style>
  .top-logo:hover g {
    animation: topspin 1.5s ease-in-out 1 alternate .25s;
    transform-origin: 50% 50%;
  }
  .marquee3k {
    color: white;
    font-family: Arial;
    display: inline-block;
    width: 300px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    padding: 20px;
    font-size: 14px;
    right: 0;
    font-style: italic;
  }

  @keyframes topspin {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(-90deg);
    }
    40% {
      transform: rotate(185deg);
    }
    50% {
      transform: rotate(181deg);
    }
    60% {
      transform: rotate(180deg);
    }
    80% {
      transform: rotate(181deg);
    }
    90% {
      transform: rotate(170deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
