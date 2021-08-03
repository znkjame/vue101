<template>
    <div>
        <form @submit.prevent="login">
            <h1>Login</h1>
            <div>
                <label for="email">Email</label>
                <input type="text" placeholder="email" autocomplete="off" v-model="form.email">
            </div>

            <div>
                <label for="password">Password</label>
                <input type="password" autocomplete="off" v-model="form.password">
            </div>

            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
</template>

<script>
// import AuthService from '@/services/AuthService'
import AuthUser from '@/store/AuthUser'
export default {
    data(){
        return {
            form:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        async login(){
            // let res = await AuthService.login(this.form)
            // console.log(this.form);
            let res = await AuthUser.dispatch('login',this.form)
            // console.log(res);
            if (res.success){
                this.$swal("Login Success", `Welcome, ${res.user.username}`, "success")
                this.$router.push('/pokedex')
            }
            else{
                this.$swal("Login Failed", res.message, "error");
            }
        }
    }
}
</script>

<style>

</style>