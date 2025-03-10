import { writable } from 'svelte/store';

// Helper function to decode JWT without using libraries
export function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
}

// Initialize the token store with the value from localStorage if it exists
const storedToken = localStorage.getItem('token') || '';
export const token = writable(storedToken);

// Create writable stores for the user's name, email, isAdmin status, and userID
export const name = writable('');  // New store for the user's name
export const email = writable('');
export const isAdmin = writable(false);
export const userID = writable(null);

// Decode the token to get the name, email, isAdmin status, and userID if the token is available
if (storedToken) {
    const decoded = decodeToken(storedToken); // Manually decode the token
    name.set(decoded.name || '');  // Set the user's name from the token payload
    email.set(decoded.email);
    isAdmin.set(decoded.isAdmin || false); // Set isAdmin from token payload
    userID.set(decoded.userID || null);  // Set userID from token payload
}

// Subscribe to changes in the token store and save the token to localStorage
token.subscribe((value) => {
    if (value) {
        localStorage.setItem('token', value);

        const decoded = decodeToken(value);
        name.set(decoded.name || '');  // Update the user's name
        email.set(decoded.email);
        isAdmin.set(decoded.isAdmin || false); // Update isAdmin status when the token changes
        userID.set(decoded.userID || null);  // Update userID when the token changes
    } else {
        localStorage.removeItem('token');
        name.set('');  // Clear the user's name when there is no token
        email.set('');
        isAdmin.set(false);
        userID.set(null);
    }
});