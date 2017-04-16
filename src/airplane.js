import * as three from 'three';
import Colors from './colors';
import Pilot from './pilot';

class Airplane {
    constructor() {
        this.mesh = new three.Object3D();

        // Create the cabin
        const geomCockpit = new three.BoxGeometry(80, 50, 50, 1, 1, 1);
        geomCockpit.vertices[4].y -= 10;
        geomCockpit.vertices[4].z += 20;
        geomCockpit.vertices[5].y -= 10;
        geomCockpit.vertices[5].z -= 20;
        geomCockpit.vertices[6].y += 30;
        geomCockpit.vertices[6].z += 20;
        geomCockpit.vertices[7].y += 30;
        geomCockpit.vertices[7].z -= 20;
        const matCockpit = new three.MeshPhongMaterial({color: Colors.red, shading: three.FlatShading});
        const cockpit = new three.Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.mesh.add(cockpit);

        // Create the engine
        const geomEngine = new three.BoxGeometry(20, 50, 50, 1, 1, 1);
        const matEngine = new three.MeshPhongMaterial({color: Colors.white, shading: three.FlatShading});
        const engine = new three.Mesh(geomEngine, matEngine);
        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.mesh.add(engine);

        // Create the tail
        const geomTailPlane = new three.BoxGeometry(15, 20, 5, 1, 1, 1);
        const matTailPlane = new three.MeshPhongMaterial({color: Colors.red, shading: three.FlatShading});
        const tailPlane = new three.Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.mesh.add(tailPlane);

        // Create the wing
        const geomSideWing = new three.BoxGeometry(40, 8, 150, 1, 1, 1);
        const matSideWing = new three.MeshPhongMaterial({color: Colors.red, shading: three.FlatShading});
        const sideWing = new three.Mesh(geomSideWing, matSideWing);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        this.mesh.add(sideWing);

        // propeller
        const geomPropeller = new three.BoxGeometry(20, 10, 10, 1, 1, 1);
        const matPropeller = new three.MeshPhongMaterial({color: Colors.brown, shading: three.FlatShading});
        this.propeller = new three.Mesh(geomPropeller, matPropeller);
        this.propeller.castShadow = true;
        this.propeller.receiveShadow = true;

        // blades
        const geomBlade = new three.BoxGeometry(1, 100, 20, 1, 1, 1);
        const matBlade = new three.MeshPhongMaterial({color: Colors.brownDark, shading: three.FlatShading});

        const blade = new three.Mesh(geomBlade, matBlade);
        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;
        this.propeller.add(blade);
        this.propeller.position.set(50, 0, 0);
        this.mesh.add(this.propeller);

        this.pilot = new Pilot();
        this.pilot.mesh.position.set(-10, 27, 0);
        this.mesh.add(this.pilot.mesh);
    }
}

export default Airplane;