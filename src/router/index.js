import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserIndex from '../views/UserIndex.vue'
import UserAllEvents from '../views/UserAllEvents.vue'
import SignUp from '../pages/SignUp.vue'
import LogIn from '../pages/LogIn.vue'
import UserViewEvent from '../pages/UserViewEvent.vue'
import UserEventsSingle from '../pages/UserEventsSingle.vue'
import CreateTicket from '../pages/CreateTicket.vue'
import MakeReservation from '../pages/MakeReservation.vue'
import Validate from '../pages/Validate.vue'
import PrintInvoice from '../pages/PrintInvoice.vue'
import PrintInvoiceSingle from '../pages/PrintInvoiceSingle.vue'
import Test from '../pages/Test.vue'
import UpdateEvent from '../del/UpdateEvent.vue'

//OPTIMIZED LOADING
// const HomeView = () => import ('../views/HomeView.vue')

const PageNotFound = () => import ('../pages/PageNotFound.vue')


const routes = [
  { 
    path: '/raw',
    name: 'raw',
    component: Test,
    meta: {auth: false}
  },
  { 
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {auth: false}
  },
  { 
    name: 'signup',
    path: '/signup',
    component: SignUp,
    meta: {auth: false}
  },
  { 
    path: '/login',
    name: 'login',
    component: LogIn,
    meta: {auth: false}
  },
  { 
    path: '/userpost',
    name: 'userpost',
    component: UserIndex,
    meta: {auth: true}
  },
  { 
    path: '/userview',
    name: 'userview',
    component: UserAllEvents,
    meta: {auth: true}
  },
  { 
    path: '/myevent/edit-my-event/:id',
    name: 'updateEvent',
    component: UserViewEvent,
    meta: {auth: true}
  },
  { 
    path: '/myevent/:id',
    name: 'myevent',
    component: UserEventsSingle,
    meta: {auth: true}
  },
  { 
    path: '/myevent/createticket/:id',
    name: 'createticket',
    component: CreateTicket,
    meta: {auth: true}
  },
  // { 
  //   path: '/mysingleevent/:id',
  //   name: 'mySingleEvent',
  //   component: UserViewEvent,
  //   meta: {auth: true}
  // },
  { 
    path: '/event',
    name: 'event',
    component: UpdateEvent,
    meta: {auth: true}
  },
  { 
    path: '/makereservation/:id',
    name: 'makereservation',
    component: MakeReservation,
    meta: {auth: false}
  },
  { 
    path: '/validate',
    name: 'validate',
    component: Validate,
    meta: {auth: false}
  },
  { 
    path: '/printinvoice',
    name: 'printinvoice',
    component: PrintInvoice,
    meta: {auth: false}
  },
  { 
    path: '/printinvoice/:receipt_number',
    name: 'printinvoicesingle',
    component: PrintInvoiceSingle,
    meta: {auth: false}
  },
  {
    name: 'PageNotFound',
    path: '/:pathMatch(.*)*',
    component: PageNotFound
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes 
})

// navitaion guards
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if('auth' in to.meta && to.meta.auth && !loggedIn) {
    next('/login')
  } else if ('auth' in to.meta && !to.meta.auth && loggedIn) {
    next('/userpost')
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if('auth' in to.meta && to.meta.auth && !store.getters[`auth/${IS_USER_AUTHETICATED_GETTER}`]) {
//     next('/login')
//   } else if ('auth' in to.meta && !to.meta.auth && store.getters[`auth/${IS_USER_AUTHETICATED_GETTER}`]) {
//     next('/userpost')
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/printinvoice', '/signup', {name: 'makereservation'}, '/', '/makereservation/:id', '/makereservation', '/raw', '/:pathMatch(.*)*']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('user')
//   if(authRequired && !loggedIn){
//     next('/login')
//   } else {
//     next()
//   }
// })



export default router



