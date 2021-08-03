<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name (En)</th>
                    <th>Name (Jp)</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(poke, index) in pokemons" :key="index">
                    <td>{{ index+1 }}</td>
                    <td v-if="index !==  editIndex">{{ poke.name}}</td>
                    <td v-if="index === editIndex">
                        <input type="text" v-model="form.name">
                    </td>

                    <td v-if="index !==  editIndex">{{ poke.name_jp }}</td>
                    <td v-if="index === editIndex"> 
                        <input type="text" v-model="form.name_jp">
                    </td>

                    <td v-if="index !==  editIndex">{{ poke.pokemon_types.map(it => it.name).join(', ') }}</td>
                    <td v-if="index === editIndex"> 
                        <input type="text" v-model="form.pokemon_types">
                        </td>
                    <td v-if="index !== editIndex">
                        <button @click="openForm(index, poke)">Click to Edit</button>
                    </td>
                    <td v-if="index === editIndex">
                        <button @click="editPokemon">Update Pokemon</button>
                        <button @click="closeForm">Cancel</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import PokedexApiStore from '@/store/PokedexApi'
export default {
    data(){
        return {
            pokemons:[],
            editIndex: -1,
            form: {
                id:'',
                name: '',
                name_jp: '',
                pokemon_types: ''
            }
        }
    },
    created(){
        //เรียก modthod
        this.fetchPokemon()
    },
    methods: {
        async fetchPokemon(){
            //เรียก action ใน Store ใช่ Store.dispatch(ชื่อ action)
            await PokedexApiStore.dispatch('fetchPokemon')

            this.pokemons = PokedexApiStore.getters.pokemons
            // console.log(this.pokemons)
        },
        openForm(index, pokemon) {
            // console.log('index',index)
            // console.log('pokemon',pokemon)
            this.editIndex = index
            let cloned = JSON.parse(JSON.stringify(pokemon))
            this.form.id = cloned.id
            this.form.name = cloned.name
            this.form.name_jp = cloned.name_jp
            this.form.pokemon_types = cloned.pokemon_types.map(it => it.name).join(', ')
        },
        closeForm(){
            this.editIndex = -1
            this.form = {
                id:'',
                name: '',
                name_jp: '',
                pokemon_types: ''
            }
        },
        editPokemon(){
            let payload = {
                index: this.editIndex,
                id: this.form.id,
                name: this.form.name,
                name_jp: this.form.name_jp,
                pokemon_types: this.form.pokemon_types.split(',').map(
                    (item) => item.trim()
                ),
            }
            console.log(payload)
            PokedexApiStore.dispatch('editPokemon',payload)
            this.closeForm()
        }
    }
}
</script>

<style>

</style>