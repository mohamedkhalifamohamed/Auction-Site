<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    // Available filter options
    export let brands = ["Rolex", "Omega", "Tag Heuer"];
    export let priceRanges = ["0-1000", "1000-5000", "5000-10000"];
    export let years = [2018, 2019, 2020, 2021, 2022]; // Example years

    // Variables for selected filters
    let selectedBrand = '';
    let selectedModel = '';
    let selectedPriceRange = '';
    let selectedYear = '';

    // Dispatch the filter change event with the selected filter values
    const updateFilters = () => {
        dispatch('filter', {
            brand: selectedBrand,
            model: selectedModel,
            priceRange: selectedPriceRange,
            year: selectedYear,
        });
    };
</script>

<div>
    <h3>Filters</h3>

    <!-- Brand Filter -->
    <div class="mb-3">
        <label for="brand" class="form-label">Brand</label>
        <input
                id="brand"
                list="brandOptions"
                class="form-control"
                bind:value={selectedBrand}
                on:input={updateFilters}
                placeholder="Select or type a brand"
        />
        <datalist id="brandOptions">
            {#each brands as brand}
                <option value={brand} />
            {/each}
        </datalist>
    </div>

    <!-- Model Filter -->
    <div class="mb-3">
        <label for="model" class="form-label">Model</label>
        <input
                id="model"
                type="text"
                class="form-control"
                placeholder="Search by model..."
                bind:value={selectedModel}
                on:input={updateFilters}
        />
    </div>

    <!-- Price Range Filter -->
    <div class="mb-3">
        <label for="priceRange" class="form-label">Price Range</label>
        <input
                id="priceRange"
                list="priceRangeOptions"
                class="form-control"
                bind:value={selectedPriceRange}
                on:input={updateFilters}
                placeholder="Select or type a price range"
        />
        <datalist id="priceRangeOptions">
            {#each priceRanges as range}
                <option value={range} />
            {/each}
        </datalist>
    </div>

    <!-- Year of Release Filter -->
    <div class="mb-3">
        <label for="year" class="form-label">Year of Release</label>
        <input
                id="year"
                list="yearOptions"
                type="number"
                class="form-control"
                min="1900"
                max="{new Date().getFullYear()}"
                bind:value={selectedYear}
                on:input={updateFilters}
                placeholder="e.g. 2020"
        />
        <datalist id="yearOptions">
            {#each years as year}
                <option value={year} />
            {/each}
        </datalist>
    </div>
</div>