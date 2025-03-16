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
import { sign } from "crypto";

export default class Shotgun extends Bullet {
    public constructor(barrel: Barrel, tank: BarrelBase, tankDefinition: TankDefinition | null, shootAngle: number) {
        super(barrel, tank, tankDefinition, shootAngle);
        const sizeFactor = tank.sizeFactor;
        const {x, y} = tank.getWorldPosition();
        this.positionData.values.x = x + (Math.cos(shootAngle) * 100 * sizeFactor) - Math.sin(shootAngle) * barrel.definition.offset * sizeFactor + Math.cos(shootAngle);
        this.positionData.values.y = y + (Math.sin(shootAngle) * 100 * sizeFactor) + Math.cos(shootAngle) * barrel.definition.offset * sizeFactor + Math.sin(shootAngle);
        this.baseSpeed *= 0.6+Math.random()*0.4
    }

    
    public tick(tick: number) {
        super.tick(tick);
    }
}
