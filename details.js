const mainImage = document.getElementById("mainImage");

const thumbnails = document.querySelectorAll(".thumbnails img");

thumbnails.forEach((thumb) => {
    thumb.addEventListener("click",() => {
        mainImage.src = thumb.src;
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const DETAILS_KEY = 'productDetails';
    const WISHLIST_KEY = 'wishlistItems';
    const CART_KEY = 'cartItems';

    const product = JSON.parse(localStorage.getItem(DETAILS_KEY));
    if (!product) return;

    document.querySelector('.info-section h1').textContent = product.title;
    document.querySelector('#mainImage').src = product.image;
    document.querySelector('.price-info strong').textContent = product.price;

    document.querySelector('.wishlist')?.addEventListener('click', () => {
        addToLocalStorage(WISHLIST_KEY, product);
    });

    document.querySelector('.add-to-cart')?.addEventListener('click', () => {
        addToLocalStorage(CART_KEY, product);
    });

    function addToLocalStorage(key, item) {
        const items = JSON.parse(localStorage.getItem(key)) || [];
        if (!items.some(i => i.title === item.title)) {
            items.push(item);
            localStorage.setItem(key, JSON.stringify(items));
        }
    }
});
