<template>
  <div>
    <v-app id="app">
      <v-app-bar color="white" flat app>
        <v-toolbar-title>捷報</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :href="formUrl" target="_blank" icon large>
          <v-icon>mdi-file-document-edit-outline</v-icon>
        </v-btn>
        <v-btn @click="dialog.email = true" icon large>
          <v-icon>mdi-email-outline</v-icon>
        </v-btn>
        <v-btn @click="dialog.info = true" icon large>
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </v-app-bar>
      <v-content id="content">
        <v-container fluid>
          <h1 class="text-center">今天捷運上人多嗎？</h1>
          <v-row justify="center">
            <v-col cols="12" md="6" sm="10">
              <div id="selector">
                <v-select
                  v-model="stationCode"
                  :items="items"
                  class="elevation-3"
                  label="選擇車站"
                  :loading="isLoadingTrainList"
                  noDataText="沒有車站辣"
                  hide-details
                  flat
                  solo
                  ></v-select>
                </div>
            </v-col>
          </v-row>
          <div class="py-2 d-flex justify-center flex-wrap">
            <span v-for="(train, i) in trainList" :key="i">
              <v-btn @click="selectTrain(train)" class="ma-1" color="primary">往{{train.destination}}</v-btn>
            </span>
          </div>
          <h4 v-if="train" class="text-center mt-5">
            往{{train.destination}}的列車，
            <span v-if="!isTrainDataAvailable">目前在{{mapStationIdToName(trainData.StationID)}}站，</span>
            <span v-if="train.countdown.includes('59:50*')">營運時間已經過囉</span>
            <span v-else>約{{train.countdown.trim()}}後到站</span>
          </h4>
          <p v-if="train" class="text-center body-2">
            <!-- "2020-05-12 23:29:56" 只取 "23:29:56"  -->
            <span>資料時間：{{train.updatetime.split(' ')[1]}}，</span>
            <countdown ref="countdown" @finish="updateAllData" :end-time="new Date().getTime() + 15000">
              <template v-slot:process="{ timeObj }">{{timeObj.ceil.s}}秒後更新</template>
              <template v-slot:finish>資料更新中</template>
            </countdown>
          </p>
          <div class="d-flex justify-center flex-wrap mt-4">
            <cart :num="1" :level="trainData.Cart1L" :loading="isLoadingTrainData" first/>
            <cart :num="2" :level="trainData.Cart2L" :loading="isLoadingTrainData"/>
            <cart :num="3" :level="trainData.Cart3L" :loading="isLoadingTrainData"/>
            <cart :num="4" :level="trainData.Cart4L" :loading="isLoadingTrainData"/>
            <cart :num="5" :level="trainData.Cart5L" :loading="isLoadingTrainData"/>
            <cart :num="6" :level="trainData.Cart6L" :loading="isLoadingTrainData"/>
          </div>
          <div class="d-flex justify-center align-center mt-8 flex-wrap">
            <v-chip class="ma-2" color="green" x-small></v-chip>
            <span>舒適</span>
            <v-chip class="ma-2" color="yellow" x-small></v-chip>
            <span>普通</span>
            <v-chip class="ma-2" color="orange" x-small></v-chip>
            <span>略多</span>
            <v-chip class="ma-2" color="red" x-small></v-chip>
            <span>人多</span>
            <v-chip class="ma-2" color="grey" x-small></v-chip>
            <span>無資料</span>
          </div>
          <v-snackbar :value="isSnackbarShow" color="error">
            網路怪怪的欸，重新整理再試試看吧
            <v-btn text @click="setSnackbarShow(false)">OK</v-btn>
          </v-snackbar>
        </v-container>
      </v-content>
      <v-footer color="blue darken-3" class="py-3 d-flex flex-column body-2 white--text" app>
        <div>Copyright © 2020 NorthBei All rights reserved</div>
      </v-footer>
    </v-app>
    <v-dialog v-model="dialog.info" max-width="350">
      <v-card>
        <v-card-title>捷報</v-card-title>
        <v-card-text>
          <p>5/8時，台北捷運在App中推出了查詢「車廂擁擠度」的功能，讓大家能知道哪些車廂人比較多</p>
          <p>但是說實話，我根本不想下載捷運的App...，所以我就從台北捷運的App中，把這功能拉出來做成獨立服務囉</p>
          <p>希望能讓大家方便一些，也讓我為台灣的防疫盡一份心力哈哈</p>
          <p>BTW 目前台北捷運只有開放查詢「板南線」擁擠程度的功能而已，其他路線暫時還沒辦法</p>
          <p class="text-right">2020.05.11 by NorthBei</p>
        </v-card-text>
        <p class="text-center">有任何問題，填個<a :href="formUrl" target="_blank">表單</a>跟我說吧</p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog.info = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog.email" max-width="350">
      <v-card>
        <v-card-title>有事情找我嗎？</v-card-title>
        <v-card-text>
          <p>哈囉~ 你好啊</p>
          <p>你點開了這個視窗，想必是有事情要跟我說吧</p>
          <p>如果我猜對了的話，把信寄到下面的Email就可以溜😊</p>
          <p>hello@metrocrowd.online</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog.email = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Cart from '@/components/Cart'
