document.addEventListener('DOMContentLoaded', () => {
    const WISHLIST_KEY = 'wishlistItems';
    const CART_KEY = 'cartItems';
    const DETAILS_KEY = 'productDetails';

    function getProductData(card) {
        return {
            title: card.querySelector('.product-title')?.textContent || '',
            image: card.querySelector('img')?.src || '',
            price: card.querySelector('.sale-price')?.textContent || '',
            oldPrice: card.querySelector('.original-price')?.textContent || ''
        };
    }

    function addToLocalStorage(key, item) {
        const items = JSON.parse(localStorage.getItem(key)) || [];
        if (!items.some(i => i.title === item.title)) {
            items.push(item);
            localStorage.setItem(key, JSON.stringify(items));
        }
    }

    document.querySelectorAll('.favorite')?.forEach(heart => {
        heart.addEventListener('click', () => {
            const card = heart.closest('.card');
            const product = getProductData(card);
            addToLocalStorage(WISHLIST_KEY, product);
            heart.innerHTML = '❤️';
        });
    });

    document.querySelectorAll('.add-to-cart')?.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const product = getProductData(card);
            addToLocalStorage(CART_KEY, product);
            button.textContent = 'Added!';
        });
    });

    document.querySelectorAll('.product-img-wrapper img')?.forEach(img => {
        img.addEventListener('click', () => {
            const card = img.closest('.card');
            const product = getProductData(card);
            localStorage.setItem(DETAILS_KEY, JSON.stringify(product));
            window.location.href = 'details.html';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'cartItems';

    function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function setToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    document.querySelectorAll('.card').forEach(card => {
        const addToCartBtn = card.querySelector('.add-to-cart');

        addToCartBtn.addEventListener('click', () => {
            const cart = getFromLocalStorage(CART_KEY);

            const title = card.querySelector('.product-title')?.innerText;
            const price = card.querySelector('.sale-price')?.innerText;
            const oldPrice = card.querySelector('.original-price')?.innerText;
            const image = card.querySelector('img')?.src;

            const newItem = { title, price, oldPrice, image };
            cart.push(newItem); 
            setToLocalStorage(CART_KEY, cart);
        });
    });
});



function addToWishlist(event) {
    const heart = event.target;
    if (heart.classList.contains('favorite')) {
       
        const card = heart.closest('.card');
        
        if (card) {
           
            const product = {
                title: card.querySelector('.product-title').textContent,
                image: card.querySelector('.product-img-wrapper img').src,
                price: card.querySelector('.sale-price').textContent,
                originalPrice: card.querySelector('.original-price').textContent,
            };

            
            localStorage.setItem('wishlist', JSON.stringify([product])); 
        }
    }
}
document.querySelectorAll('.favorite').forEach(heart => {
    heart.addEventListener('click', addToWishlist);
});




