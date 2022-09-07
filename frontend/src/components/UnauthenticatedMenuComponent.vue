<template>
    <TabMenu :model="items"/>
</template>

<script>
import TabMenu from 'primevue/tabmenu';

export default {
    components: {
        TabMenu
    },
    data () {
        return {
            items: [
                {label: 'Jobs', to: '/jobs'},
                {label: 'Login', to: '/login'},
                {label: 'Register', to: '/register'},
                {label: 'Register Company', to: '/registerCompany'},
            ],
        }
    }
}
</script>
