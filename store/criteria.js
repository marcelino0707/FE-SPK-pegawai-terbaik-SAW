export const state = () => ({
    criterion: [], 
    errors: [],
    page: 1
})

export const mutations = {
    //MUTATIONS UNTUK MENGUBAH VALUE DARI STATE
    SET_CRITERIA_DATA(state, payload) {
       state.criterion = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    }
}

export const actions = {
    //ACTIONS UNTUK MELAKUKAN REQUEST KE API
    getCriterionData({ commit}) {
        // let search = payload ? payload: ''
        return new Promise((resolve, reject) => {
            // this.$axios.get(`/api/ranking?search=${search}&page=${state.page}`).then((response) => {
            this.$axios.get('/api/criterion').then((response) => {
                commit('SET_CRITERIA_DATA', response.data.data)
                resolve()
            })
        })
    },
    updateCriterionData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put(`/api/criterion/${payload.id}`, payload)
            .then((response) => {
                dispatch('getCriterionData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    }
}