import * as three from 'three';
import * as _ from 'lodash';
import colors from './colors';

class Sea {
    constructor() {
        this.geometry = new three.CylinderGeometry(600, 600, 800, 40, 10);
        this.geometry.applyMatrix(new three.Matrix4().makeRotationX(-Math.PI / 2));
        this.geometry.mergeVertices();

        this.waves = [];

        _.forEach(this.geometry.vertices, vertex => {
            this.waves.push({
                y: vertex.y,
                x: vertex.x,
                z: vertex.z,
                // a random angle
                ang: Math.random() * Math.PI * 2,
                // a random distance
                amp: 5 + Math.random() * 15,
                // a random speed between 0.016 and 0.048 radians / frame
                speed: 0.016 + Math.random() * 0.032
            });
        });

        this.material = new three.MeshPhongMaterial({
            color: colors.blue,
            transparent: true,
            opacity: .6,
            shading: three.FlatShading
        });

        this.mesh = new three.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
    }

    moveWaves() {
        _.forEach(this.mesh.geometry.vertices, (v, i) => {
            // get the data associated to it
            const vprops = this.waves[i];

            // update the position of the vertex
            v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
            v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

            // increment the angle for the next frame
            vprops.ang += vprops.speed;
        });

        // Tell the renderer that the geometry of the sea has changed.
        // In fact, in order to maintain the best level of performance, 
        // three.js caches the geometries and ignores any changes
        // unless we add this line
        this.mesh.geometry.verticesNeedUpdate = true;
    }
}

export default Sea;