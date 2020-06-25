import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trainList: [],
    trainData: null,
    isLoadingTrainList: false,
    isLoadingTrainData: false,
    isSnackbarShow: false
  },
  mutations: {
    SET_TRAIN_LIST (state, trainList) {
      state.trainList = trainList
    },
    SET_TRAIN_LIST_EMPTY (state) {
      state.trainList = []
    },
    SET_TRAIN_DATA (state, trainData) {
      state.trainData = trainData
    },
    SET_TRAIN_DATA_EMPTY (state) {
      state.trainData = null
    },
    SET_LOADING_TRAIN_LIST (state, isLoading) {
      state.isLoadingTrainList = isLoading
    },
    SET_LOADING_TRAIN_DATA (state, isLoading) {
      state.isLoadingTrainData = isLoading
    },
    SET_SNACKBAR_SHOW (state, isSnackbarShow) {
      state.isSnackbarShow = isSnackbarShow
    }
  },
  actions: {
    async getTrainList ({ commit }, stationCode) {
      commit('SET_LOADING_TRAIN_LIST', true)
      try {
        const { data } = await api.getTrainListByStationCode(stationCode)
        commit('SET_TRAIN_LIST', data)
      } catch (error) {
        commit('SET_SNACKBAR_SHOW', true)
      } finally {
        commit('SET_LOADING_TRAIN_LIST', false)
      }
    },
    async getTrainData ({ commit }, trainId) {
      commit('SET_LOADING_TRAIN_DATA', true)

      if (trainId === '') {
        setTimeout(() => { commit('SET_LOADING_TRAIN_DATA', false) }, 1500)
        return
      }

      try {
        const { data } = await api.getTrainDataByTrainId(trainId)
        commit('SET_TRAIN_DATA', data)
      } catch (error) {
        commit('SET_SNACKBAR_SHOW', true)
      } finally {
        commit('SET_LOADING_TRAIN_DATA', false)
      }
    }
  },
  modules: {
  },
  getters: {
    // API中的資料，可能包含很多不同線的捷運列車(像是台北車站是紅線、藍線交會)，這邊直接篩選出只有藍線的列車
    trainList: state => state.trainList.filter(train => train.platform.startsWith('BL')),
    // 因為如果trainData是null，直接存取trainData.Cart1L系統就會報錯
    // 而我懶得再寫判斷式去判斷trainData是不是null，再決定要不要讀值
    // 直接透過computed把trainData轉成object，如果沒有值，就會讀到undefined
    trainData: state => state.trainData === null ? {} : state.trainData,
    // 目前trainData有沒有資料，因為如果非營業時間，trainList中train的tripno會是空字串，這時就不會載入trainData，trainData就是null
    isTrainDataAvailable: state => !(state.trainData === null),
    isLoadingTrainList: state => state.isLoadingTrainList,
    isLoadingTrainData: state => state.isLoadingTrainData,
    isSnackbarShow: state => state.isSnackbarShow
  }
})
