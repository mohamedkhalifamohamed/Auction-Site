<script>
    import { onDestroy, onMount } from "svelte";

    export let auctionEndDate; // The auction end date
    export let watchID; // The ID of the auction item to announce the winner

    let countdown = ''; // Store the countdown string
    let intervalId = null; // Store interval for countdown
    let winner = ''; // Store the winner's name

    // Function to fetch the highest bid and the winner's user ID, then fetch the user's name
    async function fetchAuctionWinner() {
        try {
            // Fetch bids for the specific watch
            const response = await fetch(`http://localhost:3000/watches/${watchID}/bids`);
            if (!response.ok) throw new Error('Failed to fetch bids');

            const bids = await response.json();

            if (bids.length > 0) {
                // Find the highest bid
                const highestBid = bids.reduce((max, bid) => bid.amount > max.amount ? bid : max, bids[0]);

                // Fetch the user based on userID from the highest bid
                const userResponse = await fetch(`http://localhost:3000/users/${highestBid.userID}`);
                if (!userResponse.ok) throw new Error('Failed to fetch user');

                const user = await userResponse.json();
                winner = user.name; // Assuming the user object contains a 'name' field
            } else {
                winner = 'No bids placed.';
            }
        } catch (error) {
            console.error('Error fetching auction winner:', error);
            winner = 'Error fetching winner';
        }
    }

    // Function to update the countdown
    function updateCountdown() {
        const now = new Date();
        const endDate = new Date(auctionEndDate);

        if (isNaN(endDate.getTime())) {
            countdown = "Invalid auction end date";
            return;
        }

        const timeDiff = endDate - now;

        if (timeDiff <= 0) {
            countdown = "Auction for this item has ended";
            clearInterval(intervalId);
            fetchAuctionWinner(); // Fetch the winner when the auction ends
        } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    // Start the countdown timer
    onMount(() => {
        updateCountdown(); // Initial call to set the timer
        intervalId = setInterval(updateCountdown, 1000); // Update every second
    });

    // Cleanup the interval when component is destroyed
    onDestroy(() => {
        if (intervalId) clearInterval(intervalId);
    });
</script>

<div class="countdown-timer text-center mb-4">
    <p><strong class="text-black">Time Left:</strong> <span class="text-danger">{countdown}</span></p>
    {#if winner}
        <p><strong class="text-dark">This Item Will Be Sold To:</strong> <span class="text-primary">{winner}</span></p>
    {/if}
</div>

<style>
    .text-danger {
        color: red !important; /* Countdown timer in red */
    }

    .text-black {
        color: black !important; /* Time Left label in bold black */
        font-weight: bold;
    }

    .text-primary {
        color: #00008b !important; /* Winner name in dark blue */
    }
</style>