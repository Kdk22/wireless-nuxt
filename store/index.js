export const strict = false

export const state = () => ({
  snackBar: {
    display: false,
    class: 'bg-green-500 text-white',
    text: 'Snackbar message'
  }
})

export const mutations = {
  SET_SNACKBAR (state, data) {
    state.snackBar = {
      ...state.snackBar,
      ...data
    }
  }
}

export const actions = {

  showSnackbar ({ commit, dispatch }, data) {
    commit('SET_SNACKBAR', { ...data, display: true })
    setTimeout(
      () => dispatch('hideSnackbar'),
      10000
    )
  },
  hideSnackbar ({ commit }) {
    commit('SET_SNACKBAR', { display: false })
  }
}
