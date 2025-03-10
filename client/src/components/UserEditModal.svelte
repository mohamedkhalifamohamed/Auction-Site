<script>
    import { createEventDispatcher } from 'svelte';

    export let user;
    const dispatch = createEventDispatcher();

    let name = user.name;
    let email = user.email;

    // Close the modal
    function closeModal() {
        dispatch('close');
    }

    // Save changes
    async function saveChanges() {
        try {
            const res = await fetch(`http://localhost:3000/users/${user.userID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email })
            });

            if (res.ok) {
                alert('User updated successfully.');
                closeModal();
            } else {
                alert('Failed to update user.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }
</script>

<!-- Modal Structure -->
<div class="modal d-block" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit User</h5>
                <button type="button" class="btn-close" on:click={closeModal}></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" bind:value={name} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" bind:value={email} />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" on:click={closeModal}>Close</button>
                <button type="button" class="btn btn-primary" on:click={saveChanges}>Save Changes</button>
            </div>
        </div>
    </div>
</div>

<style>
    .modal {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>