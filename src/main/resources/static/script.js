console.log("SCRIPT LOADED");

const API_URL = "/api/items";

const itemForm = document.getElementById("itemForm");
const itemsContainer = document.getElementById("itemsContainer");
const totalItems = document.getElementById("totalItems");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");

let allItems = [];
let editingItemId = null;


/* =========================
   LOGIN CHECK
========================= */

function isUserLoggedIn() {

    const userData =
        localStorage.getItem("loggedInUser");

    return userData !== null;
}


function requireLogin() {

    if (!isUserLoggedIn()) {

        alert("🔐 Please sign in first to perform this action.");

        window.location.href = "login.html";

        return false;
    }

    return true;
}


/* =========================
   LOAD ITEMS
========================= */

async function loadItems() {

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to load items"
            );

        }


        allItems =
            await response.json();


        console.log(
            "API Response:",
            allItems
        );


        console.log(
            "Number of items:",
            allItems.length
        );


        /* HOME PAGE */

        if (totalItems) {

            totalItems.textContent =
                allItems.length;

        }


        /* BROWSE ITEMS PAGE */

        if (itemsContainer) {

            displayItems(allItems);

        }


        /* HOME HERO */

        const heroItems =
            document.getElementById("heroItems");

        if (heroItems) {

            displayHeroItems(allItems);

        }


    } catch (error) {

        console.error(error);


        if (itemsContainer) {

            itemsContainer.innerHTML = `

                <div class="empty-state">

                    <h3>
                        Unable to load items
                    </h3>

                    <p>
                        Please make sure the Spring Boot server is running.
                    </p>

                </div>

            `;

        }


        const heroItems =
            document.getElementById("heroItems");


        if (heroItems) {

            heroItems.innerHTML = `

                <div class="empty-state">

                    <p>
                        Unable to load items.
                    </p>

                </div>

            `;

        }

    }

}


/* =========================
   HERO ITEMS
========================= */

function displayHeroItems(items) {

    const heroItems =
        document.getElementById("heroItems");


    if (!heroItems) {
        return;
    }


    if (items.length === 0) {

        heroItems.innerHTML = `

            <div class="empty-state">

                <p>
                    No items reported yet.
                </p>

            </div>

        `;

        return;
    }


    /* Latest 2 items */

    const recentItems =
        items.slice(-2).reverse();


    heroItems.innerHTML =
        recentItems.map(item => {


            const statusClass =
                item.type === "FOUND"
                    ? "found"
                    : "lost";


            const statusText =
                item.type === "FOUND"
                    ? "FOUND"
                    : "LOST";


            return `

                <div class="mini-card">

                    <div class="item-icon">

                        ${getCategoryIcon(item.category)}

                    </div>


                    <div>

                        <strong>

                            ${escapeHTML(item.itemName)}

                        </strong>


                        <small>

                            ${escapeHTML(item.location)}

                        </small>

                    </div>


                    <span class="${statusClass}">

                        ${statusText}

                    </span>

                </div>

            `;

        }).join("");

}


/* =========================
   DISPLAY ITEMS
========================= */

function displayItems(items) {

    if (!itemsContainer) {
        return;
    }


    if (items.length === 0) {

        itemsContainer.innerHTML = `

            <div class="empty-state">

                <h3>
                    No items found
                </h3>

                <p>
                    There are no lost or found items to display.
                </p>

            </div>

        `;

        return;
    }


    itemsContainer.innerHTML =
        items.map(item => {


            const statusClass =
                item.type === "FOUND"
                    ? "found"
                    : "lost";


            const statusText =
                item.type === "FOUND"
                    ? "FOUND"
                    : "LOST";


            return `

                <div class="item-card">


                    <div class="item-card-top">


                        <div class="item-icon">

                            ${getCategoryIcon(item.category)}

                        </div>


                        <span class="${statusClass}">

                            ${statusText}

                        </span>


                    </div>


                    <h3>

                        ${escapeHTML(item.itemName)}

                    </h3>


                    <p>

                        ${escapeHTML(item.description)}

                    </p>


                    <div class="item-meta">

                        📍 ${escapeHTML(item.location)}

                        <br><br>

                        🏷️ ${escapeHTML(item.category)}

                    </div>


                    <div class="item-actions">


                        <button
                            class="edit-btn"
                            onclick="editItem(${item.id})">

                            ✏️ Edit

                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteItem(${item.id})">

                            🗑️ Delete

                        </button>


                    </div>


                </div>

            `;

        }).join("");

}


