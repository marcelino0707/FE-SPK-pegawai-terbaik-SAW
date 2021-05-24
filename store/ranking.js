
export const state = () => ({
    rankings: [], 
    data: [],
    errors: [],
    labels: [],
    datasets: [],
    page: 1,
    tables: [],
    excels: []
})

export const mutations = {
    //MUTATIONS UNTUK MENGUBAH VALUE DARI STATE
    SET_RANKING_DATA(state, payload) {
       state.rankings = payload
    },
    SET_DATA(state, payload) {
       state.data = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_LABEL(state, payload) {
        state.labels = payload
    },
    SET_DATASET(state, payload) {
        state.datasets = payload
    },
    SET_TABLE(state, payload) {
        state.tables = payload
    },
    SET_EXCEL(state, payload) {
        state.excels = payload
    }
}

export const actions = {
    //ACTIONS UNTUK MELAKUKAN REQUEST KE API
    async getRankingsData({ commit, state}, payload) {
        let datepicker = payload ? payload : ''
        // let search = payload ? payload : ''

        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/ranking?datepicker=${datepicker}&page=${state.page}`).then((response) => {
                commit('SET_RANKING_DATA', response.data.data)

                // if(response.data.data.total)
                // {
                    // var fillData = []
                    // var labelData = []
                    // var check = response.data.data.total
    
                    // for(var i = 0; i < check; i++){
                    //     fillData.push(response.data.data.data[i].total)
                    //     labelData.push(response.data.data.data[i].Employee.nama_pegawai)
                    // }
                    
                    // commit('SET_LABEL', labelData)
                    // commit('SET_DATASET', fillData)
                // }
                
                resolve()
            })
        })
    },
    async getExportAll({ commit}, payload) {
        let datepicker = payload ? payload : ''

        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/ranking/all?datepicker=${datepicker}`).then((response) => {
                commit('SET_RANKING_DATA', response.data.data)   

                var fillData = []
                var labelData = []
                var excelData = []
                var check = response.data.data.total

                for(var i = 0; i < check; i++){
                    fillData.push(response.data.data.data[i].total)
                    labelData.push(response.data.data.data[i].Employee.nama_pegawai)
                    excelData.push({
                        id : response.data.data.data[i].pegawai_id,
                        nama_pegawai : response.data.data.data[i].Employee.nama_pegawai,
                        nilai_inisiatif : response.data.data.data[i].nilai_inisiatif,
                        nilai_kedisiplinan : response.data.data.data[i].nilai_kedisiplinan,
                        nilai_kerjasama: response.data.data.data[i].nilai_kerjasama,
                        nilai_kinerja: response.data.data.data[i].nilai_kinerja,
                        nilai_prestasi: response.data.data.data[i].nilai_prestasi,
                        nilai_tanggungJawab: response.data.data.data[i].nilai_tanggungJawab,
                        total: response.data.data.data[i].total
                    })
                }
                
                commit('SET_EXCEL',excelData)
                commit('SET_LABEL', labelData)
                commit('SET_DATASET', fillData)

                // console.log(excelData)

                resolve()
            })
        })
    },
    storeRankingsData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/ranking', payload)
            .then((response) => {
                dispatch('getRankingsData')
                resolve()
            })
            .catch((error) => {
                // console.log(error.response.data.errors.[0].message)
                // console.log(error.response.data)
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    getRankingsEmployee({ commit }, payload) {
        let datepicker = payload.datepicker ? payload.datepicker : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/ranking/${payload.id}?datepicker=${datepicker}`).then((response) => {
                // console.log(response.data.data.data)
                let monthNames = ['Januari','Febuary','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
                let tables = []
                
                let fillData = []
                let dataset = response.data.data.data
                dataset.forEach(element => {
                    var temp = element.total
                    fillData.push(temp)
                });

                for(var i = 0; i<12; i++){
                    tables.push({ month : monthNames[i], total : fillData[i]})
                }

                // console.log(tables)
                commit('SET_DATA', fillData)
                commit('SET_TABLE', tables)
                resolve()
            })
        })
    },
    // updateRankingsData({ dispatch, commit }, payload) {
    //     return new Promise((resolve, reject) => {
    //         this.$axios.put(`/api/employee/${payload.id}`, payload)
    //         .then((response) => {
    //             dispatch('getRankingsData')
    //             resolve()
    //         })
    //         .catch((error) => {
    //             commit('SET_ERRORS', error.response.data)
    //         })
    //     })
    // },
    // destroyRankingsData({ dispatch, commit }, payload) {
    //     return new Promise((resolve, reject) => {
    //         this.$axios.delete(`/api/employee/${payload}`)
    //         .then((response) => {
    //             dispatch('getRankingsData')
    //             resolve()
    //         })
    //         .catch((error) => {
    //             commit('SET_ERRORS', error.response.data)
    //         })
    //     })
    // }
}