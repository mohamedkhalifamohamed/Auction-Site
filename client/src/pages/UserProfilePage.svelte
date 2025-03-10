<script>
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import UserProfileSection from '../components/UserProfileSection.svelte';
    import UserBidsSection from '../components/UserBidsSection.svelte';

    let user = null;
    let userID = null;

    // Get the userID from the URL (assuming a dynamic route like /users/:userID/profile)
    userID = window.location.pathname.split('/')[2];  // Extract userID from the URL

    // Fetch user data using the userID
    async function fetchUserData() {
        try {
            const response = await fetch(`http://localhost:3000/users/${userID}`);
            user = await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    fetchUserData();  // Fetch the user's data on page load
</script>

<Header />

<div class="container">
    <div class="profile-header">
        {#if user}
            <h2>{user.name}'s Profile</h2>
        {/if}
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-4">
            {#if user}
                <UserProfileSection {user} />
            {/if}
        </div>

        <div class="col-sm-12 col-md-8">
            {#if user}
                <UserBidsSection {user} />
            {/if}
        </div>
    </div>
</div>

<Footer />

<style>
    .container {
        padding: 20px;
        background-color: #f8f9fa;
    }

    .profile-header {
        background-color: #007bff;
        color: white;
        padding: 10px;
        margin-bottom: 20px;
        text-align: center;
    }

    /* Responsive styling for mobile */
    @media (max-width: 768px) {
        .row {
            flex-direction: column;
        }

        .col-sm-12 {
            margin-bottom: 20px;
        }
    }
</style>