/* =========================================================
   CARENOVA HOSPITAL
   PREMIUM HOSPITAL WEBSITE
   SCRIPT.JS - PART 1
========================================================= */


/* =========================================================
   GLOBAL ELEMENTS
========================================================= */

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-bar input");
const hospitalWhatsApp = "919708829220";



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

        menuToggle.textContent =
            nav.classList.contains("mobile-open")
                ? "✕"
                : "☰";

    });

}


/* Close mobile menu when navigation link clicked */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav?.classList.remove("mobile-open");

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }

    });

});



/* =========================================================
   SEARCH BUTTON
========================================================= */

const searchButton =
    document.querySelector(".icon-btn");

if (searchButton) {

    searchButton.addEventListener("click", () => {

        if (!searchBar) return;

        if (searchBar.style.display === "block") {

            searchBar.style.display = "none";

        } else {

            searchBar.style.display = "block";

            setTimeout(() => {
                searchInput?.focus();
            }, 100);

        }

    });

}


/* =========================================================
   SEARCH FUNCTION
========================================================= */

if (searchInput) {

    searchInput.addEventListener("keydown", function(event) {

        if (event.key !== "Enter") return;

        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        if (!query) {

            showToast("Please enter something to search.");

            return;

        }


        const searchableSections = [
            "#home",
            "#doctors",
            "#facilities",
            "#gallery",
            "#contact"
        ];


        let found = false;


        searchableSections.forEach(selector => {

            const section =
                document.querySelector(selector);

            if (!section) return;


            const text =
                section.textContent.toLowerCase();


            if (text.includes(query)) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

                found = true;

            }

        });


        if (!found) {

            showToast(
                "No matching information found."
            );

        }

    });

}



/* =========================================================
   MODAL SYSTEM
========================================================= */

function openModal(content) {

    if (!modal || !modalContent) return;

    modalContent.innerHTML = content;

    modal.classList.add("active");

    document.body.classList.add("modal-open");

}



function closeModal() {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}



/* =========================================================
   CLOSE MODAL ON BACKDROP
========================================================= */

if (modal) {

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {

            closeModal();

        }

    });

}



/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

    }

});



/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(message) {

    const oldToast =
        document.querySelector(".carenova-toast");

    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className = "carenova-toast";

    toast.innerHTML = `
        <span>✓</span>
        <strong>${message}</strong>
    `;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("show");

    }, 50);


    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);

}



/* =========================================================
   APPOINTMENT MODAL
========================================================= */

function openAppointmentModal() {

    openModal(`

        <div class="appointment-modal">

            <span class="eyebrow">
                APPOINTMENT
            </span>

            <h2>
                Book an Appointment
            </h2>

            <p class="muted">
                Schedule your consultation with
                our specialist doctors.
            </p>


            <form
                id="modalAppointmentForm"
                class="appointment-form"
            >

                <div class="form-group">

                    <label>
                        Patient Name
                    </label>

                    <input
                        type="text"
                        id="appointmentName"
                        placeholder="Enter patient name"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        id="appointmentPhone"
                        placeholder="Enter mobile number"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Select Department
                    </label>

                    <select
                        id="appointmentDepartment"
                        required
                    >

                        <option value="">
                            Select Department
                        </option>

                        <option>
                            Cardiology
                        </option>

                        <option>
                            Neurology
                        </option>

                        <option>
                            Orthopedics
                        </option>

                        <option>
                            General Medicine
                        </option>

                        <option>
                            Pediatrics
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        Appointment Date
                    </label>

                    <input
                        type="date"
                        id="appointmentDate"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Preferred Time
                    </label>

                    <select
                        id="appointmentTime"
                        required
                    >

                        <option value="">
                            Select Time
                        </option>

                        <option>
                            09:00 AM
                        </option>

                        <option>
                            10:00 AM
                        </option>

                        <option>
                            11:00 AM
                        </option>

                        <option>
                            12:00 PM
                        </option>

                        <option>
                            03:00 PM
                        </option>

                        <option>
                            04:00 PM
                        </option>

                        <option>
                            05:00 PM
                        </option>

                    </select>

                </div>


                <div class="appointment-actions">

                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        Confirm Appointment
                    </button>


                    <button
                        type="button"
                        class="btn btn-outline"
                        onclick="closeModal()"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `);


    const form =
        document.getElementById("modalAppointmentForm");


    if (form) {

        form.addEventListener("submit", function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "appointmentName"
                ).value.trim();

            const phone =
                document.getElementById(
                    "appointmentPhone"
                ).value.trim();

            const department =
                document.getElementById(
                    "appointmentDepartment"
                ).value;

            const date =
                document.getElementById(
                    "appointmentDate"
                ).value;

            const time =
                document.getElementById(
                    "appointmentTime"
                ).value;

            const whatsappMessage =
`🏥 *CARENOVA HOSPITAL*
📅 *New Appointment Booking*

━━━━━━━━━━━━━━━━━━

👤 *Patient Details*

Name: ${name}
Phone: ${phone}
Department: ${department}
Date: ${date}
Time: ${time}

━━━━━━━━━━━━━━━━━━

Please contact the patient to confirm the appointment.

Thank you.
CareNova Hospital`;

            const whatsappURL =
                "https://wa.me/" +
                hospitalWhatsApp +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );

            window.open(whatsappURL, "_blank");

            showToast(
                "Opening WhatsApp to confirm your appointment."
            );

            setTimeout(() => {

                closeModal();

            }, 1200);

        });

    }

}



/* =========================================================
   PATIENT PORTAL
========================================================= */

function openPortalModal() {

    openModal(`

        <div class="patient-portal">

            <!-- PROFILE HEADER -->

            <div class="portal-profile">

                <div class="patient-photo">

                    <img
                        src="https://i.pravatar.cc/300?img=12"
                        alt="Patient Photo"
                    >

                    <span class="verified-badge">
                        ✓
                    </span>

                </div>


                <div class="patient-profile-info">

                    <span class="eyebrow">
                        PATIENT PORTAL
                    </span>

                    <h2>
                        Abhay Kumar Jha
                    </h2>

                    <p>
                        Patient ID:
                        <strong>
                            CN-2026-1045
                        </strong>
                    </p>

                    <span class="portal-status">
                        ● Active Patient
                    </span>

                </div>

            </div>



            <!-- PERSONAL DETAILS -->

            <div class="portal-section">

                <div class="portal-section-title">

                    <div>

                        <span class="eyebrow">
                            PERSONAL INFORMATION
                        </span>

                        <h3>
                            Patient Details
                        </h3>

                    </div>

                </div>


                <div class="patient-info-grid">

                    <div class="patient-info-item">

                        <span>
                            Full Name
                        </span>

                        <strong>
                            Abhay Kumar Jha
                        </strong>

                    </div>


                    <div class="patient-info-item">

                        <span>
                            Patient ID
                        </span>

                        <strong>
                            CN-2026-1045
                        </strong>

                    </div>


                    <div class="patient-info-item">

                        <span>
                            Mobile Number
                        </span>

                        <strong>
                            +91 98765 43210
                        </strong>

                    </div>


                    <div class="patient-info-item">

                        <span>
                            Date of Birth
                        </span>

                        <strong>
                            15 March 2002
                        </strong>

                    </div>


                    <div class="patient-info-item">

                        <span>
                            Blood Group
                        </span>

                        <strong>
                            B+
                        </strong>

                    </div>


                    <div class="patient-info-item">

                        <span>
                            Email
                        </span>

                        <strong>
                            patient@example.com
                        </strong>

                    </div>


                    <div class="patient-info-item">

                        <span>
                            Address
                        </span>

                        <strong>
                            Kolkata, West Bengal
                        </strong>

                    </div>

                </div>

            </div>



            <!-- GUARDIAN -->

            <div class="portal-section">

                <div class="portal-section-title">

                    <div>

                        <span class="eyebrow">
                            EMERGENCY CONTACT
                        </span>

                        <h3>
                            Guardian Details
                        </h3>

                    </div>

                </div>


                <div class="guardian-card">

                    <div class="guardian-avatar">
                        👨
                    </div>


                    <div>

                        <strong>
                            Rajesh Kumar Jha
                        </strong>

                        <span>
                            Father / Guardian
                        </span>

                        <small>
                            📞 +91 98765 12345
                        </small>

                    </div>

                </div>

            </div>



            <!-- DOCTOR -->

            <div class="portal-section">

                <div class="portal-section-title">

                    <div>

                        <span class="eyebrow">
                            TREATING DOCTOR
                        </span>

                        <h3>
                            Your Doctor
                        </h3>

                    </div>

                </div>


                <div class="assigned-doctor">

                    <img
                        src="https://i.pravatar.cc/300?img=68"
                        alt="Dr. Arjun Mehta"
                    >


                    <div>

                        <span>
                            Cardiology
                        </span>

                        <h3>
                            Dr. Arjun Mehta
                        </h3>

                        <p>
                            Consultant Cardiologist
                        </p>

                        <small>
                            ★ 4.8 · 14 years experience
                        </small>

                    </div>

                </div>

            </div>



            <!-- VITALS -->

            <div class="portal-section">

                <div class="portal-section-title">

                    <div>

                        <span class="eyebrow">
                            HEALTH OVERVIEW
                        </span>

                        <h3>
                            Latest Vitals
                        </h3>

                    </div>

                </div>


                <div class="vitals-grid">

                    <div class="vital-card">

                        <span>
                            Blood Pressure
                        </span>

                        <strong>
                            120/80
                        </strong>

                        <small>
                            mmHg
                        </small>

                    </div>


                    <div class="vital-card">

                        <span>
                            Heart Rate
                        </span>

                        <strong>
                            72
                        </strong>

                        <small>
                            BPM
                        </small>

                    </div>


                    <div class="vital-card">

                        <span>
                            Weight
                        </span>

                        <strong>
                            68
                        </strong>

                        <small>
                            kg
                        </small>

                    </div>


                    <div class="vital-card">

                        <span>
                            BMI
                        </span>

                        <strong>
                            22.8
                        </strong>

                        <small>
                            Normal
                        </small>

                    </div>

                </div>

            </div>



            <!-- MEDICAL HISTORY -->

            <div class="portal-section">

                <div class="portal-section-title">

                    <div>

                        <span class="eyebrow">
                            PATIENT RECORD
                        </span>

                        <h3>
                            Medical History
                        </h3>

                    </div>

                </div>


                <div class="history-list">

                    <div class="history-item">

                        <div class="history-date">
                            12
                            <small>
                                AUG
                            </small>
                        </div>

                        <div>

                            <strong>
                                Cardiology Consultation
                            </strong>

                            <span>
                                Dr. Arjun Mehta
                            </span>

                        </div>

                    </div>


                    <div class="history-item">

                        <div class="history-date">
                            05
                            <small>
                                AUG
                            </small>
                        </div>

                        <div>

                            <strong>
                                Blood Test
                            </strong>

                            <span>
                                Laboratory Department
                            </span>

                        </div>

                    </div>


                    <div class="history-item">

                        <div class="history-date">
                            28
                            <small>
                                JUL
                            </small>
                        </div>

                        <div>

                            <strong>
                                General Check-up
                            </strong>

                            <span>
                                General Medicine
                            </span>

                        </div>

                    </div>

                </div>

            </div>



            <!-- MEDICAL REPORTS -->

            <div class="portal-section">

                <div class="portal-section-title">

                    <div>

                        <span class="eyebrow">
                            DOCUMENTS
                        </span>

                        <h3>
                            Medical Reports
                        </h3>

                    </div>

                </div>


                <div class="reports-list">

                    <button
                        class="report-item"
                        onclick="viewReport('Complete Blood Count')"
                    >

                        <span class="report-icon">
                            📄
                        </span>

                        <span>

                            <strong>
                                Complete Blood Count
                            </strong>

                            <small>
                                05 August 2026
                            </small>

                        </span>

                        <b>
                            →
                        </b>

                    </button>


                    <button
                        class="report-item"
                        onclick="viewReport('Cardiology Report')"
                    >

                        <span class="report-icon">
                            ❤️
                        </span>

                        <span>

                            <strong>
                                Cardiology Report
                            </strong>

                            <small>
                                12 August 2026
                            </small>

                        </span>

                        <b>
                            →
                        </b>

                    </button>


                    <button
                        class="report-item"
                        onclick="viewReport('Health Check-up Report')"
                    >

                        <span class="report-icon">
                            🏥
                        </span>

                        <span>

                            <strong>
                                Health Check-up Report
                            </strong>

                            <small>
                                28 July 2026
                            </small>

                        </span>

                        <b>
                            →
                        </b>

                    </button>

                </div>

            </div>



            <!-- PORTAL FOOTER -->

            <div class="portal-footer">

                <button
                    class="btn btn-primary"
                    onclick="openAppointmentModal()"
                >
                    + Book New Appointment
                </button>


                <button
                    class="btn btn-outline"
                    onclick="closeModal()"
                >
                    Logout
                </button>

            </div>

        </div>

    `);

}

