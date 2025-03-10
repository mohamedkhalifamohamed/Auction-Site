<script>
    import Countdown from './AuctionItemCountDownTimer.svelte'; // Import the Countdown component

    export let brand;
    export let model;
    export let yearOfRelease;
    export let price;
    export let endDate;
    export let watchID; // Pass the watch ID to the component
</script>

<div class="description-section p-4 bg-light border rounded text-center mx-auto" style="max-width: 500px;">
    <h2 class="mb-3">Watch Description</h2>
    <p><strong>Brand:</strong> {brand}</p>
    <p><strong>Model:</strong> {model}</p>
    <p><strong>Year of Release:</strong> {yearOfRelease}</p>
    <p><strong>Price:</strong> ${price.toFixed(2)}</p>

    <!-- Auction Countdown -->
    <Countdown auctionEndDate={endDate} watchID={watchID} />
</div>

<style>
    .description-section {
        margin-bottom: 20px;
    }
</style>