export const strict = false

export const state = () => ({
  snackBar: {
    display: false,
    class: 'bg-green-500 text-white',
    text: 'Snackbar message'
  },

  // for authentication
    accessToken: null,
    refreshToken: null
})
// for authentication
export const getters = {
    isAuthenticated(state) {
        return !!state.accessToken;
    }
};

export const mutations = {
  SET_SNACKBAR (state, data) {
    state.snackBar = {
      ...state.snackBar,
      ...data
    }
  },

  // for authentication

     setTokens(state, { access, refresh = null }) {
        state.accessToken = access;

        if (refresh) {
            state.refreshToken = refresh;
        }
    },
    setUser(state, user) {
        state.user = user;
    },
    logout(state) {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
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
  },

  // for authentication

      async login({ commit, dispatch }, { email, password }) {
        const res = await this.$axios.$post('api/token/', {
            email,
            password
        });

        commit('setTokens', res);
        await dispatch('getUser');
    },

   async getUser({ commit }) {
        const res = await this.$axios.$get('users-detail/me/');

        commit('setUser', res);
    },
    async refresh({ state, commit }) {
        const res = await this.$axios.$post('/auth/refresh', {
            refreshToken: state.refreshToken
        });

        commit('setTokens', res);
    }
}
