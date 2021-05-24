<template>
  <div id="wrapper">
    <!-- <header>
      <NuxtLink to="/">Home page</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
    </header> -->

    <app-sidebar v-if="isAuth"></app-sidebar>
    <div id="content-wrapper" class="d-flex flex-column">
			<div id="content">
        <app-header v-if="isAuth"></app-header>
        
        <Nuxt/>

      </div>
    </div>

    <!-- <footer>
      <p>&copy; 2020 - SPK</p>
    </footer> -->
  </div>
</template>

<script>
  import Sidebar from '@/components/layouts/Sidebar'
  import Header from '@/components/layouts/Header'

  //helper
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        // isAuth: false
      }
    },
    computed:{
      ...mapState(['isAuth'])
    },
    components: {
      'app-sidebar' : Sidebar,
      'app-header' : Header
    }
  }
</script>

<!--
<style>
/* html { */
body{
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  margin: 15%;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  text-align: center;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
-->
