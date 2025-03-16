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
import Drone from "./Drone";

import { InputFlags, PhysicsFlags } from "../../../Const/Enums";
import { BarrelDefinition, TankDefinition } from "../../../Const/TankDefinitions";
import { AIState, Inputs } from "../../AI";
import { BarrelBase } from "../TankBody";
import { CameraEntity } from "../../../Native/Camera";

/**
 * Barrel definition for the factory minion's barrel.
 */
 const SlaveBarrelDefinition: BarrelDefinition = {
    angle: Math.PI,
    offset: 0,
    size: 50,
    width: 50.4,
    delay: 0,
    reload: 3,
    recoil: 3,
    isTrapezoid: false,
    trapezoidDirection: 0,
    addon: null,
    bullet: {
        type: "bullet",
        health: 0.4,
        damage: 0.4,
        speed: 1,
        scatterRate: 1,
        lifeLength: 0.5,
        sizeRatio: 1,
        absorbtionFactor: 1
    }
};

/**
 * The drone class represents the minion (projectile) entity in diep.
 */
export default class Slave extends Drone implements BarrelBase {
    /** Size of the focus the minions orbit. */

    /** The minion's barrel */
    private slaveBarrel: Barrel;

    /** The camera entity (used as team) of the minion. */
    public cameraEntity: CameraEntity;
    /** The reload time of the minion's barrel. */
    public reloadTime = 1;
    /** The inputs for when to shoot or not. */
    public inputs = new Inputs();

    public constructor(barrel: Barrel, tank: BarrelBase, tankDefinition: TankDefinition | null, shootAngle: number) {
        super(barrel, tank, tankDefinition, shootAngle);

        const bulletDefinition = barrel.definition.bullet;

        this.inputs = this.ai.inputs;


        this.cameraEntity = tank.cameraEntity;
        this.slaveBarrel = new Barrel(this, SlaveBarrelDefinition);
        this.ai.movementSpeed = this.ai.aimSpeed = this.baseAccel;
    }

    public get sizeFactor() {
        return this.physicsData.values.size / 50;
    }

    /** This allows for factory to hook in before the entity moves. */
    protected tickMixin(tick: number) {
        this.reloadTime = this.tank.reloadTime;
        
        this.inputs.flags |= this.tank.inputs.flags;

        super.tickMixin(tick);
    }
}
