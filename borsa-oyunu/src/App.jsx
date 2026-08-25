import { useState, useEffect, useRef } from 'react'

const WORLD_COUNTRIES = [
  // KUZEY AMERİKA
  { id: 'us', name: 'United States', flag: '🇺🇸', x: 18, y: 35, labelDx: -15, labelDy: 5, landPrice: 6000, taxRate: 15, baseSalary: 180, multiplier: 1.9, desc: 'Global financial superpower with massive tech industries.' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦', x: 18, y: 16, labelDx: -15, labelDy: -5, landPrice: 4500, taxRate: 14, baseSalary: 140, multiplier: 1.6, desc: 'Vast natural resources and stable trade economy.' },
  { id: 'mx', name: 'Mexico', flag: '🇲🇽', x: 20, y: 55, labelDx: -15, labelDy: 15, landPrice: 2200, taxRate: 11, baseSalary: 85, multiplier: 1.1, desc: 'Strategic manufacturing corridor of North America.' },

  // GÜNEY AMERİKA
  { id: 'br', name: 'Brazil', flag: '🇧🇷', x: 35, y: 72, labelDx: 15, labelDy: 5, landPrice: 1800, taxRate: 12, baseSalary: 75, multiplier: 0.9, desc: 'Agricultural powerhouse and South American giant.' },
  { id: 'ar', name: 'Argentina', flag: '🇦🇷', x: 32, y: 90, labelDx: 15, labelDy: 10, landPrice: 1400, taxRate: 10, baseSalary: 60, multiplier: 0.7, desc: 'Rich agricultural lands with fluctuating markets.' },

  // AVRUPA
  { id: 'gb', name: 'United Kingdom', flag: '🇬🇧', x: 42, y: 22, labelDx: -30, labelDy: -12, landPrice: 7500, taxRate: 17, baseSalary: 190, multiplier: 2.0, desc: 'Global banking and maritime trade capital.' },
  { id: 'nl', name: 'Netherlands', flag: '🇳🇱', x: 48, y: 18, labelDx: 15, labelDy: -12, landPrice: 7000, taxRate: 18, baseSalary: 175, multiplier: 1.9, desc: 'Major European logistics and agricultural gateway.' },
  { id: 'de', name: 'Germany', flag: '🇩🇪', x: 53, y: 25, labelDx: 18, labelDy: 2, landPrice: 6500, taxRate: 20, baseSalary: 170, multiplier: 1.8, desc: 'Industrial core and engineering powerhouse of Europe.' },
  { id: 'fr', name: 'France', flag: '🇫🇷', x: 46, y: 31, labelDx: -35, labelDy: 5, landPrice: 6000, taxRate: 19, baseSalary: 160, multiplier: 1.7, desc: 'Luxury, aerospace, and agricultural leader.' },
  { id: 'ch', name: 'Switzerland', flag: '🇨🇭', x: 52, y: 34, labelDx: 18, labelDy: 15, landPrice: 9500, taxRate: 18, baseSalary: 230, multiplier: 2.3, desc: 'Elite banking center with highest private security.' },
  { id: 'it', name: 'Italy', flag: '🇮🇹', x: 57, y: 40, labelDx: 20, labelDy: 5, landPrice: 4800, taxRate: 16, baseSalary: 130, multiplier: 1.4, desc: 'Rich manufacturing, design, and tourism market.' },
  { id: 'es', name: 'Spain', flag: '🇪🇸', x: 39, y: 40, labelDx: -35, labelDy: 10, landPrice: 4000, taxRate: 15, baseSalary: 110, multiplier: 1.3, desc: 'Southern European trade and tourism hub.' },
  { id: 'ru', name: 'Russia', flag: '🇷🇺', x: 74, y: 14, labelDx: 10, labelDy: -10, landPrice: 2500, taxRate: 13, baseSalary: 90, multiplier: 1.0, desc: 'Vast energy reserves and Eurasian trade nexus.' },

  // ORTA DOĞU VE AFRİKA
  { id: 'tr', name: 'Turkey', flag: '🇹🇷', x: 62, y: 43, labelDx: 22, labelDy: -5, landPrice: 2500, taxRate: 10, baseSalary: 100, multiplier: 1.1, desc: 'Strategic geopolitical bridge connecting continents.' },
  { id: 'il', name: 'Israel', flag: '🇮🇱', x: 61, y: 53, labelDx: -35, labelDy: 5, landPrice: 7000, taxRate: 16, baseSalary: 180, multiplier: 1.8, desc: 'High-tech startup nation and innovation hub.' },
  { id: 'eg', name: 'Egypt', flag: '🇪🇬', x: 55, y: 60, labelDx: -35, labelDy: 12, landPrice: 1600, taxRate: 12, baseSalary: 65, multiplier: 0.8, desc: 'Historical trade corridor and Suez Canal monopoly.' },
  { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦', x: 67, y: 62, labelDx: 20, labelDy: 12, landPrice: 5500, taxRate: 5, baseSalary: 160, multiplier: 1.7, desc: 'Energy giant of the Middle East with massive capital.' },
  { id: 'ae', name: 'UAE', flag: '🇦🇪', x: 74, y: 66, labelDx: 18, labelDy: 2, landPrice: 8000, taxRate: 0, baseSalary: 210, multiplier: 2.1, desc: 'Tax-free global luxury, trade, and financial oasis.' },
  { id: 'za', name: 'South Africa', flag: '🇿🇦', x: 59, y: 90, labelDx: 15, labelDy: 10, landPrice: 2000, taxRate: 14, baseSalary: 80, multiplier: 1.0, desc: 'Mining and financial gateway to the African continent.' },

  // ASYA VE OKYANUSYA
  { id: 'cn', name: 'China', flag: '🇨🇳', x: 82, y: 35, labelDx: 15, labelDy: -5, landPrice: 5000, taxRate: 16, baseSalary: 150, multiplier: 1.8, desc: 'World manufacturing workshop and economic titan.' },
  { id: 'kr', name: 'South Korea', flag: '🇰🇷', x: 90, y: 38, labelDx: 15, labelDy: 10, landPrice: 7000, taxRate: 15, baseSalary: 170, multiplier: 1.8, desc: 'Tech giant specializing in semiconductors and heavy industry.' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵', x: 96, y: 35, labelDx: 15, labelDy: -8, landPrice: 8500, taxRate: 17, baseSalary: 200, multiplier: 2.0, desc: 'Advanced robotics and high-tech electronics capital.' },
  { id: 'in', name: 'India', flag: '🇮🇳', x: 77, y: 52, labelDx: 15, labelDy: 8, landPrice: 1500, taxRate: 10, baseSalary: 70, multiplier: 0.9, desc: 'Fast-growing massive consumer market and IT workforce.' },
  { id: 'sg', name: 'Singapore', flag: '🇸🇬', x: 82, y: 72, labelDx: 18, labelDy: 5, landPrice: 9000, taxRate: 9, baseSalary: 220, multiplier: 2.2, desc: 'Southeast Asian financial and shipping tiger.' },
  { id: 'au', name: 'Australia', flag: '🇦🇺', x: 92, y: 84, labelDx: -20, labelDy: 15, landPrice: 5500, taxRate: 15, baseSalary: 165, multiplier: 1.7, desc: 'Resource-rich economy with strong Pacific trade.' }
];

const translations = {
  en: {
    appName: "Sanal Midas: Global Destiny 🌐",
    dashboard: "Geopolitics Hub",
    markets: "State Markets",
    worldMap: "World Map",
    totalPortfolio: "Empire Total Valuation",
    citizenCash: "Citizen Balance",
    totalDebt: "Total Bank Debt",
    searchPlaceholder: "🔍 Search assets & companies...",
    mapSearchPlaceholder: "🔍 Search country on map...",
    noAssetsFound: "No state assets found.",
    buy: "Acquire from State 📈",
    sell: "Sell to State 📉",
    back: "← Back",
    placeOrder: "Acquisition & Privatization",
    quantity: "Units / Shares",
    insufficientBalance: "❌ Insufficient Funds!",
    successBuy: "✅ Successfully acquired from State monopoly",
    successSell: "✅ Transferred back to State reserves",
    sharesOf: "units of",
    mapTitle: "🗺️ Interactive Global Empire Map",
    mapDesc: "Tap any country to open its investment hub or scroll mouse wheel to zoom.",
    destinyTitle: "🌍 Permanent Birth Country (Destiny)"
  }
};

function App() {
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('gov_balance')) || 5000.00);
  const [treasury, setTreasury] = useState(() => Number(localStorage.getItem('gov_treasury')) || 10000000.00);
  const [loanDebt, setLoanDebt] = useState(() => Number(localStorage.getItem('gov_loan')) || 0.00);
  const [lastProcessedDate, setLastProcessedDate] = useState(() => localStorage.getItem('gov_date') || new Date().toISOString().split('T')[0]);
  
  const [playerCountry, setPlayerCountry] = useState(() => {
    const saved = localStorage.getItem('gov_country');
    if (saved) return JSON.parse(saved);
    const randomCountry = WORLD_COUNTRIES[Math.floor(Math.random() * WORLD_COUNTRIES.length)];
    localStorage.setItem('gov_country', JSON.stringify(randomCountry));
    return randomCountry;
  });

  const [selectedMapCountry, setSelectedMapCountry] = useState(playerCountry);
  const [mapZoom, setMapZoom] = useState(1.4);
  const [transformOrigin, setTransformOrigin] = useState('center center');
  const [mapSearchQuery, setMapSearchQuery] = useState('');

  const [globalAssets, setGlobalAssets] = useState(() => {
    const saved = localStorage.getItem('gov_global_assets');
    if (saved) return JSON.parse(saved);
    return { [playerCountry.id]: { lands: 1, farms: 0, shops: 0, apartments: 0, factories: 0 } };
  });

  const mapContainerRef = useRef(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const handleWheelEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPercent = (mouseX / rect.width) * 100;
      const yPercent = (mouseY / rect.height) * 100;
      setTransformOrigin(`${xPercent}% ${yPercent}%`);

      const zoomFactor = e.deltaY < 0 ? 0.25 : -0.25;
      setMapZoom(prev => Math.min(4.0, Math.max(1, prev + zoomFactor)));
    };

    container.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => container.removeEventListener('wheel', handleWheelEvent);
  }, []);

  const handleCountrySearchSelect = (country) => {
    setSelectedMapCountry(country);
    setMapSearchQuery('');
  };

  const filteredMapCountries = WORLD_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(mapSearchQuery.toLowerCase())
  );

  const [currency, setCurrency] = useState('USD');
  const exchangeRates = { USD: { symbol: '$', rate: 1.0 } };
  const lang = 'en';
  const t = translations[lang];

  const [activeView, setActiveView] = useState('dashboard');
  const [notification, setNotification] = useState(null);
  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3500);
  };

  const [stocks, setStocks] = useState([
    { id: 'tech', name: 'TechNova State Corp', ticker: 'TCHN', mainGroup: 'Stocks', price: 25.40, change: '+2.4%', isUp: true, history: [22.0, 23.5, 24.1, 24.8, 25.40] },
    { id: 'energy', name: 'VoltAkkor Energy Grid', ticker: 'VLTR', mainGroup: 'Stocks', price: 15.10, change: '-0.8%', isUp: false, history: [15.8, 15.5, 15.3, 15.2, 15.10] },
    { id: 'havacilik', name: 'SkyWings State Airways', ticker: 'SKYW', mainGroup: 'Stocks', price: 84.20, change: '+3.1%', isUp: true, history: [79.0, 81.2, 82.5, 83.0, 84.20] },
    { id: 'gold', name: 'State Gold Reserve', ticker: 'GLD', mainGroup: 'Commodities', price: 120.00, change: '+1.2%', isUp: true, history: [115.0, 117.0, 118.5, 119.0, 120.00] },
    { id: 'kripto', name: 'GovCoin Sovereign', ticker: 'GVCN', mainGroup: 'Crypto', price: 310.00, change: '+5.8%', isUp: true, history: [285.0, 292.0, 298.0, 305.0, 310.00] }
  ]);

  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('gov_portfolio');
    return saved ? JSON.parse(saved) : { tech: 0, energy: 0, havacilik: 0, gold: 0, kripto: 0 };
  });

  const [selectedStock, setSelectedStock] = useState(null);
  const [tradeAmount, setTradeAmount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    localStorage.setItem('gov_balance', balance);
    localStorage.setItem('gov_treasury', treasury);
    localStorage.setItem('gov_loan', loanDebt);
    localStorage.setItem('gov_date', lastProcessedDate);
    localStorage.setItem('gov_portfolio', JSON.stringify(portfolio));
    localStorage.setItem('gov_global_assets', JSON.stringify(globalAssets));
  }, [balance, treasury, loanDebt, lastProcessedDate, portfolio, globalAssets]);

  // Fiyat dalgalanma simülasyonu
  useEffect(() => {
    const marketInterval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const volatility = stock.id === 'kripto' ? 0.07 : 0.025;
          const changePercent = (Math.random() * (volatility * 2)) - volatility;
          const oldPrice = stock.price;
          const newPrice = Math.max(1, Number((oldPrice * (1 + changePercent)).toFixed(2)));
          const diff = Number((newPrice - oldPrice).toFixed(2));
          const isUp = diff >= 0;
          const changeText = (isUp ? '+' : '') + ((diff / oldPrice) * 100).toFixed(1) + '%';
          const updatedHistory = [...(stock.history || [newPrice]), newPrice];
          if (updatedHistory.length > 6) updatedHistory.shift();
          return { ...stock, price: newPrice, change: changeText, isUp, history: updatedHistory };
        })
      );
    }, 3000);
    return () => clearInterval(marketInterval);
  }, []);

  const calculateTotalTycoonValue = () => {
    let totalVal = 0;
    Object.keys(globalAssets).forEach(cId => {
      const countryObj = WORLD_COUNTRIES.find(c => c.id === cId) || playerCountry;
      const assets = globalAssets[cId];
      const p = countryObj.landPrice;
      totalVal += (assets.lands * p) + (assets.farms * (p * 1.4)) + (assets.shops * (p * 2.2)) + (assets.apartments * (p * 3.5)) + (assets.factories * (p * 8));
    });
    return totalVal;
  };

  const totalStockValue = stocks.reduce((acc, stock) => acc + (stock.price * (portfolio[stock.id] || 0)), 0);
  const totalPortfolioValue = totalStockValue + calculateTotalTycoonValue() + balance - loanDebt;

  const buyForeignLand = (country) => {
    const cost = country.landPrice;
    if (balance >= cost) {
      setBalance(prev => prev - cost);
      setTreasury(prev => prev + cost);
      setGlobalAssets(prev => {
        const cAssets = prev[country.id] || { lands: 0, farms: 0, shops: 0, apartments: 0, factories: 0 };
        return { ...prev, [country.id]: { ...cAssets, lands: cAssets.lands + 1 } };
      });
      showToast(`🌍 Successfully acquired land in ${country.name}!`);
    } else {
      showToast(t.insufficientBalance);
    }
  };

  const buildForeignFacility = (country, facilityType, costMultiplier) => {
    const cAssets = globalAssets[country.id] || { lands: 0, farms: 0, shops: 0, apartments: 0, factories: 0 };
    if (cAssets.lands <= 0) {
      showToast(`❌ You need to purchase raw land in ${country.name} first!`);
      return;
    }
    const cost = Math.round(country.landPrice * costMultiplier);
    if (balance >= cost) {
      setBalance(prev => prev - cost);
      setTreasury(prev => prev + cost);
      setGlobalAssets(prev => ({
        ...prev,
        [country.id]: { ...cAssets, lands: cAssets.lands - 1, [facilityType]: cAssets[facilityType] + 1 }
      }));
      showToast(`🏗️ Constructed ${facilityType.toUpperCase()} in ${country.name}!`);
    } else {
      showToast(t.insufficientBalance);
    }
  };

  const buyStock = (stock) => {
    const totalCost = stock.price * tradeAmount;
    if (balance >= totalCost) {
      setBalance(prev => prev - totalCost);
      setTreasury(prev => prev + totalCost);
      const currentOwned = portfolio[stock.id] || 0;
      setPortfolio(prev => ({ ...prev, [stock.id]: currentOwned + Number(tradeAmount) }));
      setTradeAmount(1);
      showToast(`${t.successBuy} ${tradeAmount} ${t.sharesOf} ${stock.name}!`);
    } else {
      showToast(t.insufficientBalance);
    }
  };

  const sellStock = (stock) => {
    const ownedShares = portfolio[stock.id] || 0;
    if (ownedShares >= tradeAmount) {
      const totalRevenue = stock.price * tradeAmount;
      setBalance(prev => prev + totalRevenue);
      setTreasury(prev => prev - totalRevenue);
      setPortfolio(prev => ({ ...prev, [stock.id]: portfolio[stock.id] - Number(tradeAmount) }));
      setTradeAmount(1);
      showToast(`${t.successSell} ${tradeAmount} ${t.sharesOf} ${stock.name}!`);
    } else {
      showToast(t.insufficientBalance);
    }
  };

  const formatMoney = (amountUSD) => {
    const curr = exchangeRates[currency];
    const converted = amountUSD * curr.rate;
    return `${curr.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const mainTabs = ['All', 'Stocks', 'Commodities', 'Crypto'];
  const filteredStocks = stocks.filter(stock => {
    const matchesTab = activeTab === 'All' || stock.mainGroup === activeTab;
    const matchesSearch = (stock.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (stock.ticker || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const renderSparkline = (history = [], isUp) => {
    if (!history || history.length < 2) return null;
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min === 0 ? 1 : max - min;
    const width = 80;
    const height = 28;
    const points = history.map((val, idx) => {
      const x = (idx / (history.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    }).join(' ');
    const strokeColor = isUp ? '#22c55e' : '#ef4444';
    return (
      <svg width={width} height={height} style={{ overflow: 'visible', display: 'block' }}>
        <polyline fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
      </svg>
    );
  };

  const currentCountryAssets = globalAssets[selectedMapCountry.id] || { lands: 0, farms: 0, shops: 0, apartments: 0, factories: 0 };

  return (
    <div style={{ backgroundColor: '#030712', color: '#f8fafc', minHeight: '100vh', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', paddingBottom: '80px' }}>
      
      {notification && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(30, 41, 59, 0.95)', color: '#38bdf8', padding: '12px 24px', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.5)', fontSize: '0.85rem', fontWeight: 'bold', zIndex: 9999, boxShadow: '0 8px 32px rgba(56, 189, 248, 0.25)', backdropFilter: 'blur(8px)', textAlign: 'center' }}>
          {notification}
        </div>
      )}

      {/* HEADER */}
      <header style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.6)', paddingBottom: '15px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, color: '#38bdf8', fontSize: '1.15rem', cursor: 'pointer', fontWeight: '800', letterSpacing: '-0.5px' }} onClick={() => { setActiveView('dashboard'); setSelectedStock(null); }}>{t.appName}</h1>
          <p style={{ margin: '3px 0 0 0', color: '#94a3b8', fontSize: '0.65rem' }}>📅 {lastProcessedDate} • 🌐 Global Empire v8.1.0</p>
        </div>
      </header>

      <main style={{ maxWidth: '420px', margin: '0 auto' }}>
        
        {activeView === 'dashboard' && (
          <div>
            <div onClick={() => setActiveView('worldMap')} style={{ backgroundColor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '12px 16px', borderRadius: '14px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block' }}>{t.destinyTitle}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#f8fafc' }}>{playerCountry.flag} {playerCountry.name}</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#38bdf8' }}>
                <div>Land: ${playerCountry.landPrice}</div>
                <div>Tax: {playerCountry.taxRate}%</div>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)', backdropFilter: 'blur(12px)', padding: '22px', borderRadius: '18px', marginBottom: '15px', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Empire Overview</div>
              <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#f8fafc', marginTop: '6px', letterSpacing: '-1px' }}>
                {formatMoney(totalPortfolioValue)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>{t.totalPortfolio}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '18px', borderTop: '1px solid rgba(51, 65, 85, 0.5)', paddingTop: '14px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.7rem' }}>{t.citizenCash}</span>
                  <strong style={{ color: '#22c55e', fontSize: '1rem', fontWeight: '800' }}>{formatMoney(balance)}</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.7rem' }}>{t.totalDebt}</span>
                  <strong style={{ color: '#ef4444', fontSize: '1rem', fontWeight: '800' }}>{formatMoney(loanDebt)}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div onClick={() => setActiveView('market')} style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(8px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(51, 65, 85, 0.6)', cursor: 'pointer', textAlign: 'center' }}>
                <span style={{ fontSize: '1.6rem' }}>📈</span>
                <div style={{ fontWeight: 'bold', fontSize: '0.85rem', marginTop: '8px', color: '#f8fafc' }}>{t.markets}</div>
              </div>
              <div onClick={() => setActiveView('worldMap')} style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(8px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(51, 65, 85, 0.6)', cursor: 'pointer', textAlign: 'center' }}>
                <span style={{ fontSize: '1.6rem' }}>🗺️</span>
                <div style={{ fontWeight: 'bold', fontSize: '0.85rem', marginTop: '8px', color: '#f8fafc' }}>{t.worldMap}</div>
              </div>
            </div>
          </div>
        )}

        {/* MARKETS / PİYASALAR GÖRÜNÜMÜ */}
        {activeView === 'market' && !selectedStock && (
          <div>
            <button onClick={() => setActiveView('dashboard')} style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', color: '#38bdf8', border: '1px solid rgba(51, 65, 85, 0.8)', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', marginBottom: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>{t.back}</button>

            <div style={{ marginBottom: '14px' }}>
              <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '13px 16px', backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(51, 65, 85, 0.8)', borderRadius: '14px', color: '#fff', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '6px' }}>
              {mainTabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ backgroundColor: activeTab === tab ? '#38bdf8' : 'rgba(30, 41, 59, 0.7)', color: activeTab === tab ? '#0f172a' : '#94a3b8', border: '1px solid rgba(51, 65, 85, 0.8)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap' }}>{tab}</button>
              ))}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredStocks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '35px', color: '#94a3b8', fontSize: '0.85rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px' }}>{t.noAssetsFound}</div>
              ) : (
                filteredStocks.map(stock => {
                  const owned = portfolio[stock.id] || 0;
                  return (
                    <div key={stock.id} onClick={() => setSelectedStock(stock)} style={{ backgroundColor: '#0f172a', padding: '14px 18px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155', cursor: 'pointer' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#f8fafc' }}>{stock.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '2px' }}>Owned: {owned}</div>
                      </div>
                      <div style={{ margin: '0 10px' }}>{renderSparkline(stock.history, stock.isUp)}</div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#f8fafc' }}>{formatMoney(stock.price)}</div>
                        <div style={{ color: stock.isUp ? '#22c55e' : '#ef4444', fontSize: '0.75rem', fontWeight: 'bold' }}>{stock.change}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* SEÇİLEN HİSSE ALIM SATIM DETAYI */}
        {selectedStock && (
          <div>
            <button onClick={() => setSelectedStock(null)} style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', color: '#38bdf8', border: '1px solid rgba(51, 65, 85, 0.8)', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', marginBottom: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>{t.back}</button>

            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)', padding: '22px', borderRadius: '18px', border: '1px solid rgba(51, 65, 85, 0.8)', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.65rem', border: '1px solid #334155', fontWeight: 'bold' }}>{selectedStock.ticker}</span>
                  <h2 style={{ margin: '10px 0 4px 0', fontSize: '1.3rem', color: '#f8fafc' }}>{selectedStock.name}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#f8fafc' }}>{formatMoney(selectedStock.price)}</div>
                  <div style={{ color: selectedStock.isUp ? '#22c55e' : '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }}>{selectedStock.change}</div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)', padding: '22px', borderRadius: '18px', border: '1px solid rgba(51, 65, 85, 0.8)' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#38bdf8' }}>{t.placeOrder}</h3>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.75rem', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: '600' }}>{t.quantity}:</label>
                <input type="number" min="1" value={tradeAmount} onChange={(e) => setTradeAmount(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem', fontWeight: 'bold', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button onClick={() => buyStock(selectedStock)} style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>{t.buy}</button>
                <button onClick={() => sellStock(selectedStock)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>{t.sell}</button>
              </div>
            </div>
          </div>
        )}

        {/* DÜNYA HARİTASI GÖRÜNÜMÜ */}
        {activeView === 'worldMap' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <button onClick={() => setActiveView('dashboard')} style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', color: '#38bdf8', border: '1px solid rgba(51, 65, 85, 0.8)', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>{t.back}</button>
              
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setMapZoom(prev => Math.max(1, prev - 0.3))} style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', width: '32px', height: '32px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                <button onClick={() => { setMapZoom(1.4); setTransformOrigin('center center'); }} style={{ backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '0 8px', height: '32px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>Fit</button>
                <button onClick={() => setMapZoom(prev => Math.min(4.0, prev + 0.3))} style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', width: '32px', height: '32px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>+</button>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)', padding: '18px', borderRadius: '18px', marginBottom: '18px', border: '1px solid rgba(51, 65, 85, 0.8)' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#38bdf8' }}>{t.mapTitle}</h2>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '0 0 12px 0' }}>{t.mapDesc}</p>

              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <input 
                  type="text" 
                  placeholder={t.mapSearchPlaceholder} 
                  value={mapSearchQuery} 
                  onChange={(e) => setMapSearchQuery(e.target.value)} 
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' }} 
                />
                {mapSearchQuery.trim().length > 0 && (
                  <div style={{ position: 'absolute', top: '44px', left: 0, right: 0, backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', maxHeight: '150px', overflowY: 'auto', zIndex: 100, boxShadow: '0 8px 20px rgba(0,0,0,0.6)' }}>
                    {filteredMapCountries.length === 0 ? (
                      <div style={{ padding: '10px', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>No country found.</div>
                    ) : (
                      filteredMapCountries.map(c => (
                        <div key={c.id} onClick={() => handleCountrySearchSelect(c)} style={{ padding: '10px 14px', fontSize: '0.8rem', color: '#f8fafc', cursor: 'pointer', borderBottom: '1px solid rgba(51,65,85,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{c.flag}</span> <strong>{c.name}</strong>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div 
                ref={mapContainerRef}
                style={{ position: 'relative', width: '100%', height: '280px', backgroundColor: '#020617', borderRadius: '14px', border: '1px solid #1e293b', overflow: 'hidden', touchAction: 'none', cursor: 'grab' }}
              >
                <svg 
                  width="1000" 
                  height="700" 
                  viewBox="0 0 1000 700" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'block', 
                    transform: `scale(${mapZoom})`, 
                    transformOrigin: transformOrigin, 
                    transition: 'transform 0.08s ease-out' 
                  }}
                >
                  <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="1000" height="700" fill="url(#grid)" />

                  {WORLD_COUNTRIES.map(country => {
                    const cx = country.x * 10;
                    const cy = country.y * 7;
                    const tx = cx + (country.labelDx || 0);
                    const ty = cy + (country.labelDy || 0);
                    const isSelected = selectedMapCountry.id === country.id;
                    const isHome = playerCountry.id === country.id;

                    return (
                      <g key={country.id} onClick={() => setSelectedMapCountry(country)} style={{ cursor: 'pointer' }}>
                        <circle cx={cx} cy={cy} r={isSelected ? "8" : "5"} fill={isSelected ? '#38bdf8' : isHome ? '#22c55e' : '#64748b'} stroke="#fff" strokeWidth="1.5" />
                        <g transform={`translate(${tx}, ${ty})`}>
                          <rect x="-42" y="-11" width="84" height="22" rx="6" fill={isSelected ? '#38bdf8' : isHome ? '#15803d' : '#1e293b'} stroke={isSelected ? '#ffffff' : '#334155'} strokeWidth="1.2" />
                          <text x="0" y="4" textAnchor="middle" fill={isSelected ? '#0f172a' : '#f8fafc'} fontSize="11" fontWeight="bold" style={{ userSelect: 'none' }}>
                            {country.flag} {country.name.split(' ')[0]} {isHome ? '🏠' : ''}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '14px', padding: '16px', marginTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#f8fafc' }}>
                    {selectedMapCountry.flag} {selectedMapCountry.name}
                  </div>
                  <div>
                    {selectedMapCountry.id === playerCountry.id ? (
                      <span style={{ backgroundColor: '#22c55e', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: '900' }}>HOMELAND 🏠</span>
                    ) : (
                      <span style={{ backgroundColor: '#a855f7', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: '900' }}>FOREIGN 🌐</span>
                    )}
                  </div>
                </div>
                <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '0 0 12px 0' }}>{selectedMapCountry.desc}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '0.75rem', backgroundColor: 'rgba(30,41,59,0.5)', padding: '10px', borderRadius: '10px', textAlign: 'center', marginBottom: '14px' }}>
                  <div><span style={{ color: '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Land Price</span> <strong style={{ color: '#f59e0b' }}>${selectedMapCountry.landPrice}</strong></div>
                  <div><span style={{ color: '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Tax Rate</span> <strong style={{ color: '#ef4444' }}>{selectedMapCountry.taxRate}%</strong></div>
                  <div><span style={{ color: '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Multiplier</span> <strong style={{ color: '#22c55e' }}>{selectedMapCountry.multiplier}x</strong></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginBottom: '14px', textAlign: 'center', fontSize: '0.7rem' }}>
                  <div style={{ backgroundColor: '#1e293b', padding: '8px 4px', borderRadius: '8px' }}><span style={{ color: '#94a3b8', display: 'block' }}>Lands</span><strong>{currentCountryAssets.lands}</strong></div>
                  <div style={{ backgroundColor: '#1e293b', padding: '8px 4px', borderRadius: '8px' }}><span style={{ color: '#94a3b8', display: 'block' }}>Farms</span><strong>{currentCountryAssets.farms}</strong></div>
                  <div style={{ backgroundColor: '#1e293b', padding: '8px 4px', borderRadius: '8px' }}><span style={{ color: '#94a3b8', display: 'block' }}>Shops</span><strong>{currentCountryAssets.shops}</strong></div>
                  <div style={{ backgroundColor: '#1e293b', padding: '8px 4px', borderRadius: '8px' }}><span style={{ color: '#94a3b8', display: 'block' }}>Apt</span><strong>{currentCountryAssets.apartments}</strong></div>
                  <div style={{ backgroundColor: '#1e293b', padding: '8px 4px', borderRadius: '8px' }}><span style={{ color: '#94a3b8', display: 'block' }}>Fact</span><strong>{currentCountryAssets.factories}</strong></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => buyForeignLand(selectedMapCountry)} style={{ width: '100%', backgroundColor: '#f59e0b', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}>
                    🌍 Acquire Land in {selectedMapCountry.name} (-${selectedMapCountry.landPrice})
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button onClick={() => buildForeignFacility(selectedMapCountry, 'farms', 1.4)} style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>🌾 Farm (-${Math.round(selectedMapCountry.landPrice * 1.4)})</button>
                    <button onClick={() => buildForeignFacility(selectedMapCountry, 'shops', 2.2)} style={{ backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>🏪 Shop (-${Math.round(selectedMapCountry.landPrice * 2.2)})</button>
                    <button onClick={() => buildForeignFacility(selectedMapCountry, 'apartments', 3.5)} style={{ backgroundColor: '#a855f7', color: '#fff', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>🏢 Apt (-${Math.round(selectedMapCountry.landPrice * 3.5)})</button>
                    <button onClick={() => buildForeignFacility(selectedMapCountry, 'factories', 8.0)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '9px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>🏭 Factory (-${Math.round(selectedMapCountry.landPrice * 8.0)})</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(51, 65, 85, 0.6)', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 1000, boxShadow: '0 -10px 30px rgba(0,0,0,0.5)' }}>
        <button onClick={() => { setActiveView('dashboard'); setSelectedStock(null); }} style={{ background: 'none', border: 'none', color: activeView === 'dashboard' ? '#38bdf8' : '#94a3b8', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '1.15rem' }}>🏛️</span>
          <span>Hub</span>
        </button>
        <button onClick={() => { setActiveView('market'); setSelectedStock(null); }} style={{ background: 'none', border: 'none', color: activeView === 'market' ? '#38bdf8' : '#94a3b8', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '1.15rem' }}>📈</span>
          <span>Markets</span>
        </button>
        <button onClick={() => { setActiveView('worldMap'); setSelectedStock(null); }} style={{ background: 'none', border: 'none', color: activeView === 'worldMap' ? '#f59e0b' : '#94a3b8', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '1.15rem' }}>🗺️</span>
          <span>Map</span>
        </button>
      </nav>

    </div>
  )
}

export default App