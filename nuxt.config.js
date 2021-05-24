export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'spk-nuxt-js',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
        { src: "vendor/jquery/jquery.min.js"},
        { src: "vendor/bootstrap/js/bootstrap.bundle.min.js"},
        { src: "vendor/jquery-easing/jquery.easing.min.js"},
        { src: "js/sb-admin-2.min.js"},
        { src: "shim.min.js"},
        { src: "xlsx.full.min.js"},
        // { src: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/vendor/fontawesome-free/css/all.min.css',
    '@/assets/css/sb-admin-2.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    // { src: '~plugins/vue-chartjs.js', ssr: false }
    // '@/plugins/chart.js',
    // '@/plugins/hchs-vue-charts.js',
    // {src: "~/plugins/chart", ssr: false},
    // {src: "~/plugins/hchs-vue-charts", ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'bootstrap-vue/nuxt'
  ],
  auth: {
    strategies: {
      local: {
        // token: {
        //   // property: 'token',
        //   required: false,
        //   type: false
        // //   require : true
        // },
        // user: {
        //   property: 'user',
        // },
        endpoints: {
          login: { 
            url: '/api/auth/login', method: 'post'
            // propertyName: 'data'
          },
          logout: { url: '/api/auth/logout', method: 'post'
          // propertyName: 'token'
          },
          user: { 
            url: '/api/auth/getUser', method: 'get'
            // propertyName: 'data' 
          },
          // logout: false,
          // user:false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
        // autoFetchUser: false
      }
    }
  },
  axios: {
    baseURL: 'http://localhost:8081/'
  },
  router: {
    middleware: ['auth']
  },
  

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
