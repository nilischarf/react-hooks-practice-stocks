import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [filterBy, setFilterBy] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => setStocks(data))
  }, [])

  function handleBuyStock(stock) {
    if (!portfolio.find((s) => s.id === stock.id)) {
      setPortfolio([...portfolio, stock])
    }
  }

  function handleSellStock(stock) {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id))
  }

  function handleSortChange(sortCriteria) {
    setSortBy(sortCriteria)
  }

  function handleFilterChange(filterCriteria) {
    setFilterBy(filterCriteria)
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "Price") {
      return a.price - b.price
    } else {
      return 0
    }
  })

  const filteredStocks = sortedStocks.filter((stock) => {
    if (filterBy) {
      return stock.type === filterBy
    }
    return true 
  })

  return (
    <div>
      <SearchBar 
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={filteredStocks}
            onStockClick={handleBuyStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            portfolio={portfolio}
            onStockClick={handleSellStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
