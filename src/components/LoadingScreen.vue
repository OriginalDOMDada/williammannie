<template>
	<transition name="slide-fade">
		<div id="loading" v-if="isLoading" class="container">
			<svgicon class="intro-logo" name="logo" height="150" width="150" :original="true"></svgicon>
			<h2>WilliamMannie.com</h2>
			<p>Version Alpha 1.2</p>
			<div class="loadtech">
				<div class="blinkers">
					<div class="blinker red"></div>
					<div class="blinker green"></div>
				</div>
				<div class="load-skew-rap">
					<div class="hype-man">
					</div>
				</div>
			</div>
			<div class="glow-rap">
				<span class="glow">Loading...</span>
			</div>
			<h1>William Mannie<br><span>Online</span></h1>
		</div>
	</transition>
</template>

<script>
export default {
  name: 'AppIcons',
  data () {
    return {
      isLoading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 7000)
  }
}
</script>

<style>
	.loadtech {
		position: relative;
		margin: 0 auto;
		display: block;
		top: 65vh;
	}
	.blinkers {
		position: relative;
		display: block;
		margin: 0 auto;
		width: 35px;
		margin-bottom: 10px;
	}
	.blinker {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 2px solid black;
	}
	.blinker.green {
		background-color: #dedede;
		animation: blinkGreen .5s linear infinite;
	}
	.blinker.red {
		background-color: #dedede;
		animation: blinkRed .25s linear infinite;
	}
	@keyframes blinkGreen {
		0% {
			background-color: #dedede;
		}
		50% {
			background-color: #00ff80;
		}
		100% {
			background-color: #00ff80;
		}
	}
	@keyframes blinkRed {
		0% {
			background-color: #dedede;
		}
		50% {
			background-color: #ff0080;
		}
		100% {
			background-color: #ff0080;
		}
	}
	/* Enter and leave animations can use different */
	/* durations and timing functions.              */
	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active below version 2.1.8 */ {
	  transform: translateX(10px);
	  opacity: 0;
	  z-index: -1;
	}
	h1 {
		color: white;
		text-align: center;
		font-size: 20px;
		width: 100%;
		position: absolute;
		bottom: 20px;
	}
	h1 span {
	 color: #FFFF00;
	}
	#loading {
		position: absolute;
		height: 100vh;
		width: 100vw;
		z-index: 1000;
		background-color: blue;
		top: 0;
		left: 0;
  		background-color: #0000ff;
	}

	.load-skew-rap {
	  display: block;
	  position: relative;
	  margin: 0 auto;
	  width: 150px;
	  height: 15px;
	  overflow: hidden;
	  background-color: white;
	  border: 2px solid black;
	}

	.hype-man {
	  position: absolute;
	  width: 50px;
	  height: 15px;
	  display: block;
	  animation: swang 2s ease-in-out infinite alternate;
	  transform-origin: 50% 50%;
      background-color: #00FF80;
	}

	.glow-rap {
		display: block;
		position: absolute;
		width: auto;
		height: auto;
		bottom: 20px;
		right: 25px;
	}

	.glow {
		font-style: italic;
		font-weight: bold;
		font-family: Arial;
		color: black;
		font-size: 24px;
		text-align: center;
		width: 100%;
		display: block;
		text-shadow: 0px 0px 4px #ffffff;
		opacity: .1;
		animation: loadingText 2s linear infinite alternate;
	}

	@keyframes swang {
		0% {
			transform: translate(-50px,0);
		}
		100% {
			transform: translate(150px,0);
			width: 50px;
		}
	}

	@keyframes rotater {
		0%  {transform: rotate(0deg);}
		100%{transform: rotate(360deg);}
	}

	@keyframes loadingText {
		to {text-shadow:
	    0 0 2px #00FF80,
	    0 0 3px #00FF80,
	    0 0 4px #ffffff,
	    0 0 5px #ffffff;
	    opacity: 1;
	    }
	}

	.intro-logo {
		position: absolute;
		display: inline-block;
		transform-origin: 50% 50%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		transform: translate(0px,-250px) rotate(20deg);
		animation: drop .5s ease-in-out 1.5s forwards;
	}

	 .logo-back {
	 	transform-origin: 50% 50%;
	 	transform: translate(-48px, -48px) scale(.1);
		animation: dropback .25s ease-in-out 1.8s forwards;
	 }

	@keyframes dropback {
		0% {
			transform: translate(-48px, -48px);
		}
		50% {
			transform: translate(-48px, -48px)  scale(.25) rotate(30deg);
		}
		80% {
			transform: scale(1.1) rotate(-5deg);
		}
		100% {
			transform: translate(0px, 0px) scale(1) rotate(0deg);
		}
	}
	@keyframes drop {
		0% {
			transform: translate(0px,-250px) rotate(20deg);
		}
		50% {
			transform: translate(-10px,225px) rotate(-50deg);
		}
		87.5% {
			transform: translate(5px,200px) rotate(15deg);
		}
		100% {
			transform: translate(0px,200px) rotate(0deg);
		}
	}

</style>
