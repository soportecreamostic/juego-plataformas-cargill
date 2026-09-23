export default class Platform {

    constructor(scene, x, y, width, height = 20) {

        this.scene = scene;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.create();
    }


    create() {

        // ======================================
        // CUERPO FÍSICO INVISIBLE
        // ======================================

        this.platform =
            this.scene.physics.add.staticImage(
                this.x,
                this.y,
                null
            );


        this.platform
            .setDisplaySize(
                this.width,
                this.height
            )
            .refreshBody();


        this.platform.setVisible(
            false
        );


        // ======================================
        // SOMBRA
        // ======================================

        const shadow =
            this.scene.add.rectangle(
                0,
                5,
                this.width,
                this.height,
                0x012912,
                0.16
            );


        // ======================================
        // CUERPO CARGILL
        // ======================================

        const body =
            this.scene.add.rectangle(
                0,
                0,
                this.width,
                this.height,
                0x012912
            );


        body.setStrokeStyle(
            2,
            0xBDE588,
            1
        );


        // ======================================
        // FRANJA SUPERIOR
        // ======================================

        const topLine =
            this.scene.add.rectangle(
                0,
                (-this.height / 2) + 4,
                this.width,
                Math.min(
                    8,
                    this.height
                ),
                0xBDE588
            );


        // ======================================
        // DETALLE INTERNO
        // ======================================

        const innerLine =
            this.scene.add.rectangle(
                0,
                (-this.height / 2) + 8,
                this.width - 8,
                2,
                0xF5F9ED,
                0.35
            );


        // ======================================
        // CONTENEDOR VISUAL
        // ======================================

        this.visual =
            this.scene.add.container(
                this.x,
                this.y,
                [
                    shadow,
                    body,
                    topLine,
                    innerLine
                ]
            );


        this.visual.setDepth(
            0
        );
    }


    getObject() {

        return this.platform;
    }
}
