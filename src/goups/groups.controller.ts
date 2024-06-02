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
import {
    ApiBearerAuth,
    ApiOperation, ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './schemas/group.schema';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {CurrentUser} from "../core/decorators/current-user.decorator";
import {User} from "../user/schemas/user.schema";

//@ApiBearerAuth()
@ApiTags('groups')
// @Controller('/tenants/:tenantId/groups')
@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Group' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'New Group created',
        type: Group,
    })
    create(
        @Param('groupId') groupId: string,
        @Body() createGroupDto: CreateGroupDto,
    ) {
        return this.groupsService.create(groupId, createGroupDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all Groups' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'List of all Groups',
        type: [Group],
    })
    @ApiQuery({ name: 'tenantId', required: false })
    findAll(@CurrentUser() currentUser: User, @Query('tenantId') tenantId?: string) {
        return this.groupsService.findAll(currentUser, tenantId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Group by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Group,
    })
    findOne(@Param('id') id: string) {
        return this.groupsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Group by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Updated',
        type: Group,
    })
    update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
        return this.groupsService.update(id, updateGroupDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Group by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Deleted',
    })
    remove(@Param('id') id: string) {
        return this.groupsService.remove(id);
    }
}
