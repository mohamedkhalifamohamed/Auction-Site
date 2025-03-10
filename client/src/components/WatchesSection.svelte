<script>
    import { onMount } from 'svelte';
    import AddWatchModal from '../components/WatchAddModal.svelte';

    let watches = [];
    let showAddModal = false;

    // Fetch watches from the API
    async function fetchWatches() {
        try {
            const res = await fetch('http://localhost:3000/watches');
            watches = await res.json();
        } catch (error) {
            console.error('Error fetching watches:', error);
        }
    }

    // Show the Add Watch Modal
    function openAddModal() {
        showAddModal = true;
    }

    // Close the Add Watch Modal
    function closeAddModal() {
        showAddModal = false;
    }

    // Callback for when a new watch is added
    function onAddWatch(newWatch) {
        watches = [...watches, newWatch];
        closeAddModal();
    }

    onMount(fetchWatches);
</script>

<!-- Watches Section -->
<div class="container">
    <div class="d-flex justify-content-center align-items-center mb-3">
        <button class="btn btn-success" on:click={openAddModal}>Add Watch</button>
    </div>

    <div class="row">
        {#each watches as watch (watch.watchID)}
            <div class="col-sm-6 mb-4">
                <div class="card">
                    <img src={watch.imageUrl} class="card-img-top" alt={watch.model} />
                    <div class="card-header">
                        {watch.brand} - {watch.model}
                    </div>
                    <div class="card-body">
                        <p class="card-text">Price: ${watch.price}</p>
                        <p class="card-text">Year: {watch.yearOfRelease}</p>
                        <p class="card-text">Auction Ends: {watch.endDate}</p>
                        <a href={`/watches/${watch.watchID}`} class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Add Watch Modal -->
    {#if showAddModal}
        <AddWatchModal on:addWatch={onAddWatch} on:close={closeAddModal} />
    {/if}
</div>

<style>
    .card-img-top {
        object-fit: contain;
        width: 100%;
        height: 200px;
    }
</style>