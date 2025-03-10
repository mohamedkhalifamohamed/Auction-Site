<script>
    import CountDown from './AuctionItemCountDownTimer.svelte';// Import the Countdown component
    import { token, isAdmin } from '../stores/userAuthStore.js';
    import AuctionItemEditModal from "./AuctionItemEditModal.svelte"; // Import token and username stores

    export let watch; // Watch data passed from parent

    // Controls for showing the edit modal
    let showEditModal = false;

    // Handle watch deletion
    const deleteWatch = async () => {
        if (confirm("Are you sure you want to delete this watch?")) {
            try {
                const response = await fetch(`http://localhost:3000/watches/${watch.watchID}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${$token}`
                    }
                });

                if (response.ok) {
                    alert("Watch deleted successfully.");
                    window.location.reload(); // Reload page after deletion
                } else {
                    const errorData = await response.json();
                    alert(`Error deleting watch: ${errorData.error}`);
                }
            } catch (error) {
                console.error("Error deleting watch:", error);
                alert("Failed to delete the watch.");
            }
        }
    };

    const openEditModal = () => showEditModal = true;
    const closeEditModal = () => showEditModal = false;
</script>

<!-- Auction Item Card -->
<div class="col-sm-6 mb-4">
    <div class="card">
        <img src={watch.imageUrl} class="card-img-top" alt={watch.model} />
        <div class="card-header">
            {watch.brand} - {watch.model}
        </div>
        <div class="card-body">
            <p class="card-text">Price: ${watch.price.toFixed(2)}</p>
            <p class="card-text">Year: {watch.yearOfRelease}</p>

            <!-- Countdown Timer -->
            <CountDown auctionEndDate={watch.endDate} watchID={watch.watchID} />

            <a href={`/watches/${watch.watchID}`} class="btn btn-primary">View Details</a>

            {#if $isAdmin}
                <!-- Admin actions -->
                <button class="btn btn-secondary ms-2" on:click={openEditModal}>Edit</button>
                <button class="btn btn-danger ms-2" on:click={deleteWatch}>Delete</button>
            {/if}
        </div>
    </div>

    <!-- Edit Modal -->
    {#if showEditModal}
        <AuctionItemEditModal watch={watch} on:close={closeEditModal} />
    {/if}
</div>

<style>
    .card-img-top {
        object-fit: contain;
        width: 100%;
        height: 200px;
    }
</style>