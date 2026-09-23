import Player from "../classes/player.js";
import Platform from "../classes/Platform.js";
import KnowledgeStation from "../classes/KnowledgeStation.js";
import TouchControls from "../classes/TouchControls.js";
import Capsule from "../classes/capsule.js";
import Enemy from "../classes/Enemy.js";
import Checkpoint from "../classes/Checkpoint.js";
import PowerBlock from "../classes/PowerBlock.js";

// ==========================================
// MUNDO 2 · PLANEACIÓN SEGURA
// Entorno de tecnología y operación Cargill
// ==========================================

export default class TechnologyScene extends Phaser.Scene {

    constructor() {
        super("TechnologyScene");
    }

    // ==========================================
    // PRELOAD
    // ==========================================

    preload() {

        if (!this.textures.exists("player")) {
            this.load.spritesheet(
                "player",
                "assets/sprites/player-cargill-v2.svg",
                {
                    frameWidth: 64,
                    frameHeight: 64
                }
            );
        }

        if (!this.textures.exists("enemyCargill")) {
            this.load.image(
                "enemyCargill",
                "assets/sprites/enemy-cargill.svg"
            );
        }
    }

    // ==========================================
    // CREATE
    // ==========================================

    create() {

        this.deviceMode =
            this.registry.get("deviceMode") || "desktop";

        this.isMobile =
            this.deviceMode === "mobile";

        this.worldWidth = 3200;
        this.worldHeight = 450;

        this.knowledge = 0;
        this.isGameOver = false;
        this.checkpointPosition = null;
        this.finalSequenceStarted = false;
        this.technologyCoreFinished = false;
        this.nextWorldStarted = false;

        this.physics.world.setBounds(
            0,
            0,
            this.worldWidth,
            this.worldHeight
        );

        this.createBackground();
        this.createPlatforms();
        this.createMovingPlatforms();
        this.createPlayer();

        this.createHud();
        this.createKnowledgeStations();
        this.createCapsules();
        this.createPowerBlocks();
        this.createEnemies();
        this.createCheckpoints();
        this.createTechPuzzle();
        this.createTechnologyCore();

        this.createCamera();
        this.createCollisions();
        this.createControls();

        this.showWorldIntro();
    }

    // ==========================================
    // FONDO · PLANTA AGROINDUSTRIAL
    // ==========================================

    createBackground() {

        this.cameras.main.setBackgroundColor(
            "#F5F9ED"
        );

        const background =
            this.add.graphics();

        background.setDepth(-10);

        // --------------------------------------
        // BASE
        // --------------------------------------

        background.fillStyle(
            0xF5F9ED,
            1
        );

        background.fillRect(
            0,
            0,
            this.worldWidth,
            this.worldHeight
        );

        // --------------------------------------
        // GRANDES CAPAS DE PROFUNDIDAD
        // --------------------------------------

        background.fillStyle(
            0xBDE588,
            0.28
        );

        background.fillCircle(420, 110, 230);
        background.fillCircle(1450, 90, 260);
        background.fillCircle(2510, 120, 240);

        background.fillStyle(
            0x398245,
            0.09
        );

        background.fillCircle(760, 340, 260);
        background.fillCircle(1730, 345, 300);
        background.fillCircle(2730, 335, 280);

        // --------------------------------------
        // PLANTA LEJANA
        // --------------------------------------

        const drawBuilding = (
            x,
            y,
            width,
            height
        ) => {

            background.fillStyle(
                0x012912,
                0.16
            );

            background.fillRect(
                x,
                y,
                width,
                height
            );

            background.lineStyle(
                2,
                0x398245,
                0.22
            );

            background.strokeRect(
                x,
                y,
                width,
                height
            );
        };

        drawBuilding(120, 180, 260, 180);
        drawBuilding(540, 155, 330, 205);
        drawBuilding(1030, 190, 250, 170);
        drawBuilding(1500, 150, 360, 210);
        drawBuilding(2070, 175, 300, 185);
        drawBuilding(2530, 145, 380, 215);
        drawBuilding(2960, 185, 170, 175);

        // --------------------------------------
        // SILOS
        // --------------------------------------

        const drawSilo = (
            x,
            y,
            scale = 1
        ) => {

            background.fillStyle(
                0xF5F9ED,
                0.85
            );

            background.fillRect(
                x,
                y,
                50 * scale,
                120 * scale
            );

            background.fillCircle(
                x + (25 * scale),
                y,
                25 * scale
            );

            background.fillStyle(
                0x398245,
                0.45
            );

            background.fillRect(
                x + (8 * scale),
                y + (28 * scale),
                34 * scale,
                5 * scale
            );
        };

        drawSilo(445, 230, 1.2);
        drawSilo(505, 210, 1.0);
        drawSilo(1940, 225, 1.15);
        drawSilo(2000, 205, 0.95);
        drawSilo(2420, 220, 1.1);

        // --------------------------------------
        // ESTRUCTURAS Y PASARELAS
        // --------------------------------------

        background.lineStyle(
            5,
            0x012912,
            0.22
        );

        for (
            let x = 160;
            x < this.worldWidth;
            x += 420
        ) {

            background.lineBetween(
                x,
                180,
                x,
                335
            );

            background.lineBetween(
                x + 120,
                180,
                x + 120,
                335
            );

            background.lineBetween(
                x,
                205,
                x + 120,
                205
            );
        }

        // --------------------------------------
        // CIRCUITOS DECORATIVOS
        // --------------------------------------

        background.lineStyle(
            2,
            0x398245,
            0.16
        );

        for (
            let x = 80;
            x < this.worldWidth;
            x += 280
        ) {

            background.lineBetween(
                x,
                78,
                x + 70,
                118
            );

            background.lineBetween(
                x + 70,
                118,
                x + 145,
                82
            );

            background.fillStyle(
                0x398245,
                0.25
            );

            background.fillCircle(x, 78, 4);
            background.fillCircle(x + 70, 118, 6);
            background.fillCircle(x + 145, 82, 4);
        }

        // --------------------------------------
        // CONVEYORAS / TUBERÍAS
        // --------------------------------------

        for (
            let x = 0;
            x < this.worldWidth;
            x += 520
        ) {

            background.fillStyle(
                0x012912,
                0.14
            );

            background.fillRect(
                x + 55,
                130,
                270,
                7
            );

            background.fillStyle(
                0xBDE588,
                0.36
            );

            background.fillRect(
                x + 55,
                137,
                270,
                3
            );
        }

        // --------------------------------------
        // BANDA DE PISO
        // --------------------------------------

        background.fillStyle(
            0x398245,
            0.20
        );

        background.fillRect(
            0,
            360,
            this.worldWidth,
            52
        );

        background.lineStyle(
            2,
            0xBDE588,
            0.45
        );

        for (
            let x = 0;
            x < this.worldWidth;
            x += 80
        ) {

            background.lineBetween(
                x,
                405,
                x + 35,
                370
            );
        }

        // --------------------------------------
        // LÍNEA INFERIOR
        // --------------------------------------

        background.fillStyle(
            0x012912,
            0.32
        );

        background.fillRect(
            0,
            414,
            this.worldWidth,
            36
        );
    }

