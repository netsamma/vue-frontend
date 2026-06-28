export default async function getProducts(){
    
    try {
        const response = await fetch('https://deploy-django-backend.onrender.com/api/v1/libri')
        
        // Controllo manuale dello stato HTTP
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`)
        }
        const data = await response.json()
        return data.results // Ritorna i dati puliti
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error)
        throw error // Rilancia l'errore per gestirlo nel componente (es. mostrare un alert)
    }
}