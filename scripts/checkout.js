import {cart, removeFromCart, calculateCartQuantity, updateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHtml = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingItem;

  products.forEach((product) => {
    if(product.id === productId){
      matchingItem = product;
    }
  });

  cartSummaryHtml += `
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingItem.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-update-quantity-${matchingItem.id}">
            ${cartItem.quantity}
            </span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" 
          data-product-id="${matchingItem.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingItem.id}" type="number"/>
          <span class="save-quantity-link link-primary js-save-quantity-link"
          data-product-id="${matchingItem.id}">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" 
          data-product-id="${matchingItem.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
});

document.querySelector('.order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    showCartQuantity();
  });
});

showCartQuantity();
function showCartQuantity(){
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-item-quantity').innerHTML = `${cartQuantity} items`;
}

document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
  })
});

document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const inputQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;
    updateCartQuantity(productId, Number(inputQuantity));
    document.querySelector(`.js-update-quantity-${productId}`).innerHTML = inputQuantity;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
    showCartQuantity();
  });
});