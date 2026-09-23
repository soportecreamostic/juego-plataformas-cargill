export default class LabConsole {

    constructor(scene, x, y, data = {}) {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.title =
            data.title || "CONSOLA CENTRAL";

        this.isActivated = false;
        this.isProcessing = false;

        this.createVisual();
        this.createTrigger();
        this.createPrompt();
    }

    // ======================================
    // COSECHADORA DE CONTROL CARGILL
    // ======================================

    createVisual() {

        // ======================================
        // RESPLANDOR
        // ======================================

        const glow =
            this.scene.add.circle(
                0,
                -35,
                75,
                0xBDE588,
                0.14
            );


        // ======================================
        // SOMBRA
        // ======================================

        const shadow =
            this.scene.add.ellipse(
                0,
                48,
                150,
                24,
                0x012912,
                0.22
            );


        // ======================================
        // RUEDA TRASERA
        // ======================================

        const wheelBack =
            this.scene.add.circle(
                -48,
                38,
                20,
                0x012912
            )
                .setStrokeStyle(
                    3,
                    0x398245,
                    1
                );


        const wheelBackHub =
            this.scene.add.circle(
                -48,
                38,
                8,
                0xBDE588
            );


        // ======================================
        // RUEDA DELANTERA
        // ======================================

        const wheelFront =
            this.scene.add.circle(
                44,
                40,
                25,
                0x012912
            )
                .setStrokeStyle(
                    3,
                    0x398245,
                    1
                );


        const wheelFrontHub =
            this.scene.add.circle(
                44,
                40,
                10,
                0xBDE588
            );


        // ======================================
        // CHASIS
        // ======================================

        const chassis =
            this.scene.add.rectangle(
                0,
                22,
                112,
                28,
                0x398245
            )
                .setStrokeStyle(
                    3,
                    0xBDE588,
                    1
                );


        // ======================================
        // CUERPO PRINCIPAL
        // ======================================

        const body =
            this.scene.add.rectangle(
                -8,
                -2,
                92,
                58,
                0xF5F9ED
            )
                .setStrokeStyle(
                    3,
                    0x012912,
                    1
                );


        // ======================================
        // PARTE VERDE DELANTERA
        // ======================================

        const front =
            this.scene.add.rectangle(
                49,
                8,
                28,
                42,
                0x012912
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        // ======================================
        // CABINA
        // ======================================

        const cabin =
            this.scene.add.rectangle(
                -25,
                -25,
                48,
                38,
                0x012912
            )
                .setStrokeStyle(
                    3,
                    0x398245,
                    1
                );


        // ======================================
        // VENTANAS
        // ======================================

        const windowFront =
            this.scene.add.rectangle(
                -7,
                -25,
                25,
                22,
                0x129087
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        const windowSide =
            this.scene.add.rectangle(
                -36,
                -25,
                12,
                22,
                0x398245
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        // ======================================
        // TOLVA SUPERIOR
        // ======================================

        const hopper =
            this.scene.add.rectangle(
                36,
                -22,
                32,
                24,
                0x398245
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        // ======================================
        // LUZ DE CONTROL
        // ======================================

        const core =
            this.scene.add.circle(
                49,
                -7,
                7,
                0xBDE588
            )
                .setStrokeStyle(
                    2,
                    0x012912,
                    1
                );


        // ======================================
        // LUCES FRONTALES
        // ======================================

        const lightLeft =
            this.scene.add.circle(
                61,
                3,
                5,
                0xF5F9ED
            );

        const lightRight =
            this.scene.add.circle(
                61,
                17,
                5,
                0xF5F9ED
            );


        // ======================================
        // TUBO SUPERIOR
        // ======================================

        const pipe =
            this.scene.add.rectangle(
                18,
                -52,
                7,
                28,
                0x012912
            );

        const pipeTop =
            this.scene.add.rectangle(
                24,
                -66,
                20,
                7,
                0x012912
            );


        // ======================================
        // BRAZO / CABEZAL FRONTAL
        // ======================================

        const arm =
            this.scene.add.rectangle(
                82,
                16,
                38,
                8,
                0x012912
            );


        const header =
            this.scene.add.rectangle(
                103,
                27,
                24,
                14,
                0x398245
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        // ======================================
        // LOGOTIPO / MARCA
        // ======================================

        const brand =
            this.scene.add.text(
                -2,
                5,
                "CARGILL",
                {
                    fontFamily: "Arial",
                    fontSize: "9px",
                    fontStyle: "bold",
                    color: "#012912"
                }
            )
                .setOrigin(0.5);


        // ======================================
        // CONTENEDOR
        // ======================================

        this.visual =
            this.scene.add.container(
                this.x,
                this.y,
                [
                    glow,
                    shadow,

                    wheelBack,
                    wheelBackHub,

                    wheelFront,
                    wheelFrontHub,

                    chassis,
                    body,
                    front,

                    cabin,
                    windowFront,
                    windowSide,

                    hopper,

                    core,

                    lightLeft,
                    lightRight,

                    pipe,
                    pipeTop,

                    arm,
                    header,

                    brand
                ]
            );

        this.glow = glow;

        // Importante:
        // activate() utiliza this.core
        this.core = core;

        this.visual.setDepth(6);


        // ======================================
        // ANIMACIÓN DEL RESPLANDOR
        // ======================================

        this.scene.tweens.add({

            targets: this.glow,

            scale: 1.15,

            alpha: 0.05,

            duration: 1100,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"
        });


        // ======================================
        // ANIMACIÓN DE LA LUZ
        // ======================================

        this.scene.tweens.add({

            targets: this.core,

            alpha: 0.55,

            scale: 1.18,

            duration: 700,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"
        });
    }

    createTrigger() {

        this.trigger = this.scene.add.zone(
            this.x,
            this.y - 10,
            95,
            100
        );

        this.scene.physics.add.existing(
            this.trigger,
            true
        );
    }

    createPrompt() {

        this.prompt = this.scene.add.text(
            this.x,
            this.y - 78,
            "E  ACTIVAR",
            {
                fontFamily: "Arial",
                fontSize: "15px",
                fontStyle: "bold",
                color: "#FFFFFF",
                backgroundColor: "#00557F",
                padding: {
                    x: 10,
                    y: 7
                }
            }
        )
        .setOrigin(0.5)
        .setDepth(15)
        .setVisible(false);
    }

    update(player, interactPressed) {

        if (
            !this.trigger ||
            this.isActivated
        ) {
            return;
        }

        const playerNear =
            this.scene.physics.overlap(
                player,
                this.trigger
            );

        this.prompt.setVisible(
            playerNear
        );

        if (
            playerNear &&
            interactPressed
        ) {

            this.activate(player);
        }
    }

    activate(player) {

        if (
            this.isActivated ||
            this.isProcessing
        ) {
            return;
        }

        this.isProcessing = true;

        this.prompt.setVisible(false);

        player.setVelocityX(0);

        const processingText =
            this.scene.add.text(
                this.x,
                this.y - 82,
                "INICIANDO...",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#FFFFFF",
                    backgroundColor: "#00557F",
                    padding: {
                        x: 10,
                        y: 7
                    }
                }
            )
                .setOrigin(0.5)
                .setDepth(20);

        this.scene.tweens.add({
            targets: this.core,
            scale: 1.6,
            alpha: 0.3,
            duration: 180,
            yoyo: true,
            repeat: 5,
            ease: "Sine.easeInOut"
        });

        this.scene.tweens.add({
            targets: this.visual,
            scale: 1.05,
            duration: 250,
            yoyo: true,
            repeat: 2
        });

        this.scene.time.delayedCall(
            1600,
            () => {

                processingText.destroy();

                this.showCompletion();
            }
        );
    }

    // ======================================
// COMPLETAR MUNDO 1
// ======================================

    showCompletion() {

        this.core.setFillStyle(
            0xBDE588
        );


        const overlay =
            this.scene.add.rectangle(
                400,
                225,
                800,
                450,
                0x012912,
                0.94
            )
                .setScrollFactor(0)
                .setDepth(100);


        const title =
            this.scene.add.text(
                400,
                165,
                "MUNDO 1 COMPLETADO",
                {
                    fontFamily: "Arial",
                    fontSize: "30px",
                    fontStyle: "bold",
                    color: "#F5F9ED"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(101);


        const subtitle =
            this.scene.add.text(
                400,
                215,
                "COMPROMISO Y CONTROL",
                {
                    fontFamily: "Arial",
                    fontSize: "20px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(101);


        const message =
            this.scene.add.text(
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
                .setDepth(101);


        this.scene.time.delayedCall(
            2500,
            () => {

                overlay.destroy();
                title.destroy();
                subtitle.destroy();
                message.destroy();

                this.isActivated = true;
            }
        );
    }

    getObject() {

        return this.trigger;
    }
}