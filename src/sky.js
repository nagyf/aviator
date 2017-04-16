import * as three from 'three';
import * as _ from 'lodash';
import Cloud from './cloud';

class Sky {
    constructor() {
        this.mesh = new three.Object3D();
        const nClouds = 20;

        // To distribute the clouds consistently,
        // we need to place them according to a uniform angle
        const stepAngle = Math.PI * 2 / nClouds;

        _.times(nClouds, i => {
            const cloud = new Cloud();

            // set the rotation and the position of each cloud;
            // for that we use a bit of trigonometry
            const a = stepAngle * i; // this is the final angle of the cloud
            const h = 750 + Math.random() * 200; // this is the distance between the center of the axis and the cloud itself

            // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
            cloud.mesh.position.y = Math.sin(a) * h;
            cloud.mesh.position.x = Math.cos(a) * h;

            // rotate the cloud according to its position
            cloud.mesh.rotation.z = a + Math.PI / 2;

            // for a better result, we position the clouds
            // at random depths inside of the scene
            cloud.mesh.position.z = -400 - Math.random() * 400;

            // we also set a random scale for each cloud
            const scale = 1 + Math.random() * 2;
            cloud.mesh.scale.set(scale, scale, scale);

            // do not forget to add the mesh of each cloud in the scene
            this.mesh.add(cloud.mesh);
        });
    }
}

export default Sky;