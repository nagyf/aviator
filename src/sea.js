import * as three from 'three';
import colors from './colors';

class Sea {
    constructor() {
        this.geometry = new three.CylinderGeometry(600, 600, 800, 40, 10);
        this.geometry.applyMatrix(new three.Matrix4().makeRotationX(-Math.PI / 2));

        this.material = new three.MeshPhongMaterial({
            color: colors.blue,
            transparent: true,
            opacity: .6,
            shading: three.FlatShading
        });

        this.mesh = new three.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
    }
}

export default Sea;