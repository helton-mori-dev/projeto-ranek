<template>
  <form>
    <input
      type="text"
      name="busca"
      id="busca"
      v-model="busca"
      placeholder="buscar..."
    />
    <input
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="buscarProdutos"
    />
  </form>
</template>
<script>
export default {
  name: "ProdutosBuscar",
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    buscarProdutos() {
      this.$router.push({ query: { q: this.busca } });
    },
  },
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px;
  position: relative;
  padding: 0 10px;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:focus,
#busca:hover {
  outline: none;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
}

#lupa {
  width: 62px;
  height: 58px;
  background: url(../assets/search.svg) no-repeat center;
  font-size: 0;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
</style>