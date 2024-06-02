import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Query,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Message } from './schemas/message.schema';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

//@ApiBearerAuth()
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create message' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'New Message created',
        type: Message,
    })
    create(
        @Body() createMessageDto: CreateMessageDto,
        @Param('divisionId') divisionId: string,
        @Param('groupId') groupId: string,
        @Param('channelId') channelId: string,
    ) {
        // console.log(divisionId, groupId, channelId);
        return this.messagesService.create(createMessageDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all messages' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'List of all Messages',
        type: [Message],
    })
    @ApiQuery({ name: 'senderId', required: false })
    @ApiQuery({ name: 'chatId', required: false })
    findAll(
        @Query('requesterId') requesterId?: string,
        @Query('chatId') chatId?: string,
    ) {
        if (requesterId) {
            return this.messagesService.findAllByRequesterId(requesterId);
        }

        if (chatId) {
            return this.messagesService.findAllBychatId(chatId);
        }

        return this.messagesService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Message by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Message,
    })
    findOne(@Param('id') id: string) {
        return this.messagesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Message by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Updated',
        type: Message,
    })
    update(
        @Param('id') id: string,
        @Body() updateMessageDto: UpdateMessageDto,
    ) {
        return this.messagesService.update(id, updateMessageDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete Message by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({
        status: 200,
        description: 'Deleted',
    })
    remove(@Param('id') id: string) {
        return this.messagesService.remove(id);
    }
}
