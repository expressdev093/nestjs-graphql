import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/input/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
  ) {}
  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet);
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneBy({ id });
  }

  getPets(ownerId: number): Promise<Pet[]> {
    return this.petsRepository.find({ where: { ownerId: ownerId } });
  }
}
