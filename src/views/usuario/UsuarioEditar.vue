<template>
  <section>
    <ErroNotificacao :erros="erros"></ErroNotificacao>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">
        Atualizar Usuário
      </button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      erros: [],
    };
  },
  methods: {
    atualizarUsuario() {
      this.erros = [];
      api
        .put(`/usuario`, this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "usuario" });
        })
        .catch((erro) => {
          this.erros.push(erro.response.data.message);
        });
    },
  },
  created() {
    document.title = "Usuario | Editar";
  },
};
</script>

<style>
</style>
