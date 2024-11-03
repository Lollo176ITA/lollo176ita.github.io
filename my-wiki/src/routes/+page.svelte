<script>
    import AlphabetCard from '../components/AlphabetCard.svelte';
  </script>
  
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Benvenuto nella Wiki dell'Alfabeto</h1>
    <p class="text-lg text-gray-300 mb-8">Esplora la storia, i significati e i segreti delle lettere</p>
  
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AlphabetCard name="Alfabeto Romano" route="/alfabeto/romano" />
      <AlphabetCard name="Alfabeto Greco" route="/alfabeto/greco" />
      <AlphabetCard name="Alfabeto Ebraico" route="/alfabeto/ebraico" />
    </div>
  </div>
  