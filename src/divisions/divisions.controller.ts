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
import { DivisionsService } from './divisions.service';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Division } from './schemas/division.schema';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {CurrentUser} from "../core/decorators/current-user.decorator";
import {User} from "../user/schemas/user.schema";

@ApiTags(`divisions`)
@Controller('divisions')
export class DivisionsController {
    constructor(private readonly divisionsService: DivisionsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Division' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'New Division created',
        type: Division,
    })
    @ApiQuery({
        name: 'userId',
        type: String,
        description: 'Compute special devisions for a specific User',
        required: false,
    })
    create(
        @Body() createDivisionDto: CreateDivisionDto,
        @CurrentUser() currentUser?: User,
        @Query('userId') userId?: string,
    ) {
        if (userId) {
            return this.divisionsService.createComputed(createDivisionDto);
        } else {
            return this.divisionsService.create(createDivisionDto, currentUser);
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all Division' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'List of all Division',
        type: [Division],
    })
    findAll(@CurrentUser() currentUser: User) {
        return this.divisionsService.findAll(currentUser);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Division by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Division,
    })
    findOne(@Param('id') id: string) {
        return this.divisionsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Division by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Updated',
        type: Division,
    })
    update(
        @Param('id') id: string,
        @Body() updateDivisionDto: UpdateDivisionDto,
    ) {
        return this.divisionsService.update(id, updateDivisionDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Division by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Deleted',
    })
    remove(@Param('id') id: string) {
        return this.divisionsService.remove(id);
    }
}
