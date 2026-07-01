<script setup>
import Grid from '@/components/Grid.vue';
import Modal from '@/components/Modal.vue';
import { onMounted, ref } from 'vue';
import { getProducts } from '@/services/productService';
import Button from '@/components/ui/Button.vue';

const products = ref([])
const error = ref(null)
const loading = ref(true)
const form = ref({})

const showModalNoTeleport = ref(false);

const gridLibriColumns = ['titolo', 'anno', 'genere', 'autore.nome']
const radioSelection = ['titolo', 'anno', 'genere', 'autore.nome', 'all']

const searchQuery = ref('')
const selectedField = ref('all')

onMounted(async () => {
   try {
      products.value = await getProducts()
   } catch (err) {
      error.value = "Impossibile caricare i prodotti."
   } finally {
      loading.value = false
   }
   console.log(products.value);
});

function saveProduct(){
  console.log(form);
  
  fetch('https://deploy-django-backend.onrender.com/api/v1/libri/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
  });

}

</script>

<template>
  <main class="main" >
    <div class="search-panel">
      <form id="search" class="flex-item">
        <input name="query" placeholder="Search..." v-model="searchQuery">
        <select v-model="selectedField">
          <option v-for="key in radioSelection" :key="key">
            {{ key }}
          </option>
        </select> 
      </form>
      <div class="butt-add" @click="showModalNoTeleport = true">+</div>
      <Grid
        class="flex-item"
        :data="products"
        :columns="gridLibriColumns"
        :filter-key="searchQuery"
        :selected-field="selectedField">
      </Grid>
    </div>
  
    <Modal 
        :is-open="showModalNoTeleport" 
        title="Aggiungi prodotto" 
        @close="showModalNoTeleport = false" 
    >
      <form @submit.prevent="saveProduct">
        <input type="text" placeholder="Titolo" v-model="form.titolo" class="input-item">
        <input type="text" placeholder="Anno" v-model="form.anno" class="input-item">
        <input type="text" placeholder="Genere" v-model="form.genere" class="input-item">
        <Button>Salva</Button>
      </form>
    </Modal>

  </main>

</template>

<style scoped>
    .main {
      display: flex;
      justify-content: space-between;
      gap: 20px; /* Distanzia il blocco prodotti dal blocco dei bottoni laterali */
    }

    .search-panel {
      display: flex;
      flex-direction: column;
      gap: 15px; 
    }

    .flex-item {
      width: 100%;            
      /* Form e griglia prendono tutto il 100% del padre */
      box-sizing: border-box; 
      /* Evita che padding o bordi sballino la larghezza totale */
    }

    #search {
      display: flex;          
      gap: 10px;
      width: 100%;
    }

    /* Fa in modo che l'input e la select si dividano equamente lo spazio */
    #search input, 
    #search select {
      flex: 1;
      padding: 6px;
      box-sizing: border-box;
    }

    .but-toggle{
      margin: 20px;
      width: 200px;
    }

    .input-item{
      width: 100%;
      margin-bottom: 10px;
      padding: 5px;
    }

    .butt-add{
      padding: 15px;
      background-color: rgb(107, 150, 229);
      border: none;
      text-align: center;
      font-size: 1.5em;
      font-weight: 600;
      cursor: pointer;
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
