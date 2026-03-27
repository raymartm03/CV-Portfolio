const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

let currentTheme = localStorage.getItem('theme');
if (currentTheme === null) {
    currentTheme = 'light';
}
body.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
    darkModeToggle.textContent = 'Light Mode';
} else {
    darkModeToggle.textContent = 'Dark Mode';
}

darkModeToggle.addEventListener('click', function() {
    const theme = body.getAttribute('data-theme');
    let newTheme;
    if (theme === 'dark') {
        newTheme = 'light';
    } else {
        newTheme = 'dark';
    }
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
        darkModeToggle.textContent = 'Light Mode';
    } else {
        darkModeToggle.textContent = 'Dark Mode';
    }
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const bigOrder = document.getElementById('big-order');
const clearCartButton = document.getElementById('clear-item');
const checkoutButton = document.getElementById('checkout');

function updateCart() {
    if (cartList && cartTotal && bigOrder) {
        const items = cartList.querySelectorAll('li');
        const total = items.length;
        cartTotal.textContent = `Total items: ${total}`;
        if (total > 5) {
            bigOrder.style.display = 'block';
        } else {
            bigOrder.style.display = 'none';
        }
    }
}

if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = button.parentElement;
            const name = menuItem.querySelector('.item-name').textContent;
            const imgSrc = menuItem.querySelector('img').src;

            const cartItem = document.createElement('li');
            const itemImg = document.createElement('img');
            itemImg.src = imgSrc;
            itemImg.alt = name;
            cartItem.appendChild(itemImg);

            const itemName = document.createElement('span');
            itemName.textContent = name;
            cartItem.appendChild(itemName);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-item');
            deleteBtn.addEventListener('click', function() {
                cartItem.remove();
                updateCart();
            });
            cartItem.appendChild(deleteBtn);

            cartList.appendChild(cartItem);
            updateCart();
        });
    });
}

if (clearCartButton) {
    clearCartButton.addEventListener('click', function() {
        if (cartList) {
            cartList.innerHTML = '';
            updateCart();
        }
    });
}

if (checkoutButton) {
    checkoutButton.addEventListener('click', function() {
        const total = cartList ? cartList.querySelectorAll('li').length : 0;
        if (total > 0) {
            alert('Please take the receipt and present it at the counter');
        } else {
            alert('Please add an item to the cart');
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        console.log('Contact form found');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    } else {
        console.error('Contact form not found');
    }
});