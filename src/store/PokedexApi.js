import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/AuthService'

let api_endpoint = process.env.VUE_APP_POKEDEX_ENDPOINT || 'http://localhost:1337'

Vue.use(Vuex)

export default new Vuex.Store({
    //state คือ field in oop
  state: {
      data: []
  },
  getters: { 
      pokemons: (state) => state.data,
  },

  //เหมือน private setter ใน oop 
  //เอาไว้เปลี่ยนแปลงค่าใน state
  mutations: {
      fetch(state, { res }){
        state.data = res.data
      },
      add(state, { payload }){
          state.data.push(payload)
      },
      edit(state, payload ){
        state.data[payload.index] = payload.data
        //   state.data[payload.index].name = payload.name
        //   state.data[payload.index].name_jp = payload.name_jp
        //   state.data[payload.index].pokemon_types = payload.pokemon_types
      }
  },

  //เหมือน pubilc methods ใน oop
  //ให้ภายนอกเรียกใช้ หรือดึงข้อมูลจากภายนอก
  actions: {
      //commit เป็น keyword ไว้เรียก mutation
      async fetchPokemon({commit}){
        let res = await axios.get(api_endpoint + "/monsters")
        commit('fetch',{res})
      },

      async addPokemon ({ commit }, payload){
          let url = api_endpoint + "/monsters"
          let qs = payload.pokemon_types.map((it) => "name_in"+it).join("&")
          let res_type = await Axios.get(api_endpoint + '/types' + qs)
          let body = {
            name:payload.name,
            name_jp:  payload.name_jp,
            pokemon_types: res_type.data.map((it)=> it.id)
        }
        try{
          let headers = AuthService.getApiHeader()
          let res = await axios.post(url, body, headers)
          let data = res.data
          if (res.status === 200){
            commit('add', data)
            return{
              success: true,
              data: res.data
            }
          }
          else{
            console.error(res);
            return {
              success: false,
              message: "Unknown status code " + res.status
            }
          }
          
        } catch(e){
          if(e.response.status === 403){

          }
        }
          
      },

      async editPokemon({ commit }, payload){
          let url = api_endpoint + "/monsters/" + payload.id
          let body = {
              name: payload.name,
              name_jp: payload.name_jp,
          }
          let res = await axios.put(url,body)
          console.log(res)
          if (res.status === 200){
            let data = {}
            data['data'] = res.data
            data['index'] = payload.index
            commit("edit", data )
          } else{
              console.err(res)
          }  
      },
  },
  modules: {
  }
})
