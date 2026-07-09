export async function getData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
        throw error;
    }
}

export async function insertProduct(params) {
    try {
        const response = await fetch('https://deploy-django-backend.onrender.com/api/v1/libri/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Errore nell'inserimento del prodotto:", error);
        throw error;
    }
}


// export async function saveProduct(isEditingRecord) {
//   console.log(form.value)
//   const token = localStorage.getItem('token') // or sessionStorage, or from Vuex/Pinia store
//   console.log({ token: token })
//   if(isEditingRecord.value){

//     //Modificando il record
//     try {
//       await fetch(`https://deploy-django-backend.onrender.com/api/v1/libri/${form.value.id}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form.value),
//       })
//       showModalNoTeleport.value = false
//     } catch (error) {
//       console.error('Error trying to save data', error)
//     }
    
//   }else{
//     //Aggiungo il record
//     try {
//       fetch('https://deploy-django-backend.onrender.com/api/v1/libri/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form.value),
//       })
//       showModalNoTeleport.value = false
//     } catch (error) {
//       console.error('Error trying to save data', error)
//     }
//   }

//   products.value = [...products.value, form.value ]
//   form.value = {}
 
  
// }