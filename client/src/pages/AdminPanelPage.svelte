<script>
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import UsersSection from '../components/UsersSection.svelte';
    import WatchesSection from '../components/WatchesSection.svelte';
</script>

<div class="d-flex flex-column min-vh-100">
    <!-- Header -->
    <Header title="Admin Panel" />

    <!-- Main content -->
    <main class="container my-5">
        <div class="row">
            <!-- Users Section -->
            <div class="col-md-6 mb-5 d-flex justify-content-center">
                <div class="admin-section-card p-4">
                    <h2 class="text-center text-secondary-emphasis mb-4">Users Section</h2>
                    <UsersSection />
                </div>
            </div>

            <!-- Watches Section -->
            <div class="col-md-6 mb-5 d-flex justify-content-center">
                <div class="admin-section-card p-4">
                    <h2 class="text-center text-secondary-emphasis mb-4">Watches Section</h2>
                    <WatchesSection />
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <Footer />
</div>

<style>
    .container {
        max-width: 1140px;
    }

    /* Style for card-like containers */
    .admin-section-card {
        background-color: #f8f9fa;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        width: 100%;
        max-width: 500px; /* Limit max width to avoid overly large containers */
        padding: 20px;
    }

    /* Add some padding inside the sections */
    .admin-section-card h2 {
        font-size: 1.5rem;
        font-weight: 600;
    }
</style>