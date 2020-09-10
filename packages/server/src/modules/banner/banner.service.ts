import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './banner.entity';

@Injectable()
export class BannerService {
  constructor(
      @InjectRepository(Banner)
      private readonly bannerRepository: Repository<Banner>
  ) {}
  
  async findBannerList(): Promise<Banner[]>{
    return await this.bannerRepository.find();
  }
}
