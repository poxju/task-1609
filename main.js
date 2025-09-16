(() => {
  const init = () => {
    fetchProducts()
      .then(products => {
        buildHTML(products);
        buildCSS();
        setEvents();
      })
      .catch(error => {
        console.error("Ürünler yüklenirken hata oluştu:", error);
      });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ürün verileri alınamadı:", error);
      return [];
    }
  };

  const buildHTML = (products) => {
    const carousel = document.querySelector(
      "eb-product-carousel .banner .container"
    );
    if (carousel && products && products.length > 0) {
      const headerHTML = '<eb-carousel-header class="ng-star-inserted"><div class="banner__titles"><h2>Beğenebileceğinizi düşündüklerimiz</h2><!----></div></eb-carousel-header>';
      
      const productCards = products.map(product => `
        <div class="owl-item active ng-star-inserted" style="width: 179.6px; margin-right: 16px;">
          <div class="ins-web-smart-recommender-box-item ng-star-inserted">
            <div class="ins-product-box ins-element-link ins-add-to-cart-wrapper ins-sr-api" ins-product-id="${product.id}">
              <eb-carousel-product-item>
                <eb-product-list-item>
                  <div class="product-item">
                    <eb-generic-link tabindex="-1" class="product-item-anchor">
                      <a class="product-item-anchor ng-star-inserted" href="${product.url}">
                        <div class="poduct-item-info-group ng-star-inserted">
                          <figure class="product-item__img list-view">
                            <div class="product-item__multiple-badge" style="z-index: 1;">
                              <span class="d-flex flex-column">
                                ${product.original_price > product.price ? '<i class="toys-icon toys-icon-star-product ng-star-inserted"></i>' : ''}
                              </span>
                            </div>
                            <div class="product-item__video-ar-container"></div>
                            <div class="product-item__line-badge"></div>
                            <div class="product-item__right-bottom-badge"><span class="d-flex flex-column"></span></div>
                            <span class="d-flex flex-column align-items-start justify-content-end position-absolute bottom-0">
                              <eb-new-product-badge></eb-new-product-badge>
                            </span>
                            <cx-media format="product" class="is-initialized">
                              <img class="ng-star-inserted lazyloaded" alt="${product.name}" data-src="${product.img}" src="${product.img}">
                            </cx-media>
                          </figure>
                          <div class="product-item-content">
                            <h2 class="product-item__brand"><b>${product.brand} - </b><span class="description plist-desc">${product.name}</span></h2>
                            <div class="d-flex stars-wrapper align-items-center">
                              <cx-star-rating disabled="true" style="--star-fill: 5;">
                                <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                                <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                                <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                                <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                                <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                              </cx-star-rating>
                              <p class="review-count ng-star-inserted">(${Math.floor(Math.random() * 30) + 1})</p>
                            </div>
                            <div class="promotions">
                              <div class="promotion-container ng-star-inserted">
                                <span>750 TL Üzerine Kargo Bedava!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="product-item__price list-view ng-star-inserted">
                          <eb-price-show _nghost-serverapp-c112="" class="ng-star-inserted">
                            <div _ngcontent-serverapp-c112="" class="price-box price-box--list">
                              <div _ngcontent-serverapp-c112="" class="price-group-container">
                                <div _ngcontent-serverapp-c112="" class="price-group-1">
                                  <div _ngcontent-serverapp-c112="" class="original-price">
                                    <span _ngcontent-serverapp-c112="" class="old-price"> ${product.original_price.toFixed(0)}<span _ngcontent-serverapp-c112="" class="ng-star-inserted">,${(product.original_price % 1 * 100).toFixed(0).padEnd(2, '0')} TL</span></span>
                                    ${product.original_price > product.price ? `<span _ngcontent-serverapp-c112="" class="discount ng-star-inserted">%${Math.round(100 - (product.price * 100 / product.original_price))}</span>` : ''}
                                  </div>
                                  ${product.original_price > product.price ? `
                                  <div _ngcontent-serverapp-c112="" class="discounted-price ng-star-inserted">
                                    <strong _ngcontent-serverapp-c112=""> ${product.price.toFixed(0)}<span _ngcontent-serverapp-c112="" class="ng-star-inserted">,${(product.price % 1 * 100).toFixed(0).padEnd(2, '0')} TL</span></strong>
                                  </div>
                                  ` : ''}
                                </div>
                              </div>
                            </div>
                          </eb-price-show>
                        </div>
                      </a>
                    </eb-generic-link>
                    <eb-add-to-wish-list>
                      <a href="/login" class="ng-star-inserted">
                        <div class="heart">
                          <div class="icon-wrapper">
                            <i class="toys-icon toys-icon-heart-outline"></i>
                            <i class="toys-icon toys-icon-heart-orange-outline hovered"></i>
                          </div>
                        </div>
                      </a>
                    </eb-add-to-wish-list>
                    <div class="ins-add-to-cart-wrapper" ins-product-id="${product.id}">
                      <eb-add-to-cart buttonvariant="circle">
                        <form novalidate="" class="ng-untouched ng-pristine ng-valid ng-star-inserted">
                          <button id="favButton" type="button" class="btn btn-fav btn-fav-circle ng-star-inserted" data-product-id="${product.id}">
                            <div class="inner-btn ng-star-inserted">
                              <i class="toys-icon toys-icon-heart-outline fav-icon"></i>
                              <i class="toys-icon toys-icon-heart-filled fav-icon-active" style="display: none;"></i>
                            </div>
                          </button>
                        </form>
                      </eb-add-to-cart>
                    </div>
                  </div>
                </eb-product-list-item>
              </eb-carousel-product-item>
            </div>
          </div>
        </div>
      `).join('');
      
      carousel.innerHTML = `
        ${headerHTML}
        <div ebvisibilityobserver="" class="banner__wrapper ins-preview-wrapper ng-star-inserted">
          <div data-recomended-items="custom-items">
            <owl-carousel-o class="product-list__best-products">
              <div class="owl-carousel owl-theme owl-loaded owl-responsive owl-drag">
                <div class="owl-stage-outer ng-star-inserted">
                  <div class="owl-stage" style="width: 100%; transform: translate3d(0px, 0px, 0px); transition: all;">
                    ${productCards}
                  </div>
                </div>
              </div>
            </owl-carousel-o>
            <button aria-label="back" class="swiper-prev"><i class="toys-icon toys-icon-arrow-left"></i></button>
            <button aria-label="next" class="swiper-next"><i class="toys-icon toys-icon-arrow-right"></i></button>
          </div>
        </div>
      `;
    }
  };

  const buildCSS = () => {
    const css = `
      .owl-item img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      
      .owl-stage {
        display: flex;
        width: 100% !important;
      }
      
      .owl-item {
        flex: 0 0 20%;
        max-width: 20%;
      }
      
      .owl-item:not(.active) {
        opacity: 0.6;
      }
      
      .btn-fav-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border: none;
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .btn-fav-circle:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .fav-icon {
        color: #ff6b6b;
        font-size: 20px;
      }
      
      .fav-icon-active {
        color: #ff6b6b;
        font-size: 20px;
      }
      
      .toys-icon-heart-filled {
        color: #ff6b6b;
      }
      
      @media (max-width: 1200px) {
        .owl-item {
          flex: 0 0 25%;
          max-width: 25%;
        }
      }
      
      @media (max-width: 992px) {
        .owl-item {
          flex: 0 0 33.333%;
          max-width: 33.333%;
        }
      }
      
      @media (max-width: 768px) {
        .owl-item {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
    `;
    const style = document.createElement("style");
    style.className = "carousel-style";
    style.innerHTML = css;
    document.head.appendChild(style);
  };

  const setEvents = () => {
    document.querySelectorAll(".product-item-anchor.ng-star-inserted").forEach((el) => {
      el.addEventListener("click", (e) => {
        const productUrl = e.currentTarget.getAttribute('href');
        const productId = e.currentTarget.closest('.ins-add-to-cart-wrapper')?.getAttribute('ins-product-id') || '';
        console.log("Ürüne tıklandı:", productId, "URL:", productUrl);
        
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'productClick',
            'productId': productId,
            'productUrl': productUrl
          });
        }
      });
    });
    
    document.querySelectorAll("#favButton").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const productId = button.getAttribute('data-product-id');
        const outlineIcon = button.querySelector('.fav-icon');
        const filledIcon = button.querySelector('.fav-icon-active');
        
        if (filledIcon.style.display === 'none') {
          outlineIcon.style.display = 'none';
          filledIcon.style.display = 'inline-block';
          addToFavorites(productId);
        } else {
          outlineIcon.style.display = 'inline-block';
          filledIcon.style.display = 'none';
          removeFromFavorites(productId);
        }
      });
    });
    
    const addToFavorites = (productId) => {
      console.log(`Ürün favorilere eklendi: ${productId}`);
      
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    };
    
    const removeFromFavorites = (productId) => {
      console.log(`Ürün favorilerden çıkarıldı: ${productId}`);
      
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      favorites = favorites.filter(id => id !== productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    };
    
    const initFavoriteStatus = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      document.querySelectorAll("#favButton").forEach((button) => {
        const productId = button.getAttribute('data-product-id');
        const outlineIcon = button.querySelector('.fav-icon');
        const filledIcon = button.querySelector('.fav-icon-active');
        
        if (favorites.includes(productId)) {
          outlineIcon.style.display = 'none';
          filledIcon.style.display = 'inline-block';
        }
      });
    };
    
    initFavoriteStatus();
    
    const prevButton = document.querySelector(".swiper-prev");
    const nextButton = document.querySelector(".swiper-next");
    let currentPosition = 0;
    const itemWidth = 195.6; // 179.6px genişlik + 16px margin
    
    if (prevButton && nextButton) {
      // Scroll
      const scrollCarousel = (direction) => {
        const stage = document.querySelector(".owl-stage");
        const items = document.querySelectorAll(".owl-item");
        
        if (!stage || items.length === 0) return;
        
        const visibleItems = 5;
        const totalItems = items.length;
        
        if (direction === 'prev') {
          currentPosition--;
          if (currentPosition < 0) {
            currentPosition = totalItems - visibleItems;
          }
        } else {
          currentPosition++;
          if (currentPosition > totalItems - visibleItems) {
            currentPosition = 0;
          }
        }
        
        stage.style.transform = `translate3d(-${currentPosition * itemWidth}px, 0px, 0px)`;
        stage.style.transition = 'all 0.3s ease';
        
        items.forEach((item, index) => {
          const isVisible = (index >= currentPosition && index < currentPosition + visibleItems) || 
                            (currentPosition + visibleItems > totalItems && index < (currentPosition + visibleItems) % totalItems);
          if (isVisible) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      };
      
      prevButton.addEventListener("click", () => {
        scrollCarousel('prev');
      });
      
      nextButton.addEventListener("click", () => {
        scrollCarousel('next');
      });
    }
  };
  init();
})();
