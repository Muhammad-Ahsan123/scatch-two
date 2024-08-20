
setTimeout(() => {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (successMessage) {
        successMessage.classList.add('opacity-0', 'translate-y-5'); 
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 500); 
    }
    if (errorMessage) {
        errorMessage.classList.add('opacity-0', 'translate-y-5'); 
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 500);
    }
}, 3000); 
document.addEventListener("DOMContentLoaded", function () {
    window.toggleLike = function (productId) {
        window.location.href = `/like/${productId}`;
    };
    const dropdownButton = document.getElementById('profileDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownButton && dropdownMenu) {
        dropdownButton.addEventListener('click', function (event) {
            event.stopPropagation(); 
            dropdownMenu.classList.toggle('hidden');
        });
        document.addEventListener('click', function (event) {
            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.add('hidden');
            }
        });
    }

    function openModal(productId) {
        const modal = document.getElementById('deleteModal');
        const modalContent = document.getElementById('modalContent');
        modal.classList.remove('invisible');
        modal.classList.add('opacity-100');
        modalContent.classList.remove('-translate-y-full');
        modalContent.classList.add('translate-y-0');
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.onclick = function () {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/cart/delete/${productId}`;
            document.body.appendChild(form);
            form.submit();
        };
    }

    function closeModal() {
        const modal = document.getElementById('deleteModal');
        const modalContent = document.getElementById('modalContent');
        modalContent.classList.add('-translate-y-full');
        modalContent.classList.remove('translate-y-0');
        setTimeout(() => {
            modal.classList.add('invisible');
            modal.classList.remove('opacity-100');
        }, 300); 
    }
    window.openModal = openModal;
    window.closeModal = closeModal;


    function deleteAllProductopen() {
        console.log('Admin open CLICKED');

        const modal = document.getElementById('deleteModal');
        const modalContent = document.getElementById('modalContent');
        modal.classList.remove('invisible');
        modal.classList.add('opacity-100');
        modalContent.classList.remove('-translate-y-full');
        modalContent.classList.add('translate-y-0');
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.onclick = function () {
            window.location.href = '/delete';
        };
    }
    function deleteAllProductclose() {
        const modal = document.getElementById('deleteModal');
        const modalContent = document.getElementById('modalContent');
        modalContent.classList.add('-translate-y-full');
        modalContent.classList.remove('translate-y-0');
        setTimeout(() => {
            modal.classList.add('invisible');
            modal.classList.remove('opacity-100');
        }, 300); 
    }
    window.deleteAllProductopen = deleteAllProductopen;
    window.deleteAllProductclose = deleteAllProductclose;
});


