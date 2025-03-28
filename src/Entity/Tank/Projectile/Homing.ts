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

import { TankDefinition } from "../../../Const/TankDefinitions";
import { BarrelBase } from "../TankBody";


export default class Homing extends Bullet {
    public constructor(barrel: Barrel, tank: BarrelBase, tankDefinition: TankDefinition | null, shootAngle: number) {
        super(barrel, tank, tankDefinition, shootAngle);
        this.physicsData.size *= 0.5;
        const bulletDefinition = barrel.definition.bullet;
        this.baseSpeed *= 1
        this.physicsData.values.sides = bulletDefinition.sides ?? 4;

    }

    
    public tick(tick: number) {
        super.tick(tick);
        const home = 0.02
        if ((this.tank.inputs.mouse.x - this.positionData.x) * Math.sin(this.movementAngle-home) <= (this.tank.inputs.mouse.y - this.positionData.y) * Math.cos(this.movementAngle-home) && (this.tank.inputs.mouse.x - this.positionData.x) * Math.sin(this.movementAngle+home) >= (this.tank.inputs.mouse.y - this.positionData.y) * Math.cos(this.movementAngle+home)) {
            this.movementAngle = Math.atan2(this.tank.inputs.mouse.y - this.positionData.values.y, this.tank.inputs.mouse.x - this.positionData.values.x);
        } 
        
        else if ((this.tank.inputs.mouse.x - this.positionData.x) * Math.sin(this.movementAngle) >= (this.tank.inputs.mouse.y - this.positionData.y) * Math.cos(this.movementAngle)) {
            this.movementAngle -= home;
        }

        else if ((this.tank.inputs.mouse.x - this.positionData.x) * Math.sin(this.movementAngle) < (this.tank.inputs.mouse.y - this.positionData.y) * Math.cos(this.movementAngle)) {
            this.movementAngle += home;
        }
        this.positionData.angle=this.movementAngle;
    }
}
