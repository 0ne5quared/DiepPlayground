/*
    DiepCustom - custom tank game server that shares diep.io's WebSocket protocol
    Copyright (C) 2022 ABCxFF (github.com/ABCxFF)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>
*/

import Barrel from "../Barrel";
import Bullet from "./Bullet";

import { InputFlags } from "../../../Const/Enums";
import { BarrelDefinition, TankDefinition } from "../../../Const/TankDefinitions";
import { Inputs } from "../../AI";
import { BarrelBase } from "../TankBody";
import { CameraEntity } from "../../../Native/Camera";

/**
 * Barrel definition for the rocketeer rocket's barrel.
 */
const LaunchedBarrelDefinition: BarrelDefinition = {
    angle: 0,
    offset: 0,
    size: 70,
    width: 72,
    delay: 0,
    reload: 1,
    recoil: 1,
    isTrapezoid: false,
    trapezoidDirection: 0,
    addon: null,
    bullet: {
        type: "bullet",
        health: 1,
        damage: 0.3,
        speed: 1.5,
        scatterRate: 1,
        lifeLength: 0.4,
        sizeRatio: 1,
        absorbtionFactor: 1
    }
};

/**
 * Represents all rocketeer rockets in game.
 */
export default class Launched extends Bullet implements BarrelBase {
    /** The launched's barrel */
    private launchedBarrel: Barrel;

    /** The camera entity (used as team) of the launched. */
    public cameraEntity: CameraEntity;
    /** The reload time of the launched's barrel. */
    public reloadTime = 1;
    /** The inputs for when to shoot or not. (launched) */
    public inputs = new Inputs();


    public constructor(barrel: Barrel, tank: BarrelBase, tankDefinition: TankDefinition | null, shootAngle: number) {
        super(barrel, tank, tankDefinition, shootAngle);
        
        this.cameraEntity = tank.cameraEntity;

        const launchedBarrel = this.launchedBarrel = new Barrel(this, {...LaunchedBarrelDefinition});
        launchedBarrel.styleData.values.color = this.styleData.values.color;
    }

    public get sizeFactor() {
        return this.physicsData.values.size / 50;
    }

    public tick(tick: number) {
        this.reloadTime = this.tank.reloadTime;
        if (!this.deletionAnimation && this.launchedBarrel) this.launchedBarrel.definition.width = ((this.barrelEntity.definition.width / 2) * LaunchedBarrelDefinition.width) / this.physicsData.values.size;

        super.tick(tick);

        if (this.deletionAnimation) return;
        // not fully accurate
        if (tick - this.spawnTick >= this.tank.reloadTime) this.inputs.flags |= InputFlags.leftclick;
        // Only accurate on current version, but we dont want that
        // if (!Entity.exists(this.barrelEntity.rootParent) && (this.inputs.flags & InputFlags.leftclick)) this.inputs.flags ^= InputFlags.leftclick; 
    }
}
