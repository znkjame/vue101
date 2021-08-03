import Axios from "axios"


const api_endpoint = process.env.VUE_APP_POKEDEX_ENDPOINT || 'http://localhost:1337'

export default {
    async getPokemonByID(id){
        try {
            let url = api_endpoint + "?id=" + id
            let res = await Axios.get(url)
        } catch (e) {
            
        }
    }
}