/* =========================================================
   CARENOVA HOSPITAL
   SCRIPT.JS - PART 2
   MEDICAL REPORTS + DOCTORS + GALLERY + MAP
========================================================= */


/* =========================================================
   MEDICAL REPORT VIEWER
========================================================= */

function viewReport(reportName) {

    let reportData = {

        "Complete Blood Count": {
            doctor: "Dr. Arjun Mehta",
            department: "Laboratory",
            date: "05 August 2026",
            result: "All parameters are within the normal range."
        },

        "Cardiology Report": {
            doctor: "Dr. Arjun Mehta",
            department: "Cardiology",
            date: "12 August 2026",
            result: "Cardiac evaluation completed successfully."
        },

        "Health Check-up Report": {
            doctor: "Dr. Maya Deshmukh",
            department: "General Medicine",
            date: "28 July 2026",
            result: "Routine health check-up completed."
        }

    };


    const report =
        reportData[reportName] || {

            doctor: "Dr. Arjun Mehta",
            department: "Cardiology",
            date: "12 August 2026",
            result: "Demonstration medical report."

        };


    openModal(`

        <div class="report-preview">

            <span class="eyebrow">
                MEDICAL DOCUMENT
            </span>

            <h2>
                ${reportName}
            </h2>


            <div class="report-document">

                <div class="report-document-header">

                    <div>

                        <strong>
                            CARENOVA HOSPITAL
                        </strong>

                        <span>
                            Advanced Healthcare & Medical Centre
                        </span>

                    </div>

                    <span>
                        Medical Report
                    </span>

                </div>


                <hr>


                <div class="report-details">

                    <p>

                        <strong>
                            Patient:
                        </strong>

                        Abhay Kumar Jha

                    </p>


                    <p>

                        <strong>
                            Patient ID:
                        </strong>

                        CN-2026-1045

                    </p>


                    <p>

                        <strong>
                            Doctor:
                        </strong>

                        ${report.doctor}

                    </p>


                    <p>

                        <strong>
                            Department:
                        </strong>

                        ${report.department}

                    </p>


                    <p>

                        <strong>
                            Report Date:
                        </strong>

                        ${report.date}

                    </p>

                </div>


                <div class="report-result">

                    <h4>
                        Report Result
                    </h4>

                    <p>
                        ${report.result}
                    </p>


                    <div class="demo-result">

                        ✓ Report Available

                    </div>

                </div>


                <div class="report-signature">

                    <span>
                        Authorized Medical Officer
                    </span>

                    <strong>
                        CareNova Hospital
                    </strong>

                </div>

            </div>


            <div class="report-actions">

                <button
                    class="btn btn-primary"
                    onclick="downloadDemoReport('${reportName}')"
                >

                    ↓ Download Report

                </button>


                <button
                    class="btn btn-outline"
                    onclick="closeModal()"
                >

                    Close

                </button>

            </div>

        </div>

    `);

}



/* =========================================================
   DEMO REPORT DOWNLOAD
========================================================= */

function downloadDemoReport(reportName) {

    showToast(
        `"${reportName}" download started.`
    );


    setTimeout(() => {

        const reportText = `

CARENOVA HOSPITAL
Medical Report

Patient:
Abhay Kumar Jha

Patient ID:
CN-2026-1045

Report:
${reportName}

Doctor:
Dr. Arjun Mehta

Department:
Cardiology

Status:
Report Available

This is a demonstration medical
report for the CareNova Hospital
website patient portal.

        `;


        const blob =
            new Blob(
                [reportText],
                {
                    type: "text/plain"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            `${reportName.replaceAll(" ", "_")}.txt`;


        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    }, 500);

}



/* =========================================================
   DOCTOR PROFILE MODAL
========================================================= */

function openDoctorProfile(
    doctorName,
    department,
    designation,
    image,
    experience,
    rating
) {

    openModal(`

        <div class="doctor-profile-modal">

            <div class="doctor-profile-image">

                <img
                    src="${image}"
                    alt="${doctorName}"
                >

            </div>


            <span class="eyebrow">
                OUR SPECIALIST
            </span>


            <h2>
                ${doctorName}
            </h2>


            <p class="doctor-department">
                ${department}
            </p>


            <p>
                ${designation}
            </p>


            <div class="doctor-profile-stats">

                <div>

                    <strong>
                        ★ ${rating}
                    </strong>

                    <span>
                        Patient Rating
                    </span>

                </div>


                <div>

                    <strong>
                        ${experience}
                    </strong>

                    <span>
                        Experience
                    </span>

                </div>

            </div>


            <div class="doctor-profile-about">

                <h3>
                    About the Doctor
                </h3>

                <p>
                    Our specialist provides patient-focused
                    medical care using modern diagnostic
                    technology and evidence-based treatment.
                    This is a demonstration profile for the
                    CareNova Hospital website.
                </p>

            </div>


            <div class="doctor-profile-actions">

                <button
                    class="btn btn-primary"
                    onclick="openAppointmentModal()"
                >

                    Book Appointment

                </button>


                <button
                    class="btn btn-outline"
                    onclick="closeModal()"
                >

                    Close

                </button>

            </div>

        </div>

    `);

}



/* =========================================================
   DOCTOR CARDS
========================================================= */

document
    .querySelectorAll(".doctor-card")
    .forEach(card => {

        card.style.cursor = "pointer";


        card.addEventListener(
            "click",
            function() {

                const name =
                    card.querySelector("h3")
                    ?.textContent
                    .trim()
                    || "Doctor";


                const department =
                    card.querySelector(
                        ".doctor-info > span"
                    )
                    ?.textContent
                    .trim()
                    || "Specialist";


                const designation =
                    card.querySelector("p")
                    ?.textContent
                    .trim()
                    || "Medical Specialist";


                const rating =
                    card.querySelector("strong")
                    ?.textContent
                    .replace("★", "")
                    .trim()
                    || "4.9";


                const experience =
                    card.querySelector("small")
                    ?.textContent
                    .replace("years experience", "")
                    .trim()
                    || "10+";


                const imageElement =
                    card.querySelector(
                        ".doctor-photo img"
                    );


                const image =
                    imageElement
                        ?.src
                        ||
                    "https://i.pravatar.cc/300?img=47";


                openDoctorProfile(
                    name,
                    department,
                    designation,
                    image,
                    experience + " years",
                    rating
                );

            }
        );

    });



/* =========================================================
   HOSPITAL GALLERY
========================================================= */

const hospitalGallery = [

    {
        title: "Hospital Campus",
        category: "Campus",
        image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=85"
    },


    {
        title: "Hospital Reception",
        category: "Reception",
        image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85"
    },


    {
        title: "Private Patient Room",
        category: "Rooms",
        image:
        "https://images.unsplash.com/photo-1519494140681-8b17d830a3f4?auto=format&fit=crop&w=1200&q=85"
    },


    {
        title: "Modern Patient Room",
        category: "Rooms",
        image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85"
    },


    {
        title: "Hospital Corridor",
        category: "Facilities",
        image:
        "https://images.unsplash.com/photo-1512678080530-7760d81f95da?auto=format&fit=crop&w=1200&q=85"
    },


    {
        title: "Emergency Department",
        category: "Emergency",
        image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85"
    },


    {
        title: "Modern Medical Facility",
        category: "Facilities",
        image:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=85"
    },


    {
        title: "Healthcare Team",
        category: "Doctors",
        image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85"
    }

];



/* =========================================================
   CREATE GALLERY
========================================================= */

function createHospitalGallery() {

    const gallery =
        document.querySelector("#gallery-grid");


    if (!gallery) return;


    gallery.innerHTML = "";


    hospitalGallery.forEach(
        (item, index) => {

            const card =
                document.createElement("div");


            card.className =
                "hospital-gallery-card";


            card.innerHTML = `

                <div class="gallery-image">

                    <img
                        src="${item.image}"
                        alt="${item.title}"
                        loading="lazy"
                    >


                    <div class="gallery-overlay">

                        <span>
                            ${item.category}
                        </span>

                        <h3>
                            ${item.title}
                        </h3>

                        <button
                            onclick="openGalleryImage(${index})"
                        >

                            View Photo →

                        </button>

                    </div>

                </div>

            `;


            gallery.appendChild(card);

        }
    );

}



/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

function openGalleryImage(index) {

    const item =
        hospitalGallery[index];


    if (!item) return;


    openModal(`

        <div class="gallery-lightbox">

            <img
                src="${item.image}"
                alt="${item.title}"
            >


            <div class="gallery-lightbox-info">

                <span class="eyebrow">
                    ${item.category}
                </span>

                <h2>
                    ${item.title}
                </h2>

            </div>


            <div class="gallery-navigation">

                <button
                    class="gallery-prev"
                    onclick="previousGalleryImage(${index})"
                >
                    ← Previous
                </button>


                <button
                    class="btn btn-outline"
                    onclick="closeModal()"
                >
                    Close
                </button>


                <button
                    class="gallery-next"
                    onclick="nextGalleryImage(${index})"
                >
                    Next →
                </button>

            </div>

        </div>

    `);

}



/* =========================================================
   NEXT GALLERY IMAGE
========================================================= */

function nextGalleryImage(index) {

    let next =
        index + 1;


    if (
        next >=
        hospitalGallery.length
    ) {

        next = 0;

    }


    openGalleryImage(next);

}



/* =========================================================
   PREVIOUS GALLERY IMAGE
========================================================= */

function previousGalleryImage(index) {

    let previous =
        index - 1;


    if (previous < 0) {

        previous =
            hospitalGallery.length - 1;

    }


    openGalleryImage(previous);

}



/* =========================================================
   GALLERY FILTER
========================================================= */

function filterGallery(category) {

    const gallery =
        document.querySelector("#gallery-grid");


    if (!gallery) return;


    gallery.innerHTML = "";


    hospitalGallery
        .forEach((item, index) => {

            if (
                category !== "All" &&
                item.category !== category
            ) {

                return;

            }


            const card =
                document.createElement("div");


            card.className =
                "hospital-gallery-card";


            card.innerHTML = `

                <div class="gallery-image">

                    <img
                        src="${item.image}"
                        alt="${item.title}"
                        loading="lazy"
                    >


                    <div class="gallery-overlay">

                        <span>
                            ${item.category}
                        </span>

                        <h3>
                            ${item.title}
                        </h3>

                        <button
                            onclick="openGalleryImage(${index})"
                        >

                            View Photo →

                        </button>

                    </div>

                </div>

            `;


            gallery.appendChild(card);

        });

}



/* =========================================================
   GALLERY FILTER BUTTONS
========================================================= */

document
    .querySelectorAll(".gallery-filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(
                        ".gallery-filter"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                filterGallery(
                    this.dataset.category
                );

            }
        );

    });



