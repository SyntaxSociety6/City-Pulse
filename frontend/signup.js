document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            fullName: document.querySelector('input[name="fullName"]').value,
            email: document.querySelector('input[name="email"]').value,
            password: document.querySelector('input[name="password"]').value
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error);
            }

            alert('Registration successful!');
            window.location.href = '/login.html';
        } catch (error) {
            alert(error.message || 'Registration failed');
        }
    });
});