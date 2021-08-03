<template>
  <div>
      <h1>Edit Pokemon {{ id }} </h1>
  </div>
</template>

<script>
import PokedexService from '@/services/PokedexService'
export default {
    data(){
        return{
            id: '',
            form: {
                name:'',
                name_jp: '',
                pokemon_types: ''
            }
        }
    },
    created(){
        this.id = this.$route.id
        let pokemon = await PokedexService.getPokemonById(this.id)
        console.log(pokemon);
        this.form.name = pokemon.name
    }
}
</script>

<style>

</style>