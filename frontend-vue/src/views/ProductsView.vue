<script setup>
import Grid from '@/components/Grid.vue'
import Modal from '@/components/Modal.vue'
import { onMounted, ref } from 'vue'
import { getData } from '@/services/productService'
import Button from '@/components/ui/Button.vue'

const products = ref([])
const autoriList = ref([])
const error = ref(null)
const loading = ref(true)
const form = ref({})

const showModalNoTeleport = ref(false)
const isEditingRecord = ref(false)

const gridLibriColumns = ['titolo', 'anno', 'genere', 'autore.nome']
const radioSelection = ['titolo', 'anno', 'genere', 'autore.nome', 'all']



  // {id:1,name:"Dante Alighieri"},
  // {id:2,name:"Jane Austin"},
  // {id:3,name:"Umberto Boccacio"}

const searchQuery = ref('')
const selectedField = ref('all')

onMounted(async () => {
  try {
    // Recupero i libri dalla API /libri
    products.value = await getData('https://deploy-django-backend.onrender.com/api/v1/libri/')

    // Recupero gli autori per la <select> del form
    autoriList.value = await getData('https://deploy-django-backend.onrender.com/api/v1/autori/')

  } catch (err) {
    error.value = 'Impossibile caricare i prodotti.'
  } finally {
    loading.value = false
  }
  console.log(autoriList.value)

})

async function saveProduct() {
  console.log("Dati form inviati:", form.value)
  const token = localStorage.getItem('token')
  console.log({ token: token })

  // 1. Determina dinamicamente l'URL e il metodo HTTP
  const isEditing = isEditingRecord.value
  const url = isEditing 
    ? `https://deploy-django-backend.onrender.com/api/v1/libri/${form.value.id}/`
    : `https://deploy-django-backend.onrender.com/api/v1/libri/`
  const method = isEditing ? 'PUT' : 'POST'

  try {
    // 2. Esegui la chiamata API (valida sia per PUT che per POST)
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form.value),
    })

    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`)
    }

    // Estrai il risultato restituito dal backend Django
    const result = await response.json()

    // 3. Arricchisci l'oggetto con l'autore completo per la reattività di Vue
    const autoreSelezionato = autoriList.value.find(a => a.id === form.value.autore)
    //console.log({ autoreSelezionato, autoriList: autoriList.value })

    const enrichedProduct = {
      ...result,
      autore: autoreSelezionato || result.autore
    }

    console.log(enrichedProduct);
    

    // 4. Aggiorna lo stato locale dell'array `products`
    if (isEditing) {
      const index = products.value.findIndex((p) => p.id === result.id)
      if (index !== -1) {
        products.value[index] = enrichedProduct
      }
    } else {
      products.value = [...products.value, enrichedProduct]
    }

    // 5. Reset dello stato della UI in caso di successo
    showModalNoTeleport.value = false
    form.value = {}
    isEditingRecord.value = false

    //console.log({ products: products.value })

  } catch (error) {
    console.error('Error trying to save data:', error.message)
    // Qui potresti aggiungere un messaggio di errore visibile all'utente
  }
}

function editRecord(id){
  isEditingRecord.value = true
  const productToEdit = products.value.find(p => p.id === id)
  form.value = {
      id: id,
      titolo: productToEdit.titolo,
      anno: productToEdit.anno,
      genere: productToEdit.genere,
      // Se nel backend l'autore è un oggetto (es. {id: 1, nome: "A"}), prendi solo l'id
      autore: productToEdit.autore?.id || productToEdit.autore 
    }
    showModalNoTeleport.value = true 
}

</script>

<template>
  <main class="main">
    <div class="search-panel">
      <form id="search" class="flex-item">
        <input name="query" placeholder="Search..." v-model="searchQuery">
        <select v-model="selectedField">
          <option v-for="key in radioSelection" :key="key">
            {{ key }}
          </option>
        </select>
      </form>
      <div class="butt-add" @click="showModalNoTeleport = true; form={}">+</div>
      <Grid class="flex-item" 
        :data="products" 
        :columns="gridLibriColumns" 
        :filter-key="searchQuery"
        :selected-field="selectedField"
        @edit-clicked="editRecord">
      </Grid>
    </div>

    <Modal
      :is-open="showModalNoTeleport"
      title="Aggiungi prodotto"
      @close="showModalNoTeleport = false"
    >
      <form @submit.prevent="saveProduct">
        <input 
          type="text" placeholder="Titolo" 
          v-model="form.titolo" 
          class="input-item" 
        />
        <input type="number" placeholder="Anno" v-model.number="form.anno" class="input-item" />
        <input type="text" placeholder="Genere" v-model="form.genere" class="input-item" />
        <input type="number" placeholder="autore id" v-model.number="form.autore" class="input-item" />
        <select v-model="form.autore" class="select-item" >
          <option 
            v-for="autore in autoriList" 
            :key="autore.id" 
            :value="autore.id"
          >
            {{autore.nome}}
          </option> 
        </select>
        <Button>Salva</Button>
      </form>
    </Modal>

  </main>

</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  /* Distanzia il blocco prodotti dal blocco dei bottoni laterali */
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

.but-toggle {
  margin: 20px;
  width: 200px;
}

/* Applica la regola specificamente agli elementi del form */
form input, form select {
  width: 100%;
  box-sizing: border-box; /* Risolve il problema dello sbrodolamento */
}

.input-item {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

.select-item {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  background-color: beige;
}

.butt-add {
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
