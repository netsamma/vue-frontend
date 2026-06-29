export async function getProducts() {
    try {
        const response = await fetch('https://deploy-django-backend.onrender.com/api/v1/libri');

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