/* =========================================================
   INITIALIZE GALLERY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        createHospitalGallery();

    }
);



/* =========================================================
   GOOGLE MAP
========================================================= */

function openHospitalMap() {

    const address =
        "24 Healthcare Avenue, New Delhi, India";


    const encodedAddress =
        encodeURIComponent(address);


    window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        "_blank"
    );

}



/* =========================================================
   GET DIRECTIONS
========================================================= */

function getHospitalDirections() {

    const destination =
        "24 Healthcare Avenue, New Delhi, India";


    const encodedDestination =
        encodeURIComponent(destination);


    window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`,
        "_blank"
    );

}



/* =========================================================
   CONTACT / MAP BUTTON
========================================================= */

document
    .querySelectorAll("[data-map]")
    .forEach(button => {

        button.addEventListener(
            "click",
            openHospitalMap
        );

    });



/* =========================================================
   QUICK ACTION BUTTONS
========================================================= */

document
    .querySelectorAll(".quick-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const text =
                    button.textContent
                        .toLowerCase();


                if (
                    text.includes(
                        "appointment"
                    )
                ) {

                    openAppointmentModal();

                }


                else if (
                    text.includes(
                        "doctor"
                    ) ||
                    text.includes(
                        "specialist"
                    )
                ) {

                    document
                        .querySelector("#doctors")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                }


                else if (
                    text.includes(
                        "emergency"
                    )
                ) {

                    showEmergencyModal();

                }


                else if (
                    text.includes(
                        "portal"
                    )
                ) {

                    openPortalModal();

                }

            }
        );

    });



/* =========================================================
   EMERGENCY MODAL
========================================================= */

function showEmergencyModal() {

    openModal(`

        <div class="emergency-modal">

            <div class="emergency-icon">
                ☎
            </div>


            <span class="eyebrow">
                24/7 EMERGENCY CARE
            </span>


            <h2>
                Emergency Department
            </h2>


            <p class="muted">

                Our emergency team is available
                around the clock for urgent
                medical assistance.

            </p>


            <div class="emergency-contact">

                <strong>
                    Emergency Helpline
                </strong>

                <a href="tel:112">
                    112
                </a>

            </div>


            <div class="emergency-actions">

                <a
                    href="tel:112"
                    class="btn btn-primary"
                >

                    ☎ Call Emergency

                </a>


                <button
                    class="btn btn-outline"
                    onclick="closeModal()"
                >

                    Close

                </button>

            </div>

        </div>

    `);

}

/* =========================================================
   CARENOVA HOSPITAL
   SCRIPT.JS - PART 3
   FINAL FIXES + ANIMATIONS + PORTAL BUTTON
========================================================= */


/* =========================================================
   PATIENT PORTAL BUTTON FIX
========================================================= */

/*
   This fixes the "Open Patient Portal" button.

   Your HTML uses:
       class="btn btn-dark patient-open"

   So we directly attach the click event here.
*/

document.addEventListener("DOMContentLoaded", function () {

    const patientPortalButtons =
        document.querySelectorAll(".patient-open");


    patientPortalButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            openPortalModal();

        });

    });

    const patientPortalTrigger =
        document.querySelector("#patientPortalBtn");

    if (patientPortalTrigger) {

        patientPortalTrigger.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openPortalModal();

            }
        );

    }

});



/* =========================================================
   PATIENT PORTAL NAVIGATION
========================================================= */

document.querySelectorAll(
    '[href="#patient-portal"]'
).forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        openPortalModal();

    });

});



/* =========================================================
   HERO APPOINTMENT BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".appointment-btn, .book-appointment"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openAppointmentModal();

            }
        );

    });



/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });



/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".doctor-card, " +
        ".facility-card, " +
        ".testimonial-card, " +
        ".hospital-gallery-card, " +
        ".contact-card"
    );


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal-element"
    );

    revealObserver.observe(element);

});



/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(element) {

    const target =
        parseInt(
            element.dataset.target ||
            element.textContent.replace(
                /[^0-9]/g,
                ""
            )
        );


    if (isNaN(target)) return;


    let current = 0;


    const duration = 1800;

    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                target * eased
            );


        element.textContent =
            current.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}



const counters =
    document.querySelectorAll(
        "[data-target]"
    );


if (counters.length > 0) {

    const counterObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );


                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(
            counter
        );

    });

}



/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        "nav a[href^='#']"
    );


window.addEventListener(
    "scroll",
    function () {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);



/* =========================================================
   STICKY HEADER EFFECT
========================================================= */

const header =
    document.querySelector("header");


window.addEventListener(
    "scroll",
    function () {

        if (!header) return;


        if (window.scrollY > 40) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }

    }
);



/* =========================================================
   GALLERY INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createHospitalGallery();

    }
);



/* =========================================================
   GALLERY CATEGORY SHORTCUTS
========================================================= */

window.showCampusGallery =
    function () {

        const gallery =
            document.querySelector(
                "#gallery"
            );


        if (gallery) {

            gallery.scrollIntoView({
                behavior: "smooth"
            });

        }


        filterGallery("Campus");

    };



window.showReceptionGallery =
    function () {

        const gallery =
            document.querySelector(
                "#gallery"
            );


        if (gallery) {

            gallery.scrollIntoView({
                behavior: "smooth"
            });

        }


        filterGallery("Reception");

    };



window.showRoomGallery =
    function () {

        const gallery =
            document.querySelector(
                "#gallery"
            );


        if (gallery) {

            gallery.scrollIntoView({
                behavior: "smooth"
            });

        }


        filterGallery("Rooms");

    };



/* =========================================================
   GALLERY VIEW ALL BUTTON
========================================================= */

const viewGalleryButton =
    document.querySelector(
        ".view-gallery"
    );


if (viewGalleryButton) {

    viewGalleryButton.addEventListener(
        "click",
        function () {

            const gallery =
                document.querySelector(
                    "#gallery"
                );


            gallery?.scrollIntoView({
                behavior: "smooth"
            });


            filterGallery("All");

        }
    );

}



/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.querySelector(
        "#contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.querySelector(
                    "#contactName"
                )?.value.trim();

            const email =
                document.querySelector(
                    "#contactEmail"
                )?.value.trim();

            const message =
                document.querySelector(
                    "#contactMessage"
                )?.value.trim();

            if (!name || !email || !message) {

                showToast(
                    "Please complete all fields."
                );

                return;

            }

            const whatsappMessage =
`🏥 *CARENOVA HOSPITAL*
✉️ *New Contact Message*

━━━━━━━━━━━━━━━━━━

👤 *Sender Details*

Name:
${name}

Email:
${email}

Message:
${message}

━━━━━━━━━━━━━━━━━━

Please respond to the sender as soon as possible.

Thank you.
CareNova Hospital`;

            const whatsappURL =
                "https://wa.me/" +
                hospitalWhatsApp +
                "?text=" +
                encodeURIComponent(whatsappMessage);

            window.open(whatsappURL, "_blank");

            showToast(
                "Opening WhatsApp to send your message."
            );

            contactForm.reset();

        }
    );

}



/* =========================================================
   NEWSLETTER FORM
========================================================= */

const newsletterForm =
    document.querySelector(
        "#newsletterForm"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            showToast(
                "Thank you for subscribing to CareNova updates."
            );


            newsletterForm.reset();

        }
    );

}



/* =========================================================
   BACK TO TOP BUTTON
========================================================= */

const backToTop =
    document.querySelector(
        ".back-to-top"
    );


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


window.addEventListener(
    "scroll",
    function () {

        if (!backToTop) return;


        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);



/* =========================================================
   IMAGE ERROR HANDLER
========================================================= */

document.addEventListener(
    "error",
    function (event) {

        if (
            event.target.tagName ===
            "IMG"
        ) {

            event.target.style.background =
                "#eef2f5";


            event.target.style.objectFit =
                "cover";

        }

    },
    true
);



/* =========================================================
   HOSPITAL MAP
========================================================= */

window.openHospitalMap =
    function () {

        const address =
            "24 Healthcare Avenue, New Delhi, India";


        const url =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(address);


        window.open(
            url,
            "_blank"
        );

    };



window.getHospitalDirections =
    function () {

        const address =
            "24 Healthcare Avenue, New Delhi, India";


        const url =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            encodeURIComponent(address);


        window.open(
            url,
            "_blank"
        );

    };



/* =========================================================
   MAP BUTTONS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const mapButton =
            event.target.closest(
                "[data-map]"
            );


        if (mapButton) {

            event.preventDefault();

            openHospitalMap();

        }

    }
);



/* =========================================================
   EMERGENCY CALL BUTTON
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const emergencyButton =
            event.target.closest(
                ".emergency-call"
            );


        if (!emergencyButton) return;


        window.location.href =
            "tel:112";

    }
);



/* =========================================================
   BOOK APPOINTMENT FROM DOCTOR CARDS
========================================================= */

document
    .querySelectorAll(
        ".doctor-card .book-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                openAppointmentModal();

            }
        );

    });



/* =========================================================
   LOADING ANIMATION
========================================================= */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);



/* =========================================================
   PREVENT EMPTY BUTTONS
========================================================= */

document
    .querySelectorAll(
        "button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const type =
                    button.getAttribute(
                        "type"
                    );


                if (
                    type === "submit"
                ) {

                    return;

                }

            }
        );

    });



/* =========================================================
   GLOBAL FUNCTIONS
   Makes functions accessible from HTML onclick=""
========================================================= */

window.openPortalModal =
    openPortalModal;

window.closeModal =
    closeModal;

window.openAppointmentModal =
    openAppointmentModal;

window.viewReport =
    viewReport;

window.downloadDemoReport =
    downloadDemoReport;

window.openDoctorProfile =
    openDoctorProfile;

window.openGalleryImage =
    openGalleryImage;

window.nextGalleryImage =
    nextGalleryImage;

window.previousGalleryImage =
    previousGalleryImage;

window.filterGallery =
    filterGallery;

window.openHospitalMap =
    openHospitalMap;

window.getHospitalDirections =
    getHospitalDirections;

window.showEmergencyModal =
    showEmergencyModal;

window.showToast =
    showToast;



/* =========================================================
   FINAL CONSOLE MESSAGE
========================================================= */

console.log(
    "%cCareNova Hospital Website Loaded Successfully ✓",
    "font-size:16px;font-weight:bold;"
);

console.log(
    "Patient Portal: Ready"
);

console.log(
    "Hospital Gallery: Ready"
);

console.log(
    "Doctor Profiles: Ready"
);

console.log(
    "Google Maps: Ready"
);

console.log(
    "Appointment System: Ready"
);

/* =========================================================
   CARENOVA HOSPITAL
   PREMIUM UPGRADE - PART 3
   NEW JAVASCRIPT FEATURES
========================================================= */


/* =========================================================
   1. PREMIUM STATISTICS COUNTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const counters =
        document.querySelectorAll(
            ".premium-stat strong"
        );

    if (counters.length === 0) {
        return;
    }


    const counterObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const counter =
                        entry.target;

                    const target =
                        parseInt(
                            counter.getAttribute(
                                "data-target"
                            )
                        );

                    let current = 0;

                    const duration = 1500;

                    const steps = 60;

                    const increment =
                        target / steps;

                    const intervalTime =
                        duration / steps;


                    const timer =
                        setInterval(function () {

                            current += increment;

                            if (current >= target) {

                                current = target;

                                clearInterval(timer);

                            }


                            counter.textContent =
                                Math.floor(current)
                                    .toLocaleString("en-IN");

                        }, intervalTime);


                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });

});



/* =========================================================
   2. PREMIUM MODAL CREATOR
========================================================= */

function createPremiumModal(
    title,
    content,
    options = {}
) {

    const oldModal =
        document.getElementById(
            "premiumDynamicModal"
        );


    if (oldModal) {
        oldModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.id =
        "premiumDynamicModal";

    modal.className =
        "premium-dynamic-modal";


    modal.innerHTML = `

        <div class="premium-modal-overlay"></div>

        <div class="premium-modal-box">

            <button
                class="premium-modal-close"
                onclick="closePremiumModal()"
                aria-label="Close"
            >
                ×
            </button>

            <div class="premium-modal-header">

                ${
                    options.icon
                    ?
                    `<div class="premium-modal-icon">
                        ${options.icon}
                    </div>`
                    :
                    ""
                }

                <div>

                    <span class="premium-modal-label">
                        CARENOVA HOSPITAL
                    </span>

                    <h2>
                        ${title}
                    </h2>

                </div>

            </div>

            <div class="premium-modal-content">

                ${content}

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    requestAnimationFrame(function () {

        modal.classList.add(
            "premium-modal-active"
        );

    });


    const overlay =
        modal.querySelector(
            ".premium-modal-overlay"
        );


    if (overlay) {

        overlay.addEventListener(
            "click",
            closePremiumModal
        );

    }


    document.body.style.overflow =
        "hidden";


    return modal;
}



