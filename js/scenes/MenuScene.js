// ==========================================
// MENÚ PRINCIPAL · CARGILL
// ==========================================

export default class MenuScene extends Phaser.Scene {

    constructor() {

        super("MenuScene");
    }


    // ==========================================
    // CREATE
    // ==========================================


    preload() {

        this.load.svg(
            "cargillLogo",
            "assets/images/cargill-logo.svg",
        );
    }



    create() {

        // --------------------------------------
        // REGISTRO DEL DISPOSITIVO
        // --------------------------------------

        this.registry.set(
            "deviceMode",
            this.detectDevice()
        );


        // --------------------------------------
        // FONDO
        // --------------------------------------

        this.createBackground();


        // --------------------------------------
        // DECORACIÓN
        // --------------------------------------

        this.createDecorations();


        // --------------------------------------
        // LOGO
        // --------------------------------------

        this.createLogo();


        // --------------------------------------
        // TÍTULO
        // --------------------------------------

        this.createTitle();


        // --------------------------------------
        // BOTÓN JUGAR
        // --------------------------------------

        this.createPlayButton();

        this.createControlsScreen();
    }


    // ==========================================
    // DETECTAR DISPOSITIVO
    // ==========================================

    detectDevice() {

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        const isTouch =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0;

        if (
            isTouch &&
            width <= 900
        ) {

            return "mobile";
        }

        return "desktop";
    }


    // ==========================================
    // FONDO CARGILL
    // ==========================================

    createBackground() {

        this.cameras.main.setBackgroundColor(
            "#F5F9ED"
        );


        const background =
            this.add.graphics();


        // --------------------------------------
        // COLOR BASE
        // --------------------------------------

        background.fillStyle(
            0xF5F9ED,
            1
        );

        background.fillRect(
            0,
            0,
            800,
            450
        );


        // --------------------------------------
        // VERDE PRINCIPAL
        // --------------------------------------

        background.fillStyle(
            0x398245,
            1
        );

        background.fillCircle(
            40,
            80,
            150
        );


        background.fillCircle(
            760,
            370,
            190
        );


        // --------------------------------------
        // VERDE OSCURO
        // --------------------------------------

        background.fillStyle(
            0x012912,
            1
        );

        background.fillRect(
            0,
            390,
            800,
            60
        );


        background.fillCircle(
            790,
            40,
            120
        );


        // --------------------------------------
        // VERDE LIMA
        // --------------------------------------

        background.fillStyle(
            0xBDE588,
            1
        );

        background.fillCircle(
            100,
            0,
            95
        );


        background.fillCircle(
            720,
            450,
            110
        );


        // --------------------------------------
        // FORMAS ORGÁNICAS CENTRALES
        // --------------------------------------

        background.fillStyle(
            0xBDE588,
            0.75
        );

        background.fillEllipse(
            165,
            105,
            170,
            90
        );


        background.fillStyle(
            0x398245,
            0.10
        );

        background.fillEllipse(
            625,
            175,
            310,
            170
        );


        // --------------------------------------
        // LÍNEAS DECORATIVAS
        // --------------------------------------

        background.lineStyle(
            2,
            0x012912,
            0.5
        );

        background.strokeEllipse(
            150,
            112,
            175,
            92
        );


        background.lineStyle(
            2,
            0x398245,
            0.45
        );

        background.lineBetween(
            25,
            360,
            180,
            315
        );

        background.lineBetween(
            180,
            315,
            300,
            350
        );


        // --------------------------------------
        // PUNTOS DECORATIVOS
        // --------------------------------------

        const dotColor =
            0x398245;

        const dots = [

            [640, 65],
            [660, 65],
            [680, 65],

            [640, 85],
            [660, 85],
            [680, 85],

            [640, 105],
            [660, 105],
            [680, 105]

        ];


        dots.forEach(
            ([x, y]) => {

                background.fillCircle(
                    x,
                    y,
                    4
                );
            }
        );


        background.setDepth(-10);
    }


