import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Produto from "./views/Produto.vue"
import Login from "./views/Login.vue"
import Usuario from "./views/usuario/Usuario.vue"
import UsuarioProdutos from "./views/usuario/UsuarioProdutos.vue"
import UsuarioEditar from "./views/usuario/UsuarioEditar.vue"
import UsuarioVendas from "./views/usuario/UsuarioVendas.vue"
import UsuarioCompras from "./views/usuario/UsuarioCompras.vue"
import PaginaNaoEncontrada from "./views/PaginaNaoEncontrada.vue"

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: '*',
      component: PaginaNaoEncontrada
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/produto/:id",
      name: "produto",
      component: Produto,
      props: true
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }, {
      path: "/usuario",
      name: "usuario",
      component: Usuario,
      meta: {
        login: true,
      },
      children: [{
          path: "",
          name: "usuario",
          component: UsuarioProdutos
        },
        {
          path: "compras",
          name: "compras",
          component: UsuarioCompras
        },
        {
          path: "editar",
          name: "usuario-editar",
          component: UsuarioEditar
        },
        {
          path: "vendas",
          name: "vendas",
          component: UsuarioVendas
        }
      ]
    }
  ],
  scrollBehavior() {
    return window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!localStorage.token) {
      next("/login")
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router