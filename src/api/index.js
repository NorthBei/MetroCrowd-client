import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
// 20秒，因為heroku dyno可能會睡著，叫醒heroku大概要花10~15秒，所以這邊timeout給20秒
axios.defaults.timeout = 20000

async function getTrainListByStationCode (stationCode) {
  return await axios.get(`/station/${stationCode}`)
}

async function getTrainDataByTrainId (trainId) {
  return await axios.get(`/train/${trainId}`)
}

export default { getTrainListByStationCode, getTrainDataByTrainId }