import { detect } from 'detect-browser'

const browser = detect()
const browserInfo = browser ? `${browser.os}, ${browser.name}, ${browser.version}` : 'None'

const formUrl = 'https://forms.gle/5B6FoDBLMEQdMbJKA'
const stations = {
  BL01: '頂埔',
  BL02: '永寧',
  BL03: '土城',
  BL04: '海山',
  BL05: '亞東醫院',
  BL06: '府中',
  BL07: '板橋',
  BL08: '新埔',
  BL09: '江子翠',
  BL10: '龍山寺',
  BL11: '西門',
  BL12: '台北車站',
  BL13: '善導寺',
  BL14: '忠孝新生',
  BL15: '忠孝復興',
  BL16: '忠孝敦化',
  BL17: '國父紀念館',
  BL18: '市政府',
  BL19: '永春',
  BL20: '後山埤',
  BL21: '昆陽',
  BL22: '南港',
  BL23: '南港展覽館'
}

export default {
  data: () => ({
    formUrl: formUrl,
    dialog: {
      info: false,
      email: false
    },
    stationCode: null,
    train: null,
    // { text: 'BL01 頂埔', value: '076' },
    // the data of value is copy from android res\value\array.xml stationlocation_v2 list
    // the data of text is copy from android res\value\array.xml stationnumber list
    items: [
      { text: 'BL01 頂埔', value: '076' },
      { text: 'BL02 永寧', value: '077' },
      { text: 'BL03 土城', value: '078' },
      { text: 'BL04 海山', value: '079' },
      { text: 'BL05 亞東醫院', value: '080' },
      { text: 'BL06 府中', value: '081' },
      { text: 'BL07 板橋', value: '082' },
      { text: 'BL08 新埔', value: '083' },
      { text: 'BL09 江子翠', value: '084' },
      { text: 'BL10 龍山寺', value: '085' },
      { text: 'BL11 西門', value: '086' },
      { text: 'BL12 台北車站', value: '051' },
      { text: 'BL13 善導寺', value: '088' },
      { text: 'BL14 忠孝新生', value: '089' },
      { text: 'BL15 忠孝復興', value: '010' },
      { text: 'BL16 忠孝敦化', value: '091' },
      { text: 'BL17 國父紀念館', value: '092' },
      { text: 'BL18 市政府', value: '093' },
      { text: 'BL19 永春', value: '094' },
      { text: 'BL20 後山埤', value: '095' },
      { text: 'BL21 昆陽', value: '096' },
      { text: 'BL22 南港', value: '097' },
      { text: 'BL23 南港展覽館', value: '031' }
    ]
  }),
  created () {
    this.$ga.page('/')
  },
  watch: {
    async stationCode (newV) {
      this.train = null
      this.setTrainListEmpty()
      this.setTrainDataEmpty()
      this.recordEvent('station', this.seclectedStationName)
      this.getTrainList(newV)
      if (this.$refs.countdown) this.$refs.countdown.pauseCountdown()
    }
  },
  methods: {
    ...mapMutations({
      setTrainListEmpty: 'SET_TRAIN_LIST_EMPTY',
      setTrainDataEmpty: 'SET_TRAIN_DATA_EMPTY',
      setSnackbarShow: 'SET_SNACKBAR_SHOW'
    }),
    ...mapActions(['getTrainList', 'getTrainData']),
    async selectTrain (train) {
      this.train = train
      const trainId = train.tripno.trim()
      if (trainId !== '') {
        this.recordEvent('train', `從${this.seclectedStationName}往${train.destination}`)
        this.recordEvent('way', `往${train.destination}`)
      }
      await this.getTrainData(trainId)
    },
    async updateAllData () {
      await this.getTrainList(this.stationCode)
      const destination = this.train.destination
      const train = this.trainList.find(train => train.destination === destination)
      await this.selectTrain(train)
      if (this.$refs.countdown) this.$refs.countdown.startCountdown(true)
    },
    mapStationIdToName (stationId) {
      return stations[stationId]
    },
    recordEvent (category, acton) {
      this.$ga.event({
        eventCategory: category,
        eventAction: acton,
        eventLabel: browserInfo
      })
    }
  },
  computed: {
    ...mapGetters(['trainList', 'trainData', 'isTrainDataAvailable', 'isLoadingTrainList', 'isLoadingTrainData', 'isSnackbarShow']),
    seclectedStationName () {
      if (!this.stationCode) return 'NoStation'
      const item = this.items.find(item => item.value === this.stationCode)
      return item.text
    }
  },
  components: {
    Cart
  }
}
</script>
<style lang="scss" scope>
#app {
  font-family: '微軟正黑體', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4a4a4a;
  overflow: hidden;
}

#content {
  margin-top: 13vh;
  margin-bottom: 15vh;
}

#selector {
  max-width: 550px;
  margin: auto;
}
</style>
