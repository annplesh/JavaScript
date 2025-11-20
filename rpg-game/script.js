// ==== Персонаж ====
const character = {
    name: "Луна",
    health: 100,
    strength: 10,
    defense: 5,
    experience: 0,
    level: 1,
    inventory: ["зелье", "свиток огня"],
    gold: 0
};

// ==== Глобальные переменные ====
let currentEnemy = null;       // текущий враг
let currentLocation = "Деревня"; // начальная локация
let isDefending = false;       // флаг защиты
let inventoryPromptShown = false; // флаг для модального окна инвентаря
let healthPromptShown = false; // флаг для модального окна восстановления

const statElements = {
    name: document.getElementById("name"),
    health: document.getElementById("health"),
    strength: document.getElementById("strength"),
    defense: document.getElementById("defense"),
    level: document.getElementById("level"),
    inventory: document.getElementById("inventory"),
    gold: document.getElementById("gold")
};

// Хранилище предыдущих значений для оптимизации DOM-обновлений
// Это позволяет избежать лишних innerHTML и перерисовок
const lastStats = {}; // Хранилище предыдущих значений

function getLabel(key) {
    const labels = {
        name: "Имя",
        health: "Жизни",
        strength: "Сила",
        defense: "Защита",
        level: "Уровень",
        inventory: "Инвентарь",
        gold: "Золото"
    };
    return labels[key] || key;
}

// === Основная функция обновления ===
function updateStats() {
    const currentStats = {
        name: character.name,
        health: character.health,
        strength: character.strength,
        defense: character.defense,
        level: character.level,
        inventory: character.inventory.length,
        gold: character.gold
    };

    // Обновляем только те элементы, которые реально изменились
    // Это снижает нагрузку на DOM и предотвращает лишние перерисовки
    for (const key in currentStats) {
        const el = statElements[key];
        const newHTML = `${getLabel(key)}: <span class="value">${currentStats[key]}</span>`;

        // Оптимизация: сравниваем с предыдущим значением, чтобы не трогать DOM без необходимости
        if (el && newHTML !== lastStats[key]) {
            el.innerHTML = newHTML;
            lastStats[key] = newHTML;
        }
    }

    // === Проверка на гибель персонажа ===
    const gameScreen = document.getElementById("gameScreen");
    const deathScreen = document.getElementById("deathScreen");

    if (character.health <= 0) {
        gameScreen.style.display = "none";
        deathScreen.classList.remove("hidden");
    } else {
        gameScreen.style.display = "block";
        deathScreen.classList.add("hidden");
    }
}

// === Инициализация при загрузке ===
window.onload = function () {
    updateStats();
};

function restartGame() {
    // Сброс характеристик персонажа
    character.health = 100;
    character.strength = 10;
    character.defense = 5;
    character.experience = 0;
    character.level = 1;
    character.gold = 0;
    character.inventory = ["зелье", "свиток огня"];
    currentEnemy = null;
    isDefending = false;

    // Сброс локации
    currentLocation = "Деревня";
    document.getElementById("locationText").textContent = currentLocation;

    // Очистка журнала действий
    const logBox = document.getElementById("battleLog");
    logBox.innerHTML = "<p>Игра началась. Луна готова к новым приключениям!</p>";

    // Показать игровой экран, скрыть экран смерти
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("deathScreen").classList.add("hidden");

    // Обновить интерфейс
    updateStats();
}

// ==== Враги ====
const enemies = [
    {
        name: "Гоблин",
        health: 50,
        strength: 8,
        defense: 2,
        goldReward: 10,
        inventory: ["коготь", "золотой зуб"]
    },
    {
        name: "Тролль",
        health: 80,
        strength: 12,
        defense: 4,
        goldReward: 25,
        inventory: ["рунный камень", "мешочек с пыльцой"]
    },
    {
        name: "Дракон",
        health: 100,
        strength: 16,
        defense: 7,
        goldReward: 50,
        inventory: ["чешуя", "огненный кристалл"]
    }
];

// ==== Локации ====
locationData = {
    forest: { name: "Лес", danger: 0.4, enemies: [0, 1] }, // индексы Гоблина и Тролля
    cave: { name: "Пещера", danger: 0.7, enemies: [1, 2] }, // индексы Тролля и Дракона
    village: { name: "Деревня", danger: 0.0, enemies: [] } // нет врагов
};

function getRandomEnemyFromLocation(locationKey) {
    const enemyIndices = locationData[locationKey].enemies;
    if (enemyIndices.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * enemyIndices.length);
    return enemies[enemyIndices[randomIndex]];
}