/* =========================================================
   3. CLOSE PREMIUM MODAL
========================================================= */

function closePremiumModal() {

    const modal =
        document.getElementById(
            "premiumDynamicModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "premium-modal-active"
    );


    setTimeout(function () {

        modal.remove();

        document.body.style.overflow =
            "";

    }, 250);

}



/* =========================================================
   4. ESC KEY CLOSE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        const modal =
            document.getElementById(
                "premiumDynamicModal"
            );


        if (modal) {

            closePremiumModal();

        }

    }
);



/* =========================================================
   5. DEPARTMENT MODAL
========================================================= */

function openDepartmentModal(
    department
) {

    const departmentData = {

        "Cardiology": {

            icon: "❤️",

            description:
                "Our Cardiology Department provides comprehensive heart and vascular care with specialist consultation, diagnostic evaluation and treatment planning.",

            services: [
                "Heart consultation",
                "ECG & cardiac evaluation",
                "Blood pressure management",
                "Cardiac risk assessment",
                "Preventive heart care"
            ],

            doctors:
                "Cardiology Specialists"

        },


        "Neurology": {

            icon: "🧠",

            description:
                "The Neurology Department provides specialized evaluation and care for conditions affecting the brain, spinal cord and nervous system.",

            services: [
                "Neurological consultation",
                "Headache evaluation",
                "Nerve disorder assessment",
                "Neurological monitoring",
                "Specialist follow-up"
            ],

            doctors:
                "Neurology Specialists"

        },


        "Orthopedics": {

            icon: "🦴",

            description:
                "Our Orthopedics Department focuses on bones, joints, muscles and movement-related conditions.",

            services: [
                "Orthopedic consultation",
                "Joint evaluation",
                "Bone health assessment",
                "Sports injury care",
                "Rehabilitation guidance"
            ],

            doctors:
                "Orthopedic Specialists"

        },


        "Pediatrics": {

            icon: "👶",

            description:
                "Our Pediatrics team provides healthcare for infants, children and young patients in a comfortable environment.",

            services: [
                "Child consultation",
                "Growth monitoring",
                "Vaccination guidance",
                "Child wellness checks",
                "Pediatric follow-up"
            ],

            doctors:
                "Pediatric Specialists"

        },


        "Pulmonology": {

            icon: "🫁",

            description:
                "Our Pulmonology Department provides evaluation and treatment support for respiratory and lung conditions.",

            services: [
                "Respiratory consultation",
                "Lung function evaluation",
                "Breathing problem assessment",
                "Respiratory follow-up",
                "Preventive respiratory care"
            ],

            doctors:
                "Pulmonology Specialists"

        },


        "General Medicine": {

            icon: "🩺",

            description:
                "General Medicine provides comprehensive primary healthcare, diagnosis and preventive medical services.",

            services: [
                "General consultation",
                "Routine health checks",
                "Preventive healthcare",
                "Chronic condition management",
                "Health guidance"
            ],

            doctors:
                "General Medicine Doctors"

        },


        "Ophthalmology": {

            icon: "👁️",

            description:
                "Our Ophthalmology Department provides eye examinations and vision-related healthcare services.",

            services: [
                "Eye examination",
                "Vision assessment",
                "Eye health screening",
                "Vision care",
                "Specialist consultation"
            ],

            doctors:
                "Eye Care Specialists"

        },


        "Dental": {

            icon: "🦷",

            description:
                "Our Dental Department provides preventive, restorative and general oral healthcare.",

            services: [
                "Dental consultation",
                "Oral examination",
                "Dental cleaning",
                "Preventive dental care",
                "Restorative consultation"
            ],

            doctors:
                "Dental Specialists"

        }

    };


    const data =
        departmentData[department];


    if (!data) {

        showToast(
            "Department information unavailable."
        );

        return;

    }


    const services =
        data.services
            .map(function (service) {

                return `
                    <li>
                        ✓ ${service}
                    </li>
                `;

            })
            .join("");


    const content = `

        <div class="premium-department-description">

            <p>
                ${data.description}
            </p>

        </div>


        <div class="premium-modal-section">

            <h3>
                Services Available
            </h3>

            <ul class="premium-check-list">

                ${services}

            </ul>

        </div>


        <div class="premium-info-box">

            <strong>
                👨‍⚕️ ${data.doctors}
            </strong>

            <span>
                Our medical team is available
                for consultation and treatment.
            </span>

        </div>


        <div class="premium-modal-actions">

            <button
                class="premium-action-primary"
                onclick="
                    closePremiumModal();
                    openAppointmentFromDepartment(
                        '${department}'
                    );
                "
            >
                📅 Book Appointment
            </button>


            <button
                class="premium-action-secondary"
                onclick="
                    closePremiumModal();
                    scrollToDoctors();
                "
            >
                👨‍⚕️ Find Doctor
            </button>

        </div>

    `;


    createPremiumModal(
        department,
        content,
        {
            icon: data.icon
        }
    );

}



/* =========================================================
   6. APPOINTMENT FROM DEPARTMENT
========================================================= */

function openAppointmentFromDepartment(
    department
) {

    const content = `

        <form
            class="premium-form"
            onsubmit="
                submitDepartmentAppointment(
                    event,
                    '${department}'
                )
            "
        >

            <div class="premium-form-group">

                <label>
                    Patient Name
                </label>

                <input
                    type="text"
                    name="patientName"
                    placeholder="Enter patient name"
                    required
                >

            </div>


            <div class="premium-form-row">

                <div class="premium-form-group">

                    <label>
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        name="mobile"
                        placeholder="10 digit mobile number"
                        pattern="[0-9]{10}"
                        required
                    >

                </div>


                <div class="premium-form-group">

                    <label>
                        Preferred Date
                    </label>

                    <input
                        type="date"
                        name="date"
                        required
                    >

                </div>

            </div>


            <div class="premium-form-group">

                <label>
                    Preferred Time
                </label>

                <select
                    name="time"
                    required
                >

                    <option value="">
                        Select time
                    </option>

                    <option>
                        09:00 AM
                    </option>

                    <option>
                        10:00 AM
                    </option>

                    <option>
                        11:30 AM
                    </option>

                    <option>
                        02:00 PM
                    </option>

                    <option>
                        04:00 PM
                    </option>

                    <option>
                        06:00 PM
                    </option>

                </select>

            </div>


            <div class="premium-selected-department">

                🩺 Department:

                <strong>
                    ${department}
                </strong>

            </div>


            <button
                type="submit"
                class="premium-form-submit"
            >
                Confirm Appointment
            </button>

        </form>

    `;


    createPremiumModal(
        "Book Appointment",
        content,
        {
            icon: "📅"
        }
    );

}



/* =========================================================
   7. SUBMIT DEPARTMENT APPOINTMENT
========================================================= */

function submitDepartmentAppointment(
    event,
    department
) {

    event.preventDefault();


    const form =
        event.target;


    const patientName =
        form.patientName.value.trim();


    const mobile =
        form.mobile.value.trim();


    const date =
        form.date.value;


    const time =
        form.time.value;


    if (!patientName ||
        !mobile ||
        !date ||
        !time) {

        showToast(
            "Please complete all fields."
        );

        return;

    }


    const appointmentId =
        "CN-APT-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const formattedDate =
        new Date(date)
            .toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


    const content = `

        <div class="premium-success">

            <div class="premium-success-icon">
                ✓
            </div>

            <h3>
                Appointment Confirmed
            </h3>

            <p>
                Your appointment request has been
                successfully registered.
            </p>

        </div>


        <div class="premium-appointment-ticket">

            <div>
                <span>
                    Appointment ID
                </span>

                <strong>
                    ${appointmentId}
                </strong>
            </div>


            <div>
                <span>
                    Patient
                </span>

                <strong>
                    ${patientName}
                </strong>
            </div>


            <div>
                <span>
                    Department
                </span>

                <strong>
                    ${department}
                </strong>
            </div>


            <div>
                <span>
                    Date
                </span>

                <strong>
                    ${formattedDate}
                </strong>
            </div>


            <div>
                <span>
                    Time
                </span>

                <strong>
                    ${time}
                </strong>
            </div>

        </div>


        <button
            class="premium-form-submit"
            onclick="
                closePremiumModal()
            "
        >
            Done
        </button>

    `;


    createPremiumModal(
        "Appointment Confirmed",
        content,
        {
            icon: "✓"
        }
    );


    showToast(
        "Appointment booked successfully."
    );

}



