
// Initialize scroll animations when AOS is available.
if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 700,
        once: true
    });
}

// Back-to-top button
const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
    backToTopButton.addEventListener("click", function (event) {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Demo contact form: no message is sent.
const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

if (contactForm && contactMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        contactMessage.textContent =
            "Demo only: this form is not connected to a message service.";
    });
}

// Demo prescription form: no file is uploaded.
const prescriptionForm = document.getElementById("prescriptionForm");
const prescriptionMessage = document.getElementById("prescriptionMessage");

if (prescriptionForm && prescriptionMessage) {
    prescriptionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        prescriptionMessage.textContent =
            "Demo only: your prescription has not been uploaded or sent.";
    });
}
