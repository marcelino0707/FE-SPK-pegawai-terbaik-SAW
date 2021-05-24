<template>
    <div>
         <div class="container-fluid">
            <div class="card mb-3">
                <div class="card-header">
                    <h4 class="card-title"></h4>
                </div>
                <div class="card-body">
                   <app-employee-form/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeForm from '@/components/form/Employee'
export default {
    components: {
        'app-employee-form' : EmployeeForm
    },
}
</script>