/* =========================================================
   8. ROOM MODAL
========================================================= */

function openRoomModal(
    room
) {

    const roomData = {

        "General Ward": {

            icon: "🛏️",

            description:
                "A comfortable shared patient area with essential facilities and nursing support.",

            facilities: [
                "24/7 nursing assistance",
                "Patient monitoring",
                "Hospital meals",
                "Clean and hygienic environment",
                "Attendant seating"
            ]

        },


        "Private Room": {

            icon: "🛏️",

            description:
                "A private room designed to provide patients with additional privacy and a peaceful recovery environment.",

            facilities: [
                "Private bathroom",
                "Attendant seating",
                "Television",
                "Wi-Fi",
                "Nursing assistance"
            ]

        },


        "Deluxe Room": {

            icon: "⭐",

            description:
                "Premium accommodation with enhanced comfort, privacy and additional patient facilities.",

            facilities: [
                "Premium furniture",
                "Attendant bed",
                "Personal refrigerator",
                "Television",
                "Wi-Fi",
                "Dedicated nursing support"
            ]

        },


        "Intensive Care Unit": {

            icon: "❤️",

            description:
                "Advanced critical-care facilities designed for patients requiring continuous medical observation and specialized support.",

            facilities: [
                "Continuous patient monitoring",
                "Critical-care equipment",
                "Specialist doctor support",
                "24/7 nursing care",
                "Emergency response support"
            ]

        }

    };


    const data =
        roomData[room];


    if (!data) {
        return;
    }


    const facilities =
        data.facilities
            .map(function (item) {

                return `
                    <li>
                        ✓ ${item}
                    </li>
                `;

            })
            .join("");


    const content = `

        <p class="premium-room-description">
            ${data.description}
        </p>


        <div class="premium-modal-section">

            <h3>
                Facilities
            </h3>

            <ul class="premium-check-list">

                ${facilities}

            </ul>

        </div>


        <div class="premium-info-box">

            <strong>
                🏥 CareNova Hospital
            </strong>

            <span>
                Room availability depends on
                current hospital occupancy.
            </span>

        </div>


        <button
            class="premium-form-submit"
            onclick="
                closePremiumModal();
                openAdmissionRequest();
            "
        >
            Request Admission Information
        </button>

    `;


    createPremiumModal(
        room,
        content,
        {
            icon: data.icon
        }
    );

}



/* =========================================================
   9. ADMISSION REQUEST
========================================================= */

function openAdmissionRequest() {

    const content = `

        <form
            class="premium-form"
            onsubmit="
                submitAdmissionRequest(event)
            "
        >

            <div class="premium-form-group">

                <label>
                    Patient Name
                </label>

                <input
                    type="text"
                    name="patient"
                    required
                    placeholder="Enter patient name"
                >

            </div>


            <div class="premium-form-group">

                <label>
                    Mobile Number
                </label>

                <input
                    type="tel"
                    name="mobile"
                    pattern="[0-9]{10}"
                    required
                    placeholder="10 digit mobile number"
                >

            </div>


            <div class="premium-form-group">

                <label>
                    Accommodation Type
                </label>

                <select
                    name="room"
                    required
                >

                    <option value="">
                        Select room
                    </option>

                    <option>
                        General Ward
                    </option>

                    <option>
                        Private Room
                    </option>

                    <option>
                        Deluxe Room
                    </option>

                    <option>
                        Intensive Care Unit
                    </option>

                </select>

            </div>


            <button
                class="premium-form-submit"
                type="submit"
            >
                Submit Request
            </button>

        </form>

    `;


    createPremiumModal(
        "Admission Request",
        content,
        {
            icon: "🏥"
        }
    );

}



/* =========================================================
   10. SUBMIT ADMISSION
========================================================= */

function submitAdmissionRequest(
    event
) {

    event.preventDefault();


    const form =
        event.target;


    const patient =
        form.patient.value.trim();


    const room =
        form.room.value;


    const content = `

        <div class="premium-success">

            <div class="premium-success-icon">
                ✓
            </div>

            <h3>
                Request Submitted
            </h3>

            <p>
                Thank you, ${patient}.
                Our admission team will contact you
                regarding ${room} availability.
            </p>

        </div>


        <button
            class="premium-form-submit"
            onclick="
                closePremiumModal()
            "
        >
            Done
        </button>

    `;


    createPremiumModal(
        "Request Received",
        content,
        {
            icon: "✓"
        }
    );


    showToast(
        "Admission request submitted."
    );

}



/* =========================================================
   11. AMBULANCE MODAL
========================================================= */

function openAmbulanceModal() {

    const content = `

        <div class="ambulance-alert">

            🚑

            <strong>
                Emergency Ambulance Service
            </strong>

            <span>
                For life-threatening emergencies,
                please call your local emergency
                service immediately.
            </span>

        </div>


        <form
            class="premium-form"
            onsubmit="
                submitAmbulanceRequest(event)
            "
        >

            <div class="premium-form-group">

                <label>
                    Patient Name
                </label>

                <input
                    type="text"
                    name="patient"
                    required
                    placeholder="Enter patient name"
                >

            </div>


            <div class="premium-form-group">

                <label>
                    Mobile Number
                </label>

                <input
                    type="tel"
                    name="mobile"
                    pattern="[0-9]{10}"
                    required
                    placeholder="10 digit mobile number"
                >

            </div>


            <div class="premium-form-group">

                <label>
                    Pickup Location
                </label>

                <input
                    type="text"
                    name="location"
                    required
                    placeholder="Enter pickup location"
                >

            </div>


            <div class="premium-form-group">

                <label>
                    Emergency Type
                </label>

                <select
                    name="emergency"
                    required
                >

                    <option value="">
                        Select emergency type
                    </option>

                    <option>
                        Medical Emergency
                    </option>

                    <option>
                        Accident / Trauma
                    </option>

                    <option>
                        Breathing Emergency
                    </option>

                    <option>
                        Cardiac Emergency
                    </option>

                    <option>
                        Other
                    </option>

                </select>

            </div>


            <button
                class="premium-form-submit emergency-submit"
                type="submit"
            >
                🚑 Request Ambulance
            </button>

        </form>

    `;


    createPremiumModal(
        "Request Ambulance",
        content,
        {
            icon: "🚑"
        }
    );

}



/* =========================================================
   12. SUBMIT AMBULANCE REQUEST
========================================================= */

function submitAmbulanceRequest(
    event
) {

    event.preventDefault();


    const form =
        event.target;


    const patient =
        form.patient.value.trim();


    const location =
        form.location.value.trim();


    const requestId =
        "AMB-" +
        Math.floor(
            10000 +
            Math.random() * 90000
        );


    const content = `

        <div class="premium-success emergency-success">

            <div class="premium-success-icon">
                🚑
            </div>

            <h3>
                Ambulance Request Received
            </h3>

            <p>
                Request received for
                <strong>${patient}</strong>.
            </p>

        </div>


        <div class="premium-appointment-ticket">

            <div>
                <span>
                    Request ID
                </span>

                <strong>
                    ${requestId}
                </strong>
            </div>


            <div>
                <span>
                    Pickup
                </span>

                <strong>
                    ${location}
                </strong>
            </div>


            <div>
                <span>
                    Status
                </span>

                <strong class="status-pending">
                    Request Received
                </strong>
            </div>

        </div>


        <div class="premium-info-box">

            <strong>
                📞 Demo Request
            </strong>

            <span>
                This website is a demonstration.
                Connect this form to your hospital
                emergency system for real dispatch.
            </span>

        </div>


        <button
            class="premium-form-submit"
            onclick="
                closePremiumModal()
            "
        >
            Close
        </button>

    `;


    createPremiumModal(
        "Ambulance Request",
        content,
        {
            icon: "🚑"
        }
    );


    showToast(
        "Ambulance request received."
    );

}



/* =========================================================
   13. DIAGNOSTIC MODAL
========================================================= */

function openDiagnosticModal(
    test
) {

    const content = `

        <form
            class="premium-form"
            onsubmit="
                submitDiagnosticBooking(
                    event,
                    '${test}'
                )
            "
        >

            <div class="premium-selected-department">

                🧪 Selected Test:

                <strong>
                    ${test}
                </strong>

            </div>


            <div class="premium-form-group">

                <label>
                    Patient Name
                </label>

                <input
                    type="text"
                    name="patient"
                    required
                    placeholder="Enter patient name"
                >

            </div>


            <div class="premium-form-row">

                <div class="premium-form-group">

                    <label>
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        name="mobile"
                        pattern="[0-9]{10}"
                        required
                        placeholder="Mobile number"
                    >

                </div>


                <div class="premium-form-group">

                    <label>
                        Test Date
                    </label>

                    <input
                        type="date"
                        name="date"
                        required
                    >

                </div>

            </div>


            <button
                class="premium-form-submit"
                type="submit"
            >
                Book Diagnostic Test
            </button>

        </form>

    `;


    createPremiumModal(
        "Book Diagnostic Test",
        content,
        {
            icon: "🧪"
        }
    );

}



/* =========================================================
   14. SUBMIT DIAGNOSTIC BOOKING
========================================================= */

/* =========================================================
   DIAGNOSTIC TEST BOOKING + WHATSAPP
   Added without changing existing hospital features
========================================================= */

function submitDiagnosticBooking(event, test) {

    event.preventDefault();

    const form = event.target;

    /* -----------------------------------------------------
       GET PATIENT DETAILS
    ----------------------------------------------------- */

    const patientName =
        form.patient.value.trim();

    const mobile =
        form.mobile.value.trim();

    const date =
        form.date.value;

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!patientName || !mobile || !date) {

        showToast(
            "Please complete all fields."
        );

        return;
    }

    /* -----------------------------------------------------
       GENERATE BOOKING ID
    ----------------------------------------------------- */

    const bookingId =
        "LAB-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    /* -----------------------------------------------------
       FORMAT DATE
    ----------------------------------------------------- */

    const formattedDate =
        new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    /* -----------------------------------------------------
       WHATSAPP MESSAGE
    ----------------------------------------------------- */

    const whatsappMessage =

