<script>
    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let isAdmin = false;  // Admin boolean
    let errorMessage = '';  // Error message for validation
    let successMessage = ''; // Success message after registration

    // Username and password validation rules
    function validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/; // Only alphanumeric, 3-20 chars
        return usernameRegex.test(username);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Min 8 chars, 1 digit, 1 lowercase, 1 uppercase
        return passwordRegex.test(password);
    }

    // Handle form submission for registering a new user
    async function handleRegister() {
        errorMessage = '';  // Reset error message
        successMessage = ''; // Reset success message

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            errorMessage = "Please fill in all fields!";
            return;
        }

        if (!validateUsername(name)) {
            errorMessage = "Username must be 3-20 characters and alphanumeric!";
            return;
        }

        if (!validatePassword(password)) {
            errorMessage = "Password must be at least 8 characters long, with 1 digit, 1 lowercase, and 1 uppercase letter!";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match!";
            return;
        }

        try {
            // POST request to the backend to create a new user
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    isAdmin: isAdmin
                })
            });

            const data = await response.json();

            if (response.ok) {
                successMessage = `User ${data.name} created successfully!`;

                // Reset form fields
                name = '';
                email = '';
                password = '';
                confirmPassword = '';
                isAdmin = false;

                // Redirect to the login page after a brief delay
                setTimeout(() => {
                    window.location.href = '/login';
                }, 10);
            } else {
                errorMessage = data.message || 'Error registering user!';
            }
        } catch (error) {
            errorMessage = 'Failed to connect to the server!';
        }
    }
</script>

<div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4" style="max-width: 500px; width: 100%;">
        <h2 class="text-center text-dark mb-4">Create Your Account</h2>

        <!-- Success and Error Messages -->
        {#if successMessage}
            <div class="alert alert-success">{successMessage}</div>
        {/if}
        {#if errorMessage}
            <div class="alert alert-danger">{errorMessage}</div>
        {/if}

        <form on:submit|preventDefault={handleRegister}>
            <!-- Username Field -->
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                        id="name"
                        type="text"
                        class="form-control"
                        placeholder="Full Name"
                        bind:value={name}
                        required
                />
            </div>

            <!-- Email Field -->
            <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input
                        id="email"
                        type="email"
                        class="form-control"
                        placeholder="Email Address"
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

            <!-- Confirm Password Field -->
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                        id="confirmPassword"
                        type="password"
                        class="form-control"
                        placeholder="Confirm Password"
                        bind:value={confirmPassword}
                        required
                />
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>

        <!-- Login Link -->
        <p class="text-center mt-4 text-muted">
            Already have an account? <a href="/login" class="text-primary">Login here</a>
        </p>
    </div>
</div>