    // ==========================================
    // PLATAFORMAS
    // ==========================================

    createPlatforms() {

        this.platforms = [

            new Platform(
                this,
                360,
                430,
                720,
                40
            ),

            new Platform(
                this,
                800,
                350,
                150,
                20
            ),

            new Platform(
                this,
                1010,
                320,
                160,
                20
            ),

            new Platform(
                this,
                1210,
                350,
                110,
                20
            ),

            new Platform(
                this,
                1510,
                335,
                145,
                20
            ),

            new Platform(
                this,
                1730,
                320,
                230,
                20
            ),

            new Platform(
                this,
                1980,
                320,
                250,
                20
            ),

            new Platform(
                this,
                2210,
                270,
                180,
                20
            ),

            new Platform(
                this,
                2410,
                330,
                220,
                20
            ),

            new Platform(
                this,
                2600,
                280,
                130,
                20
            ),

            new Platform(
                this,
                2770,
                225,
                130,
                20
            ),

            new Platform(
                this,
                3040,
                355,
                320,
                40
            )
        ];
    }

    // ==========================================
    // PLATAFORMA MÓVIL
    // ==========================================

    createMovingPlatforms() {

        this.movingPlatforms = [
            {
                x: 1370,
                y: 335,
                width: 120,
                height: 18,
                distance: 95,
                speed: 0.00115,
                phase: 0
            }
        ];


        this.movingPlatforms.forEach((data) => {

            const platform =
                this.add.rectangle(
                    data.x,
                    data.y,
                    data.width,
                    data.height,
                    0x012912
                )
                    .setStrokeStyle(
                        2,
                        0xBDE588,
                        1
                    )
                    .setDepth(1);


            const topLine =
                this.add.rectangle(
                    data.x,
                    data.y - 5,
                    data.width - 8,
                    5,
                    0xBDE588
                )
                    .setDepth(2);


            this.physics.add.existing(
                platform
            );


            platform.body.setAllowGravity(
                false
            );

            platform.body.setImmovable(
                true
            );

            platform.body.setSize(
                data.width,
                data.height
            );


            data.object = platform;
            data.topLine = topLine;
        });
    }


    // ==========================================
    // ACTUALIZAR PLATAFORMA MÓVIL
    // ==========================================

    updateMovingPlatforms() {

        if (!this.movingPlatforms) {
            return;
        }


        this.movingPlatforms.forEach((data) => {

            const platform =
                data.object;


            if (
                !platform ||
                !platform.body
            ) {
                return;
            }


            // ======================================
            // CALCULAR FASE
            // ======================================

            const phase =
                this.time.now *
                data.speed +
                data.phase;


            // ======================================
            // VELOCIDAD HORIZONTAL
            // ======================================

            const velocityX =
                Math.cos(phase) *
                data.distance *
                data.speed *
                1000;


            // ======================================
            // MOVER PLATAFORMA
            // ======================================

            platform.body.setVelocityX(
                velocityX
            );

            platform.body.setVelocityY(
                0
            );


            platform.body.setAllowGravity(
                false
            );


            // ======================================
            // MOVER LÍNEA SUPERIOR
            // ======================================

            if (data.topLine) {

                data.topLine.x =
                    platform.x;

                data.topLine.y =
                    platform.y - 5;
            }
        });
    }

    // ==========================================
    // JUGADOR
    // ==========================================

    createPlayer() {

        this.player =
            new Player(
                this,
                150,
                350
            );

        this.player.setCollideWorldBounds(true);
        this.player.setDepth(10);

        this.startPosition = {
            x: this.player.x,
            y: this.player.y
        };
    }

