import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
// locals
import { AdminService } from '../service/admin.service';
import { MapInterceptor } from '../../../common/lib/interceptor/mapper/mapper.interceptor';
import { GetAdminOutputDto, getAdminOptions } from '../dto/admin.dto';
import { UseGuard } from '../../../common/lib/decorator/guard.decorator';
import { RoleAccessGuard } from '../../../common/lib/guard/role-access';
import { Permission } from '../../../common/lib/decorator/permission.decorator';
import { JWTAccessAuthGuard } from '../../auth/guard/jwt/auth.guard';
import { User } from '../../../common/lib/decorator/user.decorator';
import { AuthorizedGuard } from '../../../common/lib/guard/authorized';
import { Post } from '@nestjs/common';
import { UploadFileInterceptor } from '../../../common/lib/interceptor/file.interceptor';

@ApiTags('admin')
@Controller({ path: 'admin', version: ['1'] })
@UseGuard(JWTAccessAuthGuard /*RoleAccessGuard*/)
export class AdminController {
  @Inject(AdminService)
  private readonly service: AdminService;

  @Get(':id')
  @UseGuard(new AuthorizedGuard(['ADMIN', 'TUTOR']))
  public getUser(
    @Param('id', ParseIntPipe) id: number,
    @User() userInfo,
  ): Promise<void> {
    return this.service.getAdminUser(id, userInfo);
  }

  @Get('/')
  @UseGuard(RoleAccessGuard)
  @Permission(['ADMIN', 'SCHOOL'])
  @UseInterceptors(MapInterceptor(GetAdminOutputDto))
  async getAdmin(
    @Query() options: getAdminOptions,
    @User() userInfo,
  ): Promise<GetAdminOutputDto> {
    console.log(userInfo);
    return options;
  }

  @Post('/')
  @UseGuard(RoleAccessGuard)
  @Permission(['ADMIN', 'SCHOOL'])
  @UseInterceptors(
    UploadFileInterceptor({
      prefix: 'teacher',
      fieldName: 'teacher-data',
      folderName: 'students/registered',
      subfolder: 'user.id',
      mimeTypes: ['text/csv'],
    }),
  )
  async adminUpload(@User() userInfo, @UploadedFile() file): Promise<void> {
    console.log(userInfo);
    console.log(file);
    return;
  }
}
