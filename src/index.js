import './index.less';
import * as three from 'three';
import Sea from './sea';
import Sky from './sky';
import Airplane from './airplane';

window.addEventListener('load', init, false);

function init() {
    const game = new Game();
    game.loop();
}

class Game {
    constructor() {
        this.initScene();
        this.initLights();
        this.initObjects();
    }

    initScene() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new three.Scene();
        this.scene.fog = new three.Fog(0xf7d9aa, 100, 950);
        this.camera = new three.PerspectiveCamera(60, this.width / this.height, 1, 10000);
        this.camera.position.x = 0;
        this.camera.position.y = 100;
        this.camera.position.z = 200;

        this.renderer = new three.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.shadowMap.enabled = true;

        this.renderer.setSize(this.width, this.height);
        document.querySelector('#container').appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);

        this.mousePos = {x: 0, y: 0};
        document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
    }

    handleWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    handleMouseMove(event) {
        // here we are converting the mouse position value received
        // to a normalized value varying between -1 and 1
        const tx = -1 + (event.clientX / this.width) * 2;

        // for the vertical axis, we need to inverse the formula
        // because the 2D y-axis goes the opposite direction of the 3D y-axis
        const ty = 1 - (event.clientY / this.height) * 2;

        this.mousePos = {x: tx, y: ty};
    }

    initLights() {
        this.hemisphereLight = new three.HemisphereLight(0xaaaaaa, 0x000000, .9);
        this.shadowLight = new three.DirectionalLight(0xffffff, .9);
        this.shadowLight.position.set(150, 350, 350);
        this.shadowLight.castShadow = true;

        // define the visible area of the projected shadow
        this.shadowLight.shadow.camera.left = -400;
        this.shadowLight.shadow.camera.right = 400;
        this.shadowLight.shadow.camera.top = 400;
        this.shadowLight.shadow.camera.bottom = -400;
        this.shadowLight.shadow.camera.near = 1;
        this.shadowLight.shadow.camera.far = 1000;

        // define the resolution of the shadow; the higher the better,
        // but also the more expensive and less performant
        this.shadowLight.shadow.mapSize.width = 2048;
        this.shadowLight.shadow.mapSize.height = 2048;

        this.ambientLight = new three.AmbientLight(0xdc8874, .4);
        this.scene.add(this.hemisphereLight);
        this.scene.add(this.shadowLight);
        this.scene.add(this.ambientLight);
    }

    initObjects() {
        this.sea = new Sea();
        this.sea.mesh.position.y = -600;
        this.scene.add(this.sea.mesh);

        this.sky = new Sky();
        this.sky.mesh.position.y = -600;
        this.scene.add(this.sky.mesh);

        this.airplane = new Airplane();
        this.airplane.mesh.scale.set(.25, .25, .25);
        this.airplane.mesh.position.y = 100;
        this.scene.add(this.airplane.mesh);
    }

    update() {
        this.airplane.propeller.rotation.x += 0.3;
        this.sea.moveWaves();
        this.sea.mesh.rotation.z += .005;
        this.sky.mesh.rotation.z += .01;

        const targetX = Game.normalize(this.mousePos.x, -.75, .75, -100, 100);
        const targetY = Game.normalize(this.mousePos.y, -.75, .75, 25, 175);

        // update the airplane's position
        this.airplane.mesh.rotation.x = (this.airplane.mesh.position.x - targetX) * 0.0064;
        this.airplane.mesh.position.y += (targetY - this.airplane.mesh.position.y) * 0.1;
        this.airplane.mesh.rotation.z = (targetY - this.airplane.mesh.position.y) * 0.0128;
        this.airplane.propeller.rotation.x += 0.3;

        this.airplane.pilot.updateHairs();
    }

    static normalize(v, vmin, vmax, tmin, tmax) {
        const nv = Math.max(Math.min(v, vmax), vmin);
        const dv = vmax - vmin;
        const pc = (nv - vmin) / dv;
        const dt = tmax - tmin;
        return tmin + (pc * dt);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    loop() {
        this.update();
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }
}