    // ==========================================
    // DECORACIONES
    // ==========================================

    createDecorations() {

        // --------------------------------------
        // PEQUEÑOS CÍRCULOS
        // --------------------------------------

        const circles = [

            [65, 180, 7],
            [735, 120, 6],
            [580, 355, 8],
            [250, 70, 5]

        ];


        circles.forEach(
            ([x, y, radius]) => {

                this.add.circle(
                    x,
                    y,
                    radius,
                    0x398245,
                    0.75
                );
            }
        );


        // --------------------------------------
        // SÍMBOLOS GEOMÉTRICOS
        // --------------------------------------

        this.add.triangle(
            715,
            300,
            0,
            30,
            20,
            0,
            40,
            30,
            0xBDE588,
            0.8
        );


        this.add.triangle(
            685,
            330,
            0,
            20,
            14,
            0,
            28,
            20,
            0x398245,
            0.85
        );
    }


    // ==========================================
    // LOGO CARGILL
    // ==========================================

    createLogo() {

        this.textures
            .get("cargillLogo")
            .setFilter(
                Phaser.Textures.FilterMode.LINEAR
            );

        const logo = this.add.image(
            400,
            105,
            "cargillLogo"
        );

        logo.setOrigin(0.5);
        logo.setScale(0.20);
        logo.setDepth(10);

        return logo;
    }


    // ==========================================
    // TÍTULO
    // ==========================================

    createTitle() {

        this.add.text(
            400,
            195,
            "UNA AVENTURA CARGILL",
            {
                fontFamily: "Arial",
                fontSize: "27px",
                fontStyle: "bold",
                color: "#398245",
                align: "center"
            }
        )
        .setOrigin(0.5);


        this.add.text(
            400,
            225,
            "Explora · Aprende · Avanza",
            {
                fontFamily: "Arial",
                fontSize: "16px",
                color: "#012912",
                align: "center"
            }
        )
        .setOrigin(0.5);
    }


    // ==========================================
    // BOTÓN JUGAR
    // ==========================================

    createPlayButton() {

        // ======================================
        // CONTENEDOR DEL BOTÓN
        // ======================================

        this.playButton =
            this.add.container(
                400,
                300
            )
                .setSize(
                    250,
                    66
                )
                .setDepth(20)
                .setInteractive({
                    useHandCursor: true
                });


        // ======================================
        // SOMBRA
        // ======================================

        const shadow =
            this.add.rectangle(
                0,
                5,
                250,
                66,
                0x012912,
                0.25
            );


        // ======================================
        // CUERPO PRINCIPAL
        // ======================================

        const body =
            this.add.rectangle(
                0,
                0,
                250,
                66,
                0x398245
            );


        body.setStrokeStyle(
            3,
            0xBDE588,
            1
        );


        // ======================================
        // BLOQUE DEL ICONO
        // ======================================

        const iconBox =
            this.add.rectangle(
                -91,
                0,
                54,
                54,
                0xBDE588
            );


        iconBox.setStrokeStyle(
            2,
            0x398245,
            1
        );


        // ======================================
        // TRIÁNGULO DE PLAY
        // ======================================

        const playIcon =
            this.add.triangle(
                -91,
                14,
                -9,
                -14,
                -9,
                14,
                13,
                0,
                0x398245,
                1
            );


        // ======================================
        // TEXTO
        // ======================================

        const text =
            this.add.text(
                -5,
                0,
                "JUGAR",
                {
                    fontFamily: "Arial",
                    fontSize: "25px",
                    fontStyle: "bold",
                    color: "#FFFFFF"
                }
            )
                .setOrigin(0.5);


        // ======================================
        // AGREGAR ELEMENTOS
        // ======================================

        this.playButton.add([
            shadow,
            body,
            iconBox,
            playIcon,
            text
        ]);


        // ======================================
        // HOVER
        // ======================================

        this.playButton.on(
            "pointerover",
            () => {

                body.setFillStyle(
                    0x129049
                );

                iconBox.setFillStyle(
                    0xD4F2A5
                );

                this.playButton.setScale(
                    1.04
                );
            }
        );


        // ======================================
        // SALIR
        // ======================================

        this.playButton.on(
            "pointerout",
            () => {

                body.setFillStyle(
                    0x398245
                );

                iconBox.setFillStyle(
                    0xBDE588
                );

                this.playButton.setScale(
                    1
                );
            }
        );


        // ======================================
        // PRESIONAR
        // ======================================

        this.playButton.on(
            "pointerdown",
            () => {

                this.playButton.setScale(
                    0.97
                );
            }
        );


        // ======================================
        // SOLTAR / INICIAR
        // ======================================

        this.playButton.on(
            "pointerup",
            () => {

                this.playButton.setVisible(false);

                this.controlsContainer.setVisible(true);
            }
        );
    }

