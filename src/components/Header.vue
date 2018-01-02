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
    <div class="marquee3k" data-speed="0.25" data-pausable="bool" id="example2">
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
  <div class="stage">
    <div class="spinning-circle-wrapper">
      <svgicon name="spintext" height="100" width="100" :original="true"></svgicon>
    </div>
    <div class="float-wrap">
      <div class="box">
          <div class="f pane">
            <div class="section"data-id="1">
            </div>
          </div>
          <div class="r pane">
            <div class="section" data-id="2">
            </div>
          </div>
          <div class="u pane">
            <div class="section" data-id="3">
            </div>
          </div>
          <div class="l pane">
            <div class="section" data-id="4">
            </div>
          </div>
          <div class="t pane">
            <div class="section" data-id="5">
            </div>
          </div>
          <div class="b pane">
            <div class="section" data-id="6">
            </div>
          </div>
      </div>
      <svgicon name="serve" id="handFloat" :original="true"></svgicon>
    </div>
  </div>
</div>
</template>

<script>
    import appData from '../appData.json'
    import Marquee3k from 'marquee3000'
    import SunCalc from 'suncalc'
    import twitterFetcher from 'twitter-fetcher'
    export default {
      data () {
        return {
          appData,
          topLogo: require('../assets/svg/top_logo.svg')
        }
      },
      created: function () {
        function initmarkee () {
          if (document.getElementById('example2').innerHTML !== '') {
            var users = document.querySelectorAll('[data-scribe="element:screen_name"]')
            users.forEach(function (element) {
              element.innerHTML = element.innerHTML + ':'
            })
            Marquee3k.init()
          } else {
            setTimeout(initmarkee, 1000)
          }
        }
        initmarkee()
      },
      mounted () {
        var config2 = {
          'profile': {'screenName': 'tripleogstatus'},
          'domId': 'example2',
          'maxTweets': 3,
          'enableLinks': true,
          'showUser': true,
          'showTime': false,
          'showImages': false,
          'showInteraction': false,
          'lang': 'en'
        }
        twitterFetcher.fetch(config2)
        document.addEventListener('click', closeapp)
        function closeapp (event) {
          if (event.target.closest('.box')) {
            document.querySelector('.float-wrap').classList.add('paused')
            document.querySelector('.stage').classList.add('open')
            document.querySelector('.box').classList.add('open')
            document.querySelectorAll('.pane').forEach(function (element) {
              element.classList.add('open')
            })
          } else {
            document.querySelector('.stage').classList.remove('open')
            document.querySelector('.float-wrap').classList.remove('paused')
            document.querySelector('.box').classList.remove('open')
            document.querySelectorAll('.pane').forEach(function (element) {
              element.classList.remove('open')
            })
          }
        }
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
      var lat = ''
      var long = ''
      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      var now = new Date()
      var hours = now.getHours()
      var minutes = now.getMinutes()
      var ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
      if (hours === 0) {
        hours = 12
      }
      minutes = minutes < 10 ? '0' + minutes : minutes
      str += days[now.getDay()] + ' ' + hours + ':' + minutes + ' ' + ampm
      document.getElementById('todaysDate').innerHTML = str
      function showPosition (position) {
        lat = position.coords.latitude
        long = position.coords.longitude
        var times = SunCalc.getTimes(new Date(), lat, long)
        if ((times.dawn.getTime() <= now.getTime()) && (times.night.getTime() >= now.getTime())) {
          document.getElementById('todaysDate').classList.add('day')
          document.getElementById('todaysDate').classList.remove('night')
        } else {
          document.getElementById('todaysDate').classList.add('night')
          document.getElementById('todaysDate').classList.remove('day')
        }
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

  .marquee3k ul {
    margin: 0;
    padding: 0;
  }
  .marquee3k li {
    display: table-cell;
    padding-right: 15px;
  }
  .marquee3k p, .marquee3k div {
    display: table-cell;
  }

  .marquee3k a {
    color: yellow;
  }

  .marquee3k a span:nth-child(2) {
    display: none;
  }
  .marquee3k .user {
    padding-right: 5px;
  }

  .marquee3k ul img {
    display: none;
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

  .stage {
    position: absolute;
    bottom: 25px;
    right: 35px;
    width: 100px;
    height: 100px;
    transition: all .5s linear;
    overflow: hidden;
    z-index: 888;
    transform-style: preserve-3d;
    box-sizing: border-box;
    perspective: 1000px;
  }

  .stage * {
    transform-style: preserve-3d;
    box-sizing: border-box;
  }
  .float-wrap {
    position: absolute;
    display: inline-block;
    margin: auto;
    left: 0;
    right: 0;
    top: -25px;
    bottom: 0;
    width: 20px;
    height: 20px;
    animation: floatshare 2s linear alternate-reverse infinite;
    transform-origin: 50% 50%;
  }
  .box.open {
    -webkit-animation: rotation 20s infinite linear;
     animation: rotation 20s infinite linear;
     top: calc(50vh - 50px);
     left: calc(50vw - 50px);
     position: absolute;
     width: 100px;
     height: 100px;
  }
  .box  {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    transition: all .5s linear;
  }
  .box > div.pane {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    /*background: white;*/
    transition: all 1s cubic-bezier(0.75, 0, 0.25, 1);
  }
  .box > div.f {
    transform: translateZ(10px) rotateY(0);
  }
  .box > div.u {
    transform: translateZ(-10px) rotateY(180deg);
  }
  .box > div.t,
  .box > div.b {
    height: 100%;
  }
  .box > div.l,
  .box > div.r {
    width: 100%;
  }
  .box > div.t {
    transform: translateY(-10px) rotateX(90deg);
  }
  .box > div.r {
    transform: translateX(10px) rotateY(90deg);
  }
  .box > div.b {
    transform: translateY(10px) rotateX(90deg) rotateY(180deg);
  }
  .box > div.l {
    transform: translateX(-10px) rotateY(-90deg);
  }
  .section {
    width: 100%;
    height: 100%;
    background: white;
    border: 1px solid black;
    cursor: pointer;
    display: block;
  }
  .section.current {
    cursor: default;
  }
  .section.current:hover {
    background: #fff;
  }
  .section:hover {
    background: #ff0;
  }

  .box.open .section {
    border: 2px solid black !important;
  }

  .box > div.pane.open {
    width: 100%;
    height: 100%;
    position: absolute;
     -webkit-animation: backwards-rotation 20s infinite linear;
     animation: backwards-rotation 20s infinite linear;
     background-color: transparent;
     margin: 0;
     right: unset;
     left: unset;
     top: unset;
     bottom: unset;
  }

  .box > div.pane.open.f{
    bottom: -60px;
    left: -110px;
  }

  .box > div.pane.open.r {
    top: -60px;
    left: -110px;
  }

  .box > div.pane.open.u {
    left: 10px;
    bottom: 145px;
  }

  .box > div.pane.open.l {
    top: -60px;
    right: -110px;
  }

  .box > div.pane.open.t {
    bottom: -60px;
    right: -110px;
  }

  .box > div.pane.open.b {
    left: 10px;
    top: 145px;
  }
  .box:not(.open) {
    -webkit-animation: closedrotation 20s linear infinite .2s;
            animation: closedrotation 20s linear infinite .2s;
  }

  .box:not(.open) > div.pane,
  .box:not(.open) > div.pane .section {
    transition-delay: -.5s;
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
  @keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
  @keyframes closedrotation {
    0% {
      -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(270deg) translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(360deg) rotateZ(270deg) translate3d(0px, 0px, 0px);
    }
    50% {
      -webkit-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg)  translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg) translate3d(0px, 0px, 0px);
    }
    100% {
      -webkit-transform: rotateX(180deg) rotateY(-360deg) rotateZ(-270deg) translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(-360deg) rotateZ(-270deg) translate3d(0px, 0px, 0px);
    }
  }
  @-webkit-keyframes backwards-rotation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(-360deg);
              transform: rotate(-360deg);
    }
  }
  @keyframes backwards-rotation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(-360deg);
              transform: rotate(-360deg);
    }
  }
  @-webkit-keyframes scadivng {
    0% {
      -webkit-transform: scale(0.65) translateY(65px);
              transform: scale(0.65) translateY(65px);
    }
    15% {
      -webkit-transform: scale(0.5) translateY(100px);
              transform: scale(0.5) translateY(100px);
    }
    65% {
      -webkit-transform: scale(1.2);
              transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(0.65) translateY(65px);
              transform: scale(0.65) translateY(65px);
    }
  }
  @keyframes scadivng {
    0% {
      -webkit-transform: scale(0.65) translateY(65px);
              transform: scale(0.65) translateY(65px);
    }
    15% {
      -webkit-transform: scale(0.5) translateY(100px);
              transform: scale(0.5) translateY(100px);
    }
    65% {
      -webkit-transform: scale(1.2);
              transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(0.65) translateY(65px);
              transform: scale(0.65) translateY(65px);
    }
  }

  @keyframes floatshare {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(20%);
    }
      0% {
      transform: translateY(0%);
    }
  }

  .float-wrap.paused {
    animation-play-state: paused;
    position: relative;
    width: auto;
    height: auto;
    left: inherit;
    top: inherit;
  }

  .stage.open {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    transition: height,width -5s linear;
  }

  div.open.f .section {
    -webkit-animation-delay: -16.6666666667s;
            animation-delay: -16.6666666667s;
  }
  div.open.r .section {
    -webkit-animation-delay: -20s;
            animation-delay: -20s;
  }
  div.open.u .section {
    -webkit-animation-delay: -23.3333333333s;
            animation-delay: -23.3333333333s;
  }
  div.open.l .section {
    -webkit-animation-delay: -26.6666666667s;
            animation-delay: -26.6666666667s;
  }
  div.open.t .section {
    -webkit-animation-delay: -30s;
            animation-delay: -30s;
  }
  div.open.b .section {
    -webkit-animation-delay: -33.3333333333s;
            animation-delay: -33.3333333333s;
  }

  .open .section {
    display: inline-block;
    width: 80px;
    height: 80px;
    -webkit-animation: scadivng 20s infinite linear;
            animation: scadivng 20s infinite linear;
  }


  .box.open:hover, .box.open:hover div, .box.open:hover .section{
      -webkit-animation-play-state: paused !important;
      animation-play-state: paused !important;
  }

  .spinning-circle-wrapper {
    display: inline-block;
    margin: 0 auto;
    position: absolute;
    height: 100px;
    width: 100px;
    /*margin: 0 auto;*/
    transform-origin: 50% 50%;
    animation: spinning 60s linear infinite;
  }

  #handFloat {
    width: 25px;
    height: auto;
    display: inline-block;
    margin: 0 auto;
    position: absolute;
    margin-top: 7.5px;
    /*stroke: black;
    stroke-width: 5px;*/
    transform-origin: 50% 50%;
  }

  .open .spinning-circle-wrapper, .open #handFloat {
    display: none;
  }

  @keyframes spinning {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
