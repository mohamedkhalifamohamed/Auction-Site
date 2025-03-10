<script>
    import Header from '../components/Header.svelte';
    import ImageSection from '../components/AuctionItemImageSection.svelte';
    import DescriptionSection from '../components/AuctionItemDescriptionSection.svelte';
    import Bid from '../components/AuctionItemBids.svelte';
    import { token } from '../stores/userAuthStore.js'; // Import token and username stores
    import Footer from "../components/Footer.svelte";

    export let watchID; // The ID of the watch to fetch
    let newBid = '';
    let itemPromise;
    let bidsPromise;
    let errorMessage = '';
    let auctionEnded = false; // New variable to check if the auction has ended

    // Fetch the watch item details
    async function fetchWatchDetails() {
        try {
            const response = await fetch(`http://localhost:3000/watches/${watchID}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch watch details');
            }

            // Check if the auction has ended by comparing the endDate with the current date.
            const now = new Date();
            const auctionEndDate = new Date(data.endDate);
            auctionEnded = auctionEndDate < now; // If current date is past the end date, auction is over.

            return data;
        } catch (error) {
            return { error: error.message };
        }
    }

    // Fetch the bids for the watch
    async function fetchWatchBids() {
        try {
            const response = await fetch(`http://localhost:3000/watches/${watchID}/bids`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch bids');
            }

            return data;
        } catch (error) {
            return { error: error.message };
        }
    }

    async function placeBid() {
        if (!newBid) return;

        try {
            const response = await fetch(`http://localhost:3000/watches/${watchID}/bids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$token}`
                },
                body: JSON.stringify({
                    amount: parseInt(newBid)
                })
            });

            if (response.ok) {
                bidsPromise = fetchWatchBids(); // Refresh the bids after placing the new bid
                newBid = '';
                errorMessage = '';
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to place bid');
            }
        } catch (error) {
            errorMessage = error.message;
            console.error('Failed to place bid:', error);
        }
    }

    // Initialize promises for fetching item details and bids
    itemPromise = fetchWatchDetails();
    bidsPromise = fetchWatchBids();
</script>

<!-- Main Container -->
<div class="d-flex flex-column min-vh-100">
    <Header title="Product Details" />

    {#await itemPromise}
        <p>Loading watch details...</p>
    {:then watch}
        {#if watch.error}
            <p class="text-danger">Error: {watch.error}</p>
        {:else}
            <!-- Watch Name -->
            <h2 class="text-center text-dark my-4">{watch.brand} - {watch.model}</h2>

            <div class="row">
                <!-- Image Section -->
                <div class="col-md-4">
                    <ImageSection imageUrl={watch.imageUrl} imageThumbnails={watch.imageThumbnails} />
                </div>

                <!-- Description Section -->
                <div class="col-md-4">
                    <DescriptionSection
                            brand={watch.brand}
                            model={watch.model}
                            yearOfRelease={watch.yearOfRelease}
                            price={watch.price}
                            endDate={watch.endDate}
                            watchID={watch.watchID}
                    />
                </div>

                <!-- Bids Section -->
                <div class="col-md-3">
                    <div class="card shadow-sm p-3 bg-white rounded">
                        <h2 class="text-primary text-black">Bids</h2>

                        {#await bidsPromise}
                            <p>Loading bids...</p>
                        {:then bids}
                            {#if bids.error}
                                <p class="text-danger">Error: {bids.error}</p>
                            {:else if bids.length === 0}
                                <p>No bids found for this watch. Be the first to place a bid!</p>
                            {:else}
                                <Bid {bids} />
                            {/if}

                            <!-- Check if user is logged in -->
                            {#if $token}
                                <div class="mt-3">
                                    {#if errorMessage}
                                        <p class="text-danger">{errorMessage}</p>
                                    {/if}

                                    <!-- If auction has ended, show message and disable bid input -->
                                    {#if auctionEnded}
                                        <p class="text-danger">The auction for this item has ended. Please choose another item to bid on.</p>
                                    {:else}
                                        <!-- Bid input and button for active auctions -->
                                        <input type="number" class="form-control mb-2" min="0" bind:value={newBid} placeholder="Enter your bid" />
                                        <button class="btn btn-primary w-100" on:click={placeBid}>Place Bid</button>
                                    {/if}
                                </div>
                            {:else}
                                <a href="/login" class="btn btn-link text-primary">Login to place a bid</a>
                            {/if}
                        {:catch error}
                            <p class="text-danger">Error: {error.message}</p>
                        {/await}
                    </div>
                </div>
            </div>
        {/if}
    {:catch error}
        <p class="text-danger">Error: {error.message}</p>
    {/await}
    <Footer />
</div>