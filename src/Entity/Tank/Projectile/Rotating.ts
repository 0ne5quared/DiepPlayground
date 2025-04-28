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
import { start } from "repl";


export default class Rotating extends Bullet {
    protected startAngle = 0
    protected wiseClock = 0
    protected distance = 0
    public constructor(barrel: Barrel, tank: BarrelBase, tankDefinition: TankDefinition | null, shootAngle: number) {
        super(barrel, tank, tankDefinition, shootAngle);
        this.startAngle = this.movementAngle;
        this.lifeLength += 100
        this.distance = Math.sqrt((this.tank.inputs.mouse.x - this.positionData.x) ** 2 + (this.tank.inputs.mouse.y - this.positionData.y) ** 2) - this.baseSpeed * 10
        if ((this.tank.inputs.mouse.x - this.positionData.x) * Math.sin(this.movementAngle) >= (this.tank.inputs.mouse.y - this.positionData.y) * Math.cos(this.movementAngle)) {
            this.wiseClock = -1
        }

        else if ((this.tank.inputs.mouse.x - this.positionData.x) * Math.sin(this.movementAngle) < (this.tank.inputs.mouse.y - this.positionData.y) * Math.cos(this.movementAngle)) {
            this.wiseClock = 1;
        }

    }
    
    public tick(tick: number) {
        //this.movementAngle += (Math.PI/2)/50 * this.wiseClock;

        if (tick >= this.spawnTick + 0){
            this.movementAngle = -this.startAngle
        } 
        if (tick >= this.spawnTick + 1){
            this.baseAccel = 0
        } 
        super.tick(tick);
    }
}
