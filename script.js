class Escena extends Phaser.Scene{
    constructor(){
        super({key: 'mainScene'})
    }
    preload(){
        console.log('preload');

        resize();
        window.addEventListener('resize', resize);
        console.log(this.preload);

        //загрузка img
        this.load.image('fondo', 'assets/planet.png')
    }
    create(){
        console.log('create');

        //заугрзка img
        this.add.sprite(480, 320, 'fondo');

        //добавление гиперсылок
        const opcionNave = this.add.zone(350, 150, 400, 400);
        opcionNave.setOrigin(0);
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionNave);

        const opcionHome = this.add.zone(5, 30, 200, 300);
        opcionHome.setOrigin(0);
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionHome);

        //настраиваем гиперсылки
        opcionNave.setName('nave');
        // opcionNave.setInteractive();
        // opcionNave.once('pointerDown', () => this.opcionPulsada(opcionNave));
        opcionNave.setInteractive({ useHandCursor: true });
        opcionNave.once('pointerdown', () => this.opcionPulsada(opcionNave));
        opcionHome.setInteractive({ useHandCursor: true });
        opcionHome.once('pointerdown', () => this.opcionPulsada(opcionHome));
    }
    update(){
        // console.log('update');
    }
    opcionPulsada(opcion){
        if(opcion.name === 'nave'){
            this.scene.start('naveScene');
            console.log('1');
        }else{
            this.scene.start('homeScene');
        }
    }
}

class EscenaNave extends Phaser.Scene{
    constructor(){
        super({
            key: 'naveScene'
        })
    }
    preload(){
        this.load.image('nave', 'assets/rocket.png');
    }
    create(){
        this.add.sprite(480, 320, 'nave');

        const opcionHome = this.add.zone(850, 350, 50, 50);
        opcionHome.setOrigin(0);
        opcionHome.setName('main');
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionHome);

        opcionHome.setInteractive({ useHandCursor: true });
        opcionHome.once('pointerdown', () => this.opcionPulsada(opcionHome));
    }
    opcionPulsada(opcion){
        this.scene.start('mainScene');
        console.log('1');
    }
}

class EscenaBoss extends Phaser.Scene{
    constructor(){
        super({
            key: 'sceneBoss'
        })
    }
    preload(){
        this.load.image('boss', 'assets/boss.png');
    }
    create(){
        this.add.sprite(480, 320, 'boss');

        const opcionHome = this.add.zone(400, 120, 50, 50);
        opcionHome.setOrigin(0);
        opcionHome.setName('main');
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionHome);

        opcionHome.setInteractive({ useHandCursor: true });
        opcionHome.once('pointerdown', () => this.opcionPulsada(opcionHome));
    }
    opcionPulsada(opcion){
        this.scene.start('mainScene');
        console.log('1');
    }
}

class EscenaHome extends Phaser.Scene{
    constructor(){
        super({
            key: 'homeScene'
        })
    }
    preload(){
        this.load.image('door', 'assets/door.png');
    }
    create(){
        this.add.sprite(480, 320, 'door');

        //добавление гиперсылок
        const opcionNave = this.add.zone(10, 50, 300, 550);
        opcionNave.setOrigin(0);
        opcionNave.setName('nave');
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionNave);

        const opcionHome = this.add.zone(600, 50, 400, 550);
        opcionHome.setOrigin(0);
        opcionHome.setName('home');
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionHome);

        opcionNave.setInteractive({ useHandCursor: true });
        opcionNave.once('pointerdown', () => this.opcionPulsada(opcionNave));
        opcionHome.setInteractive({ useHandCursor: true });
        opcionHome.once('pointerdown', () => this.opcionPulsada(opcionHome));
        
    }
    opcionPulsada(opcion){
        if(opcion.name === 'nave'){
            this.scene.start('naveScene');
            console.log('1');
        }else{
            this.scene.start('sceneBoss');
        }
    }
}






        let config = {
            type: Phaser.AUTO,
            width: 960,
            height: 640,
            scene: new Escena(),
            scene: [Escena, EscenaNave, EscenaHome, EscenaBoss],
        }
        let game = new Phaser.Game(config);

function resize(){
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowHeight + 'px';
}