(function () {
  'use strict';

  const contactForm = document.getElementById('jsContactForm');
  const successMessage = document.getElementById('successMessage');

  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
      input.addEventListener('input', function () {
        if (contactForm.classList.contains('was-validated')) {
          if (this.checkValidity()) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
          } else {
            this.classList.remove('is-invalid');
            this.classList.add('is-invalid');
          }
        }
      });
    });

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        inputs.forEach(input => {
          if (!input.checkValidity()) {
            input.classList.add('is-valid');
          }
        });
        return;
      }

      contactForm.classList.add('was-validated');

      const submitBtn = contactForm.querySelector('.btn-send');
      const originalText = submitBtn.innerText;

      const formData = {
        firstName: document.getElementById('fName').value.trim(),
        lastName: document.getElementById('lName').value.trim(),
        email: document.getElementById('userEmail').value.trim(),
        phone: document.getElementById('userPhone').value.trim(),
        message: document.getElementById('userMsg').value.trim(),
        timestamp: new Date().toISOString()
      };

      try {
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;
        submitBtn.disabled = true;
        console.log("Success! Data collected:", formData);

        successMessage.classList.add('show');

        contactForm.reset();
        contactForm.classList.remove('was-validated');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });

        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);

      } catch (error) {
        alert('Error sending message.');
      } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    }, false);
  }
})();
