function getPurchasedItems() {
    return JSON.parse(localStorage.getItem("purchasedItems")) || [];
}

function setPurchasedItems(items) {
    localStorage.setItem("purchasedItems", JSON.stringify(items));
}

function getCoin() {
    return parseInt(localStorage.getItem("coin"), 10) || 0;
}

function setCoin(value) {
    localStorage.setItem("coin", value);
}

function addCoin(value) {
    setCoin(getCoin() + value);
    updateCoinDisplay();
}

function updateCoinDisplay() {
    const coinDisplayElem = document.getElementById("coinCount");
    coinDisplayElem.innerHTML = getCoin() + ' <img src="../images/coin.png" alt="coin" class="coin-icon">';
}


function onClickBuyButton(itemId, price, button) {
    let coin = getCoin();
    if(coin >= price) {
        coin -= price;
        setCoin(coin);
        updateCoinDisplay();
        const purchasedItems = getPurchasedItems();
        if(!purchasedItems.includes(itemId)) {
            purchasedItems.push(itemId);
            setPurchasedItems(purchasedItems);
        }
        button.textContent = "Purchased";
        button.disabled = true;
        button.style.backgroundColor = "#aaa";
    } else {
        alert("코인 부족");
    }
}

function reloadPage() {
    if(localStorage.getItem("coin") === null) {
        setCoin(0);
    }
    updateCoinDisplay();
    
    const purchasedItems = getPurchasedItems();
    const shopsContainer = document.getElementById("shops");
    shopsContainer.innerHTML = "";

    shopData.forEach(shop => {
        // section
        const section = document.createElement("section");
        section.classList.add("shop-section");

        // title 
        const header = document.createElement("header");
        const titleElem = document.createElement("h2");
        titleElem.textContent = shop.title;
        header.appendChild(titleElem);
        section.appendChild(header);
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");

        // item cards
        shop.items.forEach(item => {
            const itemCard = document.createElement("article");
            itemCard.classList.add("item-card");
            const imgPlaceholder = document.createElement("div");
            imgPlaceholder.classList.add("image-placeholder");
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            imgPlaceholder.appendChild(img);
            itemCard.appendChild(imgPlaceholder);
            const priceLabel = document.createElement("div");
            priceLabel.classList.add("price", "coin-count");
            priceLabel.textContent = item.price;
            const coinIcon = document.createElement("img");
            coinIcon.classList.add("coin-icon");
            coinIcon.src = "../images/coin.png";
            coinIcon.alt = "coin";
            coinIcon.style.verticalAlign = "middle";
            coinIcon.style.height = "16px";
            coinIcon.style.marginLeft = "5px";
            priceLabel.appendChild(coinIcon);
            itemCard.appendChild(priceLabel);
            const buyButton = document.createElement("button");
            buyButton.classList.add("buy-button");
            if(purchasedItems.includes(item.id)) {
                buyButton.textContent = "Purchased";
                buyButton.disabled = true;
                buyButton.style.backgroundColor = "#aaa";
            } else {
                buyButton.textContent = "BUY";
                buyButton.onclick = function() {
                    onClickBuyButton(item.id, item.price, this);
                };
            }
            itemCard.appendChild(buyButton);
            itemContainer.appendChild(itemCard);
        });
        section.appendChild(itemContainer);
        shopsContainer.appendChild(section);
    });
}


// 상점 목록. 
const shopData = [
    {
        title: "Coin Shop",
        items: [
            { id: "diamond_coin", name: "다이아몬드 코인", price: 1000, image: "../images/diamond_coin.jpg" },
            { id: "coin_b", name: "Coin B", price: 20, image: "../images/coin2.png" },
            { id: "coin_c", name: "Coin C", price: 30, image: "../images/coin3.png" }
        ]
    },
    {
        title: "Time Shop",
        items: [
            { id: "time_a", name: "Time A", price: 15, image: "../images/time1.png" },
            { id: "time_b", name: "Time B", price: 25, image: "../images/time2.png" },
            { id: "time_c", name: "Time C", price: 35, image: "../images/time3.png" }
        ]
    }
];

reloadPage();
