<script>
    import { token, isAdmin, userID } from '../stores/userAuthStore.js';  // Import token, isAdmin, and userID stores
    import DropDownMenu from '../components/UserDropDownMenu.svelte';           // Import Dropdown component

    let userName = '';  // Local variable to store the user's name
    let errorMessage = ''; // Local variable to capture error messages

    // Fetch user data based on userID
    const fetchUserName = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
            userName = userData.name;  // Assuming the API returns a 'name' field
        } catch (error) {
            errorMessage = 'Error fetching user name: ' + error.message;
            console.error(errorMessage);
        }
    };

    // Watch the userID store and fetch the user's name when it changes
    $: if ($userID) {
        fetchUserName($userID);
    }

    // Logout function to clear the token and refresh the page
    const logout = () => {
        token.set('');  // Clear the token store
        window.location.reload();  // Refresh the page after logging out
    };

    export let title = "Welcome to the Auction!";  // Default title
</script>

<header class="header">
    <!-- Left: Logo/Title -->
    <div class="d-flex align-items-center">
        <!-- Logo and Title -->
        <div>
            <img src="/auction-app-logo.png" alt="Auction Logo" class="img-thumbnail me-2" />
        </div>

        <!-- Update the title to show the user's name if token exists -->
        <h1 class="h4 mb-0 logo">
            {#if $token && title !== "Product Details"}
                {#if userName}
                    Welcome {userName}  <!-- Display the fetched user name -->
                {:else}
                    Loading...
                {/if}
            {:else}
                {title}
            {/if}
        </h1>
    </div>

    <!-- Right: Navigation Buttons -->
    <nav class="header-right">
        <a href="/home" class="nav-button">Home</a>

        {#if $token}
            <!-- Show the user avatar and dropdown if token is present -->
            <div class="user-section">
                <DropDownMenu isAdmin={$isAdmin} on:logout={logout} />
            </div>
        {:else}
            <!-- Show login and register buttons if not logged in -->
            <a href="/login" class="nav-button">Login</a>
            <a href="/register" class="nav-button">Register</a>
        {/if}
    </nav>
</header>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #ddd;
    }

    .img-thumbnail {
        width: 50px;
        height: 50px;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .nav-button {
        text-decoration: none;
        padding: 10px 20px;
        background-color: #333;
        color: white;
        border-radius: 5px;
        font-size: 1em;
        transition: background-color 0.3s ease;
    }

    .nav-button:hover {
        background-color: #555;
    }

    .user-section {
        position: relative;
    }
</style>