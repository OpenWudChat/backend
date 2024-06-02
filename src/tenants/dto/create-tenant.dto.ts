import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import {Prop} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";

export class CreateTenantDto {
    @ApiProperty({
        example: 'Ambulant',
        description: 'Name of the Tenant',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Ein Bereich für ambulante Mitarbeiter',
        description: 'Description of the Tenant',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '#FF5733',
        description: 'HEX Color of the Tenant',
    })
    @IsString()
    color: string;

    @ApiProperty({
        example: 'car',
        description: 'Icon of the Tenant',
    })
    @IsString()
    icon: string;

    @ApiProperty({
        example: [],
        description: 'Owners of the Tenant',
    })
    @IsArray()
    @IsString()@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    owners: User[];

    @ApiProperty({
        example: [],
        description: 'Members of the Tenant',
    })
    @IsArray()
    @IsString()@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    members: User[];

    @ApiProperty({
        example: [],
        description: 'Groups of the Tenant',
    })
    @IsArray()
    @IsString()
    groups: string[];

    @ApiProperty({
        example: 'USER',
        description: 'Min Role of User for this Tenant',
    })
    @IsString()
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this Tenant currently visible?',
    })
    @IsBoolean()
    visible: boolean;
}
