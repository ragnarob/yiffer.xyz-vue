<template>
  <div class="expanded-comic-card-bg" @click="closeCard">
    <div class="expanded-comic-card" @click="onCardClick">
      <button class="y-button-close" @click="closeCard"><cross-icon :size="28"/></button>

      <router-link :comic="comic" :to="{ name: 'comic', params: { comicName: `${comic.name }` } }">
        <img :src="`/comics/${comic.name}/s.jpg`" class="expanded-card-image">
      </router-link>


      <!-- COMIC NAME AND ARTIST -->
      <router-link :comic="comic" :to="{ name: 'comic', params: { comicName: `${comic.name }` } }" 
        class="comic-card-link underline-link" style="font-size: 16px;">
        {{comic.name}}
      </router-link>
      <p>
        by <router-link :comic="comic" :to="{ name: 'artist', params: { artistName: comic.artist } }"
        class="comic-card-link underline-link">
          {{comic.artist}}
        </router-link>
      </p>

      <!-- PAGES & RATING -->
      <div class="horiz-card-row" style="margin-top: 8px;">
        <p title="Number of pages"><pages-icon title="Number of pages"/> {{comic.numberOfPages}}</p>
        <p title="User rating"><users-icon title="User rating"/> {{formatRating(comic.userRating)}}</p>
        <p title="Your rating" v-if="$store.getters.isAuthenticated"><user-icon title="Your rating"/> {{comic.yourRating || '-'}}</p>
      </div>

      <!-- ADDED & CREATED -->
      <div class="added-created-container">
        <label title="Updated on"><refresh-icon title="Updated on"/>
          {{prettyDate(comic.updated)}}</label>
        <label title="Created on"><plus-icon title="Created on"/>
          {{prettyDate(comic.created)}}</label>
      </div>

      <!-- RATING SLIDER -->
      <rating-slider/>

      <!-- KEYWORDS -->
      <div class="keyword-container" style="margin-top: 0;">
        <div class="emphasized-keyword">{{comic.cat}}</div>
        <div class="emphasized-keyword">{{comic.tag}}</div>
        <div 
          class="keyword"
          v-for="keyword in comic.keywords"
          :key="keyword"
          @click="addSelectedKeyword(keyword)"
        >
          {{keyword}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RatingSlider from '@/components/RatingSlider.vue'

import PagesIcon from 'vue-material-design-icons/FileOutline.vue'
import UserIcon from 'vue-material-design-icons/AccountOutline.vue'
import UsersIcon from 'vue-material-design-icons/AccountMultipleOutline.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import RefreshIcon from 'vue-material-design-icons/Refresh.vue'
import CrossIcon from 'vue-material-design-icons/Close.vue'

export default {
  name: 'expanded-comic-card',

  components: {
		'pages-icon': PagesIcon,
		'user-icon': UserIcon,
		'users-icon': UsersIcon,
		'plus-icon': PlusIcon,
		'refresh-icon': RefreshIcon,
		'rating-slider': RatingSlider,
		'cross-icon': CrossIcon,
  },
  
  props: {
  },

  data: function () {
    return {
      comic: this.$store.getters.expandedComic
    }
  },

  methods: {
    formatRating: function (number) {
      if (number > 8.5) { return Math.round(number * 100) / 100 }
			else { return Math.round(number * 10) / 10 }
    },
		addSelectedKeyword (keyword) {
      this.$store.commit('addSelectedKeyword', keyword)
    },
    closeCard () {
      this.$store.commit('setExpandedComic', undefined)
    },
    onCardClick (event) {
      event.stopPropagation()
    },
		prettyDate: inputDateString => (new Date(inputDateString)).toDateString().substring(4),
  }
}
</script>

<style lang="scss">
@import "../scss/colors.scss";
$comicCardPadding: 10px;

.expanded-comic-card-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;

  .expanded-comic-card {
    position: relative;
    margin: auto;
    flex-direction: column;
    width: 90%;
    max-height: 90%;
    overflow: auto;
    background-color: $themeGray0p5;
    display: flex;
    align-items: center;
    padding: $comicCardPadding;
    box-sizing: border-box;
    border-radius: 4px;
    a {
      font-weight: 400;
    }
    img {
      height: 240px;
      width: 170px;
      margin-bottom: 8px;
    }
    .y-button-close {
      position: absolute;
      right: $comicCardPadding;
      top: $comicCardPadding;
    }

    .horiz-card-row {
      display: flex;
      flex-direction: row;
      width: fit-content;
      p {
        margin: 0 8px;
        &:hover {
          cursor: default;
        }
      }

    .added-created-container {
      display: flex;
      flex-direction: row;
      margin-top: 8px;
      label {
        margin: 0 5px;
      }
    }
    }
  }
}
</style>