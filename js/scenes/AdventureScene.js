import Player from "../classes/player.js";
import Platform from "../classes/Platform.js";
import KnowledgeStation from "../classes/KnowledgeStation.js";
import TouchControls from "../classes/TouchControls.js";
import Capsule from "../classes/capsule.js";
import Enemy from "../classes/Enemy.js";
import Checkpoint from "../classes/Checkpoint.js";
import LabConsole from "../classes/LabConsole.js";
import PowerBlock from "../classes/PowerBlock.js";



export default class AdventureScene extends Phaser.Scene {

    constructor() {
        super("AdventureScene");
    }

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

            this.load.image(
                "enemyCargill",
                "assets/sprites/enemy-cargill.svg"
            );
        }
    }

    create() {

        this.deviceMode =
            this.registry.get("deviceMode") || "desktop";

        this.isMobile =
            this.deviceMode === "mobile";

        this.worldWidth = 3000;
        this.worldHeight = 450;

        this.isGameOver = false;
        this.finalSequenceStarted = false;
        this.checkpointPosition = null;

        this.physics.world.setBounds(
            0,
            0,
            this.worldWidth,
            this.worldHeight
        );

        this.createFarmBackground();
        this.createPlatforms();
        this.createMovingPlatforms();

        this.createPlayer();

        this.createKnowledgeHud();
        this.createHealthHud();

        this.createKnowledgeStations();
        this.createCapsules();
        this.createPowerBlocks();
        this.createEnemies();
        this.createCheckpoints();
        this.createLabConsole();

        this.createCamera();
        this.createCollisions();
        this.createControls();

        this.showWorldIntro();
    }


    // ======================================
    // AMBIENTE DE GRANJA · MUNDO 1
    // ======================================

    createFarmBackground() {

        // ======================================
        // CIELO
        // ======================================

        this.cameras.main.setBackgroundColor(
            "#DFF2D8"
        );

        const background =
            this.add.graphics();

        background.setDepth(-5);


        // ======================================
        // CIELO BASE
        // ======================================

        background.fillStyle(
            0xDFF2D8,
            1
        );

        background.fillRect(
            0,
            0,
            this.worldWidth,
            this.worldHeight
        );


        // ======================================
        // SOL
        // ======================================

        background.fillStyle(
            0xBDE588,
            0.75
        );

        background.fillCircle(
            250,
            80,
            45
        );

        background.fillStyle(
            0xF5F9ED,
            0.35
        );

        background.fillCircle(
            250,
            80,
            65
        );


        // ======================================
        // NUBES
        // ======================================

        const drawCloud = (x, y, scale = 1) => {

            background.fillStyle(
                0xF5F9ED,
                0.9
            );

            background.fillCircle(
                x,
                y,
                22 * scale
            );

            background.fillCircle(
                x + 28 * scale,
                y - 8 * scale,
                30 * scale
            );

            background.fillCircle(
                x + 62 * scale,
                y,
                22 * scale
            );

            background.fillRect(
                x,
                y,
                62 * scale,
                22 * scale
            );
        };


        drawCloud(520, 70, 1);
        drawCloud(1180, 105, 0.8);
        drawCloud(1900, 65, 1.1);
        drawCloud(2550, 110, 0.9);


        // ======================================
        // COLINAS DEL FONDO
        // ======================================

        background.fillStyle(
            0xBDE588,
            0.65
        );

        background.fillEllipse(
            400,
            300,
            750,
            230
        );

        background.fillEllipse(
            1150,
            305,
            800,
            250
        );

        background.fillEllipse(
            1950,
            300,
            850,
            240
        );

        background.fillEllipse(
            2700,
            305,
            800,
            250
        );


        // ======================================
        // COLINAS OSCURAS
        // ======================================

        background.fillStyle(
            0x398245,
            0.30
        );

        background.fillEllipse(
            700,
            350,
            900,
            190
        );

        background.fillEllipse(
            1650,
            350,
            1000,
            200
        );

        background.fillEllipse(
            2550,
            350,
            900,
            180
        );


        // ======================================
        // CAMPOS
        // ======================================

        background.fillStyle(
            0x398245,
            0.48
        );

        background.fillRect(
            0,
            340,
            this.worldWidth,
            80
        );


        // Líneas de cultivo

        background.lineStyle(
            3,
            0xBDE588,
            0.65
        );

        for (
            let x = 40;
            x < this.worldWidth;
            x += 95
        ) {

            background.lineBetween(
                x,
                350,
                x + 35,
                420
            );

            background.lineBetween(
                x + 20,
                350,
                x + 55,
                420
            );
        }


        // ======================================
        // CAMINO CENTRAL
        // ======================================

        background.fillStyle(
            0xC9A66B,
            1
        );

        background.beginPath();

        background.moveTo(
            0,
            395
        );

        background.lineTo(
            800,
            365
        );

        background.lineTo(
            1500,
            385
        );

        background.lineTo(
            2250,
            360
        );

        background.lineTo(
            this.worldWidth,
            390
        );

        background.lineTo(
            this.worldWidth,
            450
        );

        background.lineTo(
            0,
            450
        );

        background.closePath();

        background.fillPath();


        // ======================================
        // GRANERO
        // ======================================

        const barnX = 720;
        const barnY = 245;

        // cuerpo
        background.fillStyle(
            0xAFC7A8,
            1
        );

        background.fillRect(
            barnX,
            barnY,
            150,
            105
        );

        // techo
        background.fillStyle(
            0x012912,
            1
        );

        background.beginPath();

        background.moveTo(
            barnX - 15,
            barnY
        );

        background.lineTo(
            barnX + 75,
            barnY - 65
        );

        background.lineTo(
            barnX + 165,
            barnY
        );

        background.closePath();

        background.fillPath();


        // puerta
        background.fillStyle(
            0x398245,
            1
        );

        background.fillRect(
            barnX + 55,
            barnY + 48,
            40,
            57
        );


        // cruz decorativa
        background.lineStyle(
            4,
            0xF5F9ED,
            1
        );

        background.lineBetween(
            barnX + 62,
            barnY + 55,
            barnX + 88,
            barnY + 95
        );

        background.lineBetween(
            barnX + 88,
            barnY + 55,
            barnX + 62,
            barnY + 95
        );


        // ======================================
        // SILOS
        // ======================================

        const drawSilo = (x, y) => {

            background.fillStyle(
                0xF5F9ED,
                1
            );

            background.fillRect(
                x,
                y,
                52,
                105
            );

            background.fillCircle(
                x + 26,
                y,
                26
            );

            background.fillStyle(
                0x398245,
                1
            );

            background.fillRect(
                x + 8,
                y + 20,
                36,
                5
            );
        };


        drawSilo(
            910,
            245
        );

        drawSilo(
            975,
            225
        );


        // ======================================
        // CERCAS
        // ======================================

        const drawFence = (startX, y, length) => {

            background.lineStyle(
                5,
                0x012912,
                0.8
            );

            for (
                let x = startX;
                x < startX + length;
                x += 65
            ) {

                background.lineBetween(
                    x,
                    y - 35,
                    x,
                    y
                );
            }

            background.lineBetween(
                startX,
                y - 25,
                startX + length,
                y - 25
            );

            background.lineBetween(
                startX,
                y - 5,
                startX + length,
                y - 5
            );
        };


        drawFence(
            1030,
            350,
            300
        );

        drawFence(
            2050,
            345,
            280
        );


        // ======================================
        // ÁRBOLES
        // ======================================

        const drawTree = (x, y, scale = 1) => {

            background.fillStyle(
                0x012912,
                1
            );

            background.fillRect(
                x - 8 * scale,
                y,
                16 * scale,
                55 * scale
            );

            background.fillStyle(
                0x398245,
                1
            );

            background.fillCircle(
                x,
                y - 20 * scale,
                32 * scale
            );

            background.fillCircle(
                x - 22 * scale,
                y,
                25 * scale
            );

            background.fillCircle(
                x + 22 * scale,
                y,
                25 * scale
            );

            background.fillStyle(
                0xBDE588,
                0.8
            );

            background.fillCircle(
                x - 10 * scale,
                y - 25 * scale,
                10 * scale
            );
        };


        drawTree(
            180,
            300,
            1
        );

        drawTree(
            540,
            285,
            0.8
        );

        drawTree(
            1450,
            295,
            0.9
        );

        drawTree(
            1800,
            285,
            1
        );

        drawTree(
            2400,
            290,
            0.85
        );

        drawTree(
            2780,
            285,
            1
        );


        // ======================================
        // VEGETACIÓN DEL SUELO
        // ======================================

        background.lineStyle(
            2,
            0x012912,
            0.7
        );

        for (
            let x = 20;
            x < this.worldWidth;
            x += 45
        ) {

            background.lineBetween(
                x,
                420,
                x - 5,
                408
            );

            background.lineBetween(
                x,
                420,
                x + 5,
                407
            );
        }


        // ======================================
        // DETALLES LIMA
        // ======================================

        background.fillStyle(
            0xBDE588,
            0.7
        );

        background.fillCircle(
            420,
            160,
            8
        );

        background.fillCircle(
            430,
            160,
            5
        );

        background.fillCircle(
            1600,
            120,
            7
        );

        background.fillCircle(
            1620,
            120,
            4
        );


        // ======================================
        // PROFUNDIDAD
        // ======================================

        background.setDepth(-5);
    }


    // ======================================
    // PLATAFORMAS
    // ======================================

    createPlatforms() {

        this.platforms = [

            // ==================================
            // 1. ENTRADA SEGURA
            // ==================================

            new Platform(
                this,
                350,
                430,
                700,
                40
            ),

            // ==================================
            // 2. ASCENSO DE CIENCIA
            // ==================================

            new Platform(
                this,
                790,
                350,
                170,
                20
            ),

            new Platform(
                this,
                980,
                285,
                150,
                20
            ),

            new Platform(
                this,
                1120,
                220,
                130,
                20
            ),

            // Plataforma ancha para estabilizar el aterrizaje
            // y presentar el primer dron.
            new Platform(
                this,
                1325,
                330,
                300,
                20
            ),

            // ==================================
            // 3. TRANSFERENCIA
            // ==================================

            // Deja un vacío real entre ambos módulos.
            new Platform(
                this,
                1890,
                330,
                260,
                20
            ),

            // ==================================
            // 4. MÓDULO DE TECNOLOGÍA
            // ==================================

            new Platform(
                this,
                2140,
                270,
                170,
                20
            ),

            new Platform(
                this,
                2320,
                330,
                180,
                20
            ),

            new Platform(
                this,
                2480,
                270,
                140,
                20
            ),

            new Platform(
                this,
                2610,
                210,
                140,
                20
            ),

            // ==================================
            // 5. TRAMO FINAL
            // ==================================

            new Platform(
                this,
                2840,
                330,
                470,
                40
            )
        ];
    }


    // ======================================
    // PLATAFORMA MÓVIL
    // Solo vive dentro del gran vacío de
    // transferencia. No cruza plataformas.
    // ======================================

    createMovingPlatforms() {

        this.movingPlatforms = [];

        const platform =
            this.add.rectangle(
                1665,
                330,
                120,
                18,
                0x012912
            )
                .setStrokeStyle(
                    2,
                    0xBDE588
                )
                .setDepth(1);


        // Franja superior Cargill

        const topLine =
            this.add.rectangle(
                1620,
                325,
                112,
                5,
                0xBDE588
            )
                .setDepth(2);


        // Física

        this.physics.add.existing(
            platform
        );

        platform.body.setAllowGravity(
            false
        );

        platform.body.setImmovable(
            true
        );


        this.movingPlatforms.push({

            object: platform,

            topLine: topLine,

            distance: 70,

            speed: 0.0012,

            phase: 0
        });
    }


    updateMovingPlatforms() {

        if (!this.movingPlatforms) {
            return;
        }

        this.movingPlatforms.forEach((data) => {

            const platform = data.object;

            if (
                !platform ||
                !platform.body
            ) {
                return;
            }


            const phase =
                this.time.now *
                data.speed +
                data.phase;


            const velocityX =
                Math.cos(phase) *
                data.distance *
                data.speed *
                1000;


            platform.body.setVelocityX(
                velocityX
            );

            platform.body.setVelocityY(
                0
            );


            // Mantener la franja superior
            // sincronizada con la plataforma.

            if (data.topLine) {

                data.topLine.x =
                    platform.x;

                data.topLine.y =
                    platform.y - 5;
            }


            platform.body.setAllowGravity(
                false
            );
        });
    }


    // ======================================
    // JUGADOR
    // ======================================

    createPlayer() {

        this.player =
            new Player(
                this,
                150,
                350
            );

        this.player.setDepth(
            10
        );

        this.startPosition = {
            x: this.player.x,
            y: this.player.y
        };
    }


    // ======================================
    // CÁMARA
    // ======================================

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


    // ======================================
    // COLISIONES
    // ======================================

    createCollisions() {

        // ----------------------------------
        // PLATAFORMAS ESTÁTICAS
        // ----------------------------------

        this.platforms.forEach((platform) => {

            this.physics.add.collider(
                this.player,
                platform.getObject()
            );
        });

        // ----------------------------------
        // PLATAFORMA MÓVIL
        // ----------------------------------

        this.movingPlatforms.forEach((platform) => {

            this.physics.add.collider(
                this.player,
                platform.object
            );
        });

        // ----------------------------------
        // POWERBLOCKS
        // ----------------------------------
        // El bloque SÍ es sólido. El jugador no puede
        // atravesarlo. Su propia clase decide si el contacto
        // corresponde a un golpe desde abajo y activa la recompensa.

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


    // ======================================
    // DETECCIÓN DE POWERBLOCK
    // ======================================




    // ======================================
    // HUD DE CONOCIMIENTO
    // ======================================

    createKnowledgeHud() {

        this.knowledge = 0;


        // ======================================
        // TÍTULO DEL MUNDO
        // ======================================

        this.add.text(
            24,
            18,
            "MUNDO 1 · COMPROMISO Y CONTROL",
            {
                fontFamily: "Arial",
                fontSize: "14px",
                fontStyle: "bold",
                color: "#012912"
            }
        )
            .setScrollFactor(0)
            .setDepth(20);


        // ======================================
        // PANEL DE CONOCIMIENTO
        // ======================================

        const knowledgeBackground =
            this.add.rectangle(
                24,
                48,
                205,
                42,
                0x398245
            )
                .setOrigin(0);


        knowledgeBackground.setStrokeStyle(
            2,
            0xBDE588,
            1
        );


        this.knowledgeText =
            this.add.text(
                40,
                69,
                "CONOCIMIENTO 0",
                {
                    fontFamily: "Arial",
                    fontSize: "15px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
                .setOrigin(
                    0,
                    0.5
                )
                .setScrollFactor(0)
                .setDepth(21);


        // ======================================
        // BOTÓN PORTADA
        // ======================================

        this.createReturnButton();


        // ======================================
        // INSTRUCCIÓN
        // ======================================

        const tutorial =
            this.add.text(
                400,
                this.isMobile
                    ? 330
                    : 418,
                this.isMobile
                    ? "Usa los controles para explorar y toca E para aprender."
                    : "Explora las estaciones y presiona E para aprender.",
                {
                    fontFamily: "Arial",
                    fontSize:
                        this.isMobile
                            ? "13px"
                            : "14px",
                    color: "#012912",
                    backgroundColor: "#F5F9ED",
                    padding: {
                        x: 12,
                        y: 6
                    }
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(20);


        this.tweens.add({

            targets: tutorial,

            alpha: 0,

            delay: 5000,

            duration: 900
        });
    }


    // ======================================
    // HUD DE SALUD
    // ======================================

    createHealthHud() {

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
    }


    // ======================================
    // BOTÓN PORTADA
    // ======================================

    createReturnButton() {

        // ======================================
        // FONDO DEL BOTÓN
        // ======================================

        const background =
            this.add.rectangle(
                0,
                0,
                this.isMobile ? 96 : 118,
                30,
                0xF5F9ED,
                0.96
            );


        background.setStrokeStyle(
            2,
            0x398245,
            1
        );


        // ======================================
        // TEXTO
        // ======================================

        const text =
            this.add.text(
                0,
                0,
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


        // ======================================
        // CONTENEDOR
        // ======================================

        this.returnButton =
            this.add.container(
                738,
                27,
                [
                    background,
                    text
                ]
            )
                .setSize(
                    this.isMobile
                        ? 96
                        : 118,
                    30
                )
                .setScrollFactor(0)
                .setDepth(20)
                .setInteractive({
                    useHandCursor: true
                });


        // ======================================
        // HOVER
        // ======================================

        this.returnButton.on(
            "pointerover",
            () => {

                background.setFillStyle(
                    0xBDE588
                );

                text.setColor(
                    "#012912"
                );

                this.returnButton.setScale(
                    1.03
                );
            }
        );


        // ======================================
        // SALIR DEL BOTÓN
        // ======================================

        this.returnButton.on(
            "pointerout",
            () => {

                background.setFillStyle(
                    0xF5F9ED
                );

                text.setColor(
                    "#012912"
                );

                this.returnButton.setScale(
                    1
                );
            }
        );


        // ======================================
        // VOLVER A PORTADA
        // ======================================

        this.returnButton.on(
            "pointerdown",
            () => {

                this.returnToMenu();
            }
        );
    }


    // ======================================
    // ESTACIONES DE CONOCIMIENTO
    // ======================================

    createKnowledgeStations() {

        this.knowledgeStations = [

            // ==================================
            // ESTACIÓN 1 · COMPROMISO
            // ==================================

            new KnowledgeStation(
                this,
                400,
                360,
                {
                    title: "COMPROMISO",
                    content:
                        "Esta estación presenta el módulo \"Compromiso y Control\" de la Inducción SST para Contratistas de Cargill.",
                    reward: 1,
                    onKnowledgeEarned:
                        this.addKnowledge.bind(
                            this
                        )
                }
            ),


            // ==================================
            // ESTACIÓN 2 · PLANEACIÓN
            // ==================================

            new KnowledgeStation(
                this,
                1000,
                230,
                {
                    title: "PLANEACIÓN",
                    content:
                        "Esta estación presenta el módulo \"Planeación Segura\" de la Inducción SST para Contratistas de Cargill.",
                    reward: 1,
                    onKnowledgeEarned:
                        this.addKnowledge.bind(
                            this
                        )
                }
            )

        ];
    }


    // ======================================
    // CÁPSULAS
    // ======================================

    createCapsules() {

        this.capsules = [];
    }


    activateCapsulePower(
        type,
        duration
    ) {

        if (
            type === "science"
        ) {

            this.player.activateSuperJump(
                duration
            );
        }


        if (
            type === "technology"
        ) {

            this.player.activateSpeedBoost(
                duration
            );
        }
    }


    showPowerMessage(
        title,
        duration
    ) {

        const message =
            this.add.text(
                400,
                110,
                title,
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    fontStyle: "bold",
                    color: "#FFFFFF",
                    backgroundColor: "#00557F",
                    padding: {
                        x: 18,
                        y: 12
                    }
                }
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(50);


        this.tweens.add({
            targets: message,
            alpha: 0,
            y: 80,
            delay: 1800,
            duration: 700,
            onComplete: () => {

                message.destroy();
            }
        });
    }


    // ======================================
    // POWERBLOCKS
    // ======================================

    createPowerBlocks() {

        this.powerBlocks = [

            // Bloque 1: premio científico.
            // Queda alto sobre la entrada para que el salto
            // desde abajo sea claro y visualmente evidente.
            new PowerBlock(
                this,
                610,
                235,
                {
                    rewardType: "science",
                    duration: 10000
                }
            ),

            // Bloque 2: premio tecnológico.
            new PowerBlock(
                this,
                1850,
                225,
                {
                    rewardType: "technology",
                    duration: 10000
                }
            )
        ];
    }


    // ======================================
    // ENEMIGOS
    // ======================================

    createEnemies() {

        this.enemies = [


            // Primer desafío tecnológico.
            new Enemy(
                this,
                1260,
                275,
                {
                    speed: 65,
                    damage: 1,
                    patrolDistance: 150
                }
            ),

            new Enemy(
                this,
                2625,
                155,
                {
                    speed: 75,
                    damage: 1,
                    patrolDistance: 45
                }
            )
        ];
    }


    // ======================================
    // CHECKPOINTS
    // ======================================

    createCheckpoints() {

        this.checkpoints = [

            new Checkpoint(
                this,
                800,
                500,
                {
                    label: "PUNTO DE RESGUARDO 01"
                }
            ),

            new Checkpoint(
                this,
                2320,
                300,
                {
                    label: "PUNTO DE RESGUARDO 02"
                }
            )
        ];
    }


    setCheckpoint(
        x,
        y
    ) {

        this.checkpointPosition = {
            x: x,
            y: y
        };


        console.log(
            `🟢 Checkpoint guardado: ${x}, ${y}`
        );
    }


    // ======================================
    // CONSOLA CENTRAL
    // ======================================

    createLabConsole() {

        this.labConsole =
            new LabConsole(
                this,
                2860,
                280,
                {
                    title: "CONSOLA CENTRAL"
                }
            );
    }


    checkFinalSequence() {

        if (
            this.finalSequenceStarted ||
            !this.labConsole ||
            !this.labConsole.isActivated
        ) {
            return;
        }

        this.finalSequenceStarted = true;

        this.player.setVelocity(
            0,
            0
        );

        if (this.player.body) {
            this.player.body.enable = false;
        }

        if (this.touchControls) {
            this.touchControls.setInteractAvailable(false);
        }

        this.showFinalQuiz();
    }

 
    // ======================================
    // QUIZ FINAL · MUNDO 1
    // ======================================

    showFinalQuiz() {

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


        // ======================================
        // TÍTULO
        // ======================================

        const title =
            this.add.text(
                400,
                82,
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
                122,
                "MUNDO 1 · COMPROMISO Y CONTROL",
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


        // ======================================
        // PREGUNTA
        // ======================================

        const question =
            this.add.text(
                400,
                175,
                "¿Qué módulo corresponde al Mundo 1?",
                {
                    fontFamily: "Arial",
                    fontSize: "21px",
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


        // ======================================
        // OPCIONES
        // ======================================

        const options = [

            {
                text: "A · Compromiso y Control",
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


        options.forEach(
            (option, index) => {

                const y =
                    235 + (index * 48);


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
                                y: 10
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


                // ==================================
                // HOVER
                // ==================================

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


                // ==================================
                // RESPUESTA
                // ==================================

                button.on(
                    "pointerdown",
                    () => {

                        if (option.correct) {

                            overlay.destroy();
                            title.destroy();
                            moduleLabel.destroy();
                            question.destroy();

                            buttons.forEach(
                                (item) => {

                                    item.destroy();
                                }
                            );

                            this.showFinalWorldTransition();

                        } else {

                            this.showQuizFailure();
                        }
                    }
                );


                buttons.push(button);
            }
        );
    }

    showQuizFailure() {

        const message =
            this.add.text(
                400,
                395,
                "RESPUESTA INCORRECTA · REINICIANDO EL MUNDO...",
                {
                    fontFamily: "Arial",
                    fontSize: "15px",
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


    showFinalWorldTransition() {

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
                185,
                "ACCESO DESBLOQUEADO",
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
                235,
                "COMPROMISO Y CONTROL · COMPLETADO",
                {
                    fontFamily: "Arial",
                    fontSize: "15px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(121);


        const next =
            this.add.text(
                400,
                275,
                "PREPARANDO LA SIGUIENTE ETAPA",
                {
                    fontFamily: "Arial",
                    fontSize: "13px",
                    color: "#F5F9ED"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(121);


        this.time.delayedCall(
            1800,
            () => {

                this.scene.start(
                    "TechnologyScene"
                );
            }
        );
    }


    // ======================================
    // RESPAWN
    // ======================================

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


        // ======================================
        // FONDO
        // ======================================

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


        // ======================================
        // MUNDO
        // ======================================

        const worldText =
            this.add.text(
                400,
                145,
                "MUNDO 1",
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


        // ======================================
        // TÍTULO
        // ======================================

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


        // ======================================
        // MENSAJE
        // ======================================

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


        // ======================================
        // INDICADOR
        // ======================================

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


        // ======================================
        // TRANSICIÓN
        // ======================================

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


    // ======================================
    // RESPAWN
    // ======================================

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

            this.player.body.enable =
                true;

            this.player.body.reset(
                respawnX,
                respawnY
            );
        }


        this.player.health =
            this.player.maxHealth;


        this.player.isInvulnerable =
            true;


        this.player.setAlpha(
            1
        );


        this.player.setVelocity(
            0,
            0
        );


        this.player.play(
            "idle",
            true
        );


        this.enemies.forEach(
            (enemy) => {

                if (
                    typeof enemy.reset ===
                    "function"
                ) {

                    enemy.reset();

                } else {

                    enemy.isActive = true;
                }
            }
        );


        this.isGameOver =
            false;


        this.updateHealthHud();


        this.time.delayedCall(
            1500,
            () => {

                this.player.isInvulnerable =
                    false;

                this.player.setAlpha(
                    1
                );
            }
        );
    }


    // ======================================
    // SALUD
    // ======================================

    updateHealthHud() {

        let hearts = "";

        for (
            let i = 0;
            i < this.player.maxHealth;
            i++
        ) {

            if (
                i < this.player.health
            ) {

                hearts += "♥ ";

            } else {

                hearts += "♡ ";
            }
        }

        this.healthText.setText(
            hearts.trim()
        );
    }


    // ======================================
    // CONOCIMIENTO
    // ======================================

    addKnowledge(points) {

        this.knowledge +=
            points;


        this.knowledgeText.setText(
            `CONOCIMIENTO ${this.knowledge}`
        );
    }


    // ======================================
    // CONTROLES
    // ======================================

    createControls() {

        this.cursors =
            this.input.keyboard
                .createCursorKeys();


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
            this.returnToMenu,
            this
        );
    }


    // ======================================
    // BOTÓN E EN MOBILE
    // ======================================

    updateMobileInteractionButton() {

        if (
            !this.touchControls ||
            !this.player
        ) {
            return;
        }


        let interactionAvailable =
            false;


        // Estaciones.
        if (
            this.knowledgeStations
        ) {

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


        // Checkpoints.
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


        // Consola.
        if (
            !interactionAvailable &&
            this.labConsole &&
            this.labConsole.trigger
        ) {

            interactionAvailable =
                !this.labConsole.isActivated &&
                this.physics.overlap(
                    this.player,
                    this.labConsole.trigger
                );
        }


        this.touchControls
            .setInteractAvailable(
                interactionAvailable
            );
    }


    // ======================================
    // UPDATE
    // ======================================

    update() {

        this.updateMovingPlatforms();

        this.updateMobileInteractionButton();



        const keyboardInteract =
            Phaser.Input.Keyboard.JustDown(
                this.interactKey
            );


        const touchInteract =
            this.touchControls
                ? this.touchControls
                    .consumeInteract()
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


        this.labConsole.update(
            this.player,
            interactPressed
        );


        this.checkpoints.forEach(
            (checkpoint) => {

                checkpoint.update(
                    this.player,
                    interactPressed
                );
            }
        );


        this.checkFinalSequence();


        const isReadingAStation =
            this.knowledgeStations.some(
                (station) =>
                    station.isReading()
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

            this.player.setVelocityX(
                0
            );

            this.updateHealthHud();

            return;
        }


        const movementControls =
            this.touchControls
                ? this.touchControls
                    .getPlayerControls()
                : this.cursors;


        this.player.update(
            movementControls
        );


        this.updateHealthHud();
    }


    // ======================================
    // INTRO DEL MUNDO
    // ======================================

    // ======================================
// INTRODUCCIÓN DEL MUNDO
// ======================================

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


        // ======================================
        // MUNDO
        // ======================================

        const title =
            this.add.text(
                400,
                155,
                "MUNDO 1",
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


        // ======================================
        // TÍTULO PRINCIPAL
        // ======================================

        const subtitle =
            this.add.text(
                400,
                200,
                "COMPROMISO Y CONTROL",
                {
                    fontFamily: "Arial",
                    fontSize: "31px",
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


        // ======================================
        // SUBTÍTULO
        // ======================================

        const description =
            this.add.text(
                400,
                255,
                "Explora · aprende · asegura · avanza",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#BDE588",
                    align: "center"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(91);


        // ======================================
        // CONTEXTO
        // ======================================

        const info =
            this.add.text(
                400,
                310,
                "Version - BETA",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#F5F9ED",
                    align: "center"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(91);


        // ======================================
        // ANIMACIÓN DE SALIDA
        // ======================================

        this.tweens.add({

            targets: [
                overlay,
                title,
                subtitle,
                description,
                info
            ],

            alpha: 0,

            delay: 1400,

            duration: 850,

            ease: "Cubic.easeOut",

            onComplete: () => {

                overlay.destroy();
                title.destroy();
                subtitle.destroy();
                description.destroy();
                info.destroy();
            }
        });
    }


    // ======================================
    // REGRESAR
    // ======================================

    returnToMenu() {

        this.touchControls?.destroy();

        this.scene.start(
            "MenuScene"
        );
    }
}