function goTo(locationKey) {
    const location = locationData[locationKey];
    if (!location) return;

    currentLocation = location.name;

    // Обновляем текст в <p id="locationText">
    document.getElementById("locationText").textContent = location.name;

    logAction(`📍 Вы переместились в локацию: ${location.name}`);

    // Случайное событие: враг появляется и сразу атакует
    if (location.danger > 0 && Math.random() < location.danger) {
        const enemy = getRandomEnemyFromLocation(locationKey);
        if (enemy) {
            currentEnemy = { ...enemy };
            logAction(`⚠️ Внезапное событие! Вас атакует ${enemy.name}!`);
            enemyAttack(); // враг сразу атакует
        }
    } else {
        logAction(`🌿 В этой локации всё спокойно.`);
    }

    updateStats();
}

// === Атака врага ===
function attackEnemy() {
    if (!currentEnemy) {
        logAction("⚔️ Некого атаковать — враг не обнаружен.");
        return;
    }

    const damage = Math.max(character.strength - currentEnemy.defense, 1);
    currentEnemy.health -= damage;

    logAction(`⚔️ Луна атакует ${currentEnemy.name} на ${damage} урона. Здоровье врага: ${currentEnemy.health}`);

    if (currentEnemy.health <= 0) {
        logAction(`🏆 ${currentEnemy.name} побеждён!`);

        // Передача золота
        character.gold += currentEnemy.goldReward;
        logAction(`💰 Луна получает ${currentEnemy.goldReward} золота!`);

        // Повышение уровня
        character.level += 1;
        logAction(`⭐ Луна повысила уровень! Теперь уровень ${character.level}`);

        // Передача предметов
        if (currentEnemy.inventory && currentEnemy.inventory.length > 0) {
            currentEnemy.inventory.forEach(itemName => {
                character.inventory.push(itemName);
                logAction(`📦 Луна получила предмет: ${itemName}`);
            });

            updateStats();
        }

        currentEnemy = null;
    } else {
        enemyAttack(); // если isDefending === true, урон от врага будет уменьшен
    }
}

function defend() {
    if (!currentEnemy) {
        logAction("🛡️ Не от кого защищаться — враг не обнаружен.");
        return;
    }

    isDefending = true;
    logAction("🛡️ Луна поднимает щит! Урон будет уменьшен.");
    enemyAttack();
    isDefending = false;

    updateStats();
}

// === Ответная атака врага ===
function enemyAttack() {
    let damage = Math.max(currentEnemy.strength - character.defense, 1);

    if (isDefending) {
        damage = Math.floor(damage / 2);
        logAction("🛡️ Луна успешно защищается! Урон уменьшен.");
    }

    character.health -= damage;

    logAction(`⚔️ ${currentEnemy.name} атакует Луну на ${damage} урона. Ваше здоровье: ${character.health}`);

    if (character.health <= 0) {
        logAction("💀 Луна проиграла бой...");
    } else if (character.health < 10 && !healthPromptShown) {
        healthPromptShown = true;
        openHealthModal(); // Показываем окно пополнения здоровья
    }

    updateStats();
}

// === Восстановление здоровья ===
function replenishHealth(amount, cost) {
    character.gold -= cost;
    character.health += amount;
    healthPromptShown = false;
    updateStats();
}

