<script>
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import SearchBar from '../components/SearchBar.svelte';
    import FilterSection from '../components/FilterSection.svelte';
    import AuctionItem from "../components/AuctionItem.svelte";

    let allWatches = [];
    let filteredWatches = [];
    let filters = {};
    let successMessage = ''; // For success notifications
    let errorMessage = '';   // For error messages

    let watchPromise = fetchAllWatches();  // Fetch watches on load

    // Fetch all watches initially
    async function fetchAllWatches() {
        try {
            const response = await fetch("http://localhost:3000/watches");
            const data = await response.json();

            if (!response.ok) {
                errorMessage = data.message || 'Failed to fetch all watches';
                throw new Error(errorMessage);
            }

            allWatches = data;
            filteredWatches = data;  // Initially, all watches are shown
            successMessage = 'Watches fetched successfully!';
            errorMessage = '';  // Clear previous errors
            return data;
        } catch (error) {
            errorMessage = error.message || 'An error occurred while fetching watches';
            successMessage = '';
            console.error(error);
            return [];
        }
    }

    // Handle search event from SearchBar component
    async function handleSearch(event) {
        const searchQuery = event.detail.query;  // Get search query from the event
        console.log('Search event triggered:', searchQuery);  // Debugging

        try {
            const response = await fetch(`http://localhost:3000/watches/brand/${encodeURIComponent(searchQuery)}`);
            const data = await response.json();

            if (!response.ok) {
                errorMessage = data.message || 'Failed to fetch watch by name';
                throw new Error(errorMessage);
            }

            filteredWatches = [data];  // Show the searched watch
            successMessage = 'Watch fetched successfully!';
            errorMessage = '';
        } catch (error) {
            errorMessage = error.message || 'Error occurred while searching for watch';
            successMessage = '';
            filteredWatches = [];
            console.error(error);
        }
    }

    // Handle filter event from FilterSection component
    async function handleFilter(event) {
        filters = event.detail;  // Get filters from the event (brand, model, price range, year)
        updateWatchList();
    }

    // Update the watch list based on filters
    async function updateWatchList() {
        let query = [];

        // Add filters to the query string if provided
        if (filters.brand) query.push(`brand=${encodeURIComponent(filters.brand)}`);
        if (filters.model) query.push(`model=${encodeURIComponent(filters.model)}`);
        if (filters.year) query.push(`yearOfRelease=${encodeURIComponent(filters.year)}`);
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
            query.push(`minPrice=${minPrice}&maxPrice=${maxPrice}`);
        }

        // Build the query string
        const queryString = query.length > 0 ? `?${query.join('&')}` : '';

        try {
            const response = await fetch(`http://localhost:3000/watches${queryString}`);
            const data = await response.json();

            if (!response.ok) {
                errorMessage = data.message || 'Failed to fetch watches';
                throw new Error(errorMessage);
            }

            filteredWatches = data;  // Update the list with filtered watches
            successMessage = 'Watches fetched successfully!';
            errorMessage = '';  // Clear previous errors
        } catch (error) {
            errorMessage = error.message || 'An error occurred while fetching filtered watches';
            successMessage = '';
            filteredWatches = [];
            console.error(error);
        }
    }
</script>

<div class="d-flex flex-column min-vh-100">
    <!-- Header component -->
    <Header />

    <!-- Main content area -->
    <div class="container-fluid flex-grow-1">
        <div class="row">
            <!-- Filters Sidebar -->
            <aside class="col-md-3 bg-light p-3">
                <FilterSection on:filter={handleFilter} /> <!-- Listen for filter event -->
            </aside>

            <!-- Main content section -->
            <main class="col-md-9 p-3">
                <!-- Search bar -->
                <div class="search-section mb-4">
                    <SearchBar on:search={handleSearch} /> <!-- Listen for search event -->
                </div>

                <!-- Display success and error messages -->
                {#if successMessage}
                    <div class="alert alert-success">{successMessage}</div>
                {/if}
                {#if errorMessage}
                    <div class="alert alert-danger">{errorMessage}</div>
                {/if}

                <!-- Display watches after fetching -->
                {#await watchPromise}
                    <p>Loading watches...</p>
                {:then items}
                    {#if filteredWatches.length > 0}
                        <div class="row">
                            {#each filteredWatches as watch}
                                <AuctionItem {watch} />
                            {/each}
                        </div>
                    {:else}
                        <p>No watches found matching your criteria.</p>
                    {/if}
                {:catch error}
                    <p class="alert alert-danger">Error: {error.message}</p>
                {/await}
            </main>
        </div>
    </div>

    <!-- Footer component -->
    <Footer />
</div>

<style>
    /* Ensure the container takes up the full height */
    .container-fluid {
        padding: 0 15px;
    }

    .search-section {
        margin-bottom: 1.5rem;
    }

    .alert {
        margin-top: 10px;
    }

    /* Responsive design for smaller screens */
    @media (max-width: 768px) {
        .row {
            flex-direction: column;
        }
    }
</style>