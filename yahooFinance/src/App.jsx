import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';
import coinSound from './assets/coin-sound.wav';
import drop from './assets/drop.wav';
import DollarCatchGame from './DollarCatchGame';
import RetroEmailApp from './assets/RetroEmailApp';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


//for the stock item component
function StockItem({ symbol, performance, change }) {
  const performanceClass = change > 0 ? 'positive' : 'negative';
  return (
    <div className='stock-item'>
      <span>{symbol}</span>
      <span className={`stock-performance ${performanceClass}`}>{performance}</span>
    </div>
  );
}

//for the clip assistant which acts like advisor
const PaperclipAssistant = () => {
  const [showAdvice, setShowAdvice] = useState(false);

  const advices = [
    'Did you know? Diversifying your investments helps reduce risk!',
    'Always set stop-loss orders to minimize losses!',
    'Don’t panic during market crashes, stick to your plan!',
    'Investing in ETFs can be a good way to hedge against market volatility!',
    'Remember to rebalance your portfolio every few months!',
  ];

  const getRandomAdvice = () => {
    const randomIndex = Math.floor(Math.random() * advices.length);
    return advices[randomIndex];
  };

  return (
    <div>
      <div className="paperclip" onClick={() => setShowAdvice(!showAdvice)}>
        <img src="https://www.seekpng.com/png/full/172-1729819_every-spread-of-the-2013-2014-marshall-yearbook.png" alt="Assistant Face" style={{ width: '100px', height: '100px', }} />
        {showAdvice && (
          <div className="paperclip-text">
            {getRandomAdvice()}
          </div>
        )}
      </div>
    </div>
  );
};


//fortune teller component
const FortuneTeller = () => {
  const [fortune, setFortune] = useState("CLICK TO REVEAL YOUR FINANCIAL DESTINY!");
  const [loading, setLoading] = useState(false);

  const toggleFortune = () => {
    setLoading(true);
    setTimeout(() => {
      const fortunes = [
        "MASSIVE GAINS IN YOUR FUTURE! 💰",
        "MARKET CRASH INCOMING! BRACE YOURSELF! 💥",
        "YOU'LL BUY A MANSION THIS WEEK! 🏠",
        "PREPARE FOR RADICAL FINANCIAL ADVENTURE! 🚀",
        "STONKS ONLY GO UP! 📈"
      ];
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="fortune-teller">
      <h2>🎱 MARKET FORTUNE TELLER</h2>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Magic is happening...</p>
        </div>
      ) : (
        <>
          <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExczV1cTF5d25jeHRia3YxMGwzbnRpbHNzdjFjcG5oMno0ajFmaTIxYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EBAYanrsTqLBFXQPlj/giphy.webp" alt="Fortune Teller" />
          <div>{fortune}</div>
          <button onClick={toggleFortune}>PREDICT FUTURE</button>
        </>
      )}
    </div>
  );
};

