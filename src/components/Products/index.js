import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProductCard from '../ProductCard'
import './index.css'

const categoryOptions = [
  {name: 'Clothing', categoryId: '1'},
  {name: 'Electronics', categoryId: '2'},
  {name: 'Appliances', categoryId: '3'},
  {name: 'Grocery', categoryId: '4'},
  {name: 'Toys', categoryId: '5'},
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class Products extends Component {
  state = {
    productsList: [],
    isLoading: true,
    isFailure: false,
    activeCategory: 'ALL',
    activeRating: '4',
    activeSort: 'PRICE_HIGH',
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({isLoading: true, isFailure: false})

    const {activeCategory, activeRating, activeSort, searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeSort}&category=${activeCategory}&title_search=${searchInput}&rating=${activeRating}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok !== false && response.status !== 404 && response.status !== 500) {
        this.setState({
          productsList: data.products || [],
          isLoading: false,
          isFailure: false,
        })
      } else {
        this.setState({
          isLoading: false,
          isFailure: true,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        isFailure: true,
      })
    }
  }

  onClickCategory = categoryId => {
    this.setState({activeCategory: categoryId}, this.getProducts)
  }

  onClickRating = ratingId => {
    this.setState({activeRating: ratingId}, this.getProducts)
  }

  onChangeSort = event => {
    this.setState({activeSort: event.target.value}, this.getProducts)
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.getProducts()
    }
  }

  onClickClearFilters = () => {
    this.setState(
      {
        activeCategory: 'ALL',
        activeRating: '4',
        activeSort: 'PRICE_HIGH',
        searchInput: '',
      },
      this.getProducts,
    )
  }

  renderProducts = () => {
    const {productsList} = this.state

    if (productsList.length === 0) {
      return (
        <div className="no-products-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-no-products-img.png"
            alt="no products"
          />
          <h1>No Products Found</h1>
          <p>We could not find any products. Try other filters.</p>
        </div>
      )
    }

    return (
      <ul className="products-list">
        {productsList.map(eachProduct => (
          <ProductCard key={eachProduct.id} product={eachProduct} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view.png"
        alt="all-products-error"
      />
      <h1>Something Went Wrong</h1>
      <button type="button" onClick={this.getProducts}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {
      isLoading,
      isFailure,
      searchInput,
      activeSort,
      activeCategory,
      activeRating,
    } = this.state

    return (
      <div className="products-route-container">
        <Header />

        <div className="products-header">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search Products"
              value={searchInput}
              onChange={this.onChangeSearch}
              onKeyDown={this.onKeyDownSearch}
            />
          </div>

          <div className="sort-container">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              value={activeSort}
              onChange={this.onChangeSort}
            >
              <option value="PRICE_HIGH">Price (High-Low)</option>
              <option value="PRICE_LOW">Price (Low-High)</option>
            </select>
          </div>
        </div>

        <div className="products-content">
          <aside className="filters-container">
            <h1>Category</h1>
            <ul className="category-list">
              {categoryOptions.map(eachCategory => (
                <li key={eachCategory.categoryId}>
                  <button
                    type="button"
                    className={
                      activeCategory === eachCategory.categoryId
                        ? 'category-button active'
                        : 'category-button'
                    }
                    onClick={() =>
                      this.onClickCategory(eachCategory.categoryId)
                    }
                  >
                    <p>{eachCategory.name}</p>
                  </button>
                </li>
              ))}
            </ul>

            <h1>Rating</h1>
            <ul className="rating-list">
              {ratingsList.map(eachRating => (
                <li key={eachRating.ratingId}>
                  <button
                    type="button"
                    className="rating-button"
                    onClick={() => this.onClickRating(eachRating.ratingId)}
                  >
                    <img
                      src={eachRating.imageUrl}
                      alt={`rating ${eachRating.ratingId}`}
                    />
                    <span>& up</span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="clear-filters-button"
              onClick={this.onClickClearFilters}
            >
              Clear Filters
            </button>
          </aside>

          <main className="products-container">
            <h1>All Products</h1>
            {isLoading ? (
              <div data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#0b69ff"
                  height={50}
                  width={50}
                />
              </div>
            ) : isFailure ? (
              this.renderFailureView()
            ) : (
              this.renderProducts()
            )}
          </main>
        </div>
      </div>
    )
  }
}

export default Products
