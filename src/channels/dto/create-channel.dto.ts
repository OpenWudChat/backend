import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelDto {
    @ApiProperty({
        example: '#Allgemein',
        description: 'Name of the Channel',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Ein Channel für alle',
        description: 'Description of the Channel',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '#123456',
        description: 'HEX Color of the Channel',
    })
    @IsString()
    color: string;

    @ApiProperty({
        example: 'pulse',
        description: 'Icon of the Channel',
    })
    @IsString()
    icon: string;

    @ApiProperty({
        example: 'asdfsadf7897asdf98787asdf',
        description: 'Tenant of the Channel',
    })
    @IsArray()
    @IsString()
    tenant: string;

    @ApiProperty({
        example: 'asdfsadf7897asdf98787asdf',
        description: 'Group of the Channel',
    })
    @IsArray()
    @IsString()
    group: string;

    @ApiProperty({
        example: 'Hello World',
        description: 'Message of the Channel',
    })
    @IsArray()
    @IsString()
    messages: string[];

    @ApiProperty({
        example: [],
        description: 'Sender of the Channel',
    })
    @IsArray()
    @IsString()
    owners: string[];

    @ApiProperty({
        example: [],
        description: 'Sender of the Channel',
    })
    @IsArray()
    @IsString()
    members: string[];

    @ApiProperty({
        example: 'EMPLOYEE',
        description: 'Min Role of User for this Channel',
    })
    @IsString()
    minRole: string;

    @ApiProperty({
        example: true,
        description: 'Is this channel currently visible?',
    })
    @IsBoolean()
    visible: boolean;
}
