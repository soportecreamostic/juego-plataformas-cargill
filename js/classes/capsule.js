export default class Capsule {

    constructor(scene, x, y, data = {}) {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.type = data.type || "science";
        this.duration = data.duration || 8000;

        this.isCollected = false;

        this.createVisual();
        this.createTrigger();
    }


    // ======================================
    // APARIENCIA DE LA CÁPSULA
    // ======================================

    createVisual() {

        // ======================================
        // COLOR SEGÚN HABILIDAD
        // ======================================

        let capsuleColor =
            0xBDE588;

        let centerColor =
            0x398245;


        if (
            this.type === "technology"
        ) {

            capsuleColor =
                0x398245;

            centerColor =
                0x012912;
        }


        // ======================================
        // AURA
        // ======================================

        const glow =
            this.scene.add.circle(
                0,
                0,
                25,
                capsuleColor,
                0.20
            );


        // ======================================
        // CUERPO
        // ======================================

        const capsule =
            this.scene.add.rectangle(
                0,
                0,
                22,
                38,
                0xF5F9ED
            )
                .setStrokeStyle(
                    3,
                    capsuleColor
                )
                .setAngle(20);


        // ======================================
        // NÚCLEO
        // ======================================

        const center =
            this.scene.add.rectangle(
                0,
                0,
                20,
                12,
                centerColor
            )
                .setAngle(20);


        // ======================================
        // SÍMBOLO
        // ======================================

        const symbol =
            this.scene.add.text(
                0,
                0,
                "✦",
                {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#FFFFFF"
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
                    capsule,
                    center,
                    symbol
                ]
            );


        this.visual.setDepth(
            4
        );


        // ======================================
        // ANIMACIÓN FLOTANTE
        // ======================================

        this.scene.tweens.add({

            targets:
                this.visual,

            y:
                this.y - 8,

            duration:
                900,

            yoyo:
                true,

            repeat:
                -1,

            ease:
                "Sine.easeInOut"
        });


        // ======================================
        // PULSO DE ENERGÍA
        // ======================================

        this.scene.tweens.add({

            targets:
                glow,

            scale:
                1.25,

            alpha:
                0.05,

            duration:
                900,

            yoyo:
                true,

            repeat:
                -1,

            ease:
                "Sine.easeInOut"
        });
    }


    // ======================================
    // ZONA DE RECOLECCIÓN
    // ======================================

    createTrigger() {

        this.trigger = this.scene.add.zone(
            this.x,
            this.y,
            48,
            58
        );

        this.scene.physics.add.existing(
            this.trigger,
            true
        );
    }


    // ======================================
    // ACTUALIZAR CÁPSULA
    // ======================================

    update(player) {

        if (this.isCollected) {
            return;
        }

        const playerTouchesCapsule =
            this.scene.physics.overlap(
                player,
                this.trigger
            );

        if (playerTouchesCapsule) {
            this.collect(player);
        }
    }


    // ======================================
    // RECOGER CÁPSULA
    // ======================================

    collect(player) {

        if (this.isCollected) {
            return;
        }

        this.isCollected = true;

        this.scene.activateCapsulePower(
            this.type,
            this.duration
        );

        this.playCollectionEffect();

        this.trigger.destroy();

        this.visual.destroy();
    }


    // ======================================
    // EFECTO DE RECOLECCIÓN
    // ======================================

    playCollectionEffect() {

        const burst = this.scene.add.text(
            this.x,
            this.y - 20,
            "✨",
            {
                fontFamily: "Arial",
                fontSize: "30px"
            }
        ).setOrigin(0.5).setDepth(10);

        this.scene.tweens.add({
            targets: burst,
            y: this.y - 70,
            alpha: 0,
            scale: 1.5,
            duration: 650,
            ease: "Cubic.easeOut",
            onComplete: () => {
                burst.destroy();
            }
        });
    }
}