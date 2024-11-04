<script>
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  // Ottieni il percorso corrente
  const path = derived(page, $page => $page.url.pathname);

  // Suddividi il percorso in segmenti
  const segments = derived(path, $path => $path.split('/').filter(Boolean));

  // Funzione per capitalizzare la prima lettera di una stringa
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<!-- Contenitore delle breadcrumb -->
<div class="breadcrumb-container">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <!-- Icona a forma di casetta -->
      <li>
        <a href="/" aria-label="Home">
          <svg class="icon-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 11.5V21h7v-6h4v6h7v-9.5l-10-9-10 9z" />
          </svg>
        </a>
      </li>
      <!-- Frecce e segmenti dinamici -->
      {#each $segments as segment, index}
        <li>
          <!-- Freccia come separatore -->
          <svg class="icon-separator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 5l7 7-7 7" />
          </svg>
          <a href={"/" + $segments.slice(0, index + 1).join('/')}>
            {capitalizeFirstLetter(segment)}
          </a>
        </li>
      {/each}
    </ol>
  </nav>
</div>

<style>
  /* Stile del contenitore delle breadcrumb */
  .breadcrumb-container {
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }

  /* Stile delle breadcrumb */
  nav[aria-label="breadcrumb"] {
    display: flex;
    flex-wrap: nowrap;
  }

  .breadcrumb {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .breadcrumb li {
    display: flex;
    align-items: center;
  }

  /* Stile per i link e le icone */
  .breadcrumb a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  /* Icona a forma di casetta */
  .icon-home {
    width: 20px;
    height: 20px;
    color: white;
  }

  /* Stile per la freccia come separatore */
  .icon-separator {
    width: 16px;
    height: 16px;
    margin: 0 0.5rem;
    color: #6c757d;
  }
</style>
