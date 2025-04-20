document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'cartItems';

    function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function setToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function renderCartItems() {
        const cart = getFromLocalStorage(CART_KEY);

        const oldWrapper = document.querySelector('.basket-wrapper');
        if (oldWrapper) oldWrapper.remove();

        const wrapper = document.createElement('div');
        wrapper.className = 'basket-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';
        wrapper.style.marginTop = '40px';
        wrapper.style.gap = '20px';

        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.style.width = '600px';
            card.style.padding = '15px';
            card.style.border = '1px solid #ccc';
            card.style.borderRadius = '10px';
            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'space-between';
            card.style.backgroundColor = '#fff';

            const left = document.createElement('div');
            left.style.display = 'flex';
            left.style.alignItems = 'center';
            left.style.gap = '20px';

            const img = document.createElement('img');
            img.src = item.image;
            img.style.width = '100px';
            img.style.height = 'auto';
            img.style.borderRadius = '8px';

            const info = document.createElement('div');
            info.innerHTML = `
                <h3 style="margin: 0;">${item.title}</h3>
                <p style="margin: 5px 0;">${item.price}</p>
                <p style="text-decoration: line-through; color: #999;">${item.oldPrice}</p>
            `;

            left.appendChild(img);
            left.appendChild(info);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.background = '#e74c3c';
            deleteBtn.style.color = '#fff';
            deleteBtn.style.border = 'none';
            deleteBtn.style.padding = '8px 14px';
            deleteBtn.style.borderRadius = '6px';
            deleteBtn.style.cursor = 'pointer';

            deleteBtn.addEventListener('click', () => {
                const updatedCart = getFromLocalStorage(CART_KEY).filter((_, i) => i !== index);
                setToLocalStorage(CART_KEY, updatedCart);
                renderCartItems(); 
            });

            card.appendChild(left);
            card.appendChild(deleteBtn);
            wrapper.appendChild(card);
        });

        document.body.insertBefore(wrapper, document.querySelector('.card'));
    }
    renderCartItems();
});
