import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards, Query,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Channel } from './schemas/channel.schema';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@ApiTags(`channels`)
@Controller('channels')
export class ChannelsController {
    constructor(private readonly channelsService: ChannelsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Channel' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'New Channel created',
        type: Channel,
    })
    @ApiQuery({ name: 'divisionId' })
    @ApiQuery({ name: 'groupId' })
    create(
        @Param('divisionId') divisionId: string,
        @Param('groupId') groupId: string,
        @Body() createChannelDto: CreateChannelDto,
    ) {
        return this.channelsService.create(
            divisionId,
            groupId,
            createChannelDto,
        );
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all Channel' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'List of all GroupChats',
        type: [Channel],
    })
    @ApiQuery({ name: 'groupId', required: false })
    findAll(
        @Query('groupId') groupId?: string,
    ) {
        return this.channelsService.findAll(groupId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Channel by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Channel,
    })
    findOne(@Param('id') id: string) {
        return this.channelsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Channel by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Updated',
        type: Channel,
    })
    update(
        @Param('id') id: string,
        @Body() updateChannelDto: UpdateChannelDto,
    ) {
        return this.channelsService.update(id, updateChannelDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Channel by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Deleted',
    })
    remove(@Param('id') id: string) {
        return this.channelsService.remove(id);
    }
}
