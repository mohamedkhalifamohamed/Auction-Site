<script>
    // Create an event dispatcher for custom events
    import { createEventDispatcher } from 'svelte';

    // Initialize the search query
    let searchQuery = '';

    // Create the dispatcher for sending events to the parent component
    const dispatch = createEventDispatcher();

    // Function to dispatch the search event when the button is clicked or Enter is pressed
    function handleSearch() {
        console.log('Search triggered with query:', searchQuery); // Debugging
        dispatch('search', { query: searchQuery }); // Dispatch the search event with the updated query
    }

    // Function to handle the keydown event and trigger search if Enter is pressed
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleSearch();  // Trigger search when Enter is pressed
        }
    }
</script>

<!-- Search Bar with Bootstrap Styling -->
<div class="d-flex justify-content-center">
    <input
            type="text"
            class="form-control w-50"
            placeholder="Search for a product..."
            bind:value={searchQuery}
            on:keydown={handleKeyDown}
    />
    <button class="btn btn-primary mx-lg-3" on:click={handleSearch}>
        Search
    </button>
</div>