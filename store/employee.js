export const state = () => ({
    employees: [], //STATE UNTUK MENYIMPAN DATA EMPLOYEES
    data: [],
    errors: [],
    page: 1
})

export const mutations = {
    //MUTATIONS UNTUK MENGUBAH VALUE DARI STATE
    SET_EMPLOYEE_DATA(state, payload) {
       state.employees = payload
    },
    SET_DATA(state, payload) {
       state.data = payload
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
    getEmployeesData({ commit, state }, payload) {
        let search = payload ? payload: ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/employee?search=${search}&page=${state.page}`).then((response) => {
                //JIKA PROSESNYA SELESAI, MAKA DATA YANG DITERIMA DARI API
                //AKAN DISIMPAN KE DALAM STATE EMPLOYEES
                commit('SET_EMPLOYEE_DATA', response.data.data)
                resolve()
            })
        })
    },
    storeEmployeesData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/employee', payload)
            .then((response) => {
                dispatch('getEmployeesData')
                resolve()
            })
            .catch((error) => {
                // console.log(error.response.data.errors.[0].message)
                // console.log(error.response.data)
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    getData({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/employee/${payload}`).then((response) => {
                commit('SET_DATA', response.data)
                resolve()
            })
        })
    },
    updateEmployeesData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put(`/api/employee/${payload.id}`, payload)
            .then((response) => {
                dispatch('getEmployeesData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    destroyEmployeesData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/employee/${payload}`)
            .then((response) => {
                dispatch('getEmployeesData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    }
}