//portfolio section component
function PortfolioSection() {
  const [portfolioData, setPortfolioData] = useState([
    { symbol: "AAPL", performance: "+$456.78 (5.6%)", change: 5.6 },
    { symbol: "MSFT", performance: "-$123.45 (2.3%)", change: -2.3 },
    { symbol: "GOOGL", performance: "+$234.56 (3.2%)", change: 3.2 },
    { symbol: "AMZN", performance: "+$345.67 (4.5%)", change: 4.5 },
    { symbol: "TSLA", performance: "-$67.89 (1.2%)", change: -1.2 },
    { symbol: "NVIDIA", performance: "+$789.01 (6.7%)", change: 6.7 }
  ]);

  useEffect(() => {
    const updatePortfolio = () => {
      const newData = portfolioData.map(stock => {
        const change = (Math.random() * 10 - 5).toFixed(2);
        const performance = `${change > 0 ? '+' : '-'}$${Math.abs(change * 10).toFixed(2)} (${Math.abs(change)}%)`;
        return { ...stock, performance, change: parseFloat(change) };
      });
      setPortfolioData(newData);
    };

    const interval = setInterval(updatePortfolio, 1000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="portfolio-section">
      <div className="portfolio-column">
        <h2>🏦 MY WATCHLIST</h2>
        {portfolioData.slice(0, 3).map((stock, index) => (
          <StockItem key={index} symbol={stock.symbol} performance={stock.performance} change={stock.change} />
        ))}
      </div>
      <div className="portfolio-column">
        <h2>🔥 HOT STOCKS</h2>
        {portfolioData.slice(3, 6).map((stock, index) => (
          <StockItem key={index} symbol={stock.symbol} performance={stock.performance} change={stock.change} />
        ))}
      </div>
      <div className="portfolio-column">
        <h2>🔥 TRENDING</h2>
        {portfolioData.sort((a, b) => b.change - a.change).slice(0, 3).map((stock, index) => (
          <StockItem key={index} symbol={stock.symbol} performance={stock.performance} change={stock.change} />
        ))}
      </div>
    </section>
  );
}

function MarketCategories() {
  return (
    <div className="market-categories">
      <h2>🌎 MARKET CATEGORIES</h2>
      <div className="category-list">
        <div className="category-item">🇺🇸 USA</div>
        <div className="category-item">ASIA</div>
        <div className="category-item">EUROPE</div>
        <div className="category-item">GLOBAL INDEX</div>
      </div>
    </div>
  );
}
function MarketGraph() {
  const [graphData, setGraphData] = useState([80, 90, 100, 140, 110]);

  const randomData = () => {
    return [
      Math.floor(Math.random() * 100) + 50,
      Math.floor(Math.random() * 100) + 50,
      Math.floor(Math.random() * 100) + 50,
      Math.floor(Math.random() * 100) + 50,
      Math.floor(Math.random() * 100) + 50,
    ];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(randomData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'S&P 500',
        data: graphData,
        borderColor: '#00FF00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#FF00FF',
        pointBorderColor: '#000000',
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: '#00FF00',
          tickColor: '#00FF00'
        },
        ticks: {
          color: '#00FF00',
          font: {
            family: 'monospace',
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Months',
          color: '#00FF00'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: '#00FF00',
          tickColor: '#00FF00'
        },
        ticks: {
          color: '#00FF00',
          font: {
            family: 'monospace',
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Performance ($)',
          color: '#00FF00'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#00FF00',
          font: {
            family: 'monospace'
          }
        }
      },
      tooltip: {
        backgroundColor: '#000000',
        borderColor: '#00FF00',
        titleColor: '#00FF00',
        bodyColor: '#00FF00',
        callbacks: {
          title: (tooltipItem) => `Month: ${tooltipItem[0].label}`,
        }
      }
    }
  };

  return (
    <section className="market-graph" style={{
      backgroundColor: '#000000',
      border: '2px solid #00FF00',
      padding: '10px'
    }}>
      <div className="graph-container" style={{ height: '300px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}


//for the different actions in the website
function ActionButtons() {
  const playSound = () => {
    const audio = new Audio(drop);
    audio.play();
  };
  const playSound2 = () => {
    const audio = new Audio(coinSound);
    audio.play();
  };

  return (
    <></>
  );
};


//star component

function Star() {
  return <div className="star"></div>;
}

function StatusBar() {
  return (
    <div className="status-bar">
      Connected to NASDAQ | Last Update: 14:35:22 | Network Speed: 56k
    </div>
  );
}
const stocks = [
  { symbol: 'AAPL', price: (Math.random() * 150 + 50).toFixed(2) },
  { symbol: 'MSFT', price: (Math.random() * 150 + 50).toFixed(2) },
  { symbol: 'GOOGL', price: (Math.random() * 150 + 50).toFixed(2) },
  { symbol: 'AMZN', price: (Math.random() * 150 + 50).toFixed(2) },
  { symbol: 'TSLA', price: (Math.random() * 150 + 50).toFixed(2) },
];
const correctImage = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGRwdGlxZnBsZXM2bXB2ZmY1cTJ4cnk5eTRjbmN2amY3czR4Y3M4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4NwA6pKRNLjZFZBpS8/giphy.webp";
const wrongImage = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTRjMHg5YW1nY3lnamM0ZGRlcDJxaThuNXE3NmVhcG92eWMyMWpsayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7U41ONykjedkInTXal/giphy.webp";

const GuessTheStockPrice = () => {
  const [selectedStock, setSelectedStock] = useState(stocks[Math.floor(Math.random() * stocks.length)]);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');

  const handleGuess = () => {
    const userGuess = parseFloat(guess);
    if (userGuess === parseFloat(selectedStock.price)) {
      setMessage(`Correct! ${selectedStock.symbol} is $${selectedStock.price}.`);
      setImage(wrongImage);
    } else {
      setMessage(`Wrong! ${selectedStock.symbol} is $${selectedStock.price}.`);
      setImage(correctImage);
    }
    setSelectedStock(stocks[Math.floor(Math.random() * stocks.length)]);
    setGuess('');
  };

  return (
    <div className="guess-stock-price">
      <h2>💰 Guess the Stock Price!</h2>
      <p>What is the current price of {selectedStock.symbol}?</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Submit Guess</button>
      {message && <p>{message}</p>}
      {image && <img src={image} alt="Result" style={{ width: '200px', height: 'auto' }} />} { }
    </div>
  );
};
const handleClick = () => {
  window.open("https://www.codedex.io/pricing", "_blank", "noopener noreferrer");
}
const NewsItem = ({ title, description }) => (
  <div className="news-item">
    <div className="spiky-star"></div>
    <h3>{title}</h3>
    <p>{description}</p>
    <button className="buy-now-btn" onClick={handleClick}>BUY NOW!</button>
  </div>
);

//trading simulator
const Simulator = () => {
  const [balance, setBalance] = useState(10000);
  const [stocks, setStocks] = useState([
    { symbol: 'MSFT', name: 'Microsoft', price: 35.50 },
    { symbol: 'AAPL', name: 'Apple', price: 25.75 },
    { symbol: 'DELL', name: 'Dell Computer', price: 40.25 },
  ]);
  const [logEntries, setLogEntries] = useState([
    '[14:35:22] MARKET OPENED',
    '[14:35:25] WAITING FOR TRADES',
  ]);

  const playSound = (type) => {
    const audio = new Audio(type === 'buy' ? drop : coinSound);
    audio.play();
  };

  const handleTrade = (stock, action) => {
    const newBalance = action === 'buy'
      ? balance - stock.price
      : balance + stock.price;

    setBalance(newBalance);
    setLogEntries([...logEntries, `[${new Date().toLocaleTimeString()}] ${action.toUpperCase()} ${stock.symbol} at $${stock.price.toFixed(2)}`]);
    playSound(action);
  };

  return (
    <div className="simulator-container">
      <h3>TRADING SIMULATOR</h3>
      <div className="balance">
        💰 ACCOUNT BALANCE: ${balance.toFixed(2)}
      </div>
      <div className="stock-list">
        <h2>📊 MARKET WATCH</h2>
        {stocks.map((stock, index) => (
          <div key={index} className="stock-item">
            <span>{stock.symbol} - {stock.name}</span>
            <span>
              ${stock.price.toFixed(2)}
              <button className="trade-button" onClick={() => handleTrade(stock, 'buy')}>BUY</button>
              <button className="trade-button" onClick={() => handleTrade(stock, 'sell')}>SELL</button>
            </span>
          </div>
        ))}
      </div>
      <div className="log">
        <h2>📜 TRADING LOG</h2>
        {logEntries.map((entry, index) => (
          <div key={index} className="log-entry">{entry}</div>
        ))}
      </div>
    </div>
  );
};


//final post forum component
function Forum() {
  const [posts, setPosts] = useState([
    { id: 1, title: "What do you think about Tesla?", content: "I believe Tesla will continue to grow. What are your thoughts?" },
    { id: 2, title: "Best stocks to buy in 2024", content: "I'm looking for recommendations for stocks to invest in this year." },
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPostTitle && newPostContent) {
      const newPost = {
        id: posts.length + 1,
        title: newPostTitle,
        content: newPostContent,
      };
      setPosts([...posts, newPost]);
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  return (
    <div className="forum">
      <h2> Community Forum</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your post here..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}

        />
        <button type="submit">Submit Post</button>
      </form>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



//footer
const Footer = () => {
  return (
    <footer className="footer">
      <p>All rights reserved @Koshish Shrestha</p>
    </footer>
  );
};

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showEmailApp, setShowEmailApp] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }
  const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
      const timerId = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);

      return () => clearInterval(timerId);
    }, []);

    return (
      <div className="retro-clock">
        {time}
      </div>
    );
  };
  return (
    <main>
      <header className="header">
        <div className="header-content">
          <span className="title">YAHOO FINANCE

            <img src='https://www.freeiconspng.com/thumbs/yahoo-mail-icon/yahoo-mail-icon-16.png' height="50" width="50" />
          </span>
          <div 
            onClick={() => setShowEmailApp(true)}
            className="email-logo"
            style={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            <div className="email-container">
  <img 
    className="emailLogo" 
    src="https://64.media.tumblr.com/28f7d41869ff8aec052777020eeb6242/3f276049d15c8c6e-91/s540x810/385b0d2b0f77ad276bbbdc640695b2b71a483d7a.png" 
    height="50" 
    width="50"
    alt="Email Logo"
  />
  <span className="sign-in-text">Email</span>
</div>

          </div>

        </div>
      </header>
      <div className='stock-background'>
        <div className="stock-ticker">
          ⚡ AAPL: +$5.23 | MSFT: -$2.11 | GOOGL: +$3.45 | AMZN: +$4.67 | TSLA: -$1.89 | GOOGL: +$3.45 ⚡
          <div className="ticker-tape">
            <div className="ticker-content">
              <span className="buy-sell-indicator">🟢 BUY!</span>
              💹 AAPL: +5.23 | MSFT: -2.11 | GOOGL: +3.45 |
              <span className="buy-sell-indicator">🔴 SELL!</span>
              AMZN: +4.67 | AAPL: +2.23 | MSFT: -2.11 | GOOGL: +3.45 |
              <span className="buy-sell-indicator">🟢 BUY!</span>
              TSLA: -1.89 💹| MSFT: -2.11 | GOOGL: +3.45 |
            </div>
          </div>
        </div>
      </div>

      <div className="layout">
        {/* Left column for News */}
        <div className="left-column">
          <div className='left-content'>
            <h2>NEWS</h2>
            <Clock />
            <a href='#' className='a'>Microsoft on Congress!</a>
            <p>Microsoft under fire for failing to improve Microsoft Explorer!</p>
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmRuZXBpYXQ0eGduZGt3cnRybXhrY2RvdHp6d2dkZjZiY3BmMHh1bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1Syi8XSAkiFupEty1u/200.webp" height="170" />
            <button className="show-popup-btn" onClick={togglePopup}>
              Wanna Be Rich? Click Here!
            </button>
            <NewsItem
              title="Domino Stock Price to the Moon!"
              description="Domino's Pizza stock is skyrocketing! Don't miss out on this cheesy opportunity!"
            />          <div className="spiky-star"></div>
            <p><img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnIybW96YjZnZXRyenhoYnRhejcyd3Bld2RsZ2gwMWpwMHkyY3FmYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohuAcj7aetzMGOz4I/giphy.webp" height="250" /></p>

            <div className='market-watch'><p>Market Watch</p>

              <p><a href='#'>Device</a>Lorem ipsum dolor sit amet, consectetuDuis aute irure dolor in re eu fugiat nulla pat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

              <a href='#' className='a'>Microsoft on Congress!</a>
              <p>Microsoft under fire for failing to improve Microsoft Explorer!</p>
              <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjNhbmFpNjl6c3FnZHYyd3RsNjJydGt1ZHBtNHJobjNnNzFnZjE5eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bYg33GbNbNIVzSrr84/giphy.webp" height="170" /></div>
            <GuessTheStockPrice />

            <DollarCatchGame />
          </div>
        </div>

        {/* center  columns */}
        <div className="right-column">
          <PortfolioSection />
          <MarketCategories />
          <div className="main-content">
            <MarketGraph />
            <Simulator />
            <ActionButtons />
            <FortuneTeller />
            <StatusBar />
            <MarketGraph />
            <Forum />
            <PaperclipAssistant />
          </div>
        </div>

        <div className="rightest-column">
          <div className='market-watch'>Market Watch
            <input
              type="text"
              className="search-bar"
              placeholder="🔍 Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <img src="https://media4.giphy.com/media/39YSnl2bYV2fFcje6p/200.webp?cid=790b7611pngii9xa30u4doh19zdp5znk0rwe8s1qrsg9l8h3&ep=v1_gifs_search&rid=200.webp&ct=g" height="170" width="140" />

            <div><p>The Dow fell 390.23 to 8,019.26, to its lowest level...<button className="retro-button">READ MORE</button> </p></div>

            <img src="https://media0.giphy.com/media/J5JIcOWeznWIU/giphy.webp?cid=ecf05e4751zjfqbp6q53yzurcr0rbcxf5kjs3vvzufvza19o&ep=v1_gifs_search&rid=giphy.webp&ct=g" height="170" width="140" />

            <div><p>Is it Wise to Invest in Chip Company NVIDIA? Yahoo Analyst Says NO!<button className="retro-button">READ MORE</button> </p></div>

            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXpsd25xc3ZwMjAwYTE4ZXJjcHVyenNlcHczNm5hNWFsc3c0ZDcxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JFG6NvptIBSc8OqPNq/giphy.webp" height="170" width="140" />

            <div><p>The Dow fell 390.23 to 8,019.26, to its lowest level...<button className="retro-button">READ MORE</button> </p></div>

            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnVueXE0N2M4bDVpMjFoc3U1YjhlMDB6bDQ5NmZoMWR1N3dlazZ2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZRwDHS8rKNwEjPZT7e/giphy.webp" height="170" width="140" />

            <div><p>How Long Can Google Survive?<button className="retro-button">READ MORE</button> </p></div>

            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjUxa3hiMDh0M2ZwMjl0M2luZ2ZmOTVjY2NwNGNpNXVnemJtdjBwcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bn7hlyp0Cmcg0/giphy.webp" height="170" width="140" />

            <h5>The Dow fell 390.23 to 8,019.26, to its lowest level...</h5>

            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXpsd25xc3ZwMjAwYTE4ZXJjcHVyenNlcHczNm5hNWFsc3c0ZDcxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JFG6NvptIBSc8OqPNq/giphy.webp" height="170" width="140" />

            <h5>The Dow fell 390.23 to 8,019.26, to its lowest level...</h5>
            <img src="https://media0.giphy.com/media/J5JIcOWeznWIU/giphy.webp?cid=ecf05e4751zjfqbp6q53yzurcr0rbcxf5kjs3vvzufvza19o&ep=v1_gifs_search&rid=giphy.webp&ct=g" height="170" width="140" />

            <div><p>Is it Wise to Invest in Chip Company NVIDIA? Yahoo Analyst Says NO!<button className="retro-button">READ MORE</button> </p></div>

            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXpsd25xc3ZwMjAwYTE4ZXJjcHVyenNlcHczNm5hNWFsc3c0ZDcxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JFG6NvptIBSc8OqPNq/giphy.webp" height="170" width="140" />

          </div>
        </div>


      </div>

      <div className="star-container">
      </div>

      

      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <div className="spiky-star"></div>
            <h2>Great! Now you are Rich!</h2>
            <img className="gif" src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExODBxeXlmc3RoZjJzNDAyM2ptYjQ0dnpkcXd6a213eWd3cXF0MTM5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/elQ5RkAm90DZpirhRg/giphy.webp' />
            <button className="close-btn" onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}

      <button className="show-popup-btn" onClick={togglePopup}>
        Wanna Be Rich? Click Here!
      </button>

      {showEmailApp && (
  <div className="email-popup" style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    backgroundColor: '#C0C0C0',
    padding: '10px',
    border: '2px solid',
    borderColor: '#FFFFFF #808080 #808080 #FFFFFF'
  }}>
    <RetroEmailApp />
    <button 
      onClick={() => setShowEmailApp(false)}
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        backgroundColor: '#C0C0C0',
        border: '2px solid',
        borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
        padding: '2px 5px',
        fontSize: '12px',
        cursor: 'pointer'
      }}
    >
      Close
    </button>
  </div>
)}

      <Footer/>
    </main>
  );
}

export default App;
