<script>
    import { page } from '$app/stores';
    $: pathSegments = $page.url.pathname.split('/').filter(Boolean);
  </script>
  
  <nav class="text-gray-400 mb-4">
    {#each pathSegments as segment, index}
      <a href={"/" + pathSegments.slice(0, index + 1).join('/')}
         class="hover:underline">
        {segment}
      </a>
      {#if index < pathSegments.length - 1}
        <span> / </span>
      {/if}
    {/each}
  </nav>
  