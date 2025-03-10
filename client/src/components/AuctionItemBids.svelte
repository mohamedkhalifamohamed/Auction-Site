<script>
    export let bids = [];  // Expect an array of bids

    // Log the bids array to see the structure and verify it contains userID and amount
    console.log("Fetched bids:", bids);
</script>

<div class="bids-list border p-4 rounded bg-light mx-auto" style="max-width: 500px;">
    {#if bids.length === 0}
        <p class="text-muted">No bids yet. Be the first to place a bid!</p>
    {:else}
        <ul class="list-unstyled">
            {#each bids as bid}
                <li class="py-2 border-bottom">
                    <strong>User ID:</strong> {bid.userID} - <strong>Bid Amount:</strong> ${bid.amount}
                </li>
            {/each}
        </ul>
    {/if}
</div>