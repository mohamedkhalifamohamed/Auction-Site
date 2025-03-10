<script>
    import { userID } from '../stores/userAuthStore.js';  // Import the userID store

    export let isAdmin = false;  // Prop to check if the user is an admin
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let isDropdownVisible = false;
    let hideTimeout;

    // Show the dropdown
    function showDropdown() {
        clearTimeout(hideTimeout);  // Clear any existing timeout
        isDropdownVisible = true;
    }

    // Hide the dropdown after a delay
    function hideDropdown() {
        hideTimeout = setTimeout(() => {
            isDropdownVisible = false;
        }, 100);
    }

    // Logout function to clear the token and notify parent
    function logout() {
        dispatch('logout');
    }
</script>

<div class="dropdown" on:mouseenter={showDropdown} on:mouseleave={hideDropdown}>
    <a href="/" class="dropdown-toggle" id="userDropdown" role="button">
        <img src="/user-icon.png" alt="User Icon" class="rounded-circle user-icon">
    </a>

    <div class="dropdown-menu" aria-labelledby="userDropdown" class:show={isDropdownVisible}>
        {#if isAdmin}
            <!-- Admin controls -->
            <a class="dropdown-item" href="/admin/dashboard">Dashboard</a>
            <a class="dropdown-item" href={`/users/${$userID}/profile`}>View Profile</a>  <!-- Dynamic userID -->
        {:else}
            <!-- User controls -->
            <a class="dropdown-item" href={`/users/${$userID}/profile`}>View Profile</a>  <!-- Dynamic userID -->
        {/if}
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-danger" href="/home" on:click={logout}>Log out</a>
    </div>
</div>

<style>
    /* Hover to display dropdown */
    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: -8rem;
        width: 200px;
        padding: 0.5rem 0;
        border-radius: 0.25rem;
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
        display: none;
    }

    /* Show the dropdown when isDropdownVisible is true */
    .show {
        display: block;
    }

    .user-icon {
        width: 40px;
        height: 40px;
    }

    /* User icon styling */
    .rounded-circle {
        cursor: pointer;
    }

    /* Link styling */
    .dropdown-item {
        padding: 0.5rem 1rem;
        color: #343a40;
        text-decoration: none;
    }

    .dropdown-item:hover {
        background-color: #f8f9fa;
    }

    /* Divider between regular links and logout */
    .dropdown-divider {
        height: 1px;
        margin: 0.5rem 0;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.1);
    }

    /* Styling for logout link */
    .text-danger {
        color: #dc3545 !important;
    }

    .text-danger:hover {
        background-color: #ffe6e6;
    }
</style>