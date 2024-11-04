<script>
  export let name;
  export let route;
  export let image;
</script>

<a href={route} class="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700">
  <img src={image} alt={name} class="w-full h-32 object-cover rounded-t-lg" />
  <h3 class="text-xl font-semibold mt-4">{name}</h3>
</a>
