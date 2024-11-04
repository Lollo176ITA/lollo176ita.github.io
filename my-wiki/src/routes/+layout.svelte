<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Breadcrumb from '$lib/components/Breadcrumb.svelte';
    import "../app.css";
  </script>
  
  <div class="bg-black text-white min-h-screen mt-10">
    <Navbar />
    <main class="container mx-auto my-auto p-6">
        <Breadcrumb />
      <slot />
    </main>
  </div>
  