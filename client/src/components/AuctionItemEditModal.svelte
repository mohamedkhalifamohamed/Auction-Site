<script>
    import { token } from '../stores/userAuthStore';
    import { createEventDispatcher } from 'svelte';

    export let watch;

    // Local copies of the watch details for editing
    let brand = watch.brand;
    let model = watch.model;
    let yearOfRelease = watch.yearOfRelease;
    let price = watch.price;
    let endDate = watch.endDate;
    let imageUrl = watch.imageUrl;
    let imageThumbnails = [...watch.imageThumbnails]; // Copy the imageThumbnails for editing

    let errors = {};
    const dispatch = createEventDispatcher();

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

    // Close the modal
    const closeModal = () => {
        dispatch('close');
    };

    // Save changes
    const saveChanges = async () => {
        if (!validateForm()) return; // Validate the form before saving

        try {
            const response = await fetch(`http://localhost:3000/watches/${watch.watchID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$token}`
                },
                body: JSON.stringify({
                    brand,
                    model,
                    yearOfRelease: parseInt(yearOfRelease, 10),
                    price: parseFloat(price),
                    endDate,
                    imageUrl,
                    imageThumbnails // Update image thumbnails along with other fields
                })
            });

            if (response.ok) {
                alert('Watch updated successfully.');
                closeModal(); // Close the modal after saving
                window.location.reload(); // Refresh the page to reflect updates
            } else {
                const errorData = await response.json();
                alert(`Error updating watch: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating watch:', error);
            alert('Failed to update the watch.');
        }
    };
</script>

<!-- Modal -->
<div class="modal d-block" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Watch Details</h5>
                <button type="button" class="btn-close" on:click={closeModal}></button>
            </div>
            <div class="modal-body">
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
                    <input type="number" step="0.01" class="form-control" bind:value={price} />
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