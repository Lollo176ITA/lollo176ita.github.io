<script context="module">
  import { alphabets } from '$lib/data/alfabeti.js';
</script>

<script>
  import { page } from '$app/stores';

  // Ottieni il parametro 'nomeAlfabeto' dalla rotta
  $: nomeAlfabeto = $page.params.nomeAlfabeto;

  // Trova l'indice dell'alfabeto corrispondente
  $: number = alphabets.findIndex(alphabet => alphabet.route === nomeAlfabeto);

</script>

<div class="mt-10">
  
  <h1 class="text-3xl font-bold mb-6">Alfabeto {alphabets[number]?.name}</h1>
  <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each alphabets[number]?.letters as letter}
      <li class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-xl font-semibold">{letter.char}</h3>
        <a href={`/alfabeti/${nomeAlfabeto}/${letter.char}`} class="mt-4">{letter.description}</a>
      </li>
    {/each}
</div>
