// Mock data for TCG cards
const mockResults = [
    {
        id: 1,
        name: "Blue-Eyes White Dragon",
        rarity: "legendary",
        language: "english",
        saleType: "buyNow",
        platform: "ebay",
        price: 45.99,
        datePosted: "2024-01-15",
        set: "Legend of Blue Eyes",
        condition: "Near Mint"
    },
    {
        id: 2,
        name: "Black Lotus",
        rarity: "mythic",
        language: "english",
        saleType: "auction",
        platform: "tcgplayer",
        price: 1250.00,
        datePosted: "2024-01-20",
        set: "Alpha",
        condition: "Lightly Played"
    },
    {
        id: 3,
        name: "Lightning Bolt",
        rarity: "common",
        language: "english",
        saleType: "buyNow",
        platform: "tcgplayer",
        price: 2.50,
        datePosted: "2024-01-18",
        set: "Beta",
        condition: "Near Mint"
    },
    {
        id: 4,
        name: "Pikachu",
        rarity: "rare",
        language: "japanese",
        saleType: "bestOffer",
        platform: "yuyu-tei",
        price: 89.99,
        datePosted: "2024-01-22",
        set: "Base Set",
        condition: "Mint"
    },
    {
        id: 5,
        name: "Charizard",
        rarity: "rare",
        language: "english",
        saleType: "auction",
        platform: "ebay",
        price: 299.99,
        datePosted: "2024-01-25",
        set: "Base Set",
        condition: "Near Mint"
    },
    {
        id: 6,
        name: "Time Walk",
        rarity: "mythic",
        language: "english",
        saleType: "buyNow",
        platform: "tcgplayer",
        price: 850.00,
        datePosted: "2024-01-16",
        set: "Alpha",
        condition: "Moderately Played"
    },
    {
        id: 7,
        name: "Forest",
        rarity: "common",
        language: "spanish",
        saleType: "buyNow",
        platform: "ebay",
        price: 0.25,
        datePosted: "2024-01-30",
        set: "Basic Lands",
        condition: "Near Mint"
    },
    {
        id: 8,
        name: "Mox Ruby",
        rarity: "mythic",
        language: "english",
        saleType: "auction",
        platform: "tcgplayer",
        price: 1150.00,
        datePosted: "2024-01-12",
        set: "Alpha",
        condition: "Lightly Played"
    },
    {
        id: 9,
        name: "Shivan Dragon",
        rarity: "rare",
        language: "chinese",
        saleType: "bestOffer",
        platform: "yuyu-tei",
        price: 15.99,
        datePosted: "2024-01-28",
        set: "Alpha",
        condition: "Near Mint"
    },
    {
        id: 10,
        name: "Serra Angel",
        rarity: "uncommon",
        language: "korean",
        saleType: "buyNow",
        platform: "ebay",
        price: 5.75,
        datePosted: "2024-01-26",
        set: "Alpha",
        condition: "Near Mint"
    }
];

// Current filtered results
let currentResults = [...mockResults];

// DOM Elements
let searchInput, searchBtn, minPriceInput, maxPriceInput;
let advancedToggleBtn, advancedFilters;
let raritySelect, languageSelect;
let auctionType, buyNowType, bestOfferType;
let ebayPlatform, tcgPlayerPlatform, yuyuteiPlatform;
let startDate, endDate;
let resultsContainer, resultsCount;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    filterResults(); // Initial render
});

function initializeElements() {
    // Basic search elements
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    minPriceInput = document.getElementById('minPrice');
    maxPriceInput = document.getElementById('maxPrice');
    
    // Advanced filter elements
    advancedToggleBtn = document.getElementById('advancedToggleBtn');
    advancedFilters = document.getElementById('advancedFilters');
    raritySelect = document.getElementById('raritySelect');
    languageSelect = document.getElementById('languageSelect');
    
    // Sale type checkboxes
    auctionType = document.getElementById('auctionType');
    buyNowType = document.getElementById('buyNowType');
    bestOfferType = document.getElementById('bestOfferType');
    
    // Platform checkboxes
    ebayPlatform = document.getElementById('ebayPlatform');
    tcgPlayerPlatform = document.getElementById('tcgPlayerPlatform');
    yuyuteiPlatform = document.getElementById('yuyuteiPlatform');
    
    // Date range inputs
    startDate = document.getElementById('startDate');
    endDate = document.getElementById('endDate');
    
    // Results elements
    resultsContainer = document.getElementById('resultsContainer');
    resultsCount = document.getElementById('resultsCount');
}

