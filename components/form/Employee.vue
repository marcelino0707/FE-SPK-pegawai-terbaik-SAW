<template>
    <div>
        <div class="form-group">
            <label for="">Nama Pegawai</label>
            <input 
                type="text" class="form-control" 
                v-model="employees.nama_pegawai"
                :class="{'is-invalid' : errors.nama_pegawai}" 
            >
            <p class="text-danger" v-if="errors.nama_pegawai">{{errors.nama_pegawai}}</p>
        </div>
        <div class="form-group">
            <label for="">NIK</label>
            <input 
                type="number" class="form-control" 
                v-model="employees.nik"
                :class="{'is-invalid' : errors.nik}" 
            >
            <p class="text-danger" v-if="errors.nik">{{errors.nik}}</p>
        </div>
        <button class="btn btn-primary btn-sm" @click="submit">Save</button>
        <nuxt-link :to="{name: 'employees'}" class="btn btn-secondary btn-sm">Back</nuxt-link>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    created() {
        if(this.$route.name == 'employees-edit-id') {
            this.employees = {
                nama_pegawai: this.employee.nama_pegawai,
                nik: this.employee.nik
            }
        }
    },
    data() {
        return {
            employees: {
                nama_pegawai: '',
                nik: ''
            }
        }
    },
    computed: {
        ...mapState('employee', {
            employee: state => state.data,
            errors: state => state.errors
        })
    },
    methods: {
        ...mapActions('employee', ['storeEmployeesData', 'updateEmployeesData']),
        submit() {
            if(this.$route.name == 'employees-edit-id'){
                let data = Object.assign({id: this.$route.params.id}, this.employees)
                // this.clearForm()
                this.updateEmployeesData(data).then(() => this.$router.push({name: 'employees'}))
                // this.updateEmployeesData(data).then((this.$router.push({name:'employees'})))
            } else{
                this.storeEmployeesData(this.employees).then(() => this.$router.push({name: 'employees'}))
            }
        },
        // clearForm(){

        // }
    }
}
</script>