`🏥 *CARENOVA HOSPITAL*
🧪 *New Diagnostic Test Booking*

━━━━━━━━━━━━━━━━━━

👤 *Patient Details*

Patient Name:
${patientName}

Mobile Number:
${mobile}

🧪 Test:
${test}

📅 Preferred Date:
${formattedDate}

🆔 Booking ID:
${bookingId}

━━━━━━━━━━━━━━━━━━

Please contact the patient to confirm the diagnostic test appointment.

Thank you.
CareNova Hospital`;


    /* -----------------------------------------------------
       CREATE WHATSAPP URL
    ----------------------------------------------------- */

    const whatsappURL =
        "https://wa.me/" +
        hospitalWhatsApp +
        "?text=" +
        encodeURIComponent(
            whatsappMessage
        );

    window.open(whatsappURL, "_blank");


    /* -----------------------------------------------------
       SUCCESS MODAL
    ----------------------------------------------------- */

    const content = `

        <div class="premium-success">

            <div class="premium-success-icon">
                ✓
            </div>

            <h3>
                Test Booking Confirmed
            </h3>

            <p>
                Your diagnostic test has been
                scheduled successfully.
            </p>

        </div>


        <div class="premium-appointment-ticket">

            <div>

                <span>
                    Booking ID
                </span>

                <strong>
                    ${bookingId}
                </strong>

            </div>


            <div>

                <span>
                    Patient
                </span>

                <strong>
                    ${patientName}
                </strong>

            </div>


            <div>

                <span>
                    Test
                </span>

                <strong>
                    ${test}
                </strong>

            </div>


            <div>

                <span>
                    Mobile
                </span>

                <strong>
                    ${mobile}
                </strong>

            </div>


            <div>

                <span>
                    Date
                </span>

                <strong>
                    ${formattedDate}
                </strong>

            </div>

        </div>


        <div
            style="
                margin-top:20px;
                padding:16px;
                border-radius:14px;
                background:#f0fdf4;
                border:1px solid #bbf7d0;
            "
        >

            <strong>
                📱 WhatsApp Confirmation
            </strong>

            <p
                style="
                    margin:8px 0 0;
                    color:#166534;
                    font-size:14px;
                "
            >
                Click the button below to send
                this booking information to
                the hospital WhatsApp number.
            </p>

        </div>


        <div
            style="
                display:flex;
                gap:12px;
                flex-wrap:wrap;
                margin-top:18px;
            "
        >

            <button
                type="button"
                class="premium-form-submit"
                onclick="
                    window.open(
                        '${whatsappURL}',
                        '_blank'
                    )
                "
            >
                💬 Send to WhatsApp
            </button>


            <button
                type="button"
                class="premium-form-submit"
                onclick="
                    closePremiumModal()
                "
            >
                Done
            </button>

        </div>

    `;


    /* -----------------------------------------------------
       SHOW SUCCESS MODAL
    ----------------------------------------------------- */

    createPremiumModal(
        "Booking Confirmed",
        content,
        {
            icon: "✓"
        }
    );


    /* -----------------------------------------------------
       TOAST
    ----------------------------------------------------- */

    showToast(
        "Diagnostic test booked successfully."
    );

}


/* =========================================================
   15. EMERGENCY HELP
========================================================= */

function showEmergencyModal() {

    const content = `

        <div class="emergency-help-panel">

            <div class="emergency-big-icon">
                🚨
            </div>

            <h3>
                Emergency Assistance
            </h3>

            <p>
                If this is a life-threatening emergency,
                contact your local emergency service
                immediately.
            </p>


            <div class="emergency-help-actions">

                <a
                    href="tel:112"
                    class="emergency-call-button"
                >
                    ☎ Call Emergency Services
                </a>


                <button
                    onclick="
                        closePremiumModal();
                        openAmbulanceModal();
                    "
                    class="ambulance-button"
                >
                    🚑 Request Ambulance
                </button>

            </div>

        </div>

    `;


    createPremiumModal(
        "Emergency Help",
        content,
        {
            icon: "🚨"
        }
    );

}



/* =========================================================
   16. SCROLL TO DOCTORS
========================================================= */

function scrollToDoctors() {

    const doctors =
        document.querySelector(
            "#doctors"
        );


    if (doctors) {

        doctors.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        return;

    }


    showToast(
        "Doctors section not found."
    );

}



/* =========================================================
   17. TOAST MESSAGE
========================================================= */

function showToast(
    message,
    type = "success"
) {

    const oldToast =
        document.querySelector(
            ".premium-toast"
        );


    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");


    toast.className =
        "premium-toast " +
        "premium-toast-" +
        type;


    const icon =
        type === "error"
        ? "!"
        : "✓";


    toast.innerHTML = `

        <span class="premium-toast-icon">
            ${icon}
        </span>

        <span>
            ${message}
        </span>

    `;


    document.body.appendChild(toast);


    requestAnimationFrame(function () {

        toast.classList.add(
            "premium-toast-show"
        );

    });


    setTimeout(function () {

        toast.classList.remove(
            "premium-toast-show"
        );


        setTimeout(function () {

            toast.remove();

        }, 300);

    }, 3500);

}



/* =========================================================
   18. SCROLL REVEAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const revealElements =
            document.querySelectorAll(
                ".department-card, " +
                ".room-card, " +
                ".diagnostic-card, " +
                ".health-blog-card, " +
                ".trust-item"
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal-element"
                );

            }
        );


        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "reveal-visible"
                                    );

                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    }
);



/* =========================================================
   19. SET MINIMUM DATE FOR BOOKINGS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        document.addEventListener(
            "focus",
            function (event) {

                if (
                    event.target.matches(
                        'input[type="date"]'
                    )
                ) {

                    event.target.min =
                        today;

                }

            },
            true
        );

    }
);



/* =========================================================
   20. PREVENT MODAL FORM SUBMISSION ISSUES
========================================================= */

document.addEventListener(
    "submit",
    function (event) {

        const form =
            event.target;


        if (
            form.classList.contains(
                "premium-form"
            )
        ) {

            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.style.opacity =
                    "0.7";

            }

        }

    }
);

/* =========================================================
   CARENOVA AI + NOTIFICATION CENTER
   PART 3 - JAVASCRIPT
========================================================= */


/* =========================================================
   1. CARENOVA AI - OPEN / CLOSE
========================================================= */

function toggleCareNovaAI() {

    const chat =
        document.getElementById("aiChatWindow");

    if (!chat) return;

    chat.classList.toggle("ai-chat-open");


    if (
        chat.classList.contains("ai-chat-open")
    ) {

        setTimeout(function () {

            const input =
                document.getElementById("aiUserInput");

            if (input) {
                input.focus();
            }

        }, 300);

    }

}



/* =========================================================
   2. AI QUICK MESSAGE
========================================================= */

function aiQuickMessage(message) {

    const input =
        document.getElementById("aiUserInput");

    if (!input) return;

    input.value = message;

    sendAIMessage();

}



/* =========================================================
   3. SEND AI MESSAGE
========================================================= */

function sendAIMessage() {

    const input =
        document.getElementById("aiUserInput");

    const messageBox =
        document.getElementById("aiChatMessages");

    if (!input || !messageBox) return;


    const message =
        input.value.trim();


    if (!message) {

        return;

    }


    /* Add user message */

    addAIMessage(
        message,
        "user"
    );


    input.value = "";


    /* Hide quick buttons */

    const quickActions =
        document.getElementById(
            "aiQuickActions"
        );

    if (quickActions) {

        quickActions.style.display =
            "none";

    }


    /* Show typing */

    showAITyping();


    /* Generate demo response */

    setTimeout(function () {

        removeAITyping();

        processAIMessage(message);

    }, 700);

}



/* =========================================================
   4. ADD MESSAGE TO CHAT
========================================================= */

function addAIMessage(
    message,
    sender = "assistant"
) {

    const container =
        document.getElementById(
            "aiChatMessages"
        );

    if (!container) return;


    const messageElement =
        document.createElement("div");


    messageElement.className =
        "ai-message " + sender;


    if (sender === "assistant") {

        messageElement.innerHTML = `

            <div class="message-avatar">
                🤖
            </div>

            <div class="message-bubble">
                ${message}
            </div>

        `;

    } else {

        messageElement.innerHTML = `

            <div class="message-bubble">
                ${escapeAIHTML(message)}
            </div>

        `;

    }


    container.appendChild(
        messageElement
    );


    scrollAIChatToBottom();

}



/* =========================================================
   5. ESCAPE USER TEXT
========================================================= */

function escapeAIHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}



/* =========================================================
   6. AI TYPING INDICATOR
========================================================= */

function showAITyping() {

    const container =
        document.getElementById(
            "aiChatMessages"
        );

    if (!container) return;


    if (
        document.getElementById(
            "aiTypingIndicator"
        )
    ) {

        return;

    }


    const typing =
        document.createElement("div");


    typing.id =
        "aiTypingIndicator";


    typing.className =
        "ai-message";


    typing.innerHTML = `

        <div class="message-avatar">
            🤖
        </div>

        <div class="ai-typing">

            <span></span>
            <span></span>
            <span></span>

        </div>

    `;


    container.appendChild(
        typing
    );


    scrollAIChatToBottom();

}



/* =========================================================
   7. REMOVE TYPING
========================================================= */

function removeAITyping() {

    const typing =
        document.getElementById(
            "aiTypingIndicator"
        );


    if (typing) {

        typing.remove();

    }

}



/* =========================================================
   8. SCROLL CHAT
========================================================= */

function scrollAIChatToBottom() {

    const container =
        document.getElementById(
            "aiChatMessages"
        );


    if (!container) return;


    container.scrollTop =
        container.scrollHeight;

}



/* =========================================================
   9. PROCESS AI MESSAGE
========================================================= */

function processAIMessage(
    message
) {

    const text =
        message.toLowerCase().trim();


    /* -----------------------------------------
       CARDIOLOGY
    ----------------------------------------- */

    if (
        text.includes("cardiology") ||
        text.includes("cardiologist") ||
        text.includes("heart doctor") ||
        text.includes("heart appointment")
    ) {

        aiCardiologyResponse();

        return;

    }


    /* -----------------------------------------
       APPOINTMENT
    ----------------------------------------- */

    if (
        text.includes("appointment") ||
        text.includes("book doctor") ||
        text.includes("book an appointment") ||
        text.includes("schedule")
    ) {

        aiAppointmentResponse();

        return;

    }


    /* -----------------------------------------
       DOCTOR
    ----------------------------------------- */

    if (
        text.includes("doctor") ||
        text.includes("find a doctor") ||
        text.includes("specialist")
    ) {

        aiDoctorResponse();

        return;

    }


    /* -----------------------------------------
       PATIENT PORTAL
    ----------------------------------------- */

    if (
        text.includes("patient portal") ||
        text.includes("patient profile") ||
        text.includes("my portal")
    ) {

        aiPatientPortalResponse();

        return;

    }


    /* -----------------------------------------
       DIAGNOSTICS
    ----------------------------------------- */

    if (
        text.includes("diagnostic") ||
        text.includes("test") ||
        text.includes("blood test") ||
        text.includes("lab")
    ) {

        aiDiagnosticResponse();

        return;

    }


    /* -----------------------------------------
       ROOM
    ----------------------------------------- */

    if (
        text.includes("room") ||
        text.includes("ward") ||
        text.includes("icu") ||
        text.includes("private room")
    ) {

        aiRoomResponse();

        return;

    }


    /* -----------------------------------------
       DEPARTMENT
    ----------------------------------------- */

    if (
        text.includes("department") ||
        text.includes("departments")
    ) {

        aiDepartmentResponse();

        return;

    }


    /* -----------------------------------------
       EMERGENCY
    ----------------------------------------- */

    if (
        text.includes("emergency") ||
        text.includes("ambulance")
    ) {

        aiEmergencyResponse();

        return;

    }


    /* -----------------------------------------
       HOSPITAL
    ----------------------------------------- */

    if (
        text.includes("hospital") ||
        text.includes("carenova") ||
        text.includes("about")
    ) {

        aiHospitalResponse();

        return;

    }


    /* -----------------------------------------
       HELLO
    ----------------------------------------- */

    if (
        text === "hi" ||
        text === "hello" ||
        text === "hey" ||
        text.includes("good morning") ||
        text.includes("good evening")
    ) {

        addAIMessage(
            `
            Hello! 👋

            I'm <strong>CareNova AI</strong>.

            I can help you with:

            <br><br>

            ❤️ Appointments<br>
            👨‍⚕️ Doctors<br>
            🧪 Diagnostic tests<br>
            👤 Patient Portal<br>
            🛏️ Hospital rooms<br>
            🏥 Departments<br>
            🚑 Emergency assistance

            <br><br>

            What would you like to do?
            `
        );

        return;

    }


    /* -----------------------------------------
       THANK YOU
    ----------------------------------------- */

    if (
        text.includes("thank you") ||
        text.includes("thanks")
    ) {

        addAIMessage(
            `
            You're welcome! 😊

            I'm always here to guide you
            around the CareNova demo website.
            `
        );

        return;

    }


    /* -----------------------------------------
       DEFAULT
    ----------------------------------------- */

    addAIMessage(
        `
        I'm sorry, I didn't completely
        understand that. 🤔

        <br><br>

        Try asking:

        <br><br>

        ❤️ "I want to book a cardiology appointment."

        <br>

        👨‍⚕️ "Find a doctor."

        <br>

        🧪 "Show me diagnostic tests."

        <br>

        👤 "Open patient portal."

        <br>

        🛏️ "Show hospital rooms."

        <br>

        🚑 "I need emergency help."
        `
    );

}