function setupEventListeners() {
    // Basic search listeners
    searchBtn.addEventListener('click', filterResults);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterResults();
        }
    });
    searchInput.addEventListener('input', filterResults);
    
    // Price filter listeners
    minPriceInput.addEventListener('input', filterResults);
    maxPriceInput.addEventListener('input', filterResults);
    
    // Advanced toggle listener
    advancedToggleBtn.addEventListener('click', toggleAdvancedFilters);
    
    // Advanced filter listeners
    raritySelect.addEventListener('change', filterResults);
    languageSelect.addEventListener('change', filterResults);
    
    // Sale type listeners
    auctionType.addEventListener('change', filterResults);
    buyNowType.addEventListener('change', filterResults);
    bestOfferType.addEventListener('change', filterResults);
    
    // Platform listeners
    ebayPlatform.addEventListener('change', filterResults);
    tcgPlayerPlatform.addEventListener('change', filterResults);
    yuyuteiPlatform.addEventListener('change', filterResults);
    
    // Date range listeners
    startDate.addEventListener('change', filterResults);
    endDate.addEventListener('change', filterResults);
}

function toggleAdvancedFilters() {
    const isHidden = advancedFilters.classList.contains('hidden');
    
    if (isHidden) {
        advancedFilters.classList.remove('hidden');
        advancedToggleBtn.textContent = 'Hide Advanced Filters';
    } else {
        advancedFilters.classList.add('hidden');
        advancedToggleBtn.textContent = 'Show Advanced Filters';
    }
}

function filterResults() {
    // Get filter values
    const searchTerm = searchInput.value.toLowerCase().trim();
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    
    // Advanced filter values
    const selectedRarity = raritySelect.value;
    const selectedLanguage = languageSelect.value;
    
    // Get selected sale types
    const selectedSaleTypes = [];
    if (auctionType.checked) selectedSaleTypes.push('auction');
    if (buyNowType.checked) selectedSaleTypes.push('buyNow');
    if (bestOfferType.checked) selectedSaleTypes.push('bestOffer');
    
    // Get selected platforms
    const selectedPlatforms = [];
    if (ebayPlatform.checked) selectedPlatforms.push('ebay');
    if (tcgPlayerPlatform.checked) selectedPlatforms.push('tcgplayer');
    if (yuyuteiPlatform.checked) selectedPlatforms.push('yuyu-tei');
    
    // Get date range
    const startDateValue = startDate.value;
    const endDateValue = endDate.value;
    
    // Filter the results
    currentResults = mockResults.filter(card => {
        // Basic search filter
        if (searchTerm && !card.name.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Price filter
        if (card.price < minPrice || card.price > maxPrice) {
            return false;
        }
        
        // Rarity filter
        if (selectedRarity && card.rarity !== selectedRarity) {
            return false;
        }
        
        // Language filter
        if (selectedLanguage && card.language !== selectedLanguage) {
            return false;
        }
        
        // Sale type filter
        if (selectedSaleTypes.length > 0 && !selectedSaleTypes.includes(card.saleType)) {
            return false;
        }
        
        // Platform filter
        if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(card.platform)) {
            return false;
        }
        
        // Date range filter
        if (startDateValue && card.datePosted < startDateValue) {
            return false;
        }
        if (endDateValue && card.datePosted > endDateValue) {
            return false;
        }
        
        return true;
    });
    
    renderResults();
}

function renderResults() {
    // Update results count
    resultsCount.textContent = `Found ${currentResults.length} result${currentResults.length !== 1 ? 's' : ''}`;
    
    // Clear existing results
    resultsContainer.innerHTML = '';
    
    if (currentResults.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No cards match your search criteria.</div>';
        return;
    }
    
    // Create card elements
    currentResults.forEach(card => {
        const cardElement = createCardElement(card);
        resultsContainer.appendChild(cardElement);
    });
}

function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    cardDiv.innerHTML = `
        <div class="card-name">${card.name}</div>
        <div class="card-details">
            <div class="card-detail"><strong>Rarity:</strong> ${capitalizeFirst(card.rarity)}</div>
            <div class="card-detail"><strong>Language:</strong> ${capitalizeFirst(card.language)}</div>
            <div class="card-detail"><strong>Set:</strong> ${card.set}</div>
            <div class="card-detail"><strong>Condition:</strong> ${card.condition}</div>
            <div class="card-detail"><strong>Sale Type:</strong> ${formatSaleType(card.saleType)}</div>
            <div class="card-detail"><strong>Posted:</strong> ${formatDate(card.datePosted)}</div>
        </div>
        <div class="card-price">$${card.price.toFixed(2)}</div>
        <div class="card-platform ${card.platform}">${formatPlatform(card.platform)}</div>
    `;
    return cardDiv;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatSaleType(saleType) {
    switch(saleType) {
        case 'buyNow': return 'Buy It Now';
        case 'bestOffer': return 'Best Offer';
        case 'auction': return 'Auction';
        default: return saleType;
    }
}

function formatPlatform(platform) {
    switch(platform) {
        case 'tcgplayer': return 'TCGPlayer';
        case 'yuyu-tei': return 'Yuyu-tei';
        case 'ebay': return 'eBay';
        default: return platform;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}