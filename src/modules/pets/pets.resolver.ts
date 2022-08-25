import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { Owner } from 'src/modules/owners/entities/owner.entity';
import { OwnersService } from 'src/modules/owners/owners.service';
import { GetPetArgs } from './dto/args/get-pet.args';
import { CreatePetInput } from './dto/input/create-pet.input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => Pet)
export class PetsResolver {
  constructor(
    private readonly petsService: PetsService,
    private readonly ownersService: OwnersService,
  ) {}

  @Query(() => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(() => Pet, { name: 'pet' })
  getPet(@Args() getPetArgs: GetPetArgs): Promise<Pet> {
    return this.petsService.findOne(getPetArgs.id);
  }

  @ResolveField(() => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.ownersService.getOwner(pet.ownerId);
  }

  @Mutation((returns) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }
}
