<template>
    <div class="container-fluid">
        <!-- Outer Row -->
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">LOGIN</h1>
                                    </div>
                                    <form class="user" @submit.prevent="userLogin">
                                        <!-- <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address...">
                                        </div> -->
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                id="username" placeholder="Username"
                                                v-model="login.username"
                                            >
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="password" placeholder="Password"
                                                v-model="login.password"
                                            >
                                        </div>
                                        <!-- <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div> -->

                                        <!-- <a href="javascript:void(0)" @click="submit" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </a> -->
                                        <div>
                                            <button class="btn btn-primary btn-user btn-block" type="submit">Login</button>
                                        </div>

                                        <!-- <hr>
                                        <a href="index.html" class="btn btn-google btn-user btn-block">
                                            <i class="fab fa-google fa-fw"></i> Login with Google
                                        </a>
                                        <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                            <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a> -->
                                    </form>
                                    <!-- <hr> -->
                                    <!-- <div class="text-center">
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="register.html">Create an Account!</a>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    auth: false,
    data() {
        return {
            //tampung file
            login: {
                username: '',
                password: ''
            }
        }
    },
    mounted() {
        if(this.$auth.loggedIn){
            this.$router.push('/')
        }    
    },
    methods: {
        ...mapMutations(['SET_IS_AUTH']),
        // async submit() {
        async userLogin() {
            try{
                await this.$auth.loginWith('local', {
                    // data: {
                    //     username: this.auth.username,
                    //     password: this.auth.password
                    // }
                    data: this.login
                }).then(() => {
                    this.SET_IS_AUTH(true)
                    this.$router.push('/')
                })
            }catch(err){
                this.$router.push('/login')
            }
        }
    }
}
</script>