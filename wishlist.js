function displayWishlist() {
    const wishlistContainer = document.querySelector('.wishlist-container');
    
   
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<p>Empty</p>";
        return;
    }

  
    const product = wishlist[0];

    
    const productCard = `
        <div class="card wishlist-card">
            <img src="${product.image}" alt="${product.title}" class="product-img"/>
            <div class="card-body">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price} <span class="original-price">${product.originalPrice}</span></p>
            </div>
        </div>
    `;
    
   
    wishlistContainer.innerHTML = productCard;
}


window.onload = displayWishlist;





