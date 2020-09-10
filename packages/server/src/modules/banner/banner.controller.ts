import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BannerService } from './banner.service';
import { Banner } from  './banner.entity'

@Controller('banner')
export class BannerController {
    constructor(
        private readonly bannerService: BannerService
    ) {}
    @Get('list')
    async list(): Promise<any> {
        const result = await this.bannerService.findBannerList();
        return {
            success: true,
            result: result,
            status: HttpStatus.OK,
            msg: null
        }
    }
}
