<template>
    <div>
        <!-- <div class="form-group">
            <label for="">Nama Pegawai</label>
            <input 
                type="text" class="form-control" 
                v-model="employees.nama_pegawai"
                :class="{'is-invalid' : errors.nama_pegawai}" 
            >
            <p class="text-danger" v-if="errors.nama_pegawai">{{errors.nama_pegawai}}</p>
        </div> -->
        <div class="form-group">
            <label for="">ID Pegawai</label>
            <input 
                type="number" class="form-control" 
                v-model="rankings.pegawai_id"
                :class="{'is-invalid' : errors.pegawai_id}" 
            >
            <p class="text-danger" v-if="errors.pegawai_id">{{errors.pegawai_id}}</p>
        </div>
        <div class="form-group">
            <label for="">Nilai Kedisiplinan</label>
            <input 
                type="number" max="100" class="form-control" 
                v-model="rankings.nilai_kedisiplinan"
                :class="{'is-invalid' : errors.nilai_kedisiplinan}" 
            >
            <p class="text-danger" v-if="errors.nilai_kedisiplinan">{{errors.nilai_kedisiplinan}}</p>
        </div>
        <div class="form-group">
            <label for="">Nilai Kerjasama</label>
            <input 
                type="number" max="100" class="form-control" 
                v-model="rankings.nilai_kerjasama"
                :class="{'is-invalid' : errors.nilai_kerjasama}" 
            >
            <p class="text-danger" v-if="errors.nilai_kerjasama">{{errors.nilai_kerjasama}}</p>
        </div>
        <div class="form-group">
            <label for="">Nilai Inisiatif</label>
            <input 
                type="number" max="100" class="form-control" 
                v-model="rankings.nilai_inisiatif"
                :class="{'is-invalid' : errors.nilai_inisiatif}" 
            >
            <p class="text-danger" v-if="errors.nilai_inisiatif">{{errors.nilai_inisiatif}}</p>
        </div>
        <div class="form-group">
            <label for="">Nilai Kinerja</label>
            <input 
                type="number" max="100" class="form-control" 
                v-model="rankings.nilai_kinerja"
                :class="{'is-invalid' : errors.nilai_kinerja}" 
            >
            <p class="text-danger" v-if="errors.nilai_kinerja">{{errors.nilai_kinerja}}</p>
        </div>
        <div class="form-group">
            <label for="">Nilai Tanggung Jawab</label>
            <input 
                type="number" max="100" class="form-control" 
                v-model="rankings.nilai_tanggungJawab"
                :class="{'is-invalid' : errors.nilai_tanggungJawab}" 
            >
            <p class="text-danger" v-if="errors.nilai_tanggungJawab">{{errors.nilai_tanggungJawab}}</p>
        </div>
        <div class="form-group">
            <label for="">Nilai Prestasi</label>
            <input 
                type="number" max="100" class="form-control" 
                v-model="rankings.nilai_prestasi"
                :class="{'is-invalid' : errors.nilai_prestasi}" 
            >
            <p class="text-danger" v-if="errors.nilai_prestasi">{{errors.nilai_prestasi}}</p>
        </div>
        <button class="btn btn-primary btn-sm" @click="submit">Save</button>
        <nuxt-link :to="{name: 'rankings'}" class="btn btn-secondary btn-sm">Back</nuxt-link>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    // created() {
    //     if(this.$route.name == 'employees-edit-id') {
    //         this.employees = {
    //             nama_pegawai: this.employee.nama_pegawai,
    //             nik: this.employee.nik
    //         }
    //     }
    // },
    data() {
        return {
            rankings: {
                pegawai_id: '',
                nilai_kedisiplinan: '',
                nilai_kerjasama: '',
                nilai_inisiatif: '',
                nilai_kinerja: '',
                nilai_tanggungJawab: '',
                nilai_prestasi: '',
            }
        }
    },
    computed: {
        ...mapState('ranking', {
            ranking: state => state.data,
            errors: state => state.errors
        })
    },
    methods: {
        ...mapActions('ranking', ['storeRankingsData']),
        submit() {
            this.storeRankingsData(this.rankings).then(() => this.$router.push({name: 'rankings'}))
        },
    }
}
</script>