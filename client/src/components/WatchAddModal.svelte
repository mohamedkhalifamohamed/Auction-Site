<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let brand = '';
    let model = '';
    let yearOfRelease = '';
    let price = '';
    let endDate = '';
    let imageUrl = '';
    let imageThumbnails = ['', '', ''];

    let errors = {};

    // Validate fields before submitting
    function validateForm() {
        errors = {};
        if (!brand) errors.brand = 'Brand is required';
        if (!model) errors.model = 'Model is required';
        if (!yearOfRelease || isNaN(Number(yearOfRelease))) errors.yearOfRelease = 'Valid year is required';
        if (!price || isNaN(Number(price))) errors.price = 'Valid price is required';
        if (!endDate) errors.endDate = 'End date is required';
        if (!imageUrl) errors.imageUrl = 'Image URL is required';
        imageThumbnails.forEach((thumbnail, index) => {
            if (!thumbnail) errors[`imageThumbnail${index}`] = `Image Thumbnail ${index + 1} is required`;
        });

        return Object.keys(errors).length === 0;
    }

    // Submit form
    async function addWatch() {
        if (!validateForm()) return;

        const newWatch = {
            brand,
            model,
            yearOfRelease: parseInt(yearOfRelease, 10), // Convert to number
            price: parseFloat(price), // Convert to number
            endDate,
            imageUrl,
            imageThumbnails,
        };

        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

            const res = await fetch('http://localhost:3000/watches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token for auth
                },
                body: JSON.stringify(newWatch)
            });

            if (res.ok) {
                const addedWatch = await res.json();
                dispatch('addWatch', addedWatch); // Emit event to parent to add the new watch
                closeModal(); // Close the modal after successful addition
            } else if (res.status === 403) {
                alert('You do not have permission to add a new watch.');
            } else if (res.status === 401) {
                alert('You need to be logged in to add a new watch.');
            } else {
                alert('Failed to add watch');
            }
        } catch (error) {
            console.error('Error adding watch:', error);
        }
        closeModal()
        window.location.reload();
    }

    // Close modal
    function closeModal() {
        dispatch('close');
    }
</script>

<div class="modal d-block" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New Watch</h5>
                <button type="button" class="btn-close" on:click={closeModal}></button>
            </div>
            <div class="modal-body">
                <!-- Form for adding a new watch -->
                <div class="mb-3">
                    <label class="form-label">Brand</label>
                    <input type="text" class="form-control" bind:value={brand} />
                    {#if errors.brand}<small class="text-danger">{errors.brand}</small>{/if}
                </div>

                <div class="mb-3">
                    <label class="form-label">Model</label>
                    <input type="text" class="form-control" bind:value={model} />
                    {#if errors.model}<small class="text-danger">{errors.model}</small>{/if}
                </div>

                <div class="mb-3">
                    <label class="form-label">Year of Release</label>
                    <input type="number" class="form-control" bind:value={yearOfRelease} />
                    {#if errors.yearOfRelease}<small class="text-danger">{errors.yearOfRelease}</small>{/if}
                </div>

                <div class="mb-3">
                    <label class="form-label">Price</label>
                    <input type="number" class="form-control" bind:value={price} />
                    {#if errors.price}<small class="text-danger">{errors.price}</small>{/if}
                </div>

                <div class="mb-3">
                    <label class="form-label">Auction End Date</label>
                    <input type="date" class="form-control" bind:value={endDate} />
                    {#if errors.endDate}<small class="text-danger">{errors.endDate}</small>{/if}
                </div>

                <div class="mb-3">
                    <label class="form-label">Main Image URL</label>
                    <input type="text" class="form-control" bind:value={imageUrl} />
                    {#if errors.imageUrl}<small class="text-danger">{errors.imageUrl}</small>{/if}
                </div>

                <div class="mb-3">
                    <label class="form-label">Image Thumbnail 1</label>
                    <input type="text" class="form-control" bind:value={imageThumbnails[0]} />
                    {#if errors.imageThumbnail0}<small class="text-danger">{errors.imageThumbnail0}</small>{/if}
                </div>

                <div class="mb-3">
                    <label class="form-label">Image Thumbnail 2</label>
                    <input type="text" class="form-control" bind:value={imageThumbnails[1]} />
                    {#if errors.imageThumbnail1}<small class="text-danger">{errors.imageThumbnail1}</small>{/if}
                </div>

                <div class="mb-3">
                    <label class="form-label">Image Thumbnail 3</label>
                    <input type="text" class="form-control" bind:value={imageThumbnails[2]} />
                    {#if errors.imageThumbnail2}<small class="text-danger">{errors.imageThumbnail2}</small>{/if}
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" on:click={closeModal}>Close</button>
                <button type="button" class="btn btn-primary" on:click={addWatch}>Add Watch</button>
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