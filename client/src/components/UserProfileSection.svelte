<script>
    export let user; // The user object passed as a prop.

    // Destructure the user object for easier access.
    const { userID, name, email, isAdmin } = user;
</script>

<div class="card user-profile-section">
    <img src="/user-icon.png" class="card-img-top profile-photo" alt={`Profile photo of ${name}`} />

    <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">
            <strong>User ID:</strong>
            {userID}
        </p>
        <p class="card-text">
            <strong>Email:</strong>
            {email}
        </p>
        <p class="card-text">
            <strong>Role:</strong> {isAdmin ? 'Admin' : 'User'}
        </p>
    </div>
</div>

<style>
    .user-profile-section {
        background-color: white;
        border: 1px solid #ddd;
        width: 100%;
        max-width: 300px;
        padding: 20px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    }

    .profile-photo {
        width: 100%;
        height: auto;
        border-radius: 50%;
        margin-bottom: 15px;
        object-fit: cover;
    }

    .card-title {
        font-size: 1.5rem;
        color: #007bff;
    }

    .card-text {
        color: #343a40;
        margin-bottom: 10px;
    }
</style>