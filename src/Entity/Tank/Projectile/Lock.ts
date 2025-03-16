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
import { PhysicsFlags, StyleFlags } from "../../../Const/Enums";
import { TankDefinition } from "../../../Const/TankDefinitions";
import { BarrelBase } from "../TankBody";


export default class lock extends Bullet {
    public constructor(barrel: Barrel, tank: BarrelBase, tankDefinition: TankDefinition | null, shootAngle: number) {
        
        super(barrel, tank, tankDefinition, shootAngle);
        const bulletDefinition = barrel.definition.bullet;
        this.baseSpeed = (barrel.bulletAccel + 30 - Math.random() * bulletDefinition.scatterRate)/2 ;
        this.physicsData.values.sides = bulletDefinition.sides ?? 3;
        this.baseAccel *= -0.25;
        this.physicsData.values.size *= 0.7
        this.lifeLength += 15
    }

    
    public tick(tick: number) {
        super.tick(tick);
        

        if (tick >= this.spawnTick + 15) {
            this.baseAccel = (this.baseSpeed  * 2)-30
            this.movementAngle = this.positionData.angle
        }

        if (tick <= this.spawnTick + 20) {
            this.positionData.angle = Math.atan2(this.tank.inputs.mouse.y - this.positionData.values.y, this.tank.inputs.mouse.x - this.positionData.values.x);
            if (this.tank.inputs.attemptingRepel()) {
                this.positionData.angle += Math.PI; 
            }
        }
    }
}