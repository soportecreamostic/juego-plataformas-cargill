// ==========================================
// ESTACIÓN INTERACTIVA DE APRENDIZAJE
// ==========================================

export default class KnowledgeStation {

    constructor(scene, x, y, data) {

        this.scene = scene;
        this.x = x;
        this.y = y;

        this.title = data.title;
        this.content = data.content;
        this.reward = data.reward;
        this.onKnowledgeEarned = data.onKnowledgeEarned;
        this.isMobile = this.scene.registry.get("deviceMode") === "mobile";

        this.isDiscovered = false;
        this.panelIsOpen = false;

        this.createWorldVisual();
        this.createTrigger();
        this.createPanel();
    }


    // ======================================
    // ESTACIÓN VISIBLE EN EL NIVEL
    // ======================================

    // ======================================
    // ESTACIÓN DE CONOCIMIENTO CARGILL
    // ======================================

    // ======================================
    // SEÑAL DE CONOCIMIENTO CARGILL
    // ======================================

    createWorldVisual() {

        // ======================================
        // RESPLANDOR
        // ======================================

        const glow =
            this.scene.add.circle(
                0,
                0,
                60,
                0xBDE588,
                0.12
            );


        // ======================================
        // POSTE
        // ======================================

        const post =
            this.scene.add.rectangle(
                0,
                42,
                10,
                58,
                0x012912
            );


        // ======================================
        // BASE
        // ======================================

        const base =
            this.scene.add.rectangle(
                0,
                70,
                70,
                12,
                0x012912
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        // ======================================
        // CARTEL
        // ======================================

        const sign =
            this.scene.add.rectangle(
                0,
                -5,
                92,
                76,
                0xF5F9ED
            )
                .setStrokeStyle(
                    4,
                    0x398245,
                    1
                );


        // ======================================
        // CABECERA VERDE
        // ======================================

        const signHeader =
            this.scene.add.rectangle(
                0,
                -34,
                88,
                16,
                0x012912
            );


        // ======================================
        // ICONO
        // ======================================

        const iconCircle =
            this.scene.add.circle(
                0,
                -10,
                16,
                0x398245
            )
                .setStrokeStyle(
                    3,
                    0xBDE588,
                    1
                );


        const icon =
            this.scene.add.text(
                0,
                -10,
                "✦",
                {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
                .setOrigin(0.5);


        // ======================================
        // TÍTULO
        // ======================================

        const stationName =
            this.scene.add.text(
                0,
                20,
                this.title,
                {
                    fontFamily: "Arial",
                    fontSize: "11px",
                    fontStyle: "bold",
                    color: "#012912",
                    align: "center"
                }
            )
                .setOrigin(0.5);


        // ======================================
        // PEQUEÑA LÍNEA DECORATIVA
        // ======================================

        const accent =
            this.scene.add.rectangle(
                0,
                32,
                48,
                4,
                0xBDE588
            );


        // ======================================
        // CONTENEDOR
        // ======================================

        this.visual =
            this.scene.add.container(
                this.x,
                this.y,
                [
                    glow,
                    post,
                    base,
                    sign,
                    signHeader,
                    iconCircle,
                    icon,
                    stationName,
                    accent
                ]
            );

        this.visual.setDepth(1);


        // ======================================
        // ANIMACIÓN
        // ======================================

        this.scene.tweens.add({

            targets: glow,

            scale: 1.15,

            alpha: 0.05,

            duration: 1000,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"
        });


        // ======================================
        // PROMPT
        // ======================================

        const promptBackground =
            this.scene.add.rectangle(
                0,
                0,
                118,
                30,
                0x012912,
                0.96
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        this.promptText =
            this.scene.add.text(
                0,
                0,
                "E  CONOCER",
                {
                    fontFamily: "Arial",
                    fontSize: "12px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
                .setOrigin(0.5);


        this.prompt =
            this.scene.add.container(
                this.x,
                this.y - 65,
                [
                    promptBackground,
                    this.promptText
                ]
            )
                .setDepth(3)
                .setVisible(false);


        // ======================================
        // ESTADO APRENDIDO
        // ======================================

        this.completedBadge =
            this.scene.add.text(
                this.x,
                this.y - 65,
                "APRENDIDO",
                {
                    fontFamily: "Arial",
                    fontSize: "11px",
                    fontStyle: "bold",
                    color: "#012912",
                    backgroundColor: "#F5F9ED",
                    padding: {
                        x: 9,
                        y: 5
                    }
                }
            )
                .setOrigin(0.5)
                .setDepth(3)
                .setVisible(false);
    }


    // ======================================
    // ZONA QUE DETECTA AL JUGADOR
    // ======================================

    createTrigger() {

        this.trigger = this.scene.add.zone(
            this.x,
            this.y + 8,
            96,
            112
        );

        this.scene.physics.add.existing(
            this.trigger,
            true
        );
    }


    // ======================================
    // PANEL EDUCATIVO EN PANTALLA
    // ======================================

    // ======================================
// PANEL EDUCATIVO CARGILL
// ======================================

    createPanel() {

        // ======================================
        // FONDO OSCURO
        // ======================================

        const overlay =
            this.scene.add.rectangle(
                0,
                0,
                800,
                450,
                0x012912,
                0.88
            );


        // ======================================
        // TARJETA
        // ======================================

        const card =
            this.scene.add.rectangle(
                0,
                0,
                590,
                330,
                0xF5F9ED
            )
                .setStrokeStyle(
                    4,
                    0x398245,
                    1
                );


        // ======================================
        // ACENTO LATERAL
        // ======================================

        const accent =
            this.scene.add.rectangle(
                -273,
                0,
                12,
                330,
                0xBDE588
            );


        // ======================================
        // CABECERA
        // ======================================

        const heading =
            this.scene.add.text(
                -230,
                -124,
                "ESTACIÓN DE CONOCIMIENTO",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#398245"
                }
            );


        // ======================================
        // TÍTULO
        // ======================================

        const title =
            this.scene.add.text(
                -230,
                -88,
                this.title,
                {
                    fontFamily: "Arial",
                    fontSize: "31px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            );


        // ======================================
        // CONTENIDO
        // ======================================

        const content =
            this.scene.add.text(
                -230,
                -26,
                this.content,
                {
                    fontFamily: "Arial",
                    fontSize: this.isMobile
                        ? "14px"
                        : "15px",
                    color: "#012912",
                    lineSpacing: 5,
                    wordWrap: {
                        width: 450
                    }
                }
            );


        // ======================================
        // RECOMPENSA
        // ======================================

        const rewardBackground =
            this.scene.add.rectangle(
                -125,
                94,
                210,
                34,
                0xBDE588
            )
                .setStrokeStyle(
                    2,
                    0x398245,
                    1
                );


        const rewardText =
            this.scene.add.text(
                -125,
                94,
                `CONOCIMIENTO +${this.reward}`,
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
                .setOrigin(0.5);


        // ======================================
        // BOTÓN CERRAR
        // ======================================

        const closeBackground =
            this.scene.add.rectangle(
                0,
                0,
                166,
                34,
                0x012912
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        const closeHint =
            this.scene.add.text(
                0,
                0,
                this.isMobile
                    ? "TOCA PARA CERRAR"
                    : "E · CERRAR",
                {
                    fontFamily: "Arial",
                    fontSize: this.isMobile
                        ? "11px"
                        : "13px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
                .setOrigin(0.5);


        this.closeButton =
            this.scene.add.container(
                194,
                116,
                [
                    closeBackground,
                    closeHint
                ]
            )
                .setSize(
                    166,
                    34
                )
                .setInteractive({
                    useHandCursor: true
                });


        // ======================================
        // HOVER DEL BOTÓN
        // ======================================

        this.closeButton.on(
            "pointerover",
            () => {

                closeBackground.setFillStyle(
                    0x398245
                );

                closeHint.setColor(
                    "#F5F9ED"
                );
            }
        );


        this.closeButton.on(
            "pointerout",
            () => {

                closeBackground.setFillStyle(
                    0x012912
                );

                closeHint.setColor(
                    "#F5F9ED"
                );
            }
        );


        // ======================================
        // CERRAR
        // ======================================

        this.closeButton.on(
            "pointerdown",
            () => {

                if (this.panelIsOpen) {

                    this.closePanel();
                }
            }
        );


        // ======================================
        // CONTENEDOR PRINCIPAL
        // ======================================

        this.panel =
            this.scene.add.container(
                400,
                225,
                [
                    overlay,
                    card,
                    accent,
                    heading,
                    title,
                    content,
                    rewardBackground,
                    rewardText,
                    this.closeButton
                ]
            )
                .setDepth(100)
                .setScrollFactor(
                    0,
                    0,
                    true
                )
                .setVisible(false);
    }


    // ======================================
    // INTERACCIÓN EN CADA FRAME
    // ======================================

    update(player, interactPressed) {

    const playerIsNear = this.scene.physics.overlap(
        player,
        this.trigger
    );

    this.promptText.setText(
    this.isDiscovered ?
        "E  REVISAR" :
        "E  CONOCER"
    );

    this.prompt.setVisible(
        playerIsNear &&
        !this.panelIsOpen
    );

    if (!interactPressed) {
        return;
    }

    if (this.panelIsOpen) {
        this.closePanel();
        return;
    }

    if (playerIsNear) {
        this.openPanel();
    }
    }


    // ======================================
    // ABRIR Y CERRAR EL CONTENIDO
    // ======================================

    openPanel() {

    this.panelIsOpen = true;

    this.panel.setVisible(true);
    this.prompt.setVisible(false);

    if (!this.isDiscovered) {

        this.isDiscovered = true;

        this.completedBadge.setVisible(true);

        this.onKnowledgeEarned(this.reward);
    }
    }


    closePanel() {

        this.panelIsOpen = false;
        this.panel.setVisible(false);
    }


    isReading() {

        return this.panelIsOpen;
    }
}
