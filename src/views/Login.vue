<template>
  <section class="login">
    <h1>Login</h1>
    <form action="">
      <label for="email">Email</label>
      <input type="email" nome="email" id="email" v-model="login.email" />
      <label for="senha">Senha</label>
      <input type="senha" nome="senha" id="senha" v-model="login.senha" />
      <button class="btn" @click.prevent="logar">Logar</button>
      <ErroNotificacao :erros="erros"></ErroNotificacao>
    </form>
    <p class="perdeu">
      <a href="http://ranekapilocal.local/wp-login.php?action=lostpassword"
        >Perdeu a senha?</a
      >
    </p>
    <LoginCriar></LoginCriar>
  </section>
</template>
<script>
import LoginCriar from "@/components/LoginCriar.vue";
import ErroNotificacao from "../components/ErroNotificacao.vue";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        senha: "",
      },
      erros: [],
    };
  },
  components: {
    LoginCriar,
    ErroNotificacao,
  },
  methods: {
    logar() {
      this.erros = [];
      this.$store
        .dispatch("logarUsuario", this.login)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "Usuario" });
        })
        .catch((erro) => {
          this.erros.push(erro.response.data.message);
        });
    },
  },
  created() {
    document.title = "Login";
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>