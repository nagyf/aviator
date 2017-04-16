import * as three from 'three';
import * as _ from 'lodash';
import colors from './colors';

class Cloud {
    constructor() {
        // Empty container to hold a few objects
        this.mesh = new three.Object3D();

        this.geometry = new three.BoxGeometry(20, 20, 20);
        this.material = new three.MeshPhongMaterial({
            color: colors.white
        });

        const nBlocks = 3 + Math.floor(Math.random() * 3);
        _.times(nBlocks, i => {
            const m = new three.Mesh(this.geometry, this.material);
            m.position.x = i * 15;
            m.position.y = Math.random() * 10;
            m.position.z = Math.random() * 10;
            m.rotation.z = Math.random() * Math.PI * 2;
            m.rotation.y = Math.random() * Math.PI * 2;

            // set the size of the cube randomly
            const size = .1 + Math.random() * .9;
            m.scale.set(size, size, size);

            // allow each cube to cast and to receive shadows
            m.castShadow = true;
            m.receiveShadow = true;

            // add the cube to the container we first created
            this.mesh.add(m);
        });
    }
}

export default Cloud;