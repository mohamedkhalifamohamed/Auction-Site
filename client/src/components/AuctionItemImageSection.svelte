<script>
    export let imageUrl;
    export let imageThumbnails = [];
</script>

<div class="image-section text-center">
    <!-- Main image -->
    <img class="img-fluid rounded mb-3" src={imageUrl} alt="Main watch image" />

    <!-- Thumbnails (if available) -->
    {#if imageThumbnails.length > 0}
        <div class="thumbnails d-flex justify-content-center gap-3 mt-3">
            {#each imageThumbnails as thumb}
                <img class="thumbnail img-thumbnail" src={thumb} alt="Thumbnail" />
            {/each}
        </div>
    {/if}
</div>

<style>
    /* Adjust thumbnail size */
    .thumbnail {
        width: 100px; /* Set a fixed width for all thumbnails */
        height: 100px; /* Set a fixed height for all thumbnails */
        object-fit: contain; /* Ensure thumbnails maintain aspect ratio and don't stretch */
    }
</style>