// === Модальное окно восстановления ===
// === Модальное окно восстановления ===
function openHealthModal() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal-window";

    const title = document.createElement("h2");
    title.textContent = "Целитель";

    const infoBox = document.createElement("div");
    infoBox.className = "item-entry";

    const info = document.createElement("div");
    info.innerHTML = `
    <strong>Восстановление</strong><br>
    <em>+30 здоровья за 5 золота</em>
  `;

    const confirmBtn = document.createElement("button");
    confirmBtn.className = "action-btn health";
    confirmBtn.textContent = "Пополнить здоровье";

    confirmBtn.onclick = () => {
        if (character.gold >= 5) {
            // !Используем setTimeout(0), чтобы разгрузить основной поток и избежать задержки при клике
            setTimeout(() => {
                replenishHealth(30, 5);
                document.body.removeChild(overlay);
                healthPromptShown = false;
            }, 0);
        } else {
            // !alert блокирует поток, но отсавила так пока думаю дальше будем это проходить 
            alert("Недостаточно золота для лечения.");
        }
    };

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "Отмена";
    closeBtn.onclick = () => {
        document.body.removeChild(overlay);
        healthPromptShown = false;
    };

    infoBox.appendChild(info);
    infoBox.appendChild(confirmBtn);
    modal.append(title, infoBox, closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// ==== Предметы ====
const items = {
    "зелье": { type: "heal", effect: 30 },
    "свиток огня": { type: "damage", effect: 20 },
    "огненный кристалл": { type: "strength", effect: 10 },
    "чешуя": { type: "defense", effect: 10 },
    "коготь": { type: "strength", effect: 5 },
    "золотой зуб": { type: "currency", effect: 5 },
    "рунный камень": { type: "defense", effect: 5 },
    "мешочек с пыльцой": { type: "magic", effect: { status: "blind", duration: 1 } }
};

const purposeLabels = {
    heal: "здоровье",
    damage: "урон",
    magic: "магия",
    strength: "сила",
    defense: "защита",
    currency: "обмен"
};

// === Модальное окно для инвентаря ===
function openInventoryModal() {
    if (inventoryPromptShown) return;
    inventoryPromptShown = true;

    if (character.inventory.length === 0) {
        alert("Инвентарь пуст — ничего не найдено.");
        inventoryPromptShown = false;
        return;
    }

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal-window";

    const title = document.createElement("h2");
    title.textContent = "Инвентарь";

    const list = document.createElement("ul");
    list.className = "inventory-list";

    character.inventory.forEach(itemName => {
        const item = items[itemName];
        if (!item) return;

        const li = document.createElement("li");
        li.className = "item-entry";

        const effectText = typeof item.effect === "object"
            ? `${purposeLabels[item.effect.status] || item.effect.status} на ${item.effect.duration} ход`
            : `${item.effect > 0 ? "+" : ""}${item.effect}`;

        const label = purposeLabels[item.type] || item.type;

        const content = document.createElement("div");
        content.innerHTML = `
          <strong>${itemName}</strong><br>
          <em>${label} → ${effectText}</em>
        `;

        const useBtn = document.createElement("button");
        useBtn.className = "action-btn use";
        useBtn.textContent = "Использовать";
        useBtn.onclick = () => {
            useItem(itemName);
            document.body.removeChild(overlay);
            inventoryPromptShown = false;
        };

        li.appendChild(content);
        li.appendChild(useBtn);
        list.appendChild(li);
    });

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "Закрыть";
    closeBtn.onclick = () => {
        document.body.removeChild(overlay);
        inventoryPromptShown = false;
    };

    modal.append(title, list, closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// === Использование инвентаря ===
function useItem(itemName) {
    const index = character.inventory.indexOf(itemName);
    if (index === -1) {
        logAction(`📦 У Луны нет предмета "${itemName}".`);
        return;
    }

    const item = items[itemName];
    if (!item) {
        logAction(`❓ Предмет "${itemName}" не распознан.`);
        return;
    }

    switch (item.type) {
        case "heal":
            character.health = Math.min(character.health + item.effect, 100);
            logAction(`🧪 Луна использовала ${itemName}. Здоровье восстановлено до ${character.health}.`);
            break;

        case "damage":
            if (currentEnemy) {
                currentEnemy.health -= item.effect;
                logAction(`🔥 Луна использовала ${itemName}. ${currentEnemy.name} получил ${item.effect} урона. Здоровье врага: ${currentEnemy.health}`);
                if (currentEnemy.health <= 0) {
                    logAction(`🏆 ${currentEnemy.name} побеждён.`);
                    currentEnemy = null;
                }
            } else {
                logAction(`🔥 ${itemName} вспыхнул, но врага рядом не оказалось.`);
            }
            break;

        case "strength":
            character.strength += item.effect;
            logAction(`💪 Луна использовала ${itemName}. Сила увеличена на ${item.effect}.`);
            break;

        case "defense":
            character.defense += item.effect;
            logAction(`🛡️ Луна использовала ${itemName}. Защита увеличена на ${item.effect}.`);
            break;

        case "currency":
            character.gold += item.effect;
            logAction(`💰 Луна нашла ${itemName}. Получено ${item.effect} золота. Всего: ${character.gold}`);
            break;

        case "magic":
            if (currentEnemy) {
                currentEnemy.status = item.effect.status;
                currentEnemy.statusDuration = item.effect.duration;
                logAction(`✨ Луна использовала ${itemName}. ${currentEnemy.name} ослеплён на ${item.effect.duration} ход.`);
            } else {
                logAction(`✨ ${itemName} рассыпался в воздухе, но врага рядом не оказалось.`);
            }
            break;

        default:
            logAction(`❓ Луна не знает, как использовать ${itemName}.`);
            return;
    }

    character.inventory.splice(index, 1);
    updateStats();
}

// ===Журнал событий ===
function logAction(message) {
    const logBox = document.getElementById("battleLog");
    const entry = document.createElement("p");
    entry.textContent = message;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight; // автопрокрутка вниз
}
