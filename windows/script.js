// Configuration
const APP_CONFIG = {
    debug: true,
    contentFiles: {
        makanan: {
            title: "Explorer Makanan",
            items: [
                { icon: "fa-utensils", name: "Nasi Goreng", price: "Rp 25.000" },
                { icon: "fa-bowl-food", name: "Mie Ayam", price: "Rp 20.000" },
                { icon: "fa-drumstick", name: "Sate Ayam", price: "Rp 30.000" },
                { icon: "fa-leaf", name: "Gado-Gado", price: "Rp 22.000" }
            ]
        },
        minuman: {
            title: "Explorer Minuman", 
            items: [
                { icon: "fa-glass-water", name: "Es Teh", price: "Rp 5.000" },
                { icon: "fa-glass-water-droplet", name: "Es Jeruk", price: "Rp 8.000" },
                { icon: "fa-bottle-water", name: "Air Mineral", price: "Rp 3.000" },
                { icon: "fa-whiskey-glass", name: "Jus Alpukat", price: "Rp 15.000" }
            ]
        },
        reservasi: {
            title: "Explorer Reservasi",
            items: [
                { icon: "fa-calendar-day", name: "Reservasi Hari Ini" },
                { icon: "fa-calendar-week", name: "Reservasi Minggu Ini" },
                { icon: "fa-calendar-plus", name: "Buat Reservasi Baru" }
            ]
        },
        event: {
            title: "Explorer Event",
            items: [
                { icon: "fa-music", name: "Konser Musik" },
                { icon: "fa-utensils", name: "Festival Makanan" },
                { icon: "fa-gamepad", name: "Turnamen Game" }
            ]
        }
    }
};

let currentExplorer = null;
let isDragging = false;
let offsetX, offsetY;

function showExplorer(page) {
    // Close current explorer if clicking the same button
    const activeBtn = document.querySelector(`.taskbar-icon[onclick*="'${page}'"]`);
    if (currentExplorer && currentExplorer.id === `explorer-${page}`) {
        currentExplorer.classList.remove('active');
        activeBtn.classList.remove('active');
        currentExplorer = null;
        return;
    }

    // Hide current explorer
    if (currentExplorer) {
        currentExplorer.classList.remove('active');
    }
    
    // Update button states
    document.querySelectorAll('.taskbar-icon').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (activeBtn) activeBtn.classList.add('active');
    
    // Create or find explorer popup
    let explorer = document.getElementById(`explorer-${page}`);
    
    if (!explorer) {
        // Create new explorer
        explorer = document.createElement('div');
        explorer.id = `explorer-${page}`;
        explorer.className = 'explorer-popup';
        
        const header = document.createElement('div');
        header.className = 'explorer-header';
        header.innerHTML = `
            <span>${APP_CONFIG.contentFiles[page].title}</span>
            <i class="fas fa-times close-explorer" title="Tutup"></i>
        `;
        
        const content = document.createElement('div');
        content.className = 'explorer-content';
        
        const menu = document.createElement('ul');
        menu.className = 'explorer-menu';
        
        // Add menu items
        APP_CONFIG.contentFiles[page].items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <i class="fas ${item.icon}"></i>
                <div>
                    <div>${item.name}</div>
                    ${item.price ? `<small>${item.price}</small>` : ''}
                </div>
            `;
            menu.appendChild(li);
        });
        
        content.appendChild(menu);
        explorer.appendChild(header);
        explorer.appendChild(content);
        document.body.appendChild(explorer);
        
        // Add close button event
        header.querySelector('.close-explorer').addEventListener('click', (e) => {
            e.stopPropagation();
            explorer.classList.remove('active');
            if (activeBtn) activeBtn.classList.remove('active');
            currentExplorer = null;
        });
        
        // Add drag functionality
        header.addEventListener('mousedown', startDrag);
    }
    
    // Position explorer above the taskbar
    if (activeBtn) {
        const rect = activeBtn.getBoundingClientRect();
        explorer.style.left = `${rect.left + rect.width/2 - explorer.offsetWidth/2}px`;
        explorer.style.bottom = `${window.innerHeight - rect.top + 5}px`;
    } else {
        // Default position if button not found
        explorer.style.left = '50%';
        explorer.style.right = '50%';
        explorer.style.bottom = '60px';
    }
    
    // Show explorer
    explorer.classList.add('active');
    currentExplorer = explorer;
}

function startDrag(e) {
    if (e.button !== 0) return; // Only left mouse button
    const explorer = e.currentTarget.parentElement;
    
    isDragging = true;
    offsetX = e.clientX - explorer.getBoundingClientRect().left;
    offsetY = e.clientY - explorer.getBoundingClientRect().top;
    
    explorer.style.position = 'fixed';
    explorer.style.userSelect = 'none';
    
    document.addEventListener('mousemove', dragExplorer);
    document.addEventListener('mouseup', stopDrag);
}

function dragExplorer(e) {
    if (!isDragging) return;
    
    const explorer = currentExplorer;
    if (!explorer) return;
    
    explorer.style.left = `${e.clientX - offsetX}px`;
    explorer.style.top = `${e.clientY - offsetY}px`;
    explorer.style.bottom = 'auto';
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', dragExplorer);
    document.removeEventListener('mouseup', stopDrag);
    
    if (currentExplorer) {
        currentExplorer.style.userSelect = 'auto';
    }
}

function toggleStartMenu() {
    console.log('Start menu functionality would go here');
}

// Close explorer when clicking outside
document.addEventListener('click', (e) => {
    if (!currentExplorer) return;
    
    const isClickInsideExplorer = currentExplorer.contains(e.target);
    const isClickOnTaskbarIcon = e.target.closest('.taskbar-icon');
    
    if (!isClickInsideExplorer && !isClickOnTaskbarIcon) {
        currentExplorer.classList.remove('active');
        document.querySelectorAll('.taskbar-icon').forEach(btn => {
            btn.classList.remove('active');
        });
        currentExplorer = null;
    }
});

// Initialize the app
function initApp() {
    // Set up taskbar icon click handlers
    document.querySelectorAll('.taskbar-icon').forEach(btn => {
        const page = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        btn.onclick = () => showExplorer(page);
    });
    
    // Hide main window
    const mainWindow = document.getElementById('mainWindow');
    if (mainWindow) mainWindow.style.display = 'none';
    
    if (APP_CONFIG.debug) console.log('App initialized');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);