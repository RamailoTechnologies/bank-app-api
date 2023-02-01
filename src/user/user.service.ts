import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { userId } = createUserDto;
    // const checkUser = await this.userRepository.findOne({ where: { userId } });
    // if (checkUser) throw new BadRequestException('user Already Exist');
    const createUser = await this.userRepository.save(createUserDto);
    return createUser;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const checkUser = await this.userRepository.findOne({ where: { userId } });
    if (!checkUser) throw new NotFoundException('user Not Found');

    return await this.userRepository.update({ userId }, { ...updateUserDto });
  }

  async remove(userId: string) {
    const checkUser = await this.userRepository.findOne({ where: { userId } });
    if (!checkUser) throw new NotFoundException('user Not Found');
    return await this.userRepository.delete({ userId });
  }
}
