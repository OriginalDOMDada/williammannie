<template>
  <transition-group tag="ul" :name="transition"  class="blog__feed">
    <li v-for="post in feed" class="preview" :key="post.id">
      <figure class="preview__figure" :class="figureClass">
        <div class="post-image-wrap">
          <svgicon class="post-top-logo" name="logo" height="15" width="15" :original="true"></svgicon>
          <img class="post-image" v-bind:src="post.image" alt="" height="150" width="150">
        </div>
        <transition name="v--fade">
          <figcaption v-if="!reading || $device.phone" class="preview__details">
            <router-link class="preview__title"
              :to="`/read/${post.id}`"
              @click.native="scrollTo(0, 220, scrollDelay)">
              {{ post.title }}
            </router-link>

            <div class="preview__meta">
              <time class="preview__published">
                {{ prettyDate(post.published) }}
              </time>

              <router-link class="preview__author"
                :to="`/by/${kebabify(post.author)}`"
                @click.native="scrollTo(0, 220, scrollDelay)">
                {{ post.author }}
              </router-link>
            </div>

            <span class="blog-share">
              <svgicon height="20" width="20" name="twitter"></svgicon>
              <svgicon height="20" width="20" name="facebook"></svgicon>
              <svgicon height="20" width="20" name="pocket"></svgicon>
            </span>
          </figcaption>
        </transition>
      </figure>
    </li>
  </transition-group>
</template>

<script>
import { scrollTo, kebabify, prettyDate } from '../helpers'

export default {
  name: 'blog-feed',
  resource: 'BlogFeed',

  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      posts: [],
      transition: 'preview-appear'
    }
  },

  computed: {
    reading () { return this.filters.post },
    scrollDelay () { return (this.$device.phone) ? 0 : 560 },
    figureClass () {
      return { 'preview__figure--mobile': this.$device.phone && this.reading }
    },
    feed () {
      const filterBy = {
        post: (filter, { id }) => filter === id,
        author: (filter, { author }) => filter === this.kebabify(author)
      }

      if (!Object.keys(this.filters).length) return this.posts

      return this.posts.filter(post => {
        return Object.keys(this.filters).every(filter => {
          return filterBy[filter](this.filters[filter], post)
        })
      })
    }
  },

  methods: {
    scrollTo,
    kebabify,
    prettyDate,
    getBgImg (src) {
      return { backgroundImage: `url(${src})` }
    },
    stackPosts (posts) {
      let interval
      const stack = () => {
        this.posts.push(posts.shift())

        if (!posts.length) {
          this.transition = 'preview'
          clearInterval(interval)
        }
      }

      interval = setInterval(stack, 125)
    }
  },

  beforeMount () {
    this.$getResource('feed')
      .then(posts => {
        if (!Object.keys(this.filters).length) {
          this.stackPosts(posts)
        } else {
          this.posts = posts
          this.transition = 'preview'
        }
      })
  }
}
</script>

<style>
  .preview {
    padding: 10px;
    position: relative;
    display: block;
  }
  .preview__figure {
    float: left;
  }
  .preview__figure, .post-image {
    display: inline-block;
  }
  .preview__title {
    font-size: 2em;
    font-family: Georgia;
    font-weight: bold;
    color: blue;
    text-transform: capitalize;
    /* float: right; */
    /* font-style: italic; */
    text-decoration: none;
    display: block;
  }
  .preview__title:hover {
    text-decoration: underline;
  }
  .preview__published {
    color: blue;
  }
  .preview__details {
    /* width: auto; */
    display: inline-block;
    padding: 20px;
    width: auto;
    /* float: right; */
  }
  .preview__meta {
    /* float: right; */
    width: auto;
    display: block;
  }
  .preview__author {
    display: block;
    /* text-align: right; */
  }
  .post-image {
    position: relative;
    filter: grayscale(1);
    z-index: 1;
  }
  .post-image-wrap {
    display: inline-block;
    height: 150px;
    width: 150px;
    background: white;
    border: 2px solid black;
    position: relative;
    float: left;
    margin: 10px;
    mix-blend-mode: hard-light;
  }
  .post-image-wrap::before {
    content: '';
    display: block;
    height: 150px;
    width: 150px;
    position: absolute;
    background-color: rgba(0,0,255,.5);
    z-index: 2;
    mix-blend-mode: normal;
  }
  .post-top-logo {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 5;
    padding: 5px;
    opacity: .75;
  }
  .blog-share {
    position: absolute;
    display: block;
    bottom: 10px;
    right: 20px;
  }
</style>
