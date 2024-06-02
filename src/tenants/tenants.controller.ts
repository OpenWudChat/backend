import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Tenant } from './schemas/tenants.schema';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {CurrentUser} from "../core/decorators/current-user.decorator";
import {User} from "../user/schemas/user.schema";

@ApiTags(`tenanta`)
@Controller('tenants')
export class TenantsController {
    constructor(private readonly tenantsService: TenantsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Tenant' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'New Tenant created',
        type: Tenant,
    })
    @ApiQuery({
        name: 'userId',
        type: String,
        description: 'Compute special devisions for a specific User',
        required: false,
    })
    create(
        @Body() createTenantDto: CreateTenantDto,
        @CurrentUser() currentUser?: User,
        @Query('userId') userId?: string,
    ) {
        if (userId) {
            return this.tenantsService.createComputed(createTenantDto);
        } else {
            return this.tenantsService.create(createTenantDto, currentUser);
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all Tenant' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'List of all Tenant',
        type: [Tenant],
    })
    findAll(@CurrentUser() currentUser: User) {
        return this.tenantsService.findAll(currentUser);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Tenant by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Tenant,
    })
    findOne(@Param('id') id: string) {
        return this.tenantsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Tenant by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Updated',
        type: Tenant,
    })
    update(
        @Param('id') id: string,
        @Body() updateTenantDto: UpdateTenantDto,
    ) {
        return this.tenantsService.update(id, updateTenantDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Tenant by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Deleted',
    })
    remove(@Param('id') id: string) {
        return this.tenantsService.remove(id);
    }
}
