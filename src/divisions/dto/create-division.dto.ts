import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import {Prop} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";

export class CreateDivisionDto {
    @ApiProperty({
        example: 'Ambulant',
        description: 'Name of the Division',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Ein Bereich für ambulante Mitarbeiter',
        description: 'Description of the Division',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '#FF5733',
        description: 'HEX Color of the Division',
    })
    @IsString()
    color: string;

    @ApiProperty({
        example: 'car',
        description: 'Icon of the Division',
    })
    @IsString()
    icon: string;

    @ApiProperty({
        example: [],
        description: 'Owners of the Division',
    })
    @IsArray()
    @IsString()@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    owners: User[];

    @ApiProperty({
        example: [],
        description: 'Members of the Division',
    })
    @IsArray()
    @IsString()@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    members: User[];

    @ApiProperty({
        example: [],
        description: 'Groups of the Division',
    })
    @IsArray()
    @IsString()
    groups: string[];

    @ApiProperty({
        example: 'USER',
        description: 'Min Role of User for this Division',
    })
    @IsString()
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this Division currently visible?',
    })
    @IsBoolean()
    visible: boolean;
}
