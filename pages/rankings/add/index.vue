<template>
    <div>
         <div class="container-fluid">
            <div class="card mb-3">
                <div class="card-header">
                    <h4 class="card-title"></h4>
                </div>
                <div class="card-body">
                   <app-ranking-form/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RankingForm from '@/components/form/Ranking'
export default {
    components: {
        'app-ranking-form' : RankingForm
    },
}
</script>