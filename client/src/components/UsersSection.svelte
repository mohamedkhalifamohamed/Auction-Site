<script>
    import { onMount } from 'svelte';
    import UserEditModal from '../components/UserEditModal.svelte';

    let users = [];
    let selectedUser = null;
    let showEditModal = false;

    // Fetch all users
    async function fetchUsers() {
        try {
            const res = await fetch('http://localhost:3000/users');
            users = await res.json();
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    onMount(fetchUsers);

    // Delete a user
    async function deleteUser(userID) {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                const res = await fetch(`http://localhost:3000/users/${userID}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    users = users.filter(user => user.userID !== userID);
                    alert('User deleted successfully.');
                } else {
                    alert('Failed to delete user.');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    }

    // Open the edit modal
    function openEditModal(user) {
        selectedUser = user;
        showEditModal = true;
    }

    // Close the edit modal
    function closeEditModal() {
        showEditModal = false;
        selectedUser = null;
        fetchUsers(); // Refresh users after editing
    }
</script>

<!-- User Cards -->
<div class="row">
    {#each users as user (user.userID)}
        <div class="col-sm-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{user.name}</h5>
                    <p class="card-text">
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p class="card-text">
                        <strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}
                    </p>
                    <button class="btn btn-secondary" on:click={() => openEditModal(user)}>Edit</button>
                    <button class="btn btn-danger ms-2" on:click={() => deleteUser(user.userID)}>Delete</button>
                </div>
            </div>
        </div>
    {/each}

    <!-- Edit User Modal -->
    {#if showEditModal}
        <UserEditModal user={selectedUser} on:close={closeEditModal} />
    {/if}
</div>

<style>
    /* Styling similar to User Profile Section */
    .user-profile-section {
        background-color: white;
        border: 1px solid #ddd;
        width: 100%;
        max-width: 350px;
        padding: 20px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        text-align: center;
        border-radius: 10px;
    }

    .profile-photo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 15px;
        object-fit: cover;
    }

    .card-title {
        font-size: 1.3rem;
        color: #007bff;
    }

    .card-text {
        color: #343a40;
        margin-bottom: 10px;
    }

    .card {
        border: 1px solid #ccc;
        border-radius: 10px;
    }

    .btn {
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
    }

    .btn-danger {
        margin-left: 10px;
    }
</style>