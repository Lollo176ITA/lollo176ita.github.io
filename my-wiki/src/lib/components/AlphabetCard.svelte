<script>
  import { base } from '$app/paths';

  export let name;
  export let route;
  export let image;
</script>

<a href="{base}{route}" class="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700">
  <img src="{base}{image}" alt="{name}" class="mb-4" />
  <h3 class="text-xl font-semibold">{name}</h3>
</a>
