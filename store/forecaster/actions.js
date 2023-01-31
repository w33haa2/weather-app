export default {
  async searchLocation({ commit }, q) {
    commit('setForecasterFetchState', true)
    commit('setForecasterItems', [])
    await this.$api
      .get('forecast', {
        params: {
          q,
          appid: this.app.$config.openWeatherMapKey,
          units: 'metric',
        },
      })
      .then((e) => {
        commit('setForecasterFetchState', false)
        commit('setForecasterItems', e.data.list)
        console.log(e)
      })
      .catch((e) => {
        commit('setForecasterFetchState', false)
        commit('setForecasterItems', [])
      })
  },
}
