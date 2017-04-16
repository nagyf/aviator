import * as three from 'three';
import Colors from './colors';
import * as _ from 'lodash';

class Pilot {
    constructor() {
        this.mesh = new three.Object3D();
        this.mesh.name = 'pilot';

        this.angleHairs = 0;

        const bodyGeom = new three.BoxGeometry(15, 15, 15);
        const bodyMat = new three.MeshPhongMaterial({color: Colors.brown, shading: three.FlatShading});
        const body = new three.Mesh(bodyGeom, bodyMat);
        body.position.set(2, -12, 0);
        this.mesh.add(body);

        // Face of the pilot
        const faceGeom = new three.BoxGeometry(10, 10, 10);
        const faceMat = new three.MeshLambertMaterial({color: Colors.pink});
        const face = new three.Mesh(faceGeom, faceMat);
        this.mesh.add(face);

        // Hair element
        const hairGeom = new three.BoxGeometry(4, 4, 4);
        const hairMat = new three.MeshLambertMaterial({color: Colors.brown});
        const hair = new three.Mesh(hairGeom, hairMat);
        // Align the shape of the hair to its bottom boundary, that will make it easier to scale.
        hair.geometry.applyMatrix(new three.Matrix4().makeTranslation(0, 2, 0));

        // create a container for the hair
        const hairs = new three.Object3D();

        // create a container for the hairs at the top 
        // of the head (the ones that will be animated)
        this.hairsTop = new three.Object3D();

        // create the hairs at the top of the head 
        // and position them on a 3 x 4 grid
        _.times(12, i => {
            const h = hair.clone();
            const col = i % 3;
            const row = Math.floor(i / 3);
            const startPosZ = -4;
            const startPosX = -4;
            h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
            this.hairsTop.add(h);
        });
        hairs.add(this.hairsTop);

        // create the hairs at the side of the face
        const hairSideGeom = new three.BoxGeometry(12, 4, 2);
        hairSideGeom.applyMatrix(new three.Matrix4().makeTranslation(-6, 0, 0));
        const hairSideR = new three.Mesh(hairSideGeom, hairMat);
        const hairSideL = hairSideR.clone();
        hairSideR.position.set(8, -2, 6);
        hairSideL.position.set(8, -2, -6);
        hairs.add(hairSideR);
        hairs.add(hairSideL);

        // create the hairs at the back of the head
        const hairBackGeom = new three.BoxGeometry(2, 8, 10);
        const hairBack = new three.Mesh(hairBackGeom, hairMat);
        hairBack.position.set(-1, -4, 0);
        hairs.add(hairBack);
        hairs.position.set(-5, 5, 0);

        this.mesh.add(hairs);

        const glassGeom = new three.BoxGeometry(5, 5, 5);
        const glassMat = new three.MeshLambertMaterial({color: Colors.brown});
        const glassR = new three.Mesh(glassGeom, glassMat);
        glassR.position.set(6, 0, 3);
        const glassL = glassR.clone();
        glassL.position.z = -glassR.position.z;

        const glassAGeom = new three.BoxGeometry(11, 1, 11);
        const glassA = new three.Mesh(glassAGeom, glassMat);
        this.mesh.add(glassR);
        this.mesh.add(glassL);
        this.mesh.add(glassA);

        const earGeom = new three.BoxGeometry(2, 3, 2);
        const earL = new three.Mesh(earGeom, faceMat);
        earL.position.set(0, 0, -6);
        const earR = earL.clone();
        earR.position.set(0, 0, 6);
        this.mesh.add(earL);
        this.mesh.add(earR);
    }

    updateHairs() {
        const hairs = this.hairsTop.children;

        // update them according to the angle angleHairs
        _.times(hairs.length, i => {
            const h = hairs[i];
            // each hair element will scale on cyclical basis between 75% and 100% of its original size
            h.scale.y = .75 + Math.cos(this.angleHairs + i / 3) * .25;
        });
        // increment the angle for the next frame
        this.angleHairs += 0.16;
    }
}

export default Pilot;