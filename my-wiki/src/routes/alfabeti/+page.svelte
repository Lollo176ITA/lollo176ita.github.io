<script>
  import { alphabets } from '$lib/data/alfabeti.js';
  import AlphabetCard from '$lib/components/AlphabetCard.svelte';
</script>

<div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
  {#each alphabets as alfabeto}
    <AlphabetCard name={alfabeto.name} route={`/alfabeti/${alfabeto.route}`} image={alfabeto.image} />
  {/each}
</div>
