<script>
    export let user; // The user object passed as a prop.

    let bids = []; // To store the list of bids for the user.
    let watches = {}; // To store the watch details for each watch ID.
    let highestBids = {}; // To store the highest bid for each watch.
    let error = null; // To handle any errors during fetch calls.

    // Fetch all the bids for the user.
    async function loadUserBids() {
        try {
            // Fetch bids for the user
            const response = await fetch(`http://localhost:3000/users/${user.userID}/bids`);
            if (!response.ok) {
                throw new Error('Failed to fetch bids');
            }

            bids = await response.json();

            // Temporary array to store only valid bids (where the corresponding watch exists)
            let validBids = [];

            // For each bid, fetch the corresponding watch details and determine the highest bid
            for (const bid of bids) {
                const watchResponse = await fetch(`http://localhost:3000/watches/${bid.watchID}`);

                if (watchResponse.ok) {
                    const watch = await watchResponse.json();
                    watches[bid.watchID] = watch;

                    // Fetch the highest bid for the watch
                    const highestBidResponse = await fetch(`http://localhost:3000/watches/${bid.watchID}/bids`);
                    if (highestBidResponse.ok) {
                        const allBids = await highestBidResponse.json();
                        highestBids[bid.watchID] = Math.max(...allBids.map(b => b.amount));
                    }

                    validBids.push(bid); // Add valid bids to the list
                } else {
                    console.error(`Watch with ID ${bid.watchID} does not exist.`);
                }
            }

            // Update bids to only include valid bids
            bids = validBids;
        } catch (err) {
            error = err.message;
            console.error('Error loading user bids:', error);
        }
    }

    // Helper function to check if the auction has ended
    function hasAuctionEnded(endDate) {
        const now = new Date();
        return new Date(endDate) < now;
    }

    // Helper function to check if the user is the winner
    function isUserWinner(bid, watch) {
        return bid.amount === highestBids[watch.watchID];
    }

    loadUserBids(); // Load bids on component mount.
</script>

<div class="user-bids-section">
    <h4>Your Bids</h4>

    {#if error}
        <p class="text-danger">Error: {error}</p>
    {/if}

    {#if bids.length > 0}
        <ul class="list-group">
            {#each bids as bid}
                <!-- Only show bids for watches that exist -->
                {#if watches[bid.watchID]}
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{watches[bid.watchID]?.brand} {watches[bid.watchID]?.model}</strong> <br/>
                            Bid Amount: ${bid.amount} <br/>
                            End Date: {new Date(watches[bid.watchID]?.endDate).toLocaleString()}
                        </div>

                        <div>
                            {#if hasAuctionEnded(watches[bid.watchID]?.endDate)}
                                {#if isUserWinner(bid, watches[bid.watchID])}
                                    <span class="badge bg-success">You won this Item!.</span>
                                {:else}
                                    <span class="badge bg-danger">Auction ended. You lost with this Bid.</span>
                                {/if}
                            {:else}
                                <a href={`/watches/${bid.watchID}`} class="btn btn-primary">
                                    Add Bid
                                </a>
                            {/if}
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
    {:else}
        <p>No bids found.</p>
    {/if}
</div>

<style>
    .user-bids-section {
        background-color: white;
        border: 1px solid #ddd;
        padding: 20px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        margin-left: 20px;
        flex-grow: 1;
    }

    h4 {
        color: #007bff;
        margin-bottom: 20px;
    }

    .list-group-item {
        background-color: white;
        border: 1px solid #ddd;
        margin-bottom: 10px;
        padding: 15px;
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
    }

    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }

    .text-danger {
        color: #dc3545;
    }

    .badge {
        font-size: 0.9rem;
        padding: 0.5em;
    }

    .bg-success {
        background-color: #28a745;
    }

    .bg-danger {
        background-color: #dc3545;
    }
</style>