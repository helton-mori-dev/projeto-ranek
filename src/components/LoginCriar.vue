<template>
  <section>
    <h2>Crie a sua conta</h2>
    <ErroNotificacao :erros="erros"></ErroNotificacao>
    <transition mode="out-in">
      <button @click="criar = true" class="btn" v-if="!criar">
        Criar conta
      </button>
      <UsuarioForm v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">
          Criar Usuário
        </button>
      </UsuarioForm>
    </transition>
  </section>
</template>
  
  <script>
import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  data() {
    return {
      criar: false,
      erros: [],
    };
  },
  components: {
    UsuarioForm,
  },
  methods: {
    async criarUsuario() {
      this.erros = [];
      const button = event.currentTarget;
      button.value = "Criando...";
      button.setAttribute("disabled", "");
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        await this.criarTransacao();
        this.$router.push({ name: "usuario" });
      } catch (erro) {
        this.erros.push(erro.response.data.message);

        button.removeAttribute("disabled");
        button.value = "Criar Usuário";
      }
    },
  },
};
</script>
  
<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
