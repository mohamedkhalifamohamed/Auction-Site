<script>
    import Header from "../components/Header.svelte";
    import { token, email as userEmail, isAdmin, userID } from '../stores/userAuthStore.js'; // Import stores
    import { decodeToken } from '../stores/userAuthStore.js'; // Import the decodeToken function
    let email = '';  // Local email for input binding
    let password = '';
    let errorMessage = '';

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            token.set(data.token);  // Store the token in the Svelte store

            // Decode the token to extract user information
            const decoded = decodeToken(data.token);

            // Set the email, isAdmin, and userID in the respective stores
            userEmail.set(decoded.email);
            isAdmin.set(decoded.isAdmin || false);
            userID.set(decoded.userID || null);

            // Redirect to the home page after successful login
            window.location.href = '/home';
        } catch (error) {
            errorMessage = error.message;
        }
    };
</script>

<Header title="Login to place your Bids!" />
<div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%;">
        <h2 class="text-center text-dark mb-4">Login</h2>

        <form on:submit|preventDefault={handleLogin}>
            <!-- Email Field -->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                        id="email"
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        bind:value={email}
                        required
                />
            </div>

            <!-- Password Field -->
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                        id="password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        bind:value={password}
                        required
                />
            </div>

            <!-- Error Message -->
            {#if errorMessage}
                <p class="text-danger">{errorMessage}</p>
            {/if}

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary w-100">
                Login
            </button>
        </form>

        <!-- Registration Link -->
        <p class="text-center mt-4 text-muted">
            Don't have an account? <a href="/register" class="text-primary">Register here</a>
        </p>
    </div>
</div>

<style>
    .vh-100 {
        height: 100vh;
    }
</style>