/* =========================================================
   10. CARDIOLOGY RESPONSE
========================================================= */

function aiCardiologyResponse() {

    addAIMessage(
        `
        Of course! ❤️

        I can help you book a
        <strong>Cardiology appointment</strong>.

        <br><br>

        CareNova Cardiology provides
        specialist consultation and
        heart-care services.

        <br><br>

        Would you like to open the
        appointment booking form?
        `
    );


    addAIActionButtons([
        {
            text: "📅 Book Appointment",
            action: "openAIAppointment('Cardiology')"
        },
        {
            text: "👨‍⚕️ Find Cardiologist",
            action: "aiFindCardiologist()"
        }
    ]);

}



/* =========================================================
   11. APPOINTMENT RESPONSE
========================================================= */

function aiAppointmentResponse() {

    addAIMessage(
        `
        Sure! 📅

        I can guide you through
        appointment booking.

        <br><br>

        Please choose a department:
        `
    );


    addAIActionButtons([

        {
            text: "❤️ Cardiology",
            action:
                "openAIAppointment('Cardiology')"
        },

        {
            text: "🧠 Neurology",
            action:
                "openAIAppointment('Neurology')"
        },

        {
            text: "🦴 Orthopedics",
            action:
                "openAIAppointment('Orthopedics')"
        },

        {
            text: "👶 Pediatrics",
            action:
                "openAIAppointment('Pediatrics')"
        }

    ]);

}



/* =========================================================
   12. DOCTOR RESPONSE
========================================================= */

function aiDoctorResponse() {

    addAIMessage(
        `
        👨‍⚕️ We have specialists
        across multiple departments.

        <br><br>

        I can take you to the
        <strong>Doctors section</strong>
        of the website.
        `
    );


    addAIActionButtons([

        {
            text: "👨‍⚕️ View Doctors",
            action: "aiOpenDoctors()"
        }

    ]);

}



/* =========================================================
   13. FIND CARDIOLOGIST
========================================================= */

function aiFindCardiologist() {

    addAIMessage(
        `
        ❤️ Our Cardiology team is
        available for specialist
        consultation.

        <br><br>

        I'll take you to the doctors
        section so you can view the
        available specialists.
        `
    );


    setTimeout(function () {

        aiOpenDoctors();

    }, 700);

}



/* =========================================================
   14. OPEN DOCTORS
========================================================= */

function aiOpenDoctors() {

    toggleCareNovaAI();

    const doctors =
        document.querySelector(
            "#doctors"
        );


    if (doctors) {

        doctors.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        return;

    }


    /* Try common doctor section IDs */

    const possibleSections = [
        "#doctorSection",
        "#ourDoctors",
        ".doctors-section",
        ".doctors"
    ];


    for (
        let i = 0;
        i < possibleSections.length;
        i++
    ) {

        const element =
            document.querySelector(
                possibleSections[i]
            );


        if (element) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            return;

        }

    }


    showAIToast(
        "Doctors section is not available yet."
    );

}



/* =========================================================
   15. PATIENT PORTAL RESPONSE
========================================================= */

function aiPatientPortalResponse() {

    addAIMessage(
        `
        👤 Sure!

        The Patient Portal can show:

        <br><br>

        • Patient profile<br>
        • Doctor information<br>
        • Medical reports<br>
        • Prescriptions<br>
        • Appointments<br>
        • Lab reports<br>
        • Notifications

        <br><br>

        Would you like me to open
        the Patient Portal?
        `
    );


    addAIActionButtons([

        {
            text: "👤 Open Patient Portal",
            action: "aiOpenPatientPortal()"
        }

    ]);

}



/* =========================================================
   16. OPEN PATIENT PORTAL
========================================================= */

function aiOpenPatientPortal() {

    toggleCareNovaAI();


    /* Try existing patient portal button */

    const portalButton =
        document.querySelector(
            "#patientPortalBtn"
        );


    if (portalButton) {

        portalButton.click();

        return;

    }


    /* Try common IDs/classes */

    const possibleButtons = [
        "#patientPortal",
        ".patient-portal-btn",
        "[data-action='patient-portal']"
    ];


    for (
        let i = 0;
        i < possibleButtons.length;
        i++
    ) {

        const button =
            document.querySelector(
                possibleButtons[i]
            );


        if (button) {

            button.click();

            return;

        }

    }


    showAIToast(
        "Patient Portal button was not found."
    );

}



/* =========================================================
   17. DIAGNOSTIC RESPONSE
========================================================= */

function aiDiagnosticResponse() {

    addAIMessage(
        `
        🧪 CareNova Diagnostics provides
        several demo testing services.

        <br><br>

        You can book tests such as:

        <br><br>

        • Blood Test<br>
        • Complete Health Check<br>
        • ECG<br>
        • Diabetes Screening<br>
        • Liver Function Test

        <br><br>

        Would you like to view
        diagnostic services?
        `
    );


    addAIActionButtons([

        {
            text: "🧪 View Diagnostics",
            action: "aiOpenDiagnostics()"
        }

    ]);

}



/* =========================================================
   18. OPEN DIAGNOSTICS
========================================================= */

function aiOpenDiagnostics() {

    toggleCareNovaAI();


    const possibleSections = [

        "#diagnostics",
        "#diagnosticSection",
        ".diagnostics-section",
        ".diagnostic-section"

    ];


    for (
        let i = 0;
        i < possibleSections.length;
        i++
    ) {

        const element =
            document.querySelector(
                possibleSections[i]
            );


        if (element) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            return;

        }

    }


    showAIToast(
        "Diagnostic section is not available yet."
    );

}



/* =========================================================
   19. ROOM RESPONSE
========================================================= */

function aiRoomResponse() {

    addAIMessage(
        `
        🛏️ CareNova Hospital offers
        different accommodation options.

        <br><br>

        You can explore:

        <br><br>

        🛏️ General Ward<br>
        🛏️ Private Room<br>
        ⭐ Deluxe Room<br>
        ❤️ Intensive Care Unit

        <br><br>

        You can use the hospital
        <strong>Rooms section</strong>
        to view more information.
        `
    );


    addAIActionButtons([

        {
            text: "🛏️ View Rooms",
            action: "aiOpenRooms()"
        }

    ]);

}



/* =========================================================
   20. OPEN ROOMS
========================================================= */

function aiOpenRooms() {

    toggleCareNovaAI();


    const possibleSections = [

        "#rooms",
        "#roomSection",
        ".rooms-section",
        ".room-section"

    ];


    for (
        let i = 0;
        i < possibleSections.length;
        i++
    ) {

        const element =
            document.querySelector(
                possibleSections[i]
            );


        if (element) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            return;

        }

    }


    showAIToast(
        "Hospital rooms section is not available yet."
    );

}



/* =========================================================
   21. DEPARTMENT RESPONSE
========================================================= */

function aiDepartmentResponse() {

    addAIMessage(
        `
        🏥 CareNova has multiple
        medical departments.

        <br><br>

        ❤️ Cardiology<br>
        🧠 Neurology<br>
        🦴 Orthopedics<br>
        👶 Pediatrics<br>
        🫁 Pulmonology<br>
        🩺 General Medicine<br>
        👁️ Ophthalmology<br>
        🦷 Dental Care
        `
    );


    addAIActionButtons([

        {
            text: "🏥 View Departments",
            action: "aiOpenDepartments()"
        }

    ]);

}



/* =========================================================
   22. OPEN DEPARTMENTS
========================================================= */

function aiOpenDepartments() {

    toggleCareNovaAI();


    const possibleSections = [

        "#departments",
        "#departmentSection",
        ".departments-section",
        ".department-section"

    ];


    for (
        let i = 0;
        i < possibleSections.length;
        i++
    ) {

        const element =
            document.querySelector(
                possibleSections[i]
            );


        if (element) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            return;

        }

    }


    showAIToast(
        "Departments section is not available yet."
    );

}



/* =========================================================
   23. EMERGENCY RESPONSE
========================================================= */

function aiEmergencyResponse() {

    addAIMessage(
        `
        🚨 If this is a real,
        life-threatening emergency,
        please contact your local
        emergency service immediately.

        <br><br>

        For this demo website,
        I can open the emergency
        assistance section.
        `
    );


    addAIActionButtons([

        {
            text: "🚨 Emergency Help",
            action: "aiOpenEmergency()"
        },

        {
            text: "🚑 Ambulance Demo",
            action: "aiOpenAmbulance()"
        }

    ]);

}



/* =========================================================
   24. OPEN EMERGENCY
========================================================= */

function aiOpenEmergency() {

    toggleCareNovaAI();


    if (
        typeof showEmergencyModal ===
        "function"
    ) {

        showEmergencyModal();

        return;

    }


    showAIToast(
        "Emergency section is not available."
    );

}



/* =========================================================
   25. OPEN AMBULANCE
========================================================= */

function aiOpenAmbulance() {

    toggleCareNovaAI();


    if (
        typeof openAmbulanceModal ===
        "function"
    ) {

        openAmbulanceModal();

        return;

    }


    showAIToast(
        "Ambulance section is not available."
    );

}



/* =========================================================
   26. HOSPITAL RESPONSE
========================================================= */

function aiHospitalResponse() {

    addAIMessage(
        `
        🏥 <strong>CareNova Hospital</strong>
        is a modern healthcare website
        designed to provide patients with
        an easy digital healthcare experience.

        <br><br>

        You can explore:

        <br><br>

        👨‍⚕️ Doctors<br>
        🏥 Departments<br>
        🧪 Diagnostics<br>
        🛏️ Rooms<br>
        👤 Patient Portal<br>
        📅 Appointments<br>
        🔔 Notifications
        `
    );

}



/* =========================================================
   27. OPEN APPOINTMENT
========================================================= */

