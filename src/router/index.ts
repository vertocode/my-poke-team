import {createRouter, createWebHistory}  from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'MyTeams',
        component: () => import('../views/MyTeams.vue')
    },
    {
        path: '/createteam',
        name: 'CreateTeam',
        component: () => import('../views/CreateTeam.vue')
    },
]

export const router = createRouter({
    history: createWebHistory('/'),
    routes
})
