<script>
    export let name;
    export let route;
  </script>
  
  <a href={route} class="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700">
    <h3 class="text-xl font-semibold">{name}</h3>
  </a>
  