    createControlsScreen() {

        this.controlsContainer =
            this.add.container(0, 0);

        this.controlsContainer.setDepth(100);

        // Fondo
        const background =
            this.add.rectangle(
                400,
                225,
                800,
                450,
                0xF5F9ED,
                1
            );

        // Título
        const title =
            this.add.text(
                400,
                65,
                "CONTROLES DEL JUEGO",
                {
                    fontFamily: "Arial",
                    fontSize: "30px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
                .setOrigin(0.5);

        // Subtítulo
        const subtitle =
            this.add.text(
                400,
                105,
                "Aprende a moverte e interactuar (Teclado)",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#398245"
                }
            )
                .setOrigin(0.5);

        // Panel
        const panel =
            this.add.rectangle(
                400,
                250,
                560,
                230,
                0xFFFFFF,
                1
            );

        panel.setStrokeStyle(
            3,
            0x398245,
            1
        );

        const moveTitle =
            this.add.text(
                270,
                155,
                "MOVER",
                {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
                .setOrigin(0.5);

        const moveText =
            this.add.text(
                270,
                205,
                "←  →",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    fontStyle: "bold",
                    color: "#398245"
                }
            )
                .setOrigin(0.5);

        const jumpTitle =
            this.add.text(
                400,
                155,
                "SALTAR",
                {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
                .setOrigin(0.5);

        const jumpText =
            this.add.text(
                400,
                205,
                "↑",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    fontStyle: "bold",
                    color: "#398245"
                }
            )
                .setOrigin(0.5);

        const interactTitle =
            this.add.text(
                530,
                155,
                "INTERACTUAR",
                {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
                .setOrigin(0.5);

        const interactText =
            this.add.text(
                530,
                205,
                "E",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    fontStyle: "bold",
                    color: "#398245"
                }
            )
                .setOrigin(0.5);

        this.controlsContainer.add([
            background,
            title,
            subtitle,
            panel,
            moveTitle,
            moveText,
            jumpTitle,
            jumpText,
            interactTitle,
            interactText
        ]);

        const continueButton =
            this.add.rectangle(
                400,
                365,
                220,
                55,
                0x398245,
                1
            )
                .setInteractive({
                    useHandCursor: true
                });

        continueButton.setStrokeStyle(
            2,
            0xBDE588,
            1
        );

        const continueText =
            this.add.text(
                400,
                365,
                "CONTINUAR",
                {
                    fontFamily: "Arial",
                    fontSize: "19px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
                .setOrigin(0.5);

        continueButton.on(
            "pointerover",
            () => {

                continueButton.setFillStyle(
                    0x012912
                );
            }
        );

        continueButton.on(
            "pointerout",
            () => {

                continueButton.setFillStyle(
                    0x398245
                );
            }
        );

        continueButton.on(
            "pointerdown",
            () => {

                continueButton.setScale(0.97);
            }
        );

        continueButton.on(
            "pointerup",
            () => {

                this.scene.start(
                    "AdventureScene"
                );
            }
        );

        this.controlsContainer.add([
            continueButton,
            continueText
        ]);

        this.controlsContainer.setVisible(false);
    }
}