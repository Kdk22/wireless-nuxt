// export default function ({ $axios, redirect }) {
//   $axios.setBaseURL(process.env.AXIOS_BASE_URL)
//   // $axios.setBaseURL('http://bdipesh08.pythonanywhere.com/api/')
//   $axios.onRequest((config) => {
//     console.log('Making request to ' + config.url)
//   })
//
//   $axios.onError((error) => {
//     const code = parseInt(error.response && error.response.status)
//     if (code === 500) {
//       redirect('/500')
//     }
//     if (code === 403) {
//       redirect('/index')
//     }
//   })
// }

export default function({
    store,
    app: { $axios },
    redirect
})
{
   $axios.setBaseURL(process.env.AXIOS_BASE_URL)
  // $axios.setBaseURL('http://bdipesh08.pythonanywhere.com/api/')
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  });
    $axios.onRequest((config) => {
        // check if the user is authenticated
      console.log(store.state.accessToken)
        if (store.state.accessToken) {
            // set the Authorization header using the access token
            config.headers.Authorization = 'Bearer ' + store.state.accessToken;
        }

        return config;
    });

    $axios.onError(async (error) => {
        const statusCode = error.response ? error.response.status : -1;

        if (statusCode === 401 || statusCode === 422) {
            const refreshToken = store.state.refreshToken;
            if (error.response.data.errorCode === 'JWT_TOKEN_EXPIRED' && refreshToken) {
                if (Object.prototype.hasOwnProperty.call(error.config, 'retryAttempts')) {
                    store.commit('api/token/logout');
                    return redirect('/login');
                }
                const config = { retryAttempts: 1, ...error.config };
                try {
                    await store.dispatch('api/token/refresh');
                    return Promise.resolve($axios(config));
                } catch (e) {
                    store.commit('api/token/logout');
                    return redirect('/login');
                }
            }

            store.commit('api/token/logout');
            return redirect('/login');
        }
        if (statusCode === 500) {
          redirect('/500')
      }
      if (statusCode === 403) {
          redirect('/index')
    }

        return Promise.reject(error);
    });
}


