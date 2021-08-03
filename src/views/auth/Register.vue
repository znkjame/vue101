<template>
  <div>
      <h1>Register</h1>

      <form @submit.prevent="register"></form>
      <div>
          <label for="username">Username</label>
          <input type="text" autocomplete="off" placeholder="username" v-model="form.username">
      </div>

    <div>
          <label for="email">Email</label>
          <input type="text" autocomplete="off" placeholder="email" v-model="form.email">
      </div>
          <div>
          <label for="password">Password</label>
          <input type="password" autocomplete="off" placeholder="password" v-model="form.password">
      </div>
        <div>
          <label for="password_confirmation">Confirm Password</label>
          <input type="password" autocomplete="off" placeholder="Confirm Password">
      </div>
      <button @click="register">Submit</button>
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
// import AuthService from '@/services/AuthService'
export default {
    data(){
        return {
            form:{
                username :"",
                email: "",
                password:""
            }
        }
    },
    methods:{
        async register(){
            // let res = await AuthService.register(this.form)
            let res = await AuthUser.dispatch('register',this.form)
            if(res.success){
                this.$swal("Register Success", `Welcome ${res.user.username}`, "success")
                this.$router.push("/pokedex")
            }else{
                this.$swal("Register Failed", res.message, "error")
            }
        }
    }
}
</script>

<style>

</style>