function openAIAppointment(
    department
) {

    if (
        typeof openAppointmentFromDepartment ===
        "function"
    ) {

        openAppointmentFromDepartment(
            department
        );

        return;

    }


    /* Fallback demo appointment */

    addAIMessage(
        `
        📅 You selected
        <strong>${department}</strong>.

        <br><br>

        The appointment booking
        system is ready.
        `
    );

}



/* =========================================================
   28. ADD AI ACTION BUTTONS
========================================================= */

function addAIActionButtons(
    buttons
) {

    const container =
        document.getElementById(
            "aiChatMessages"
        );


    if (!container) return;


    const actionWrapper =
        document.createElement("div");


    actionWrapper.className =
        "ai-message";


    let html = `

        <div class="message-avatar">
            🤖
        </div>

        <div
            class="message-bubble"
            style="
                background:transparent;
                box-shadow:none;
                padding:0;
            "
        >

            <div
                style="
                    display:flex;
                    flex-direction:column;
                    gap:7px;
                "
            >
    `;


    buttons.forEach(function (button) {

        html += `

            <button
                onclick="${button.action}"
                style="
                    border:1px solid #159a75;
                    background:#ffffff;
                    color:#159a75;
                    padding:9px 12px;
                    border-radius:9px;
                    cursor:pointer;
                    font-weight:700;
                    font-size:12px;
                    text-align:left;
                "
            >
                ${button.text}
            </button>

        `;

    });


    html += `

            </div>

        </div>

    `;


    actionWrapper.innerHTML =
        html;


    container.appendChild(
        actionWrapper
    );


    scrollAIChatToBottom();

}



/* =========================================================
   29. AI TOAST
========================================================= */

function showAIToast(
    message
) {

    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            message
        );

        return;

    }


    const toast =
        document.createElement("div");


    toast.textContent =
        message;


    toast.style.position =
        "fixed";

    toast.style.bottom =
        "90px";

    toast.style.right =
        "20px";

    toast.style.zIndex =
        "100000";

    toast.style.padding =
        "12px 18px";

    toast.style.background =
        "#102a43";

    toast.style.color =
        "#ffffff";

    toast.style.borderRadius =
        "10px";

    document.body.appendChild(
        toast
    );


    setTimeout(function () {

        toast.remove();

    }, 3000);

}



/* =========================================================
   NOTIFICATION CENTER
========================================================= */


/* =========================================================
   30. OPEN / CLOSE NOTIFICATION CENTER
========================================================= */

function toggleNotificationCenter() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    const overlay =
        document.getElementById(
            "notificationMobileOverlay"
        );


    if (!panel) return;


    panel.classList.toggle(
        "notification-open"
    );


    if (
        overlay &&
        window.innerWidth <= 700
    ) {

        if (
            panel.classList.contains(
                "notification-open"
            )
        ) {

            overlay.style.display =
                "block";


            setTimeout(function () {

                overlay.style.opacity =
                    "1";

            }, 10);

        } else {

            closeNotificationCenter();

        }

    }

}



/* =========================================================
   31. CLOSE NOTIFICATIONS
========================================================= */

function closeNotificationCenter() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    const overlay =
        document.getElementById(
            "notificationMobileOverlay"
        );


    if (panel) {

        panel.classList.remove(
            "notification-open"
        );

    }


    if (overlay) {

        overlay.style.opacity =
            "0";


        setTimeout(function () {

            overlay.style.display =
                "none";

        }, 250);

    }

}



/* =========================================================
   32. MARK ALL NOTIFICATIONS READ
========================================================= */

function markAllNotificationsRead() {

    const notifications =
        document.querySelectorAll(
            ".notification-item.unread"
        );


    notifications.forEach(
        function (item) {

            item.classList.remove(
                "unread"
            );


            const dot =
                item.querySelector(
                    ".unread-dot"
                );


            if (dot) {

                dot.remove();

            }

        }
    );


    updateNotificationCount();


    showAIToast(
        "All notifications marked as read."
    );

}



/* =========================================================
   33. UPDATE NOTIFICATION COUNT
========================================================= */

function updateNotificationCount() {

    const countElement =
        document.getElementById(
            "notificationCount"
        );


    if (!countElement) return;


    const unread =
        document.querySelectorAll(
            ".notification-item.unread"
        ).length;


    countElement.textContent =
        unread;


    if (unread === 0) {

        countElement.style.display =
            "none";

    } else {

        countElement.style.display =
            "flex";

    }

}



/* =========================================================
   34. OPEN NOTIFICATION DETAILS
========================================================= */

function openNotificationDetails(
    type
) {

    const notificationData = {

        appointment: {

            title:
                "Appointment Reminder",

            icon:
                "🔔",

            text:
                "Your appointment with the Cardiology Department is scheduled for tomorrow at 10:30 AM.",

            action:
                "Open Appointment"

        },


        lab: {

            title:
                "Lab Report Available",

            icon:
                "🧪",

            text:
                "Your blood test report is ready to view in the Patient Portal.",

            action:
                "Open Patient Portal"

        },


        prescription: {

            title:
                "Prescription Updated",

            icon:
                "💊",

            text:
                "Dr. Arjun Mehta added a new prescription to your patient record.",

            action:
                "Open Patient Portal"

        },


        checkup: {

            title:
                "Health Check-up Reminder",

            icon:
                "❤️",

            text:
                "Your annual health check-up is due this month.",

            action:
                "Book Check-up"

        },


        payment: {

            title:
                "Payment Receipt",

            icon:
                "💳",

            text:
                "Your recent hospital payment receipt is available in your patient account.",

            action:
                "Open Patient Portal"

        }

    };


    const data =
        notificationData[type];


    if (!data) return;


    /* Mark clicked notification as read */

    const notification =
        document.querySelector(
            `.notification-item[data-notification="${type}"]`
        );


    if (notification) {

        notification.classList.remove(
            "unread"
        );


        const dot =
            notification.querySelector(
                ".unread-dot"
            );


        if (dot) {
            dot.remove();
        }

    }


    updateNotificationCount();


    closeNotificationCenter();


    /* Open detail modal */

    openNotificationModal(
        data
    );

}



/* =========================================================
   35. NOTIFICATION DETAIL MODAL
========================================================= */

function openNotificationModal(
    data
) {

    /* Use existing premium modal */

    if (
        typeof createPremiumModal ===
        "function"
    ) {

        const content = `

            <div
                style="
                    text-align:center;
                    padding:10px 0 20px;
                "
            >

                <div
                    style="
                        width:70px;
                        height:70px;
                        margin:0 auto 15px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:#eaf7f4;
                        border-radius:50%;
                        font-size:32px;
                    "
                >
                    ${data.icon}
                </div>

                <h3
                    style="
                        color:#102a43;
                        margin-bottom:10px;
                    "
                >
                    ${data.title}
                </h3>

                <p>
                    ${data.text}
                </p>

            </div>


            <button
                class="premium-form-submit"
                onclick="
                    handleNotificationAction(
                        '${data.action}'
                    )
                "
            >
                ${data.action}
            </button>

        `;


        createPremiumModal(
            data.title,
            content,
            {
                icon: data.icon
            }
        );


        return;

    }


    alert(
        data.title +
        "\n\n" +
        data.text
    );

}



/* =========================================================
   36. NOTIFICATION ACTION
========================================================= */

function handleNotificationAction(
    action
) {

    if (
        typeof closePremiumModal ===
        "function"
    ) {

        closePremiumModal();

    }


    if (
        action ===
        "Open Patient Portal"
    ) {

        setTimeout(function () {

            aiOpenPatientPortal();

        }, 300);


        return;

    }


    if (
        action ===
        "Open Appointment"
    ) {

        setTimeout(function () {

            if (
                typeof openAppointmentFromDepartment ===
                "function"
            ) {

                openAppointmentFromDepartment(
                    "Cardiology"
                );

            } else {

                showAIToast(
                    "Appointment section is not available."
                );

            }

        }, 300);


        return;

    }


    if (
        action ===
        "Book Check-up"
    ) {

        setTimeout(function () {

            if (
                typeof openAppointmentFromDepartment ===
                "function"
            ) {

                openAppointmentFromDepartment(
                    "General Medicine"
                );

            } else {

                showAIToast(
                    "Appointment section is not available."
                );

            }

        }, 300);

    }

}



/* =========================================================
   37. VIEW ALL NOTIFICATIONS
========================================================= */

function viewAllNotifications() {

    const items =
        document.querySelectorAll(
            ".notification-item"
        );


    items.forEach(
        function (item) {

            item.style.display =
                "flex";

        }
    );


    showAIToast(
        "All patient notifications are displayed."
    );

}



/* =========================================================
   38. CLOSE WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const panel =
            document.getElementById(
                "notificationPanel"
            );


        const bell =
            document.getElementById(
                "notificationBell"
            );


        if (
            !panel ||
            !bell
        ) {

            return;

        }


        if (
            !panel.contains(event.target) &&
            !bell.contains(event.target)
        ) {

            closeNotificationCenter();

        }

    }
);



/* =========================================================
   39. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeNotificationCenter();


            const chat =
                document.getElementById(
                    "aiChatWindow"
                );


            if (
                chat &&
                chat.classList.contains(
                    "ai-chat-open"
                )
            ) {

                chat.classList.remove(
                    "ai-chat-open"
                );

            }

        }

    }
);



/* =========================================================
   40. INITIALIZE NOTIFICATION COUNT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateNotificationCount();

    }
);



/* =========================================================
   41. DEMO NOTIFICATION AUTO UPDATE
========================================================= */

function addDemoNotification(
    type,
    title,
    message,
    icon = "🔔"
) {

    const list =
        document.getElementById(
            "notificationList"
        );


    if (!list) return;


    const notification =
        document.createElement("div");


    notification.className =
        "notification-item unread";


    notification.dataset.notification =
        type;


    notification.onclick =
        function () {

            openNotificationDetails(
                type
            );

        };


    notification.innerHTML = `

        <div class="notification-icon">
            ${icon}
        </div>

        <div class="notification-content">

            <strong>
                ${title}
            </strong>

            <p>
                ${message}
            </p>

            <small>
                Just now
            </small>

        </div>

        <span class="unread-dot"></span>

    `;


    list.prepend(
        notification
    );


    updateNotificationCount();


    showAIToast(
        "New notification received."
    );

}



/* =========================================================
   42. DEMO NEW NOTIFICATION
   You can test this from browser console:
   
   addDemoNotification(
       'new',
       'New Message',
       'Your doctor sent you a message.',
       '💬'
   );
========================================================= */


/* =========================================================
   43. AI WELCOME PULSE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const aiButton =
            document.getElementById(
                "aiFloatingButton"
            );


        if (!aiButton) return;


        setTimeout(function () {

            aiButton.style.transform =
                "scale(1.08)";


            setTimeout(function () {

                aiButton.style.transform =
                    "";

            }, 250);

        }, 2000);

    }
);



/* =========================================================
   CARENOVA AI + NOTIFICATION CENTER
   PART 3 COMPLETE
========================================================= */



/* =========================================================
   END OF PREMIUM JAVASCRIPT - PART 3
========================================================= */


/* =========================================================
   END OF SCRIPT.JS
========================================================= */