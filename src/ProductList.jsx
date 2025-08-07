import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [view, setView] = useState('plants'); // NEW: 'plants' or 'cart'
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product) => {
    const formattedProduct = {
      ...product,
      cost: product.cost.startsWith('$') ? product.cost : `$${parseFloat(product.cost).toFixed(2)}`
    };

    dispatch(addItem(formattedProduct));
    setAddedToCart((prev) => ({
      ...prev,
      [product.name]: true,
    }));
  };

  const plantsArray = [
    {
      category: 'Indoor Plants',
      plants: [
        {
          name: 'Spider Plant',
          image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Chlorophytum_comosum0.jpg',
          description: 'Air-purifying and easy to grow.',
          cost: '12',
        },
        {
          name: 'Peace Lily',
          image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Spathiphyllum_cochlearispathum_RTBG.jpg',
          description: 'Elegant white flowers and cleans the air.',
          cost: '18',
        },
        {
          name: 'Snake Plant',
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Sansevieria_trifasciata_1.jpg',
          description: 'Thrives on neglect and low light.',
          cost: '15',
        },
        {
          name: 'Aloe Vera',
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Aloe_vera_3.jpg',
          description: 'Medicinal plant for skin and cuts.',
          cost: '10',
        },
        {
          name: 'Boston Fern',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Boston_fern_%28Nephrolepis_exaltata%29_2.jpg',
          description: 'Lush and ideal for hanging baskets.',
          cost: '14',
        },
        {
          name: 'ZZ Plant',
          image: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Zamioculcas_zamiifolia_leaf.jpg',
          description: 'Glossy leaves and low maintenance.',
          cost: '20',
        },
      ],
    },
    {
      category: 'Succulents',
      plants: [
        {
          name: 'Jade Plant',
          image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Crassula_ovata4.jpg',
          description: 'Succulent said to bring prosperity.',
          cost: '13',
        },
        {
          name: 'Pothos',
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Epipremnum_aureum.jpg',
          description: 'Fast-growing vine, great for shelves.',
          cost: '11',
        },
      ],
    },
    {
      category: 'Tropical',
      plants: [
        {
          name: 'Areca Palm',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Dypsis_lutescens_1.jpg',
          description: 'Tropical vibes and air purification.',
          cost: '25',
        },
        {
          name: 'Rubber Plant',
          image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Ficus_elastica_leaf.jpg',
          description: 'Bold leaves and air purifying.',
          cost: '22',
        },
      ],
    },
  ];

  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
    position: 'relative',
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: '24px',
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); setView('plants'); }} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); setView('cart'); }} style={styleA}>
              <div style={{ position: 'relative' }}>
                <h1 className="cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    height="68"
                    width="68"
                  >
                    <circle cx="80" cy="216" r="12"></circle>
                    <circle cx="184" cy="216" r="12"></circle>
                    <path
                      d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                      fill="none"
                      stroke="#faf9f9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  {totalQuantity > 0 && (
                    <span style={badgeStyle}>{totalQuantity}</span>
                  )}
                </h1>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* PRODUCT LIST OR CART */}
      {view === 'plants' ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, i) => {
                  const formattedCost = plant.cost.startsWith('$') ? plant.cost : `$${parseFloat(plant.cost).toFixed(2)}`;
                  return (
                    <div className="product-card" key={i}>
                      <img className="product-image" src={plant.image} alt={plant.name} />
                      <div className="product-title">{plant.name}</div>
                      <div className="product-description">{plant.description}</div>
                      <div className="product-cost">{formattedCost}</div>
                      <button
                        className="product-button"
                        onClick={() => handleAddToCart(plant)}
                        disabled={!!addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setView('plants')} />
      )}
    </div>
  );
}

export default ProductList;
