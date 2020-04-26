import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        config: [],
        records: {},
    },
    getters: {
        config(state) {
            return state.config
        },
    },
    mutations: {
        setConfig(state, config) {
            state.config = config
        },
        setRecords(state, records) {
            state.records = records
        }
    },
    actions: {
        loadConfig({commit}) {
            const xhr = new XMLHttpRequest()

            xhr.open('GET', 'config.json', true)

            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    const tree = Array.from(JSON.parse(xhr.responseText).tree)

                    commit('setConfig', tree)

                    const records = {};

                    const getRecords = (record) => {
                        if(record.content) {
                            records[record.id] = record.content
                        }

                        if(record.sections) {
                            record.sections.forEach(rec => {
                                getRecords(rec)
                            })
                        }
                    }

                    tree.forEach(record => {
                        getRecords(record)
                    })

                    commit('setRecords', records)
                }
            }

            xhr.send();
        }
    }
})