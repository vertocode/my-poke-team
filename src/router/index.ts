import {createRouter, createWebHistory}  from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Team',
        component: () => import('../views/Team.vue')
    },
    {
        path: '/createteam',
        name: 'CreateTeam',
        component: () => import('../views/CreateTeam.vue')
    },
    {
        path: '/pokelist',
        name: 'Pokedex',
        component: () => import('../views/Pokedex.vue')
    }
]

export const router = createRouter({
    history: createWebHistory('/'),
    routes
})
