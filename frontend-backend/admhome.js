// admhome.js

// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCIg6W43aFMst9RuZhp_XzsJCAcV3bhwwc",
    authDomain: "kel777.firebaseapp.com",
    projectId: "kel777",
    storageBucket: "kel777.appspot.com",
    messagingSenderId: "54577150898",
    appId: "1:54577150898:web:a00d2714f67f0ddbf1c2ab",
    measurementId: "G-CZVEN08RZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk memuat data pengguna
async function loadUsers() {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = ""; // Bersihkan tabel sebelum memuat data

    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const userId = doc.id;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${userData.firstName} ${userData.lastName}</td>
                <td>${userData.email}</td>
                <td>
                    <button class="delete-btn" data-user-id="${userId}">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });

        // Menambahkan event listener ke semua tombol Delete
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function() {
                const userId = this.getAttribute("data-user-id");
                deleteUser(userId); // Panggil fungsi deleteUser
            });
        });
    } catch (error) {
        console.error("Gagal memuat data pengguna:", error);
    }
}

// Fungsi untuk menghapus pengguna dari Firestore
async function deleteUser(userId) {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
        try {
            await deleteDoc(doc(db, "users", userId));
            alert("Pengguna berhasil dihapus!");
            loadUsers(); // Muat ulang tabel setelah penghapusan
        } catch (error) {
            console.error("Gagal menghapus pengguna:", error);
        }
    }
}

// Fungsi logout (opsional)
function logout() {
    alert("Anda telah logout!");
    window.location.href = "login.html"; // Arahkan ke halaman login
}

// Memuat data pengguna saat halaman selesai dimuat
window.onload = loadUsers;
