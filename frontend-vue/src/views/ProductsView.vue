<script setup>
import Grid from '@/components/Grid.vue';
import ProductList from '@/components/ProductList.vue';
import { onMounted, ref } from 'vue';

const libri = ref([]);

const formShow = ref(true);

const gridLibriColumns = ['titolo', 'anno', 'genere', 'autore.nome']
const radioSelection = ['titolo', 'anno', 'genere', 'autore.nome', 'all']

const searchQuery = ref('')
const selectedField = ref('all')

onMounted(() => {
  fetch('http://localhost:8000/api/libri')
    .then((response) => {
      // Controllo manuale dello stato HTTP
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`)
      }
      // Converte la risposta in JSON (ritorna una nuova Promise)
      return response.json()
    })
    .then((data) => {
      // Aggiorna lo stato reattivo con i dati ricevuti
      libri.value = data.results
    })
    
    console.log(libri.value);

});


</script>

<template>
  <main class="main" >
    <div>
      <form id="search">
        Cerca <input name="query" v-model="searchQuery">
        
        <select v-model="selectedField">
          <option v-for="key in radioSelection" :key="key">
            {{ key }}
          </option>
        </select>

      </form>

      <!-- <button class="but-toggle" @click="formShow = !formShow">Toggle</button> 
      <br>
      <Transition name="bounce">
         <p v-if="formShow" style="text-align: center;">
          Ciao, ecco del testo che rimbalza!
        </p>
      </Transition>
      -->

      <ProductList></ProductList>
     
    </div>


    <Grid
      style="width: 45%;"
      :data="libri"
      :columns="gridLibriColumns"
      :filter-key="searchQuery"
      :selected-field="selectedField">
    </Grid>
    
  </main>

</template>

<style scoped>
    .main{
      display: flex;
      justify-content:space-between;
    }

    .but-toggle{
      margin: 20px;
      width: 200px;
    }
    .bounce-enter-active {
        animation: bounce-in 0.8s;
    }
    .bounce-leave-active {
        animation: bounce-in 0.8s reverse;
    }

    @keyframes bounce-in {
      0% {
          transform: scale(0);
      }
      50% {
          transform: scale(1.25);
      }
      100% {
          transform: scale(1);
      }
    }

</style>
