<template>
  <div style="width: 100%">

    <h1 class="margin-bottom-8">Account: {{$store.getters.userData.username}}</h1>
    <BackToIndex style="margin: auto;"/>

    <div class="smaller-width-text" v-if="!isChangingPassword && !isAddingEmail">
      <div class="verticalFlex mt-16">
        <p v-if="$store.getters.userData.email">
          Your email: {{$store.getters.userData.email}}
        </p>
        <p v-else>
          Your account does not have an email. This is because your account was created before this website started using emails for accounts. We recommend that you connect your email address now, for account recovery purposes. Don't worry, we will never spam you.
        </p>

        <button v-if="!$store.getters.userData.email"
                @click="isAddingEmail=true"
                class="y-button y-button mt-16"
                style="width: fit-content;">
          Add email address
        </button>
        
        <button @click="isChangingPassword=true"
                class="y-button y-button mt-16 mb-16 button-with-icon"
                style="width: fit-content;">
          Change password
        </button>
      </div>

      <div class="margin-top-16"
           v-show="showModApplicationStatus && !isChangingPassword && !isAddingEmail">
        <p class="bold">Mod application status</p>
        <p class="mt-0" v-if="modApplicationStatus === modApplicationStatuses.pending">
          Pending review
        </p>
        <p class="mt-0" v-else-if="modApplicationStatus === modApplicationStatuses.waiting">
          Your application looks promising, but we're full at the moment, or will take some time deciding. You can consider this a "waiting list" of sorts. We won't guarantee that you'll get a mod spot, but your application is not rejected. We will contact you on Telegram should we decide to include you as a mod.
        </p>
        <p class="mt-0" v-else-if="modApplicationStatus === modApplicationStatuses.removed">
          Sorry, your application has been rejected. This is most likely because there were simply more mods with better capabilities applying. Thank you for wanting to contribute though!
        </p>
      </div>

      <router-link v-if="myPaidImages.fetched && myPaidImages.payload.length > 0 && !isChangingPassword && !isAddingEmail"
                   :to="{name: 'adsDashboard'}"
                   class="adDashboardButton simpleShadow width100">
        Go to advertising dashboard
        <RightArrow/>
      </router-link>
    </div>
    
    <ChangePassword v-if="isChangingPassword" @cancel="isChangingPassword = false"/>
    <AddEmail v-if="isAddingEmail" @cancel="isAddingEmail = false"/>
  </div>
</template>

<script>
import authApi from '@/api/authApi'
import miscApi from '@/api/miscApi'
import config from '@/config.json'
import { doFetch } from '@/utils/statefulFetch'

import ChangePassword from './ChangePassword.vue'
import AddEmail from './AddEmail.vue'
import ResponseMessage from '@/components/ResponseMessage.vue'
import BackToIndex from '@/components/BackToIndex.vue'
import advertisingApi from '@/api/advertisingApi'

import RightArrow from 'vue-material-design-icons/ArrowRight.vue'
import { format } from 'date-fns'

import { mapGetters } from 'vuex'

const MOD_APPLICATION_STATUSES = {
  loading: 'loading',
  none: 'none',
  pending: 'pending',
  waiting: 'waiting',
  removed: 'removed'
}

export default {
  name: 'account',

  components: {
    BackToIndex, ResponseMessage, RightArrow, ChangePassword, AddEmail,
  },

  computed: {
    showModApplicationStatus () {
      return !this.isChangingPassword
             && this.userData
             && this.modApplicationStatus !== MOD_APPLICATION_STATUSES.loading
             && this.modApplicationStatus !== MOD_APPLICATION_STATUSES.none
    },

    ...mapGetters(['userData', 'myPaidImages']),
  },

  async mounted () {
    miscApi.logRoute('account')
    this.getModApplicationStatus()
    doFetch(this.$store.commit, 'myPaidImages', advertisingApi.getMyAds())
  },

  data: function () {
    return {
      isChangingPassword: false,
      isAddingEmail: false,
      modApplicationStatus: MOD_APPLICATION_STATUSES.loading,
      modApplicationStatuses: MOD_APPLICATION_STATUSES,
      config,
    }
  },

  methods: {
    async getModApplicationStatus () {
      let { success, applicationStatus }  = await miscApi.getMyModApplicationStatus()
      if (success) { 
        this.modApplicationStatus = applicationStatus
      }
      else {
        this.modApplicationStatus = MOD_APPLICATION_STATUSES.none
      }
    },
    
    formatTimestamp (timestamp) {
      if (!timestamp) { return '' }
      return format(new Date(timestamp), 'MMM do yyyy')
    },

    formatShortTimestamp (timestamp) {
      return format(new Date(timestamp), 'MMM do')
    },

    closeResponseMessage () { this.responseMessage = '' },
    closeResponseMessageAds () { this.responseMessageAds = '' },
  },

  metaInfo() {
    let title = `Account - Yiffer.xyz`
    return {
      title: title,
      meta: [
        {vmid: 'twitterTitle', name: 'twitter:title', content: title},
        {vmid: 'ogTitle', property: 'og:title', content: title},
        {vmid: 'twitterDesc', name: 'twitter:description', content: "The internet's best collection of high quality furry porn comics, easily readable and free!"},
        {vmid: 'ogDesc', property: 'og:description', content: "The internet's best collection of high quality furry porn comics, easily readable and free!"}
      ]
    }
  },
}
</script>

<style lang="scss">
.adDashboardButton {
  width: 100% !important;
  border-radius: 4px;
  color: white !important;
  border: none;
  outline: none;
  height: 3rem;
  font-size: 1rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
  background: linear-gradient(to right, $themeGreen1Dark, $themeGreen2Dark);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: all 100ms;
  
  &:hover {
    cursor: pointer;
  }

  span {
    margin-bottom: 2px;
    margin-left: 0.25rem;
  }
}

.dark {
  .adDashboardButton {
    background: linear-gradient(to right, $themeGreen1Darker, $themeGreen2Darker);
  }
}
</style>