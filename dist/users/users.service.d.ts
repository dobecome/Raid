import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Promise<number>;
    findAll(): JSON;
    findOne(id: number): Promise<import(".prisma/client").User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
