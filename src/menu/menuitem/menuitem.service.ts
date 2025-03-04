import { Injectable } from '@nestjs/common';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { UpdateMenuitemDto } from './dto/update-menuitem.dto';

@Injectable()
export class MenuitemService {
  create(createMenuitemDto: CreateMenuitemDto) {
    return 'This action adds a new menuitem';
  }

  findAll() {
    return `This action returns all menuitem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuitem`;
  }

  update(id: number, updateMenuitemDto: UpdateMenuitemDto) {
    return `This action updates a #${id} menuitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuitem`;
  }
}
