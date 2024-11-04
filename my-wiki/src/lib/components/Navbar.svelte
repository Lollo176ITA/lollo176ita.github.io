<script>
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
    // Se prevedi di usare uno stato per gestire l’apertura/chiusura della navbar su dispositivi mobili,
    // puoi impostare una variabile per il menu (opzionale).
    let isOpen = false;
  
    function toggleMenu() {
      isOpen = !isOpen;
    }
  </script>

<div class="fixed top-0">
  <nav class="text-black bg-white p-4 shadow-lg fixed top-0 w-full z-10">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo o Titolo -->
      <a href="/" class="text-2xl font-bold">Wiki dell'Alfabeto</a>
      <a href="/alfabeti" class="text-blue-500 hover:underline">Alfabeti</a>
  
      <!-- Menu per Mobile (Icona) -->
      <button class="md:hidden focus:outline-none" on:click={toggleMenu}>
        <!-- Icona hamburger per il menu -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
  
    <!-- Menu Mobile -->
    {#if isOpen}
    <a href="/" class="text-2xl font-bold">Wiki dell'Alfabeto</a>
    <a href="/alfabeti" class="text-blue-500 hover:underline">Alfabeti</a>
    {/if}
  </nav>
</div>
  