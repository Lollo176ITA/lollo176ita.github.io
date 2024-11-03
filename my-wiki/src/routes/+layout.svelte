<script>
    import Navbar from '../components/Navbar.svelte';
    import Breadcrumb from '../components/Breadcrumb.svelte';
  </script>
  
  <div class="bg-black text-white min-h-screen">
    <Navbar />
  
    <main class="container mx-auto p-6">
      <Breadcrumb />
      <slot /> <!-- Qui verrà inserito il contenuto specifico di ogni pagina -->
    </main>
  </div>  