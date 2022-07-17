var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('play', {
    preload: function() {
        this.game.load.image('forest-back', 'assets/background/1.png');
        this.game.load.image('forest-lights', 'assets/background/2.png');
        this.game.load.image('forest-middle', 'assets/background/1.png');
        this.game.load.image('forest-front', 'assets/background/3.png');

        this.game.load.image('radish', 'assets/cake_128/radish.png');
        this.game.load.image('apple1', 'assets/cake_128/apple1.png');
        this.game.load.image('lime1', 'assets/cake_128/lime1.png');
        this.game.load.image('tomato1', 'assets/cake_128/tomato1.png');
        this.game.load.image('banana', 'assets/cake_128/banana.png');
        this.game.load.image('pear', 'assets/cake_128/pear.png');
        this.game.load.image('carrot1', 'assets/cake_128/carrot1.png');
        this.game.load.image('apple', 'assets/cake_128/apple.png');
        this.game.load.image('pear', 'assets/cake_128/pear1.png');
        this.game.load.image('tomato', 'assets/cake_128/tomato.png');
        this.game.load.image('carrot', 'assets/cake_128/carrot.png');
        this.game.load.image('banana', 'assets/cake_128/banana1.png');
        this.game.load.image('grape', 'assets/cake_128/grape.png');
        this.game.load.image('Cherry', 'assets/cake_128/Cherry.png');
        this.game.load.image('lime', 'assets/cake_128/lime.png');
        this.game.load.image('pepper', 'assets/cake_128/pepper.png');

        this.game.load.image('Leaf', 'assets/496_RPG_icons/I_Leaf.png');

        this.game.load.image('hand', 'assets/496_RPG_icons/W_Fist001.png');

        this.game.load.image('1', 'assets/496_RPG_icons/W_Axe004.png');
        this.game.load.image('2', 'assets/496_RPG_icons/S_Buff01.png');
        this.game.load.image('3', 'assets/496_RPG_icons/S_Buff04.png');
        this.game.load.image('4', 'assets/496_RPG_icons/E_Wood02.png');
        this.game.load.image('5', 'assets/496_RPG_icons/S_Poison09.png');
        this.game.load.image('6', 'assets/496_RPG_icons/S_Earth03.png');
        this.game.load.image('7', 'assets/496_RPG_icons/I_Key07.png');
        this.game.load.image('8', 'assets/496_RPG_icons/S_Shadow05.png');
        this.game.load.image('9', 'assets/496_RPG_icons/S_Thunder02.png');
        this.game.load.image('10', 'assets/496_RPG_icons/I_C_Mushroom.png');
        this.game.load.image('11', 'assets/496_RPG_icons/I_C_Mushroom.png');
        this.game.load.image('12', 'assets/496_RPG_icons/I_C_Mushroom.png');


        // build panel for upgrades
        var bmd = this.game.add.bitmapData(250, 520);
        bmd.ctx.fillStyle = '#04d65c';
        bmd.ctx.strokeStyle = '#35371c';
        bmd.ctx.lineWidth = 12;
        bmd.ctx.fillRect(0, 0, 250, 520);
        bmd.ctx.strokeRect(0, 0, 250, 520);
        this.game.cache.addBitmapData('upgradePanel', bmd);

        var buttonImage = this.game.add.bitmapData(476, 48);
        buttonImage.ctx.fillStyle = '#e6dec7';
        buttonImage.ctx.strokeStyle = '#35371c';
        buttonImage.ctx.lineWidth = 4;
        buttonImage.ctx.fillRect(0, 0, 233, 48);
        buttonImage.ctx.strokeRect(0, 0, 233, 48);
        this.game.cache.addBitmapData('button', buttonImage);

        // the main player
        this.player = {
            clickDmg: 1,
            gold: 40,
            dps: 0
        };

        // world progression
        this.level = 1;
        // how many monsters have we killed during this level
        this.levelKills = 0;
        // how many monsters are required to advance a level
        this.levelKillsRequired = 10;
    },
    create: function() {
        var state = this;

        this.background = this.game.add.group();
        // setup each of our background layers to take the full screen
        ['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
            .forEach(function(image) {
                var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                    state.game.world.height, image, '', state.background);
                bg.tileScale.setTo(4,4);
            });

        this.upgradePanel = this.game.add.image(10, 70, this.game.cache.getBitmapData('upgradePanel'));
        var upgradeButtons = this.upgradePanel.addChild(this.game.add.group());
        upgradeButtons.position.setTo(8, 8);

        var upgradeButtonsData = [
            {icon: 'hand', name: 'Руки', level: 0, cost: 5, purchaseHandler: function(button, player) {
                player.clickDmg += 1;
            }},
            {icon: '1', name: 'Серп', level: 0, cost: 125, purchaseHandler: function(button, player) {
                player.dps += 5;
            }},
            {icon: '2', name: 'Бабушка', level: 0, cost: 512, purchaseHandler: function(button, player) {
                player.dps += 10;
            }},
            {icon: '3', name: 'Рабочий', level: 0, cost: 2100, purchaseHandler: function(button, player) {
                player.dps += 15;
            }},
            {icon: '4', name: 'Трактор', level: 0, cost: 8500, purchaseHandler: function(button, player) {
                player.dps += 30;
            }},
            {icon: '5', name: 'Склад', level: 0, cost: 34000, purchaseHandler: function(button, player) {
                player.dps += 80;
            }},
            {icon: '6', name: 'Дроны', level: 0, cost: 245000, purchaseHandler: function(button, player) {
                player.dps += 160;
            }},
            {icon: '7', name: 'Конвеер', level: 0, cost: 955555, purchaseHandler: function(button, player) {
                player.dps += 320;
            }},
            {icon: '8', name: 'Наномашины', level: 0, cost: 6200000, purchaseHandler: function(button, player) {
                player.dps += 740;
            }},
            {icon: '9', name: 'Атомный реактор', level: 0, cost: 90000000, purchaseHandler: function(button, player) {
                player.dps += 5000;
            }}
        ];

        var button;
        upgradeButtonsData.forEach(function(buttonData, index) {
            button = state.game.add.button(0, (50 * index), state.game.cache.getBitmapData('button'));
            button.icon = button.addChild(state.game.add.image(6, 6, buttonData.icon));
            button.text = button.addChild(state.game.add.text(42, 6, buttonData.name + ': ' + buttonData.level, {font: '16px Arial Black'}));
            button.details = buttonData;
            button.costText = button.addChild(state.game.add.text(42, 24, 'Стоимость: ' + buttonData.cost, {font: '16px Arial Black'}));
            button.events.onInputDown.add(state.onUpgradeButtonClick, state);

            upgradeButtons.addChild(button);
        });

        var monsterData = [
            {name: 'Редис',        image: 'radish',        maxHealth: 10},
            {name: 'Яблоко',      image: 'apple1',      maxHealth: 20},
            {name: 'Лимон',    image: 'lime1',    maxHealth: 30},
            {name: 'Томат',               image: 'tomato1',               maxHealth: 5},
            {name: 'Банан',        image: 'banana',        maxHealth: 10},
            {name: 'Груша',          image: 'pear',          maxHealth: 10},
            {name: 'Морковь',   image: 'carrot1',   maxHealth: 15},
            {name: 'Яблоко',      image: 'apple',      maxHealth: 8},
            {name: 'Груша',       image: 'pear',       maxHealth: 3},
            {name: 'Томат',          image: 'tomato',          maxHealth: 13},
            {name: 'Морковь',               image: 'carrot',               maxHealth: 2},
            {name: 'Банан',          image: 'banana',          maxHealth: 2},
            {name: 'Виноград',          image: 'grape',          maxHealth: 6},
            {name: 'Вишня',             image: 'Cherry',             maxHealth: 4},
            {name: 'Лимон',            image: 'lime',            maxHealth: 4},
            {name: 'Перец',    image: 'pepper',    maxHealth: 20}
        ];
        this.monsters = this.game.add.group();

        var monster;
        monsterData.forEach(function(data) {
            // create a sprite for them off screen
            monster = state.monsters.create(1000, state.game.world.centerY, data.image);
            // use the built in health component
            monster.health = monster.maxHealth = data.maxHealth;
            // center anchor
            monster.anchor.setTo(0.5, 1);
            // reference to the database
            monster.details = data;

            //enable input so we can click it!
            monster.inputEnabled = true;
            monster.events.onInputDown.add(state.onClickMonster, state);

            // hook into health and lifecycle events
            monster.events.onKilled.add(state.onKilledMonster, state);
            monster.events.onRevived.add(state.onRevivedMonster, state);
        });

        // display the monster front and center
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY + 50);

        this.monsterInfoUI = this.game.add.group();
        this.monsterInfoUI.position.setTo(this.currentMonster.x - 220, this.currentMonster.y + 120);
        this.monsterNameText = this.monsterInfoUI.addChild(this.game.add.text(0, 0, this.currentMonster.details.name, {
            font: '48px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        }));
        this.monsterHealthText = this.monsterInfoUI.addChild(this.game.add.text(0, 80, this.currentMonster.health + ' Крепость', {
            font: '32px Arial Black',
            fill: '#ff0000',
            strokeThickness: 4
        }));

        this.dmgTextPool = this.add.group();
        var dmgText;
        for (var d=0; d<50; d++) {
            dmgText = this.add.text(0, 0, '1', {
                font: '64px Arial Black',
                fill: '#fff',
                strokeThickness: 4
            });
            // start out not existing, so we don't draw it yet
            dmgText.exists = false;
            dmgText.tween = game.add.tween(dmgText)
                .to({
                    alpha: 0,
                    y: 100,
                    x: this.game.rnd.integerInRange(100, 700)
                }, 1000, Phaser.Easing.Cubic.Out);

            dmgText.tween.onComplete.add(function(text, tween) {
                text.kill();
            });
            this.dmgTextPool.add(dmgText);
        }

        // create a pool of gold coins
        this.coins = this.add.group();
        this.coins.createMultiple(50, 'Leaf', '', false);
        this.coins.setAll('inputEnabled', true);
        this.coins.setAll('goldValue', 1);
        this.coins.callAll('events.onInputDown.add', 'events.onInputDown', this.onClickCoin, this);

        this.playerGoldText = this.add.text(30, 30, 'Листья: ' + this.player.gold, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        });

        // 100ms 10x a second
        this.dpsTimer = this.game.time.events.loop(100, this.onDPS, this);

        // setup the world progression display
        this.levelUI = this.game.add.group();
        this.levelUI.position.setTo(this.game.world.centerX, 30);
        this.levelText = this.levelUI.addChild(this.game.add.text(0, 0, 'Уровень: ' + this.level, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        }));
        this.levelKillsText = this.levelUI.addChild(this.game.add.text(0, 30, 'Собрано: ' + this.levelKills + '/' + this.levelKillsRequired, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        }));
    },
    onDPS: function() {
        if (this.player.dps > 0) {
            if (this.currentMonster && this.currentMonster.alive) {
                var dmg = this.player.dps / 10;
                this.currentMonster.damage(dmg);
                // update the health text
                this.monsterHealthText.text = this.currentMonster.alive ? Math.round(this.currentMonster.health) + ' Крепость' : 'DEAD';
            }
        }
    },
    onUpgradeButtonClick: function(button, pointer) {
        // make this a function so that it updates after we buy
        function getAdjustedCost() {
            return Math.ceil(button.details.cost + (button.details.level * 1.46));
        }

        if (this.player.gold - getAdjustedCost() >= 0) {
            this.player.gold -= getAdjustedCost();
            this.playerGoldText.text = 'Листья: ' + this.player.gold;
            button.details.level++;
            button.text.text = button.details.name + ': ' + button.details.level;
            button.costText.text = 'Стоимость: ' + getAdjustedCost();
            button.details.purchaseHandler.call(this, button, this.player);
        }
    },
    onClickCoin: function(coin) {
        if (!coin.alive) {
            return;
        }
        // give the player gold
        this.player.gold += coin.goldValue;
        // update UI
        this.playerGoldText.text = 'Листья: ' + this.player.gold;
        // remove the coin
        coin.kill();
    },
    onKilledMonster: function(monster) {
        // move the monster off screen again
        monster.position.set(1000, this.game.world.centerY);

        var coin;
        // spawn a coin on the ground
        coin = this.coins.getFirstExists(false);
        coin.reset(this.game.world.centerX + this.game.rnd.integerInRange(-100, 100), this.game.world.centerY);
        coin.goldValue = Math.round(this.level * 1.33);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.onClickCoin, this, coin);

        this.levelKills++;

        if (this.levelKills >= this.levelKillsRequired) {
            this.level++;
            this.levelKills = 0;
        }

        this.levelText.text = 'Уровень: ' + this.level;
        this.levelKillsText.text = 'Собрано: ' + this.levelKills + '/' + this.levelKillsRequired;

        // pick a new monster
        this.currentMonster = this.monsters.getRandom();
        // upgrade the monster based on level
        this.currentMonster.maxHealth = Math.ceil(this.currentMonster.details.maxHealth + ((this.level - 1) * 10.6));
        // make sure they are fully healed
        this.currentMonster.revive(this.currentMonster.maxHealth);
    },
    onRevivedMonster: function(monster) {
        monster.position.set(this.game.world.centerX + 100, this.game.world.centerY + 50);
        // update the text display
        this.monsterNameText.text = monster.details.name;
        this.monsterHealthText.text = monster.health + 'Крепость';
    },
    onClickMonster: function(monster, pointer) {
        // apply click damage to monster
        this.currentMonster.damage(this.player.clickDmg);

        // grab a damage text from the pool to display what happened
        var dmgText = this.dmgTextPool.getFirstExists(false);
        if (dmgText) {
            dmgText.text = this.player.clickDmg;
            dmgText.reset(pointer.positionDown.x, pointer.positionDown.y);
            dmgText.alpha = 1;
            dmgText.tween.start();
        }

        // update the health text
        this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + ' Крепость' : 'DEAD';
    }
});

game.state.start('play');
