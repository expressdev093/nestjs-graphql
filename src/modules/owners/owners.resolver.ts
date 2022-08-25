import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { Pet } from '../pets/pet.entity';
import { PetsService } from '../pets/pets.service';
import { Public } from '../auth/metadata/public.metadata';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly petsService: PetsService,
  ) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }

  @ResolveField((returns) => [Pet])
  async pets(@Parent() owner: Owner) {
    return this.petsService.getPets(owner.id);
  }
}
