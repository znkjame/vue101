import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

let api_endpoint = 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json'

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
      edit(state, { payload }){
          state.data[payload.index].name = payload.name
          state.data[payload.index].type = payload.type
      }
  },

  //เหมือน pubilc methods ใน oop
  //ให้ภายนอกเรียกใช้ หรือดึงข้อมูลจากภายนอก
  actions: {
      //commit เป็น keyword ไว้เรียก mutation
      async fetchPokemon({commit}){
        //สมมติไปเรียกข้อมูลจาก api
        // let res = {
        //     data: [
        //         {
        //             name: {
        //                 english: 'Bulbasaur',
        //                 japanese: 'Fushikidane',
        //             },
        //             type: ['Grass', 'Poison']
        //         },
        //         {
        //           name: {
        //               english: 'Bulbasaur 2',
        //               japanese: 'Fushikidane 2',
        //           },
        //           type: ['Grass', 'Poison']
        //       },
        //     ]
        // }
        let res = await axios.get(api_endpoint)
        commit('fetch',{res})
      },

      addPokemon ({ commit }, payload){
          //todo : call api to add data
          commit('add', { payload })
      },

      editPokemon({ commit }, payload){
          //todo: call api to edit data
          commit("edit", { payload })
      },
  },
  modules: {
  }
})
