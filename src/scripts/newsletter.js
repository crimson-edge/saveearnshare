const MAILERLITE_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYWRlMGY4ZmZjN2I1YjZlNTg5ODY4ZGRkNzMxZDI3NWI4ZDY5ODQ5MmQyZWI2MzdhNjlhNjY0M2QyNTk1NThlZDk0NTBiNDk3YmI2NzFkOTAiLCJpYXQiOjE3MzQyMzIwOTkuMjQzNzc1LCJuYmYiOjE3MzQyMzIwOTkuMjQzNzc3LCJleHAiOjQ4ODk5MDU2OTkuMjQwMjA3LCJzdWIiOiIxMjQ1MzYxIiwic2NvcGVzIjpbXX0.p8-6TvQM6P5oiDktf5fOlGA-CLvYGZ_-59l0kctGN1Lh3lMboitqNSj7WaaxKSajkvts2JEa-yzCcczmxayf-7bDRi_MreptQ1MlctHd7jnkkNGjOeGzRgaAVg6c7ZfVU4r93gKCiRoJFGOeWrojHq7HlAU5BmgwBvCbuSf1dT07IS0LeLVJSnOMGdWO2Igy0nf7PGnuPPwXukmvtafDymUgDcW3Kz3qZQ_vrBQSRAmI_iXOdE8Tnz3YkQo96sTk8QE6VF1TkprUDdIwH-JlWR1aD6h1e8o48Xg9NPjwnVE9pJKwpQ_NPXmN_HSz7b_mziWUvTeXGXSdcN_oj1W3WjLi5U0NYM92NmKqXvRot21TXHMv91A6qMq9iTupFXc77waSZMnUvFSEkdWTAr2PcxK2HUNb80Su-ale7VhLO2kCYN6Qma-CR4tFkfNoY2ULCD8saOl5g6xfy3PwSzPdlshSKngwogO2JvArkseAcquAR0frbX2C16fn_llsS1Au5HF0s1pe2jwzUTOnEbZdiheWjnatrdRR_aXZGMYENDtS3uzWUSEyGkESGPDgGCr8Wm6kMyXWxSEeT0HBRC3k74MaQN664ADvP_vyC1VjbktxXERy5QGinzmYEYVS0TFt0pru_6wkq4LdI45N-P0BF4SlbMi0znFobWOckTu4hZc';

async function subscribeToNewsletter(email) {
    const API_URL = 'https://connect.mailerlite.com/api/subscribers';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_TOKEN}`
            },
            body: JSON.stringify({
                email: email,
                groups: [], // Add group IDs if you want to assign subscribers to specific groups
                status: 'active'
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to subscribe');
        }

        return { success: true };
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return { 
            success: false, 
            error: error.message || 'Failed to subscribe. Please try again later.'
        };
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const submitButton = document.getElementById('newsletter-submit');
    const statusMessage = document.getElementById('newsletter-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Disable form while processing
            emailInput.disabled = true;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Subscribing...';
            
            const email = emailInput.value.trim();
            const result = await subscribeToNewsletter(email);
            
            // Re-enable form
            emailInput.disabled = false;
            submitButton.disabled = false;
            submitButton.innerHTML = 'Subscribe';
            
            if (result.success) {
                statusMessage.innerHTML = 'Thank you for subscribing!';
                statusMessage.className = 'text-green-400 mt-2';
                emailInput.value = '';
            } else {
                statusMessage.innerHTML = result.error;
                statusMessage.className = 'text-red-400 mt-2';
            }
            
            // Clear status message after 5 seconds
            setTimeout(() => {
                statusMessage.innerHTML = '';
                statusMessage.className = '';
            }, 5000);
        });
    }
});
