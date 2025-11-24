document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            const successMessage = document.getElementById('successMessage');

            // Email validation regex
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            // Validate name field
            function validateName() {
                const nameValue = nameInput.value.trim();
                if (nameValue === '') {
                    showError(nameInput, nameError, 'Please enter your full name');
                    return false;
                } else if (nameValue.length < 2) {
                    showError(nameInput, nameError, 'Name must be at least 2 characters');
                    return false;
                } else {
                    showSuccess(nameInput);
                    hideError(nameError);
                    return true;
                }
            }

            // Validate email field
            function validateEmail() {
                const emailValue = emailInput.value.trim();
                if (emailValue === '') {
                    showError(emailInput, emailError, 'Please enter your email address');
                    return false;
                } else if (!emailRegex.test(emailValue)) {
                    showError(emailInput, emailError, 'Please enter a valid email address');
                    return false;
                } else {
                    showSuccess(emailInput);
                    hideError(emailError);
                    return true;
                }
            }

            // Validate message field
            function validateMessage() {
                const messageValue = messageInput.value.trim();
                if (messageValue === '') {
                    showError(messageInput, messageError, 'Please enter your message');
                    return false;
                } else if (messageValue.length < 10) {
                    showError(messageInput, messageError, 'Message must be at least 10 characters');
                    return false;
                } else {
                    showSuccess(messageInput);
                    hideError(messageError);
                    return true;
                }
            }

            // Show error state
            function showError(input, errorElement, message) {
                input.parentElement.classList.remove('success');
                input.parentElement.classList.add('error');
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                input.classList.add('shake');
                setTimeout(() => {
                    input.classList.remove('shake');
                }, 500);
            }

            // Show success state
            function showSuccess(input) {
                input.parentElement.classList.remove('error');
                input.parentElement.classList.add('success');
            }

            // Hide error message
            function hideError(errorElement) {
                errorElement.style.display = 'none';
            }

            // Real-time validation
            nameInput.addEventListener('blur', validateName);
            emailInput.addEventListener('blur', validateEmail);
            messageInput.addEventListener('blur', validateMessage);

            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate all fields
                const isNameValid = validateName();
                const isEmailValid = validateEmail();
                const isMessageValid = validateMessage();
                
                if (isNameValid && isEmailValid && isMessageValid) {
                    // Show success message
                    successMessage.style.display = 'block';
                    
                    // Reset form after 3 seconds
                    setTimeout(function() {
                        form.reset();
                        successMessage.style.display = 'none';
                        
                        // Remove success classes
                        const formGroups = document.querySelectorAll('.form-group');
                        formGroups.forEach(group => {
                            group.classList.remove('success');
                        });
                    }, 5000);
                    
                    // In a real application, you would send the form data to a server here
                    console.log('Form submitted successfully!');
                    console.log('Name:', nameInput.value);
                    console.log('Email:', emailInput.value);
                    console.log('Subject:', document.getElementById('subject').value);
                    console.log('Message:', messageInput.value);
                } else {
                    // Scroll to first error
                    const firstError = document.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });

            // Test edge cases function
            function testEdgeCases() {
                console.log("Testing edge cases:");
                
                // Test empty inputs
                console.log("Empty name:", validateName());
                console.log("Empty email:", validateEmail());
                console.log("Empty message:", validateMessage());
                
                // Test invalid email formats
                const testEmails = [
                    "invalid",
                    "invalid@",
                    "invalid@domain",
                    "invalid@domain.",
                    "@domain.com",
                    "invalid@.com",
                    "invalid@domain.c",
                    "invalid@domain.com.",
                    " spaces@domain.com",
                    "spaces @domain.com",
                    "spaces@ domain.com"
                ];
                
                testEmails.forEach(email => {
                    emailInput.value = email;
                    console.log(`Email "${email}":`, validateEmail());
                });
                
                // Test special characters in name
                const testNames = [
                    "A", // Too short
                    "John Doe!", // Special characters
                    "Jane-Smith", // Hyphen (valid)
                    "José Martínez", // Accented characters (valid)
                    "John123", // Numbers (valid)
                    "A".repeat(101) // Too long
                ];
                
                testNames.forEach(name => {
                    nameInput.value = name;
                    console.log(`Name "${name}":`, validateName());
                });
                
                // Reset form after testing
                form.reset();
                const formGroups = document.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.classList.remove('error', 'success');
                });
                const errorMessages = document.querySelectorAll('.error-message');
                errorMessages.forEach(msg => {
                    msg.style.display = 'none';
                });
            }
            
            // Uncomment the line below to test edge cases when the page loads
            // testEdgeCases();
        });