<script>
    // Se prevedi di usare uno stato per gestire l’apertura/chiusura della navbar su dispositivi mobili,
    // puoi impostare una variabile per il menu (opzionale).
    let isOpen = false;
  
    function toggleMenu() {
      isOpen = !isOpen;
    }
  </script>
  
  <nav class="bg-black text-white p-4 shadow-md fixed w-full z-10">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo o Titolo -->
      <a href="/" class="text-2xl font-bold hover:text-gray-400">
        Wiki dell'Alfabeto
      </a>
  
      <!-- Menu per Desktop -->
      <ul class="hidden md:flex space-x-6">
        <li><a href="/alfabeto/romano" class="hover:text-gray-400">Romano</a></li>
        <li><a href="/alfabeto/greco" class="hover:text-gray-400">Greco</a></li>
        <li><a href="/alfabeto/ebraico" class="hover:text-gray-400">Ebraico</a></li>
        <!-- Aggiungi altri alfabeti qui -->
      </ul>
  
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
      <ul class="md:hidden bg-black p-4 space-y-2">
        <li><a href="/alfabeto/romano" class="block hover:text-gray-400">Romano</a></li>
        <li><a href="/alfabeto/greco" class="block hover:text-gray-400">Greco</a></li>
        <li><a href="/alfabeto/ebraico" class="block hover:text-gray-400">Ebraico</a></li>
        <!-- Aggiungi altri alfabeti qui -->
      </ul>
    {/if}
  </nav>
  