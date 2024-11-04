<script>
    export let nomeAlfabeto;
    export let lettera;

    // Example data, replace with your actual data
    const data = {
        nomeAlternativo: "Nome Alternativo",
        storia: "Storia dell'alfabeto...",
        descrizione: "Descrizione della lettera...",
        nemici: ["Nemico 1", "Nemico 2"],
        amici: ["Amico 1", "Amico 2"]
    };
</script>
<div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">{lettera} - {nomeAlfabeto}</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <div class="md:col-span-1">
            <div class="bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-2 text-white">Sidebar</h2>
                <ul class="space-y-2">

                </ul>
            </div>
        </div>
        <!-- Main Content -->
        <div class="md:col-span-3">
            <div class="bg-black p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/path/to/image.jpg" alt="Descrizione immagine" class="w-full h-auto mb-4 rounded">
                <h2 class="text-xl font-semibold mb-2">Nome Alternativo</h2>
                <p>{data.nomeAlternativo}</p>
            </div>
            <div class="bg-black p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
                <h2 class="text-xl font-semibold mb-2">Storia</h2>
                <p>{data.storia}</p>
            </div>
            <div class="bg-black p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
                <h2 class="text-xl font-semibold mb-2">Descrizione</h2>
                <p>{data.descrizione}</p>
            </div>
            <div class="bg-black p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
                <h2 class="text-xl font-semibold mb-2">Nemici</h2>
                <ul class="list-disc list-inside">
                    {#each data.nemici as nemico}
                        <li>{nemico}</li>
                    {/each}
                </ul>
            </div>
            <div class="bg-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 class="text-xl font-semibold mb-2">Amici</h2>
                <ul class="list-disc list-inside">
                    {#each data.amici as amico}
                        <li>{amico}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>
