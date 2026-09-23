export default class Checkpoint {

    constructor(scene, x, y, data = {}) {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.label =
            data.label || "ESTACIÓN DE RESGUARDO";

        this.isActivated = false;
        this.isRepairing = false;

        // ======================================
        // POSICIONAMIENTO SOBRE PLATAFORMA
        // ======================================

        this.platformBottomOffset = 24;

        this.alignToPlatform();

        this.createVisual();
        this.createTrigger();
        this.createPrompt();
    }

    alignToPlatform() {

        if (
            !this.scene.platforms ||
            this.scene.platforms.length === 0
        ) {
            return;
        }

        let nearestPlatform = null;
        let nearestDistance = Infinity;

        this.scene.platforms.forEach(
            (platform) => {

                const platformObject =
                    platform.getObject();

                const bounds =
                    platformObject.getBounds();

                let horizontalDistance = 0;

                // El checkpoint está dentro del ancho
                // de la plataforma
                if (
                    this.x >= bounds.left &&
                    this.x <= bounds.right
                ) {

                    horizontalDistance = 0;

                } else if (this.x < bounds.left) {

                    horizontalDistance =
                        bounds.left - this.x;

                } else {

                    horizontalDistance =
                        this.x - bounds.right;
                }

                if (
                    horizontalDistance <
                    nearestDistance
                ) {

                    nearestDistance =
                        horizontalDistance;

                    nearestPlatform =
                        bounds;
                }
            }
        );

        if (!nearestPlatform) {
            return;
        }

        // ======================================
        // AJUSTAR HORIZONTALMENTE
        // ======================================

        if (
            this.x < nearestPlatform.left ||
            this.x > nearestPlatform.right
        ) {

            this.x =
                nearestPlatform.centerX;
        }

        // ======================================
        // AJUSTAR VERTICALMENTE
        // ======================================

        this.y =
            nearestPlatform.top -
            this.platformBottomOffset;

        console.log(
            `🟢 Checkpoint ajustado a plataforma: ${this.x}, ${this.y}`
        );
    }

    // ======================================
// PUNTO DE CONTROL CARGILL
// ======================================

    // ======================================
// BALIZA DE SEGURIDAD CARGILL
// ======================================

    createVisual() {

        // ======================================
        // RESPLANDOR
        // ======================================

        const glow =
            this.scene.add.circle(
                0,
                -48,
                38,
                0xBDE588,
                0.15
            );


        // ======================================
        // BASE EN EL SUELO
        // ======================================

        const base =
            this.scene.add.rectangle(
                0,
                18,
                64,
                10,
                0x012912
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        // ======================================
        // CUERPO DE LA BALIZA
        // ======================================

        const body =
            this.scene.add.rectangle(
                0,
                -12,
                34,
                58,
                0xF5F9ED
            )
                .setStrokeStyle(
                    3,
                    0x398245,
                    1
                );


        // ======================================
        // FRANJA SUPERIOR
        // ======================================

        const topBand =
            this.scene.add.rectangle(
                0,
                -31,
                30,
                9,
                0x012912
            );


        // ======================================
        // PANEL CENTRAL
        // ======================================

        const panel =
            this.scene.add.rectangle(
                0,
                -10,
                22,
                24,
                0x398245
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        // ======================================
        // SÍMBOLO DE SEGURIDAD
        // ======================================

        const symbol =
            this.scene.add.text(
                0,
                -10,
                "✓",
                {
                    fontFamily: "Arial",
                    fontSize: "15px",
                    fontStyle: "bold",
                    color: "#BDE588"
                }
            )
                .setOrigin(0.5);


        // ======================================
        // BALIZA LUMINOSA
        // ======================================

        const beaconOuter =
            this.scene.add.circle(
                0,
                -48,
                12,
                0x012912
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    1
                );


        const beacon =
            this.scene.add.circle(
                0,
                -48,
                7,
                0x129087
            );


        // ======================================
        // ANILLO DE SEGURIDAD
        // ======================================

        const ring =
            this.scene.add.circle(
                0,
                -48,
                20
            )
                .setStrokeStyle(
                    2,
                    0xBDE588,
                    0.65
                );


        // ======================================
        // CONECTORES LATERALES
        // ======================================

        const sideLeft =
            this.scene.add.rectangle(
                -22,
                2,
                8,
                4,
                0x398245
            );

        const sideRight =
            this.scene.add.rectangle(
                22,
                2,
                8,
                4,
                0x398245
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
                    base,
                    body,
                    topBand,
                    panel,
                    symbol,
                    beaconOuter,
                    beacon,
                    ring,
                    sideLeft,
                    sideRight
                ]
            );

        this.glow = glow;

        // Importante:
        // showActivationEffect() utiliza this.core
        this.core = beacon;

        this.visual.setDepth(4);


        // ======================================
        // ANIMACIÓN DEL RESPLANDOR
        // ======================================

        this.scene.tweens.add({

            targets: glow,

            scale: 1.2,

            alpha: 0.05,

            duration: 900,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"
        });


        // ======================================
        // ANIMACIÓN DE LA BALIZA
        // ======================================

        this.scene.tweens.add({

            targets: beacon,

            alpha: 0.45,

            scale: 1.15,

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
            75,
            85
        );

        this.scene.physics.add.existing(
            this.trigger,
            true
        );
    }

    createPrompt() {

        this.prompt = this.scene.add.text(
            this.x,
            this.y - 58,
            "E  Activar",
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

        if (!this.trigger || this.isRepairing) {
            return;
        }

        const playerNear =
            this.scene.physics.overlap(
                player,
                this.trigger
            );

        // Máquina ya reparada
        if (this.isActivated) {
            return;
        }

        // Mostrar u ocultar el mensaje
        this.prompt.setVisible(playerNear);

        if (
            playerNear &&
            interactPressed
        ) {

            this.activate(player);
        }
    }

    activate(player) {

        if (this.isActivated || this.isRepairing) {
            return;
        }

        this.isRepairing = true;

        this.prompt.setVisible(false);

        // El científico se detiene mientras trabaja
        player.setVelocityX(0);

        // Mensaje de reparación
        const repairText = this.scene.add.text(
            this.x,
            this.y - 72,
            "REPARANDO...",
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

        // Efecto de reparación del núcleo
        this.scene.tweens.add({
            targets: this.core,
            scale: 1.4,
            alpha: 0.4,
            duration: 200,
            yoyo: true,
            repeat: 4,
            ease: "Sine.easeInOut"
        });

        // Pequeña vibración de la máquina
        this.scene.tweens.add({
            targets: this.visual,
            x: this.x + 2,
            duration: 80,
            yoyo: true,
            repeat: 5,
            ease: "Sine.easeInOut"
        });

        // Finalizar reparación
        this.scene.time.delayedCall(
            1200,
            () => {

                this.isRepairing = false;
                this.isActivated = true;

                this.scene.setCheckpoint(
                    this.x,
                    this.y - 55
                );

                repairText.destroy();

                this.showActivationEffect();
            }
        );
    }

    showActivationEffect() {

        this.core.setFillStyle(
            0x41C0F0
        );

        this.scene.tweens.add({
            targets: this.core,
            scale: 1.5,
            alpha: 0.3,
            duration: 250,
            yoyo: true,
            repeat: 2
        });

        const message = this.scene.add.text(
            this.x,
            this.y - 72,
            "✓ RESGUARDO ACTIVADO",
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
            targets: message,
            y: this.y - 98,
            alpha: 0,
            duration: 1800,
            onComplete: () => {
                message.destroy();
            }
        });

        this.scene.tweens.add({
            targets: this.visual,
            scale: 1.08,
            duration: 250,
            yoyo: true
        });
    }

    getObject() {

        return this.trigger;
    }
}