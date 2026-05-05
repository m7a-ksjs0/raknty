document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    let userName = localStorage.getItem('userName');
    
    if (!userName) {
        const email = localStorage.getItem('userEmail');
        if (email) userName = email.split('@')[0];
        else userName = 'المستخدم';
    }

    const navBtn = document.querySelector('.navbtn');
    
    if (navBtn && isLoggedIn) {
        // Create profile container
        const profileContainer = document.createElement('div');
        profileContainer.className = 'profile-menu';
        profileContainer.style.position = 'relative';
        profileContainer.style.display = 'flex';
        profileContainer.style.alignItems = 'center';
        profileContainer.style.gap = '10px';
        profileContainer.style.cursor = 'pointer';
        
        profileContainer.innerHTML = `
            <span style="color: #fff; font-weight: bold; font-size: 16px;">${userName}</span>
            <img src="img/person_1-min.jpg" alt="Profile" style="width: 45px; height: 45px; border-radius: 50%; border: 2px solid #D4AF37; object-fit: cover;">
            
            <div id="dropdownMenu" style="display: none; position: absolute; top: 55px; left: 0; background: rgba(2,6,23,0.95); border: 1px solid rgba(212,175,55,0.3); border-radius: 10px; padding: 10px; z-index: 1000; min-width: 150px; text-align: center; backdrop-filter: blur(10px);">
                <a href="#" id="logoutBtn" style="color: #ff4d4d; text-decoration: none; display: block; padding: 8px; border-radius: 8px; transition: 0.3s; background: rgba(255,0,0,0.1);">تسجيل الخروج</a>
            </div>
        `;
        
        // Replace the "سجل الآن" button with the profile container
        navBtn.parentNode.replaceChild(profileContainer, navBtn);
        
        // Toggle dropdown on click
        profileContainer.addEventListener('click', (e) => {
            const dropdown = document.getElementById('dropdownMenu');
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileContainer.contains(e.target)) {
                document.getElementById('dropdownMenu').style.display = 'none';
            }
        });

        // Logout logic
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            window.location.reload();
        });
    }
});

// Global Custom Alert Function
window.showAlert = function(message, isSuccess = true, redirectUrl = null) {
    let modal = document.getElementById("customAlertModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "customAlertModal";
        modal.style.display = "none";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.background = "rgba(0,0,0,0.8)";
        modal.style.zIndex = "99999";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.direction = "rtl";
        modal.style.backdropFilter = "blur(5px)";
        
        modal.innerHTML = `
            <div style="background: rgba(2,6,23,0.95); border: 1px solid #D4AF37; border-radius: 20px; padding: 40px; text-align: center; max-width: 400px; width: 90%; color: white; box-shadow: 0 0 30px rgba(212,175,55,0.2);">
              <div id="modalIcon" style="font-size: 60px; margin-bottom: 20px; animation: popIn 0.5s ease-out;">✅</div>
              <h3 id="modalTitle" style="color: #D4AF37; margin-bottom: 15px; font-weight: bold;">تم بنجاح!</h3>
              <p id="modalMessage" style="color: #ddd; font-size: 16px; line-height: 1.6; margin-bottom: 30px;"></p>
              <button id="modalBtn" style="background: linear-gradient(135deg, #D4AF37, #b8962e); border: none; padding: 12px 40px; border-radius: 10px; font-weight: bold; font-size: 18px; color: black; cursor: pointer; transition: 0.3s;">حسناً</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        if (!document.getElementById("modalAnimationStyles")) {
            const style = document.createElement("style");
            style.id = "modalAnimationStyles";
            style.innerHTML = `@keyframes popIn { 0% { transform: scale(0); opacity: 0; } 80% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); } }`;
            document.head.appendChild(style);
        }
    }
    
    document.getElementById("modalIcon").innerText = isSuccess ? "✅" : "⚠️";
    document.getElementById("modalTitle").innerText = isSuccess ? "نجاح" : "تنبيه";
    document.getElementById("modalTitle").style.color = isSuccess ? "#D4AF37" : "#ff4d4d";
    document.getElementById("modalMessage").innerText = message;
    
    const btn = document.getElementById("modalBtn");
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener("click", () => {
        document.getElementById("customAlertModal").style.display = "none";
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    });
    
    newBtn.addEventListener("mouseover", () => newBtn.style.transform = "scale(1.05)");
    newBtn.addEventListener("mouseout", () => newBtn.style.transform = "scale(1)");
    
    modal.style.display = "flex";
};

// Override native alert
window.alert = function(message) {
    const isError = message.includes("برجاء") || message.includes("عذراً") || message.includes("خطأ");
    window.showAlert(message, !isError, null);
};