    // ==========================================
    // HUD
    // ==========================================

    createHud() {

        this.titleText =
            this.add.text(
                24,
                18,
                "MUNDO 2 · PLANEACIÓN SEGURA",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
            .setScrollFactor(0)
            .setDepth(50);

        this.objectiveText =
            this.add.text(
                24,
                45,
                "Explora el módulo de Planeación Segura.",
                {
                    fontFamily: "Arial",
                    fontSize: "12px",
                    color: "#012912"
                }
            )
            .setScrollFactor(0)
            .setDepth(50);

        const knowledgeBackground =
            this.add.rectangle(
                24,
                78,
                205,
                38,
                0xF5F9ED
            )
            .setOrigin(0);

        knowledgeBackground.setStrokeStyle(
            2,
            0x398245,
            1
        );

        this.knowledgeText =
            this.add.text(
                40,
                97,
                "CONOCIMIENTO 0",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
            .setOrigin(0, 0.5)
            .setScrollFactor(0)
            .setDepth(51);

        this.healthText =
            this.add.text(
                590,
                18,
                "♥ ♥ ♥",
                {
                    fontFamily: "Arial",
                    fontSize: "27px",
                    fontStyle: "bold",
                    color: "#ED3624",
                    letterSpacing: 4
                }
            )
            .setOrigin(0.5, 0)
            .setScrollFactor(0)
            .setDepth(50);

        const returnBackground =
            this.add.rectangle(
                738,
                27,
                118,
                30,
                0xF5F9ED
            )
            .setStrokeStyle(
                2,
                0x398245,
                1
            );

        const returnText =
            this.add.text(
                738,
                27,
                this.isMobile
                    ? "PORTADA"
                    : "ESC · PORTADA",
                {
                    fontFamily: "Arial",
                    fontSize: "11px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
            .setOrigin(0.5);

        this.returnButton =
            this.add.container(
                0,
                0,
                [
                    returnBackground,
                    returnText
                ]
            )
            .setSize(118, 30)
            .setScrollFactor(0)
            .setDepth(50)
            .setInteractive({
                useHandCursor: true
            });

        this.returnButton.on(
            "pointerover",
            () => {
                returnBackground.setFillStyle(
                    0xBDE588
                );
            }
        );

        this.returnButton.on(
            "pointerout",
            () => {
                returnBackground.setFillStyle(
                    0xF5F9ED
                );
            }
        );

        this.returnButton.on(
            "pointerdown",
            () => {
                this.returnToMenu();
            }
        );
    }

    updateHealthHud() {

        let hearts = "";

        for (
            let i = 0;
            i < this.player.maxHealth;
            i++
        ) {
            hearts +=
                i < this.player.health
                    ? "♥ "
                    : "♡ ";
        }

        this.healthText.setText(
            hearts.trim()
        );
    }

    updateKnowledgeHud() {

        if (!this.knowledgeText) {
            return;
        }

        this.knowledgeText.setText(
            `CONOCIMIENTO ${this.knowledge}`
        );
    }

    updateObjective(text) {

        if (!this.objectiveText) {
            return;
        }

        this.objectiveText.setText(text);
    }

    // ==========================================
    // ESTACIONES
    // ==========================================

    createKnowledgeStations() {

        this.knowledgeStations = [

            new KnowledgeStation(
                this,
                570,
                335,
                {
                    title: "PLANEACIÓN",
                    content:
                        "Esta estación presenta el módulo \"Planeación Segura\" de la Inducción SST para Contratistas de Cargill.",
                    reward: 1,
                    onKnowledgeEarned:
                        (amount) => {
                            this.knowledge += amount;
                            this.updateKnowledgeHud();
                        }
                }
            ),

            new KnowledgeStation(
                this,
                1510,
                250,
                {
                    title: "PLANEACIÓN SEGURA",
                    content:
                        "Esta estación presenta nuevamente el módulo \"Planeación Segura\" para reforzar el aprendizaje antes de continuar el recorrido.",
                    reward: 1,
                    onKnowledgeEarned:
                        (amount) => {
                            this.knowledge += amount;
                            this.updateKnowledgeHud();
                        }
                }
            )
        ];
    }

    // ==========================================
    // CÁPSULAS
    // ==========================================

    createCapsules() {
        this.capsules = [];
    }

    activateCapsulePower(type, duration) {

        if (type === "technology") {
            this.player.activateSpeedBoost(
                duration
            );
        }
    }

    showPowerMessage(title) {

        const message =
            this.add.text(
                400,
                118,
                title,
                {
                    fontFamily: "Arial",
                    fontSize: "22px",
                    fontStyle: "bold",
                    color: "#F5F9ED",
                    backgroundColor: "#012912",
                    padding: {
                        x: 18,
                        y: 10
                    }
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(60);

        this.tweens.add({
            targets: message,
            alpha: 0,
            y: 85,
            delay: 1800,
            duration: 700,
            onComplete: () => {
                message.destroy();
            }
        });
    }

    // ==========================================
    // POWERBLOCKS
    // ==========================================

    createPowerBlocks() {

        this.powerBlocks = [
            new PowerBlock(
                this,
                1010,
                210,
                {
                    rewardType: "technology",
                    duration: 10000
                }
            )
        ];
    }

    // ==========================================
    // ENEMIGOS
    // ==========================================

    createEnemies() {

        this.enemies = [

            new Enemy(
                this,
                1740,
                270,
                {
                    speed: 55,
                    damage: 1,
                    patrolDistance: 65
                }
            ),

            new Enemy(
                this,
                2030,
                265,
                {
                    speed: 65,
                    damage: 1,
                    patrolDistance: 75
                }
            ),

            new Enemy(
                this,
                2380,
                280,
                {
                    speed: 70,
                    damage: 1,
                    patrolDistance: 70
                }
            ),

            new Enemy(
                this,
                2620,
                225,
                {
                    speed: 75,
                    damage: 1,
                    patrolDistance: 55
                }
            )
        ];
    }

    // ==========================================
    // CHECKPOINTS
    // ==========================================

    createCheckpoints() {

        this.checkpoints = [

            new Checkpoint(
                this,
                1730,
                200,
                {
                    label: "PUNTO DE CONTROL 01"
                }
            ),

            new Checkpoint(
                this,
                2410,
                280,
                {
                    label: "PUNTO DE CONTROL 02"
                }
            )
        ];
    }

    setCheckpoint(x, y) {

        this.checkpointPosition = {
            x,
            y
        };

        console.log(
            `🟢 Checkpoint guardado: ${x}, ${y}`
        );
    }

    // ==========================================
    // INTERRUPTOR + COMPUERTA
    // ==========================================

    createTechPuzzle() {

        this.techSwitch = {
            x: 1980,
            y: 270,
            isActivated: false,
            trigger: null,
            visual: null,
            indicator: null
        };

        const glow =
            this.add.circle(
                this.techSwitch.x,
                this.techSwitch.y - 28,
                42,
                0xBDE588,
                0.12
            )
            .setDepth(2);

        const base =
            this.add.rectangle(
                this.techSwitch.x,
                this.techSwitch.y + 24,
                70,
                10,
                0x012912
            )
            .setStrokeStyle(
                2,
                0xBDE588,
                1
            )
            .setDepth(4);

        const panel =
            this.add.rectangle(
                this.techSwitch.x,
                this.techSwitch.y - 5,
                48,
                58,
                0xF5F9ED
            )
            .setStrokeStyle(
                3,
                0x398245,
                1
            )
            .setDepth(4);

        const screen =
            this.add.rectangle(
                this.techSwitch.x,
                this.techSwitch.y - 18,
                32,
                17,
                0x012912
            )
            .setStrokeStyle(
                2,
                0xBDE588,
                1
            )
            .setDepth(5);

        const indicator =
            this.add.circle(
                this.techSwitch.x,
                this.techSwitch.y - 18,
                5,
                0x129087
            )
            .setDepth(6);

        const label =
            this.add.text(
                this.techSwitch.x,
                this.techSwitch.y + 8,
                "CONTROL",
                {
                    fontFamily: "Arial",
                    fontSize: "8px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
            .setOrigin(0.5)
            .setDepth(6);

        this.techSwitch.glow = glow;
        this.techSwitch.visual = this.add.container(
            0,
            0,
            [
                base,
                panel,
                screen,
                indicator,
                label
            ]
        );

        this.techSwitch.indicator = indicator;
        this.techSwitch.visual.setDepth(4);

        this.techSwitch.trigger =
            this.add.zone(
                this.techSwitch.x,
                this.techSwitch.y,
                90,
                95
            );

        this.physics.add.existing(
            this.techSwitch.trigger,
            true
        );

        // --------------------------------------
        // COMPUERTA
        // --------------------------------------

        this.techDoor = {
            x: 2660,
            y: 235,
            isOpen: false,
            visual: null,
            bodyObject: null
        };

        const doorGlow =
            this.add.rectangle(
                this.techDoor.x,
                this.techDoor.y,
                190,
                250,
                0x398245,
                0.08
            )
            .setDepth(0);

        const doorFrame =
            this.add.rectangle(
                this.techDoor.x,
                this.techDoor.y,
                154,
                215,
                0x012912
            )
            .setStrokeStyle(
                5,
                0xBDE588,
                1
            )
            .setDepth(2);

        const doorInner =
            this.add.rectangle(
                this.techDoor.x,
                this.techDoor.y + 5,
                130,
                190,
                0xF5F9ED
            )
            .setStrokeStyle(
                4,
                0x398245,
                1
            )
            .setDepth(3);

        const doorPanel =
            this.add.rectangle(
                this.techDoor.x,
                this.techDoor.y - 20,
                80,
                42,
                0x012912
            )
            .setStrokeStyle(
                3,
                0xBDE588,
                1
            )
            .setDepth(4);

        const lock =
            this.add.text(
                this.techDoor.x,
                this.techDoor.y - 20,
                "▣",
                {
                    fontFamily: "Arial",
                    fontSize: "23px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
            .setOrigin(0.5)
            .setDepth(5);

        const doorText =
            this.add.text(
                this.techDoor.x,
                this.techDoor.y + 46,
                "ACCESO",
                {
                    fontFamily: "Arial",
                    fontSize: "13px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
            .setOrigin(0.5)
            .setDepth(5);

        this.techDoor.visual =
            this.add.container(
                0,
                0,
                [
                    doorGlow,
                    doorFrame,
                    doorInner,
                    doorPanel,
                    lock,
                    doorText
                ]
            );

        this.techDoor.bodyObject =
            this.add.rectangle(
                this.techDoor.x,
                this.techDoor.y,
                132,
                205,
                0xFFFFFF,
                0
            );

        this.physics.add.existing(
            this.techDoor.bodyObject,
            true
        );

        this.techDoor.bodyObject.body.setSize(
            132,
            205
        );

        this.tweens.add({
            targets: glow,
            alpha: 0.04,
            scale: 1.12,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.tweens.add({
            targets: indicator,
            alpha: 0.45,
            scale: 1.15,
            duration: 650,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });
    }

    updateTechSwitch(interactPressed) {

        if (!this.techSwitch || !this.techSwitch.trigger) {
            return;
        }

        if (this.techSwitch.isActivated) {
            return;
        }

        const playerNear =
            this.physics.overlap(
                this.player,
                this.techSwitch.trigger
            );

        if (!this.techSwitchPrompt) {

            this.techSwitchPrompt =
                this.add.text(
                    this.techSwitch.x,
                    this.techSwitch.y - 64,
                    "E · ACTIVAR",
                    {
                        fontFamily: "Arial",
                        fontSize: "13px",
                        fontStyle: "bold",
                        color: "#F5F9ED",
                        backgroundColor: "#012912",
                        padding: {
                            x: 10,
                            y: 6
                        }
                    }
                )
                .setOrigin(0.5)
                .setDepth(15)
                .setVisible(false);
        }

        this.techSwitchPrompt.setVisible(
            playerNear
        );

        if (
            playerNear &&
            interactPressed
        ) {
            this.activateTechSwitch();
        }
    }

    activateTechSwitch() {

        if (
            !this.techSwitch ||
            this.techSwitch.isActivated ||
            !this.techDoor
        ) {
            return;
        }

        this.techSwitch.isActivated = true;

        if (this.techSwitchPrompt) {
            this.techSwitchPrompt.setVisible(false);
        }

        this.techSwitch.indicator.setFillStyle(
            0xBDE588
        );

        this.openTechDoor();

        this.updateObjective(
            "Compuerta habilitada. Avanza hacia la siguiente zona."
        );
    }

    openTechDoor() {

        if (
            !this.techDoor ||
            this.techDoor.isOpen
        ) {
            return;
        }

        this.techDoor.isOpen = true;

        if (this.techDoor.bodyObject) {
            this.techDoor.bodyObject.body.enable = false;
        }

        this.tweens.add({
            targets: this.techDoor.visual,
            alpha: 0,
            x: this.techDoor.x,
            y: this.techDoor.y - 14,
            duration: 550,
            ease: "Cubic.easeIn",
            onComplete: () => {
                this.techDoor.visual.setVisible(false);
            }
        });
    }

    // ==========================================
    // NÚCLEO FINAL
    // ==========================================

    createTechnologyCore() {

        this.coreX = 3045;
        this.coreY = 315;

        const glow =
            this.add.circle(
                this.coreX,
                this.coreY - 10,
                76,
                0xBDE588,
                0.12
            )
            .setDepth(3);

        const base =
            this.add.rectangle(
                this.coreX,
                this.coreY + 48,
                125,
                16,
                0x012912
            )
            .setStrokeStyle(
                2,
                0xBDE588,
                1
            )
            .setDepth(5);

        const housing =
            this.add.rectangle(
                this.coreX,
                this.coreY,
                88,
                108,
                0xF5F9ED
            )
            .setStrokeStyle(
                4,
                0x398245,
                1
            )
            .setDepth(6);

        const header =
            this.add.rectangle(
                this.coreX,
                this.coreY - 43,
                80,
                18,
                0x012912
            )
            .setDepth(7);

        const screenFrame =
            this.add.rectangle(
                this.coreX,
                this.coreY - 12,
                60,
                32,
                0x398245
            )
            .setStrokeStyle(
                2,
                0xBDE588,
                1
            )
            .setDepth(7);

        const screen =
            this.add.rectangle(
                this.coreX,
                this.coreY - 12,
                48,
                20,
                0x012912
            )
            .setDepth(8);

        const coreLight =
            this.add.circle(
                this.coreX,
                this.coreY - 12,
                6,
                0x129087
            )
            .setDepth(9);

        const label =
            this.add.text(
                this.coreX,
                this.coreY + 25,
                "CENTRO",
                {
                    fontFamily: "Arial",
                    fontSize: "10px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
            .setOrigin(0.5)
            .setDepth(8);

        this.technologyCoreVisual =
            this.add.container(
                0,
                0,
                [
                    glow,
                    base,
                    housing,
                    header,
                    screenFrame,
                    screen,
                    coreLight,
                    label
                ]
            );

        this.technologyCore =
            this.add.zone(
                this.coreX,
                this.coreY,
                100,
                125
            );

        this.physics.add.existing(
            this.technologyCore,
            true
        );

        this.corePrompt =
            this.add.text(
                this.coreX,
                this.coreY - 78,
                "E · VALIDAR",
                {
                    fontFamily: "Arial",
                    fontSize: "13px",
                    fontStyle: "bold",
                    color: "#F5F9ED",
                    backgroundColor: "#012912",
                    padding: {
                        x: 10,
                        y: 7
                    }
                }
            )
            .setOrigin(0.5)
            .setDepth(15)
            .setVisible(false);

        this.coreActivated = false;

        this.tweens.add({
            targets: glow,
            scale: 1.18,
            alpha: 0.05,
            duration: 950,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.tweens.add({
            targets: coreLight,
            alpha: 0.45,
            scale: 1.18,
            duration: 650,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });
    }

    updateTechnologyCore(interactPressed) {

        if (
            this.coreActivated ||
            !this.technologyCore
        ) {
            return;
        }

        const playerNear =
            this.physics.overlap(
                this.player,
                this.technologyCore
            );

        this.corePrompt.setVisible(
            playerNear
        );

        if (
            playerNear &&
            interactPressed
        ) {
            this.activateTechnologyCore();
        }
    }

    activateTechnologyCore() {

        if (this.technologyCoreFinished) {
            return;
        }

        this.technologyCoreFinished = true;
        this.coreActivated = true;
        this.finalSequenceStarted = true;

        this.corePrompt.setVisible(false);

        this.player.setVelocity(0, 0);

        if (this.player.body) {
            this.player.body.enable = false;
        }

        this.showFinalQuiz();
    }

    // ==========================================
    // QUIZ FINAL
    // ==========================================

    showFinalQuiz() {

        const overlay =
            this.add.rectangle(
                400,
                225,
                800,
                450,
                0x012912,
                0.96
            )
            .setScrollFactor(0)
            .setDepth(120);

        const title =
            this.add.text(
                400,
                78,
                "VALIDACIÓN DE CONOCIMIENTO",
                {
                    fontFamily: "Arial",
                    fontSize: "25px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        const moduleLabel =
            this.add.text(
                400,
                117,
                "MUNDO 2 · PLANEACIÓN SEGURA",
                {
                    fontFamily: "Arial",
                    fontSize: "13px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        const question =
            this.add.text(
                400,
                170,
                "¿Cuál es el módulo 2 del recorrido de la Inducción SST para Contratistas?",
                {
                    fontFamily: "Arial",
                    fontSize: "19px",
                    fontStyle: "bold",
                    color: "#F5F9ED",
                    align: "center",
                    wordWrap: {
                        width: 650
                    }
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        const options = [
            {
                text: "A · Planeación Segura",
                correct: true
            },
            {
                text: "B · Conducta y Reglas",
                correct: false
            },
            {
                text: "C · Operaciones Críticas",
                correct: false
            },
            {
                text: "D · Emergencias y Ambiente",
                correct: false
            }
        ];

        const buttons = [];

        options.forEach((option, index) => {

            const y = 235 + (index * 45);

            const button =
                this.add.text(
                    400,
                    y,
                    option.text,
                    {
                        fontFamily: "Arial",
                        fontSize: "15px",
                        fontStyle: "bold",
                        color: "#012912",
                        backgroundColor: "#F5F9ED",
                        padding: {
                            x: 18,
                            y: 9
                        },
                        align: "center"
                    }
                )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(121)
                .setInteractive({
                    useHandCursor: true
                });

            button.on(
                "pointerover",
                () => {
                    button.setStyle({
                        backgroundColor: "#BDE588",
                        color: "#012912"
                    });
                }
            );

            button.on(
                "pointerout",
                () => {
                    button.setStyle({
                        backgroundColor: "#F5F9ED",
                        color: "#012912"
                    });
                }
            );

            button.on(
                "pointerdown",
                () => {

                    if (option.correct) {

                        overlay.destroy();
                        title.destroy();
                        moduleLabel.destroy();
                        question.destroy();

                        buttons.forEach(
                            (item) => item.destroy()
                        );

                        this.showWorldCompletion();

                    } else {
                        this.showQuizFailure();
                    }
                }
            );

            buttons.push(button);
        });
    }

    showQuizFailure() {

        if (this.quizFailureVisible) {
            return;
        }

        this.quizFailureVisible = true;

        const message =
            this.add.text(
                400,
                395,
                "RESPUESTA INCORRECTA · REINICIANDO EL MUNDO...",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#F5F9ED",
                    backgroundColor: "#398245",
                    padding: {
                        x: 14,
                        y: 9
                    }
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(125);

        this.time.delayedCall(
            1200,
            () => {
                message.destroy();
                this.scene.restart();
            }
        );
    }

    showWorldCompletion() {

        const overlay =
            this.add.rectangle(
                400,
                225,
                800,
                450,
                0x012912,
                0.95
            )
            .setScrollFactor(0)
            .setDepth(120);

        const title =
            this.add.text(
                400,
                165,
                "MUNDO 2 COMPLETADO",
                {
                    fontFamily: "Arial",
                    fontSize: "30px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        const subtitle =
            this.add.text(
                400,
                215,
                "PLANEACIÓN SEGURA",
                {
                    fontFamily: "Arial",
                    fontSize: "20px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        const message =
            this.add.text(
                400,
                265,
                "VALIDACIÓN COMPLETADA",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        this.time.delayedCall(
            2300,
            () => {
                overlay.destroy();
                title.destroy();
                subtitle.destroy();
                message.destroy();

                this.finalSequenceStarted = false;
                this.nextWorldStarted = false;

                this.showNextWorldNotice();
            }
        );
    }

    showNextWorldNotice() {

        if (this.nextWorldStarted) {
            return;
        }

        const overlay =
            this.add.rectangle(
                400,
                225,
                800,
                450,
                0x012912,
                1
            )
            .setScrollFactor(0)
            .setDepth(120);

        const title =
            this.add.text(
                400,
                175,
                "SIGUIENTE ETAPA",
                {
                    fontFamily: "Arial",
                    fontSize: "30px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        const subtitle =
            this.add.text(
                400,
                225,
                "MUNDO 3 · CONDUCTA Y REGLAS",
                {
                    fontFamily: "Arial",
                    fontSize: "17px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        const info =
            this.add.text(
                400,
                272,
                "Videojuego version BETA Continuara.....",
                {
                    fontFamily: "Arial",
                    fontSize: "13px",
                    color: "#F5F9ED",
                    align: "center",
                    wordWrap: {
                        width: 640
                    }
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(121);

        const buttonBackground =
            this.add.rectangle(
                400,
                335,
                230,
                38,
                0xF5F9ED
            )
            .setStrokeStyle(
                2,
                0xBDE588,
                1
            )
            .setScrollFactor(0)
            .setDepth(121);

        const buttonText =
            this.add.text(
                400,
                335,
                "CONTINUAR",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(122);

        const button =
            this.add.container(
                400,
                335,
                [
                    buttonBackground,
                    buttonText
                ]
            )
            .setSize(230, 38)
            .setScrollFactor(0)
            .setDepth(123)
            .setInteractive({
                useHandCursor: true
            });

        button.on(
            "pointerover",
            () => {
                buttonBackground.setFillStyle(
                    0xBDE588
                );
            }
        );

        button.on(
            "pointerout",
            () => {
                buttonBackground.setFillStyle(
                    0xF5F9ED
                );
            }
        );

        button.on(
            "pointerdown",
            () => {

                this.nextWorldStarted = true;

                const nextScene =
                    this.scene.manager.getScene(
                        "RulesScene"
                    );

                if (nextScene) {
                    this.scene.start(
                        "RulesScene"
                    );
                    return;
                }

                title.setText(
                    "MUNDO 3 EN CONSTRUCCIÓN"
                );

                subtitle.setText(
                    "CONDUCTA Y REGLAS"
                );

                info.setText(
                    "El siguiente mundo todavía no está conectado."
                );

                button.setVisible(false);
            }
        );
    }

    // ==========================================
    // CÁMARA
    // ==========================================

    createCamera() {

        this.cameras.main.setBounds(
            0,
            0,
            this.worldWidth,
            this.worldHeight
        );

        this.cameras.main.startFollow(
            this.player,
            true,
            0.08,
            0.08
        );
    }

    // ==========================================
    // COLISIONES
    // ==========================================

    createCollisions() {

        this.platforms.forEach((platform) => {
            this.physics.add.collider(
                this.player,
                platform.getObject()
            );
        });

        this.movingPlatforms.forEach((platform) => {
            this.physics.add.collider(
                this.player,
                platform.object
            );
        });

        if (
            this.techDoor &&
            this.techDoor.bodyObject
        ) {
            this.physics.add.collider(
                this.player,
                this.techDoor.bodyObject
            );
        }

        this.powerBlocks.forEach((powerBlock) => {
            this.physics.add.collider(
                this.player,
                powerBlock.getObject(),
                () => {
                    powerBlock.hit(
                        this.player
                    );
                }
            );
        });
    }

    // ==========================================
    // CONTROLES
    // ==========================================

    createControls() {

        this.cursors =
            this.input.keyboard.createCursorKeys();

        this.interactKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.E
            );

        if (this.isMobile) {
            this.touchControls =
                new TouchControls(this);
        }

        this.input.keyboard.on(
            "keydown-ESC",
            () => {
                this.returnToMenu();
            },
            this
        );
    }

    // ==========================================
    // MOBILE · BOTÓN E
    // ==========================================

    updateMobileInteractionButton() {

        if (
            !this.touchControls ||
            !this.player
        ) {
            return;
        }

        let interactionAvailable =
            false;

        if (this.knowledgeStations) {
            interactionAvailable =
                this.knowledgeStations.some(
                    (station) =>
                        station.trigger &&
                        this.physics.overlap(
                            this.player,
                            station.trigger
                        ) &&
                        !station.panelIsOpen
                );
        }

        if (
            !interactionAvailable &&
            this.checkpoints
        ) {
            interactionAvailable =
                this.checkpoints.some(
                    (checkpoint) =>
                        checkpoint.trigger &&
                        !checkpoint.isActivated &&
                        !checkpoint.isRepairing &&
                        this.physics.overlap(
                            this.player,
                            checkpoint.trigger
                        )
                );
        }

        if (
            !interactionAvailable &&
            this.techSwitch &&
            this.techSwitch.trigger
        ) {
            interactionAvailable =
                !this.techSwitch.isActivated &&
                this.physics.overlap(
                    this.player,
                    this.techSwitch.trigger
                );
        }

        if (
            !interactionAvailable &&
            this.technologyCore
        ) {
            interactionAvailable =
                !this.coreActivated &&
                this.physics.overlap(
                    this.player,
                    this.technologyCore
                );
        }

        this.touchControls.setInteractAvailable(
            interactionAvailable
        );
    }

    // ==========================================
    // RESPAWN
    // ==========================================

    handlePlayerDefeat() {

        if (
            this.isGameOver ||
            this.finalSequenceStarted
        ) {
            return;
        }


        this.isGameOver = true;


        this.player.setVelocity(
            0,
            0
        );


        if (this.player.body) {
            this.player.body.enable = false;
        }


        this.enemies.forEach(
            (enemy) => {

                enemy.isActive = false;
            }
        );


        const overlay =
            this.add.rectangle(
                400,
                225,
                800,
                450,
                0x012912,
                0.88
            )
                .setScrollFactor(0)
                .setDepth(100);


        const worldText =
            this.add.text(
                400,
                145,
                "MUNDO 2",
                {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(101);


        const title =
            this.add.text(
                400,
                195,
                "OPERACIÓN INTERRUMPIDA",
                {
                    fontFamily: "Arial",
                    fontSize: "29px",
                    fontStyle: "bold",
                    color: "#F5F9ED",
                    align: "center"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(101);


        const text =
            this.add.text(
                400,
                245,
                "Regresando al punto de resguardo...",
                {
                    fontFamily: "Arial",
                    fontSize: "17px",
                    color: "#F5F9ED",
                    align: "center"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(101);


        const indicator =
            this.add.text(
                400,
                290,
                "REPOSICIONANDO OPERACIÓN",
                {
                    fontFamily: "Arial",
                    fontSize: "12px",
                    fontStyle: "bold",
                    color: "#398245"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(101);


        this.time.delayedCall(
            1200,
            () => {

                overlay.destroy();
                worldText.destroy();
                title.destroy();
                text.destroy();
                indicator.destroy();

                this.respawnPlayer();
            }
        );
    }

    respawnPlayer() {

        const respawnX =
            this.checkpointPosition
                ? this.checkpointPosition.x
                : this.startPosition.x;

        const respawnY =
            this.checkpointPosition
                ? this.checkpointPosition.y
                : this.startPosition.y;

        this.player.setPosition(
            respawnX,
            respawnY
        );

        if (this.player.body) {
            this.player.body.enable = true;
            this.player.body.reset(
                respawnX,
                respawnY
            );
        }

        this.player.health =
            this.player.maxHealth;

        this.player.isInvulnerable =
            true;

        this.player.setAlpha(1);
        this.player.setVelocity(0, 0);
        this.player.play("idle", true);

        this.enemies.forEach((enemy) => {
            if (typeof enemy.reset === "function") {
                enemy.reset();
            } else {
                enemy.isActive = true;
            }
        });

        this.isGameOver = false;
        this.updateHealthHud();

        this.time.delayedCall(
            1500,
            () => {
                this.player.isInvulnerable = false;
                this.player.setAlpha(1);
            }
        );
    }

    // ==========================================
    // INTRO
    // ==========================================

    showWorldIntro() {

        const overlay =
            this.add.rectangle(
                400,
                225,
                800,
                450,
                0x012912,
                0.88
            )
            .setScrollFactor(0)
            .setDepth(90);

        const small =
            this.add.text(
                400,
                150,
                "MUNDO 2",
                {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(91);

        const title =
            this.add.text(
                400,
                198,
                "PLANEACIÓN SEGURA",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    fontStyle: "bold",
                    color: "#F5F9ED",
                    align: "center",
                    wordWrap: {
                        width: 700
                    }
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(91);

        const text =
            this.add.text(
                400,
                250,
                "Explora · planifica · verifica · avanza",
                {
                    fontFamily: "Arial",
                    fontSize: "15px",
                    color: "#BDE588"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(91);

        const context =
            this.add.text(
                400,
                292,
                "Inducción SST · Contratistas",
                {
                    fontFamily: "Arial",
                    fontSize: "13px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(91);

        this.tweens.add({
            targets: [
                overlay,
                small,
                title,
                text,
                context
            ],
            alpha: 0,
            delay: 1400,
            duration: 850,
            ease: "Cubic.easeOut",
            onComplete: () => {
                overlay.destroy();
                small.destroy();
                title.destroy();
                text.destroy();
                context.destroy();
            }
        });
    }

    // ==========================================
    // UPDATE
    // ==========================================

    update() {

        this.updateMobileInteractionButton();
        this.updateMovingPlatforms();

        const keyboardInteract =
            Phaser.Input.Keyboard.JustDown(
                this.interactKey
            );

        const touchInteract =
            this.touchControls
                ? this.touchControls.consumeInteract()
                : false;

        const interactPressed =
            keyboardInteract ||
            touchInteract;

        this.knowledgeStations.forEach(
            (station) => {
                station.update(
                    this.player,
                    interactPressed
                );
            }
        );

        this.capsules.forEach(
            (capsule) => {
                capsule.update(
                    this.player
                );
            }
        );

        this.checkpoints.forEach(
            (checkpoint) => {
                checkpoint.update(
                    this.player,
                    interactPressed
                );
            }
        );

        this.updateTechSwitch(
            interactPressed
        );

        this.updateTechnologyCore(
            interactPressed
        );

        const isReadingAStation =
            this.knowledgeStations.some(
                (station) => station.isReading()
            );

        this.enemies.forEach(
            (enemy) => {
                enemy.update(
                    this.player,
                    !isReadingAStation &&
                    !this.finalSequenceStarted
                );
            }
        );

        if (
            isReadingAStation ||
            this.finalSequenceStarted
        ) {
            this.player.setVelocityX(0);
            this.updateHealthHud();
            return;
        }

        const movementControls =
            this.touchControls
                ? this.touchControls.getPlayerControls()
                : this.cursors;

        this.player.update(
            movementControls
        );

        this.updateHealthHud();
    }

    // ==========================================
    // REGRESAR
    // ==========================================

    returnToMenu() {

        this.touchControls?.destroy();

        this.scene.start(
            "MenuScene"
        );
    }
}