/* =========================
   CATEGORY ICON
========================= */

function getCategoryIcon(category) {

    const icons = {

        "Electronics": "💻",

        "Personal": "🎒",

        "Books": "📚",

        "Documents": "📄",

        "Accessories": "⌚",

        "Others": "📦"

    };


    return icons[category] || "📦";

}


/* =========================
   ADD / UPDATE ITEM
========================= */

if (itemForm) {


    itemForm.addEventListener(
        "submit",
        async function(event) {


            event.preventDefault();


            if (!requireLogin()) {
                return;
            }


            const item = {

                itemName:
                    document
                        .getElementById("itemName")
                        .value
                        .trim(),


                type:
                    document
                        .getElementById("type")
                        .value,


                category:
                    document
                        .getElementById("category")
                        .value,


                location:
                    document
                        .getElementById("location")
                        .value
                        .trim(),


                description:
                    document
                        .getElementById("description")
                        .value
                        .trim()

            };


            try {

                let response;


                /* UPDATE */

                if (editingItemId !== null) {


                    response =
                        await fetch(
                            `${API_URL}/${editingItemId}`,
                            {

                                method: "PUT",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify(item)

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Failed to update item"
                        );

                    }


                    await response.json();


                    alert(
                        "✅ Item updated successfully!"
                    );


                    editingItemId = null;

                    itemForm.reset();


                    document
                        .querySelector(".submit-btn")
                        .textContent =
                        "Submit Report →";

                }


                /* ADD */

                else {


                    response =
                        await fetch(
                            API_URL,
                            {

                                method: "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify(item)

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Failed to add item"
                        );

                    }


                    await response.json();


                    alert(
                        "✅ Item reported successfully!"
                    );


                    itemForm.reset();

                }


                await loadItems();


                window.location.href =
                    "items.html";


            } catch (error) {

                console.error(error);


                alert(
                    "❌ Operation failed. Please try again."
                );

            }

        }
    );

}


/* =========================
   EDIT ITEM
========================= */

function editItem(id) {

    if (!requireLogin()) {
        return;
    }


    const item =
        allItems.find(
            item => item.id === id
        );


    if (!item) {
        return;
    }


    editingItemId = id;


    if (document.getElementById("itemName")) {

        document.getElementById("itemName").value =
            item.itemName;

        document.getElementById("type").value =
            item.type;

        document.getElementById("category").value =
            item.category;

        document.getElementById("location").value =
            item.location;

        document.getElementById("description").value =
            item.description;


        document.querySelector(
            ".submit-btn"
        ).textContent =
            "Update Item →";


        window.location.href =
            "report.html";

    }

}


/* =========================
   DELETE ITEM
========================= */

async function deleteItem(id) {

    if (!requireLogin()) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this item?"
        );


    if (!confirmed) {
        return;
    }


    try {


        const response =
            await fetch(
                `${API_URL}/${id}`,
                {

                    method: "DELETE"

                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete item"
            );

        }


        alert(
            "🗑️ Item deleted successfully!"
        );


        await loadItems();


    } catch (error) {

        console.error(error);


        alert(
            "❌ Failed to delete item."
        );

    }

}


/* =========================
   SEARCH
========================= */

function filterItems() {

    if (!searchInput || !filterType) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedType =
        filterType.value;


    const filteredItems =
        allItems.filter(item => {


            const itemName =
                (item.itemName || "")
                    .toLowerCase();


            const category =
                (item.category || "")
                    .toLowerCase();


            const location =
                (item.location || "")
                    .toLowerCase();


            const matchesSearch =

                itemName.includes(searchText)

                ||

                category.includes(searchText)

                ||

                location.includes(searchText);


            const matchesType =

                selectedType === "ALL"

                ||

                item.type === selectedType;


            return (
                matchesSearch &&
                matchesType
            );

        });


    displayItems(filteredItems);

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterItems
    );

}


if (filterType) {

    filterType.addEventListener(
        "change",
        filterItems
    );

}


/* =========================
   NAVIGATION
========================= */

function scrollToReport() {

    window.location.href =
        "report.html";

}


function scrollToItems() {

    window.location.href =
        "items.html";

}


/* =========================
   SECURITY
========================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================
   START APPLICATION
========================= */

loadItems();
