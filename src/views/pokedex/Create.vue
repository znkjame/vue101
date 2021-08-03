<template>
    <div>
        <pokedex-create-form></pokedex-create-form>
    </div>
</template>

<script>
import PokedexCreateFrom from '@/components/PokedexCreateForm'
import AuthUser from '@/store/AuthUser'
export default {
    components:{
        PokedexCreateFrom
    },
    data(){
        return{
            isAuthen : AuthUser.getters.isAuthen
        }
    },
    mounted(){
        if(!(this.isAuthen)){
            this.$swal("Restricted Area","You have no permission","warning")
            this.$router.push("/pokedex")
        }
    }
}
</script>

<style>

</style>