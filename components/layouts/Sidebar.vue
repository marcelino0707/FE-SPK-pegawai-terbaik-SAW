<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">SPK SAW
                <!-- <sup>2</sup> -->
            </div>
        </a>
        <hr class="sidebar-divider my-0">
        <li class="nav-item active">
            <a class="nav-link" href="/">
            <!-- <a class="nav-link" :to="{name: 'index'}"> -->
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <hr class="sidebar-divider">
        <div class="sidebar-heading">
            Master Data
        </div>
        <li class="nav-item">
            <nuxt-link class="nav-link" :to="{name: 'employees'}">
                <!-- <i class="fas fa-fw fa-tag"></i> -->
                <i class="fas fa-fw fa-users"></i>
                <span>Manage Employees</span>
            </nuxt-link>

            <!-- <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"></a> -->
            <!-- <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Custom Components:</h6>
                    <a class="collapse-item" href="buttons.html">Buttons</a>
                </div>
            </div> -->
        </li>
        <li class="nav-item">
            <nuxt-link class="nav-link" :to="{name: 'criterion'}">
                <!-- <i class="fas fa-fw fa-cog"></i> -->
                <i class="fas fa-fw fa-tag"></i> 
                <span>Manage Criterion</span>
            </nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link class="nav-link" :to="{name: 'rankings'}">
                <!-- <i class="fas fa-fw fa-cog"></i> -->
                <i class="fas fa-award"></i>
                <span>Manage Rankings</span>
            </nuxt-link>
        </li>
        <hr class="sidebar-divider">
        <div class="sidebar-heading">
            Chart
        </div>
        <li class="nav-item">
            <nuxt-link class="nav-link" :to="{name: 'graphRankings'}">
                <!-- <i class="fas fa-fw fa-cog"></i> -->
                <i class="fas fa-chart-bar"></i>
                <span>Graph Rankings</span>
            </nuxt-link>
        </li>
        <hr class="sidebar-divider">
    </ul>
</template>

<script>
export default {
    
}
</script>